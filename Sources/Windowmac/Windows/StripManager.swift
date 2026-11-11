import AppKit
import WindowmacCore

/// Strip mode. Each strip owns the windows of one display (on the Space where it was made) and
/// lays them out as columns on a horizontal strip that scrolls. Columns scrolled off screen are
/// parked against the edge with a sliver showing.
///
/// A light 0.4 s heartbeat keeps a strip in sync with what the user does outside Windowmac:
/// closed or minimized windows leave, new windows join next to the focused one, switching to a
/// window (⌘-Tab, Dock, click) scrolls it into view, and resizing a column keeps the new width.
final class StripManager {
    final class Strip {
        let displayID: CGDirectDisplayID
        var layout: StripLayout
        var windows: [CGWindowID: AXWindow] = [:]
        /// Where each window was before it joined, to put it back when the strip is turned off.
        var originals: [CGWindowID: CGRect] = [:]
        /// Windows the user floated out; they don't rejoin on their own.
        var floating = Set<CGWindowID>()
        /// False while the strip's Space isn't showing (none of its windows are on screen).
        var isActive = true

        init(displayID: CGDirectDisplayID, layout: StripLayout) {
            self.displayID = displayID
            self.layout = layout
        }

        var focusedWindow: AXWindow? { layout.focusedID.flatMap { windows[$0] } }
    }

    private unowned let engine: WindowEngine
    private(set) var strips: [Strip] = []
    let bar = StripBarController()

    private var timer: Timer?
    /// Windows already checked and found unsuitable (dialogs, panels, fixed-size windows...).
    private var rejected = Set<CGWindowID>()
    /// Ignore "the user resized this" until our own animations have finished.
    private var busyUntil: CFTimeInterval = 0
    private var lastFocusedID: CGWindowID?
    private var scrollingStrip: Strip?
    private var screenObserver: Any?

    private var settings: WindowmacSettings { SettingsStore.shared.settings }
    private var gap: CGFloat { CGFloat(max(0, settings.padding)) }

    init(engine: WindowEngine) {
        self.engine = engine
        screenObserver = NotificationCenter.default.addObserver(
            forName: NSApplication.didChangeScreenParametersNotification, object: nil, queue: .main
        ) { [weak self] _ in self?.screensChanged() }
    }

    // MARK: - Lookup

    func strip(containing window: AXWindow) -> Strip? {
        strips.first { $0.windows[window.id] != nil }
    }

    /// The strip showing on the display under `point` (screen space).
    func activeStrip(at point: CGPoint) -> Strip? {
        guard let info = Screens.all().first(where: { $0.frame.contains(point) }) else { return nil }
        return strips.first { $0.isActive && $0.displayID == info.displayID }
    }

    /// Is this window in a strip, or on a screen that has one?
    func hasStrip(for window: AXWindow) -> Bool {
        if strip(containing: window) != nil { return true }
        return displayID(for: window).flatMap(activeStrip(on:)) != nil
    }

    private func activeStrip(on displayID: CGDirectDisplayID) -> Strip? {
        strips.first { $0.isActive && $0.displayID == displayID }
    }

    private func screen(of strip: Strip) -> (ScreenInfo, [ScreenInfo])? {
        let all = Screens.all()
        guard let s = all.first(where: { $0.displayID == strip.displayID }) else { return nil }
        return (s, all)
    }

    /// The display the action is about: the window's, else the one under the cursor.
    private func displayID(for window: AXWindow?) -> CGDirectDisplayID? {
        if let frame = window?.frame, let located = Screens.locate(frame) {
            return located.screens[located.index].displayID
        }
        return Screens.all().first { $0.frame.contains(Screens.mouseLocation) }?.displayID
    }

    // MARK: - Actions

