import AppKit
import WindowmacCore

private func triggerTapCallback(proxy: CGEventTapProxy,
                                type: CGEventType,
                                event: CGEvent,
                                refcon: UnsafeMutableRawPointer?) -> Unmanaged<CGEvent>? {
    guard let refcon else { return Unmanaged.passUnretained(event) }
    let controller = Unmanaged<TriggerController>.fromOpaque(refcon).takeUnretainedValue()
    return controller.handle(type: type, event: event)
}

/// The heart of Windowmac. Watches the trigger key, then:
///   • cursor movement picks a direction on the radial menu,
///   • left-click cycles through that direction's actions,
///   • trigger + key runs a keybind (pressing it again cycles),
///   • releasing the trigger applies the choice; Esc or right-click cancels,
///   • strip keys act instantly, scrolling slides the strip, and the strip bar's tiles can be clicked.
/// Keys that aren't keybinds pass straight through and cancel, so typing with
/// the trigger modifier (e.g. ⌥ for special characters) never gets in the way.
final class TriggerController {
    enum Source: Equatable {
        case direction(RadialDirection)
        case keybind(UUID)

        var cycleKey: String {
            switch self {
            case .direction(let d): return "direction:" + d.rawValue
            case .keybind(let id): return "keybind:" + id.uuidString
            }
        }

        var isKeybind: Bool {
            if case .keybind = self { return true }
            return false
        }
    }

    private struct Session {
        var window: AXWindow
        var start: CGPoint
        var source: Source?
        var index = 0
        var direction: RadialDirection = .center
        var visible = false
        var timer: Timer?
        /// Strip keys or scrolling were used: the radial menu steps aside and release does nothing.
        var usedStrip = false
        var scrolled = false
    }

    var isPaused = false
    private(set) var isRunning = false

    private var tap: CFMachPort?
    private var session: Session?
    private var triggerDown = false
    private var swallowedKeyUps = Set<Int64>()
    private var swallowMouseUp = false
    private var swallowRightMouseUp = false

    private let radial = RadialMenuController()
    private let preview = PreviewController()
    private let engine = WindowEngine.shared
    private var settings: WindowmacSettings { SettingsStore.shared.settings }

    // MARK: - Event tap