    func handle(_ action: WindowAction, window: AXWindow?) {
        if action == .stripToggle {
            toggle(window: window)
            return
        }
        if action == .stripFloat {
            toggleFloat(window)
            return
        }
        guard let display = displayID(for: window),
              let strip = window.flatMap(strip(containing:)) ?? activeStrip(on: display) else {
            NSSound.beep()
            return
        }
        // If the user switched windows since we last looked, start from the one they're in.
        if let w = window, let i = strip.layout.index(of: w.id) { strip.layout.focused = i }

        var changed = true
        switch action {
        case .stripFocusLeft: changed = strip.layout.focus(by: -1)
        case .stripFocusRight: changed = strip.layout.focus(by: 1)
        case .stripFocusFirst: changed = strip.layout.focus(index: 0)
        case .stripFocusLast: changed = strip.layout.focus(index: strip.layout.columns.count - 1)
        case .stripMoveLeft: changed = strip.layout.moveFocused(by: -1)
        case .stripMoveRight: changed = strip.layout.moveFocused(by: 1)
        case .stripCycleWidth: strip.layout.cycleWidth()
        case .stripFullWidth: strip.layout.toggleFullWidth()
        case .stripCenter:
            if let (s, _) = screen(of: strip) { strip.layout.centerFocused(viewport: s.visible, gap: gap) }
            apply(strip, reveal: false)
            focusCurrent(strip)
            return
        default: break
        }
        if !changed {
            NSSound.beep()
            showBar(for: strip)
            return
        }
        apply(strip)
        focusCurrent(strip)
    }

    /// Turn the strip on for this display, or off if it's already on.
    func toggle(window: AXWindow?) {
        guard let display = displayID(for: window) else {
            NSSound.beep()
            return
        }
        if let existing = activeStrip(on: display) {
            dissolve(existing)
            return
        }
        guard let info = Screens.all().first(where: { $0.displayID == display }) else { return }
        let found = candidateWindows(on: info)
        guard !found.isEmpty else {
            NSSound.beep()
            return
        }
        let viewport = info.visible
        let focusedID = (window.flatMap { w in found.first { $0.window.id == w.id } } ?? found.first)?.window.id
        let columns = found.map { c -> StripLayout.Column in
            // Existing windows keep (roughly) their width.
            StripLayout.Column(id: c.window.id, width: StripLayout.fraction(forWidth: c.frame.width, viewport: viewport, gap: gap))
        }
        let strip = Strip(displayID: display,
                          layout: StripLayout(columns: columns,
                                              focused: found.firstIndex { $0.window.id == focusedID } ?? 0))
        for c in found {
            strip.windows[c.window.id] = c.window
            strip.originals[c.window.id] = c.frame
            engine.stash.forget(c.window)
        }
        strips.append(strip)
        apply(strip)
        focusCurrent(strip)
        startHeartbeat()
    }

    /// Take a window out of its strip (it stays where it is), or put a floating one into the strip on its screen.
    func toggleFloat(_ window: AXWindow?) {
        guard let window else {
            NSSound.beep()
            return
        }
        if let strip = strip(containing: window) {
            remove(window.id, from: strip, bringBack: true)
            strip.floating.insert(window.id)
            return
        }
        guard let display = displayID(for: window), let strip = activeStrip(on: display),
              window.isResizable, let frame = window.frame else {
            NSSound.beep()
            return
        }
        strip.floating.remove(window.id)
        join(window, frame: frame, strip: strip, width: settings.stripDefaultWidth)
    }

    /// Another action (snap, stash...) moved this window, so it floats free of its strip.
    func release(_ window: AXWindow) {
        guard let strip = strip(containing: window) else { return }
        remove(window.id, from: strip, bringBack: false)
        strip.floating.insert(window.id)
    }

    /// Bar tiles: click to focus a column.
    func focusColumn(_ index: Int, in strip: Strip) {
        guard strip.layout.columns.indices.contains(index) else { return }
        strip.layout.focused = index
        apply(strip)
        focusCurrent(strip)
    }

    // MARK: - Free scrolling (trigger + scroll wheel / trackpad)

    func scroll(by delta: CGFloat, at point: CGPoint) -> Bool {
        guard let strip = activeStrip(at: point), let (s, _) = screen(of: strip) else { return false }
        strip.layout.scroll(by: delta, viewport: s.visible, gap: gap)
        scrollingStrip = strip
        apply(strip, reveal: false, animated: false)
        return true
    }

    /// Snap to the nearest column once scrolling stops.
    func endScrolling() {
        guard let strip = scrollingStrip, let (s, _) = screen(of: strip) else { return }
        scrollingStrip = nil
        strip.layout.settle(viewport: s.visible, gap: gap)
        apply(strip, reveal: false)
        focusCurrent(strip)
    }

    // MARK: - Layout

    /// Moves every window of the strip to its column (parking off-screen columns at the edge).
    private func apply(_ strip: Strip, reveal: Bool = true, animated: Bool = true) {
        guard let (info, all) = screen(of: strip) else { return }
        let viewport = info.visible
        if reveal {
            strip.layout.reveal(viewport: viewport, gap: gap, center: settings.stripCenterFocused)
        }
        let others = all.map(\.frame)
        let leftFree = StashGeometry.edgeIsFree(.left, screen: info.frame, otherScreens: others)
        let rightFree = StashGeometry.edgeIsFree(.right, screen: info.frame, otherScreens: others)
        let bottomFree = StripPlacement.bottomIsFree(screen: info.frame, otherScreens: others)
        let frames = strip.layout.frames(viewport: viewport, gap: gap)
        let duration = animated && settings.animateWindows ? settings.animationDuration : 0
        busyUntil = CACurrentMediaTime() + duration + 0.5

        for (column, target) in zip(strip.layout.columns, frames) {
            guard let window = strip.windows[column.id] else { continue }
            let placed = StripPlacement.frame(for: target, screen: info.frame, peek: CGFloat(settings.stripPeek),
                                              leftFree: leftFree, rightFree: rightFree, bottomFree: bottomFree)
            if duration > 0 {
                engine.animator.animate(window, to: placed, duration: duration)
            } else {
                window.setFrame(placed)
            }
        }
        showBar(for: strip)
    }

    private func focusCurrent(_ strip: Strip) {
        guard let w = strip.focusedWindow else { return }
        lastFocusedID = w.id
        w.focus()
    }

    private func showBar(for strip: Strip) {
        guard settings.stripShowBar, let (info, _) = screen(of: strip) else { return }
        bar.show(model(for: strip), on: info)
    }

    func barModel(at point: CGPoint) -> (Strip, ScreenInfo)? {
        guard let strip = activeStrip(at: point), let (info, _) = screen(of: strip) else { return nil }
        return (strip, info)
    }

    /// Shows the bar while the trigger is held over a strip.
    func showBarIfStrip(at point: CGPoint, sticky: Bool) {
        guard settings.stripShowBar, let (strip, info) = barModel(at: point) else { return }
        bar.show(model(for: strip), on: info, sticky: sticky)
    }

    private func model(for strip: Strip) -> StripBarModel.Snapshot {
        let viewport = screen(of: strip)?.0.visible ?? .zero
        let tiles = strip.layout.columns.indices.map { i -> StripBarModel.Tile in
            let id = strip.layout.columns[i].id
            let app = strip.windows[id]?.app
            return StripBarModel.Tile(id: id, icon: app?.icon, name: app?.localizedName ?? "Window",
                                      visible: strip.layout.visibleFraction(of: i, viewport: viewport, gap: gap))
        }
        return .init(tiles: tiles, focused: strip.layout.focused, hints: hints())
    }

    private func hints() -> [StripBarModel.Hint] {
        let s = settings
        func h(_ actions: [WindowAction], _ label: String) -> StripBarModel.Hint? {
            let keys = actions.compactMap { s.shortcut(for: $0) }
            return keys.isEmpty ? nil : StripBarModel.Hint(keys: keys.joined(separator: " "), label: label)
        }
        return [h([.stripFocusLeft, .stripFocusRight], "focus"), h([.stripMoveLeft, .stripMoveRight], "move"),
                h([.stripCycleWidth], "width"), h([.stripFullWidth], "full"), h([.stripCenter], "centre"),
                h([.stripFloat], "float"), h([.stripToggle], "off")].compactMap { $0 }
            + [StripBarModel.Hint(keys: "scroll", label: "slide")]
    }

    // MARK: - Joining and leaving

    private struct Candidate {
        let window: AXWindow
        let frame: CGRect
    }