    /// Needs Accessibility permission. Returns false if macOS refused the tap.
    @discardableResult
    func start() -> Bool {
        if tap != nil { return true }
        let types: [CGEventType] = [.flagsChanged, .keyDown, .keyUp, .mouseMoved,
                                    .leftMouseDown, .leftMouseUp, .leftMouseDragged,
                                    .rightMouseDown, .rightMouseUp, .scrollWheel]
        let mask = types.reduce(CGEventMask(0)) { $0 | (CGEventMask(1) << CGEventMask($1.rawValue)) }
        guard let tap = CGEvent.tapCreate(tap: .cgSessionEventTap,
                                          place: .headInsertEventTap,
                                          options: .defaultTap,
                                          eventsOfInterest: mask,
                                          callback: triggerTapCallback,
                                          userInfo: Unmanaged.passUnretained(self).toOpaque()) else {
            return false
        }
        let source = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, tap, 0)
        CFRunLoopAddSource(CFRunLoopGetMain(), source, .commonModes)
        CGEvent.tapEnable(tap: tap, enable: true)
        self.tap = tap
        isRunning = true
        return true
    }

    fileprivate func handle(type: CGEventType, event: CGEvent) -> Unmanaged<CGEvent>? {
        let pass = Unmanaged.passUnretained(event)

        switch type {
        case .tapDisabledByTimeout, .tapDisabledByUserInput:
            if let tap { CGEvent.tapEnable(tap: tap, enable: true) }
            return pass

        case .flagsChanged:
            let down = !isPaused && TriggerKey.allDown(settings.triggerKeys, flags: event.flags.rawValue)
            if down && !triggerDown {
                triggerDown = true
                begin(at: event.location)
            } else if !down && triggerDown {
                triggerDown = false
                end(commit: true)
            }
            return pass

        case .keyDown:
            let code = event.getIntegerValueField(.keyboardEventKeycode)
            guard session != nil else { return pass }
            if code == Int64(KeyNames.escape) {
                end(commit: false)
                swallowedKeyUps.insert(code)
                return nil
            }
            let extra = TriggerKey.extraModifiers(flags: event.flags.rawValue, trigger: settings.triggerKeys)
            if let bind = settings.keybind(keyCode: UInt16(code), modifiers: extra),
               let first = bind.actions.first?.builtin, first.isImmediate {
                // Without a strip on this screen, strip keys type as normal (⌥A is å on many layouts).
                guard first == .stripToggle || engine.strips.hasStrip(for: session!.window) else {
                    end(commit: false)
                    return pass
                }
                swallowedKeyUps.insert(code)
                let repeating = event.getIntegerValueField(.keyboardEventAutorepeat) != 0
                // Holding A or D keeps stepping through columns; toggles don't repeat.
                if !repeating || [.stripFocusLeft, .stripFocusRight, .stripMoveLeft, .stripMoveRight].contains(first) {
                    runStripAction(first)
                }
                return nil
            }
            if let bind = settings.keybind(keyCode: UInt16(code), modifiers: extra) {
                swallowedKeyUps.insert(code)
                // Holding a key down shouldn't spin through the cycle.
                if event.getIntegerValueField(.keyboardEventAutorepeat) == 0 {
                    select(.keybind(bind.id), advanceIfSame: true)
                }
                return nil
            }
            // Not ours: the user is typing with the modifier held. Get out of the way.
            end(commit: false)
            return pass

        case .keyUp:
            let code = event.getIntegerValueField(.keyboardEventKeycode)
            return swallowedKeyUps.remove(code) != nil ? nil : pass

        case .mouseMoved, .leftMouseDragged:
            guard var s = session, settings.cursorSelection else { return pass }
            let p = event.location
            let dir = RadialDirection.from(dx: Double(p.x - s.start.x),
                                           dy: Double(s.start.y - p.y), // flip: screen space y grows down
                                           deadZone: settings.deadZone)
            guard dir != s.direction else { return pass }
            s.direction = dir
            session = s
            // A keybind choice sticks until the cursor clearly leaves the centre.
            if dir == .center, s.source?.isKeybind == true { return pass }
            select(.direction(dir), advanceIfSame: false)
            return pass

        case .scrollWheel:
            guard session != nil else { return pass }
            let continuous = event.getIntegerValueField(.scrollWheelEventIsContinuous) != 0
            var dx = CGFloat(event.getDoubleValueField(.scrollWheelEventPointDeltaAxis2))
            var dy = CGFloat(event.getDoubleValueField(.scrollWheelEventPointDeltaAxis1))
            if !continuous { dx *= 4; dy *= 4 } // mouse wheel notches are small
            // Sideways swipes, or a plain wheel, both slide the strip.
            let delta = abs(dx) >= abs(dy) ? dx : dy
            guard delta != 0, engine.strips.scroll(by: -delta, at: event.location) else { return pass }
            session?.scrolled = true
            stepAsideForStrip()
            return nil

        case .leftMouseDown:
            if session != nil, engine.strips.bar.contains(event.location) {
                if let i = engine.strips.bar.tileIndex(at: event.location),
                   let (strip, _) = engine.strips.barModel(at: event.location) {
                    engine.strips.focusColumn(i, in: strip)
                    if let w = strip.focusedWindow { session?.window = w }
                    stepAsideForStrip()
                }
                swallowMouseUp = true
                return nil
            }
            guard let s = session, s.visible else { return pass }
            if let src = s.source { select(src, advanceIfSame: true) }
            swallowMouseUp = true
            return nil

        case .leftMouseUp:
            if swallowMouseUp {
                swallowMouseUp = false
                return nil
            }
            return pass

        case .rightMouseDown:
            guard let s = session, s.visible else { return pass }
            end(commit: false)
            swallowRightMouseUp = true
            return nil

        case .rightMouseUp:
            if swallowRightMouseUp {
                swallowRightMouseUp = false
                return nil
            }
            return pass

        default:
            return pass
        }
    }

    // MARK: - Session

    private func begin(at point: CGPoint) {
        guard session == nil, let window = AXWindow.frontmost(), !engine.isExcluded(window) else { return }
        var s = Session(window: window, start: point)
        let timer = Timer(timeInterval: max(0, settings.triggerDelay), repeats: false) { [weak self] _ in
            self?.reveal()
        }
        RunLoop.main.add(timer, forMode: .common)
        s.timer = timer
        session = s
    }

    /// The trigger has been held long enough: show the menu.
    private func reveal() {
        guard var s = session, !s.visible else { return }
        s.visible = true
        session = s
        if settings.radialMenuEnabled && !s.usedStrip { radial.show(at: s.start, theme: settings.radialTheme) }
        engine.strips.showBarIfStrip(at: s.window.frame?.center ?? s.start, sticky: true)
        refresh()
    }

    /// Runs a strip action right away and keeps the session going for the next key.
    private func runStripAction(_ action: WindowAction) {
        guard let s = session else { return }
        stepAsideForStrip()
        engine.perform(.builtin(action), on: s.window)
        // Focus moved to another column: later keys (and a flick) apply to that window.
        if let w = engine.strips.strip(containing: s.window)?.focusedWindow { session?.window = w }
        if settings.hapticFeedback {
            NSHapticFeedbackManager.defaultPerformer.perform(.alignment, performanceTime: .now)
        }
    }

    /// Strip in use: hide the radial menu and preview, and make release a no-op.
    private func stepAsideForStrip() {
        guard var s = session else { return }
        s.usedStrip = true
        s.source = nil
        // Only a deliberate flick from here on brings the radial menu back.
        s.start = Screens.mouseLocation
        s.direction = .center
        if !s.visible {
            s.visible = true
            s.timer?.invalidate()
        }
        session = s
        radial.hide()
        preview.hide()
    }

    private func actions(for source: Source) -> [ActionRef] {
        switch source {
        case .direction(let d): return settings.actions(for: d)
        case .keybind(let id): return settings.keybinds.first { $0.id == id }?.actions ?? []
        }
    }

    private func select(_ source: Source, advanceIfSame: Bool) {
        guard var s = session else { return }
        let list = actions(for: source)
        if s.source == source {
            if advanceIfSame, list.count > 1 { s.index = (s.index + 1) % list.count }
        } else {
            s.source = source
            s.index = engine.cycles.startIndex(key: source.cycleKey, windowID: s.window.id,
                                               currentFrame: s.window.frame ?? .zero, count: list.count)
        }
        session = s

        if source.isKeybind && !s.visible {
            // Keybinds act immediately; no need to wait for the hold delay.
            reveal()
        } else if s.visible {
            refresh()
        }
        if s.visible || source.isKeybind, settings.hapticFeedback, !list.isEmpty {
            NSHapticFeedbackManager.defaultPerformer.perform(.alignment, performanceTime: .now)
        }
    }

    private func currentAction(_ s: Session) -> ActionRef? {
        guard let src = s.source else { return nil }
        let list = actions(for: src)
        return list.isEmpty ? nil : list[s.index % list.count]
    }

    private func refresh() {
        guard let s = session, s.visible, !s.usedStrip || s.source != nil else { return }
        if s.usedStrip, settings.radialMenuEnabled { radial.show(at: s.start, theme: settings.radialTheme) }
        let action = currentAction(s)
        let list = s.source.map(actions(for:)) ?? []

        var highlighted: RadialDirection?
        if case .direction(let d)? = s.source { highlighted = d }

        let title: String
        if let action {
            title = settings.title(for: action)
        } else if s.source == nil || highlighted == .center {
            title = settings.cursorSelection ? "Move to choose" : "Press a key"
        } else {
            title = "No action"
        }
        let subtitle = list.count > 1 ? "\(s.index % list.count + 1) of \(list.count) · click to cycle" : nil
        radial.model.set(direction: highlighted,
                         centerActive: highlighted == .center && action != nil || (s.source?.isKeybind == true && action != nil),
                         title: title,
                         subtitle: subtitle,
                         symbol: action?.builtin?.symbolName ?? (action != nil ? "rectangle.dashed" : nil))

        if settings.previewEnabled, let action, let frame = engine.targetFrame(for: action, window: s.window) {
            preview.show(target: frame, from: s.window.frame, theme: settings.previewTheme)
        } else {
            preview.hide()
        }
    }

    private func end(commit: Bool) {
        guard let s = session else { return }
        s.timer?.invalidate()
        session = nil
        radial.hide()
        preview.hide()
        if s.scrolled { engine.strips.endScrolling() }
        engine.strips.bar.hide(after: s.usedStrip ? 0.8 : 0)

        guard commit, s.visible, let source = s.source, let action = currentAction(s) else { return }
        let index = s.index
        engine.perform(action, on: s.window) { [weak self] window, frame in
            guard let frame else { return }
            self?.engine.cycles.record(key: source.cycleKey, windowID: window.id, index: index, frame: frame)
        }
    }

    /// Used by Settings when the trigger keys change mid-press, and on pause.
    func cancel() {
        end(commit: false)
        triggerDown = false
    }
}