    /// Normal, resizable windows that are mostly on this display, left to right.
    private func candidateWindows(on info: ScreenInfo) -> [Candidate] {
        let screens = Screens.all().map(\.frame)
        var out: [Candidate] = []
        for entry in WindowList.onScreen() where !isInAnyStrip(entry.id) {
            guard let i = ScreenPicker.screenIndex(for: entry.bounds, screens: screens),
                  Screens.all()[i].displayID == info.displayID,
                  let window = suitableWindow(entry) else { continue }
            out.append(Candidate(window: window, frame: window.frame ?? entry.bounds))
        }
        return out.sorted { $0.frame.minX < $1.frame.minX }
    }

    private func isInAnyStrip(_ id: CGWindowID) -> Bool {
        strips.contains { $0.windows[id] != nil }
    }

    /// The AX window for a window-list entry, if it's something that belongs in a strip.
    private func suitableWindow(_ entry: WindowList.Entry) -> AXWindow? {
        guard !rejected.contains(entry.id) else { return nil }
        guard let window = WindowList.axWindow(for: entry),
              window.isMovable, window.isResizable, window.isStandard, !window.isFullscreen,
              !engine.isExcluded(window) else {
            rejected.insert(entry.id)
            return nil
        }
        return window
    }

    private func join(_ window: AXWindow, frame: CGRect, strip: Strip, width: Double) {
        engine.stash.forget(window)
        strip.windows[window.id] = window
        strip.originals[window.id] = frame
        strip.layout.insertAfterFocused(StripLayout.Column(id: window.id, width: width))
        apply(strip)
        focusCurrent(strip)
    }

    private func remove(_ id: CGWindowID, from strip: Strip, bringBack: Bool) {
        let window = strip.windows.removeValue(forKey: id)
        let original = strip.originals.removeValue(forKey: id)
        strip.layout.remove(id: id)
        if bringBack, let window, window.isAlive, let (info, _) = screen(of: strip) {
            window.setFrame(Self.onScreen(original ?? window.frame ?? info.visible, in: info.visible))
        }
        if strip.layout.isEmpty {
            strips.removeAll { $0 === strip }
            bar.hide()
            stopHeartbeatIfIdle()
        } else {
            apply(strip)
        }
    }

    /// Turn a strip off: every window goes back on screen, near where it was before.
    private func dissolve(_ strip: Strip, animated: Bool = true) {
        let visible = screen(of: strip)?.0.visible ?? (NSScreen.main.map { Screens.toScreenSpace($0.visibleFrame) } ?? .zero)
        for (id, window) in strip.windows where window.isAlive {
            let target = Self.onScreen(strip.originals[id] ?? window.frame ?? visible, in: visible)
            if animated { engine.move(window, to: target) } else { window.setFrame(target) }
        }
        strips.removeAll { $0 === strip }
        bar.hide()
        stopHeartbeatIfIdle()
    }

    /// Everything back on screen, instantly (on quit).
    func dissolveAll() {
        for strip in strips { dissolve(strip, animated: false) }
    }

    static func onScreen(_ frame: CGRect, in visible: CGRect) -> CGRect {
        let w = min(frame.width, visible.width)
        let h = min(frame.height, visible.height)
        let x = min(max(frame.minX, visible.minX), visible.maxX - w)
        let y = min(max(frame.minY, visible.minY), visible.maxY - h)
        return CGRect(x: x, y: y, width: w, height: h)
    }

    // MARK: - Heartbeat

    private func startHeartbeat() {
        guard timer == nil else { return }
        let t = Timer(timeInterval: 0.4, repeats: true) { [weak self] _ in self?.sync() }
        RunLoop.main.add(t, forMode: .common)
        timer = t
    }

    private func stopHeartbeatIfIdle() {
        guard strips.isEmpty else { return }
        timer?.invalidate()
        timer = nil
        rejected.removeAll()
    }

    private func sync() {
        guard !strips.isEmpty, scrollingStrip == nil else { return }
        let entries = WindowList.onScreen()
        let onScreen = Set(entries.map(\.id))
        rejected.formIntersection(onScreen) // window numbers can be reused once a window closes

        for strip in strips {
            strip.isActive = strip.windows.keys.contains { onScreen.contains($0) }
            guard strip.isActive else { continue }
            // Gone: closed, minimized, app hidden, or moved into native fullscreen.
            for (id, window) in strip.windows where !onScreen.contains(id) {
                if !window.isAlive || window.isFullscreen {
                    remove(id, from: strip, bringBack: false)
                } else if window.isMinimized || window.app?.isHidden == true {
                    // Put it back on screen so it reappears somewhere sensible (it rejoins if new windows do).
                    remove(id, from: strip, bringBack: true)
                }
            }
        }
        guard !strips.isEmpty else { return }

        // New windows join the strip on their display.
        if settings.stripAdoptNewWindows {
            let screens = Screens.all()
            for entry in entries where !isInAnyStrip(entry.id) && !rejected.contains(entry.id) {
                guard let i = ScreenPicker.screenIndex(for: entry.bounds, screens: screens.map(\.frame)),
                      let strip = activeStrip(on: screens[i].displayID),
                      !strip.floating.contains(entry.id),
                      let window = suitableWindow(entry) else { continue }
                join(window, frame: entry.bounds, strip: strip, width: settings.stripDefaultWidth)
            }
        }

        followFocus()
    }

    /// The user switched to a strip window some other way: scroll it into view. They resized
    /// the focused column by hand: keep that width.
    private func followFocus() {
        // Our own moves and focus changes are still landing; don't mistake them for the user's.
        guard CACurrentMediaTime() > busyUntil else { return }
        guard let front = AXWindow.frontmost(), let strip = strip(containing: front),
              let i = strip.layout.index(of: front.id) else { return }
        if front.id != lastFocusedID || i != strip.layout.focused {
            lastFocusedID = front.id
            if i != strip.layout.focused || strip.layout.visibleFraction(of: i, viewport: viewport(of: strip), gap: gap) < 0.99 {
                strip.layout.focused = i
                apply(strip)
            }
            return
        }
        guard let frame = front.frame, let (info, _) = screen(of: strip) else { return }
        let expected = strip.layout.width(of: i, viewport: info.visible, gap: gap)
        if abs(frame.width - expected) > 12, !strip.layout.columns[i].fullWidth {
            strip.layout.setWidth(StripLayout.fraction(forWidth: frame.width, viewport: info.visible, gap: gap), of: i)
            apply(strip)
        }
    }

    private func viewport(of strip: Strip) -> CGRect {
        screen(of: strip)?.0.visible ?? .zero
    }

    private func screensChanged() {
        let present = Set(Screens.all().map(\.displayID))
        for strip in strips {
            if present.contains(strip.displayID) {
                apply(strip, animated: false)
            } else {
                dissolve(strip, animated: false)
            }
        }
    }
}

/// The window server's list of windows on the current Space, front to back.
enum WindowList {
    struct Entry {
        let id: CGWindowID
        let pid: pid_t
        let bounds: CGRect
    }

    static func onScreen() -> [Entry] {
        let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
        guard let list = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as? [[String: Any]] else { return [] }
        let me = getpid()
        return list.compactMap { info in
            guard (info[kCGWindowLayer as String] as? Int) == 0,
                  let id = info[kCGWindowNumber as String] as? CGWindowID,
                  let pid = info[kCGWindowOwnerPID as String] as? pid_t, pid != me,
                  (info[kCGWindowAlpha as String] as? Double ?? 1) > 0,
                  let dict = info[kCGWindowBounds as String] as? NSDictionary,
                  let bounds = CGRect(dictionaryRepresentation: dict),
                  bounds.width >= 120, bounds.height >= 80 else { return nil }
            return Entry(id: id, pid: pid, bounds: bounds)
        }
    }

    static func axWindow(for entry: Entry) -> AXWindow? {
        let app = AXUIElementCreateApplication(entry.pid)
        AXUIElementSetMessagingTimeout(app, 0.3)
        return AX.elements(app, kAXWindowsAttribute).lazy
            .compactMap(AXWindow.init(element:))
            .first { $0.id == entry.id }
    }
}

extension ScreenInfo {
    var displayID: CGDirectDisplayID {
        (screen.deviceDescription[NSDeviceDescriptionKey("NSScreenNumber")] as? NSNumber)?.uint32Value ?? 0
    }
}
