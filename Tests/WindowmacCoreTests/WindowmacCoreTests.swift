import XCTest
#if canImport(CoreGraphics)
import CoreGraphics
#endif
@testable import WindowmacCore

final class GeometryTests: XCTestCase {
    let screen = CGRect(x: 0, y: 25, width: 1440, height: 875) // below a 25pt menu bar

    func testHalvesWithoutPadding() {
        let g = ActionGeometry(padding: 0)
        let w = CGRect(x: 100, y: 100, width: 400, height: 300)
        XCTAssertEqual(g.frame(for: .leftHalf, window: w, visible: screen), CGRect(x: 0, y: 25, width: 720, height: 875))
        XCTAssertEqual(g.frame(for: .rightHalf, window: w, visible: screen), CGRect(x: 720, y: 25, width: 720, height: 875))
        XCTAssertEqual(g.frame(for: .maximize, window: w, visible: screen), screen)
    }

    func testPaddingIsEqualAtEdgesAndBetweenWindows() {
        let g = ActionGeometry(padding: 10)
        let w = CGRect(x: 100, y: 100, width: 400, height: 300)
        let left = g.frame(for: .leftHalf, window: w, visible: screen)!
        let right = g.frame(for: .rightHalf, window: w, visible: screen)!
        XCTAssertEqual(left.minX, 10)
        XCTAssertEqual(right.minX - left.maxX, 10)
        XCTAssertEqual(screen.maxX - right.maxX, 10)
        XCTAssertEqual(left.minY, 35)
    }

    func testThirdsCoverTheScreen() {
        let g = ActionGeometry(padding: 0)
        let w = CGRect(x: 0, y: 0, width: 10, height: 10)
        let a = g.frame(for: .leftThird, window: w, visible: screen)!
        let b = g.frame(for: .horizontalCenterThird, window: w, visible: screen)!
        let c = g.frame(for: .rightThird, window: w, visible: screen)!
        XCTAssertEqual(a.maxX, b.minX)
        XCTAssertEqual(b.maxX, c.minX)
        XCTAssertEqual(c.maxX, screen.maxX)
    }

    func testCenterKeepsSize() {
        let g = ActionGeometry(padding: 0)
        let w = CGRect(x: 0, y: 25, width: 400, height: 300)
        let r = g.frame(for: .center, window: w, visible: screen)!
        XCTAssertEqual(r.size, w.size)
        XCTAssertEqual(r.midX, screen.midX, accuracy: 1)
        XCTAssertEqual(r.midY, screen.midY, accuracy: 1)
    }

    func testSmallerRespectsMinimum() {
        let g = ActionGeometry(padding: 0, step: 500)
        let w = CGRect(x: 200, y: 200, width: 400, height: 300)
        let r = g.frame(for: .smaller, window: w, visible: screen)!
        XCTAssertEqual(r.width, 240)
        XCTAssertEqual(r.height, 160)
    }

    func testMoveStaysOnScreen() {
        let g = ActionGeometry(padding: 0, step: 100)
        let w = CGRect(x: 20, y: 100, width: 400, height: 300)
        let r = g.frame(for: .moveLeft, window: w, visible: screen)!
        XCTAssertEqual(r.minX, 0)
    }

    func testTransferKeepsRelativeLayout() {
        let g = ActionGeometry(padding: 0)
        let a = CGRect(x: 0, y: 0, width: 1000, height: 800)
        let b = CGRect(x: 1000, y: 0, width: 2000, height: 1000)
        let leftHalf = CGRect(x: 0, y: 0, width: 500, height: 800)
        XCTAssertEqual(g.transfer(leftHalf, from: a, to: b), CGRect(x: 1000, y: 0, width: 1000, height: 1000))
    }
}

final class RadialTests: XCTestCase {
    func testDirections() {
        XCTAssertEqual(RadialDirection.from(dx: 2, dy: 1, deadZone: 10), .center)
        XCTAssertEqual(RadialDirection.from(dx: 50, dy: 0, deadZone: 10), .right)
        XCTAssertEqual(RadialDirection.from(dx: 0, dy: 50, deadZone: 10), .top)
        XCTAssertEqual(RadialDirection.from(dx: -50, dy: 0, deadZone: 10), .left)
        XCTAssertEqual(RadialDirection.from(dx: 0, dy: -50, deadZone: 10), .bottom)
        XCTAssertEqual(RadialDirection.from(dx: 40, dy: 40, deadZone: 10), .topRight)
        XCTAssertEqual(RadialDirection.from(dx: -40, dy: -40, deadZone: 10), .bottomLeft)
        XCTAssertEqual(RadialDirection.from(dx: 50, dy: -5, deadZone: 10), .right) // just below the axis
    }
}

final class CycleTests: XCTestCase {
    func testCycleContinuesOnlyWhenUntouched() {
        var t = CycleTracker()
        let f = CGRect(x: 0, y: 0, width: 100, height: 100)
        XCTAssertEqual(t.startIndex(key: "k", windowID: 1, currentFrame: f, count: 3), 0)
        t.record(key: "k", windowID: 1, index: 0, frame: f)
        XCTAssertEqual(t.startIndex(key: "k", windowID: 1, currentFrame: f, count: 3), 1)
        XCTAssertEqual(t.startIndex(key: "other", windowID: 1, currentFrame: f, count: 3), 0)
        XCTAssertEqual(t.startIndex(key: "k", windowID: 2, currentFrame: f, count: 3), 0)
        XCTAssertEqual(t.startIndex(key: "k", windowID: 1, currentFrame: f.offsetBy(dx: 50, dy: 0), count: 3), 0)
        t.record(key: "k", windowID: 1, index: 2, frame: f)
        XCTAssertEqual(t.startIndex(key: "k", windowID: 1, currentFrame: f, count: 3), 0) // wraps
    }

    func testHistory() {
        var h = FrameHistory()
        let a = CGRect(x: 0, y: 0, width: 1, height: 1)
        let b = CGRect(x: 5, y: 5, width: 1, height: 1)
        h.record(windowID: 7, frame: a)
        h.record(windowID: 7, frame: b)
        XCTAssertEqual(h.initialFrame(windowID: 7), a)
        XCTAssertEqual(h.popUndo(windowID: 7), b)
        XCTAssertEqual(h.popUndo(windowID: 7), a)
        XCTAssertNil(h.popUndo(windowID: 7))
    }
}

final class TriggerTests: XCTestCase {
    let rightOptionDown: UInt64 = 0x8_0000 | 0x40

    func testTriggerDetection() {
        XCTAssertTrue(TriggerKey.allDown([.rightOption], flags: rightOptionDown))
        XCTAssertFalse(TriggerKey.allDown([.rightOption], flags: 0x8_0000 | 0x20)) // left option only
        XCTAssertFalse(TriggerKey.allDown([], flags: rightOptionDown))
    }

    func testExtraModifiers() {
        XCTAssertEqual(TriggerKey.extraModifiers(flags: rightOptionDown, trigger: [.rightOption]), [])
        let withShift = rightOptionDown | 0x2_0000 | 0x2
        XCTAssertEqual(TriggerKey.extraModifiers(flags: withShift, trigger: [.rightOption]), .shift)
        let bothOptions = rightOptionDown | 0x20
        XCTAssertEqual(TriggerKey.extraModifiers(flags: bothOptions, trigger: [.rightOption]), .option)
    }
}

final class CommandTests: XCTestCase {
    func testParsing() {
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://action/maximize")!), .action(.builtin(.maximize)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://action/right-two-thirds")!), .action(.builtin(.rightTwoThirds)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://screen/next")!), .action(.builtin(.nextScreen)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://direction/top-left")!), .direction(.topLeft))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://maximize")!), .action(.builtin(.maximize)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://list/all")!), .list)
        XCTAssertNil(CommandParser.parse(URL(string: "windowmac://action/nope")!))
        XCTAssertNil(CommandParser.parse(URL(string: "https://example.com")!))

        let custom = CustomLayout(name: "Writing Mode", x: 0.2, y: 0, width: 0.6, height: 1)
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://custom/writing-mode")!, customLayouts: [custom]),
                       .action(.custom(custom.id)))
    }

    func testEveryListedCommandParses() {
        for s in CommandParser.allCommands() {
            XCTAssertNotNil(CommandParser.parse(URL(string: s)!), s)
        }
    }

    func testKebab() {
        XCTAssertEqual(CommandParser.kebab("rightTwoThirds"), "right-two-thirds")
        XCTAssertEqual(CommandParser.kebab("macOSCenter"), "macos-center")
    }
}

final class SettingsTests: XCTestCase {
    func testRoundTrip() throws {
        var s = WindowmacSettings()
        s.padding = 12
        s.triggerKeys = [.function, .rightCommand]
        s.customLayouts = [CustomLayout(name: "Focus", x: 0.1, y: 0.1, width: 0.8, height: 0.8)]
        let data = try JSONEncoder().encode(s)
        let back = try JSONDecoder().decode(WindowmacSettings.self, from: data)
        XCTAssertEqual(back, s)
    }

    func testForgivingDecode() throws {
        let json = """
        {"padding": 20, "triggerKeys": ["bogus"], "keybinds": [{"keyCode": 124, "actions": ["rightHalf", "fromTheFuture"]}, {"broken": true}]}
        """
        let s = try JSONDecoder().decode(WindowmacSettings.self, from: Data(json.utf8))
        XCTAssertEqual(s.padding, 20)
        XCTAssertEqual(s.triggerKeys, [.leftOption]) // fell back to default
        XCTAssertEqual(s.keybinds.count, 1 + WindowmacSettings.defaultStripKeybinds.count) // plus the Strip keys, added once
        XCTAssertEqual(s.keybinds[0].actions, [.builtin(.rightHalf)])
        XCTAssertEqual(s.radialActions, WindowmacSettings.defaultRadialActions)
    }

    func testDefaultKeybindsAreUnique() {
        var seen = Set<String>()
        for k in WindowmacSettings.defaultKeybinds {
            XCTAssertTrue(seen.insert("\(k.keyCode)-\(k.modifiers.rawValue)").inserted, k.shortcutLabel)
        }
    }
}

final class StashTests: XCTestCase {
    func testStashGeometry() {
        let screen = CGRect(x: 0, y: 0, width: 1000, height: 800)
        let w = CGRect(x: 300, y: 100, width: 400, height: 300)
        XCTAssertEqual(StashGeometry.hiddenFrame(window: w, screen: screen, side: .right, peek: 10).minX, 990)
        XCTAssertEqual(StashGeometry.hiddenFrame(window: w, screen: screen, side: .left, peek: 10).maxX, 10)
        XCTAssertEqual(StashGeometry.revealedFrame(window: w, screen: screen, side: .right).maxX, 1000)
    }

    func testEdgeNextToAnotherDisplayIsNotFree() {
        let main = CGRect(x: 0, y: 0, width: 1000, height: 800)
        let external = CGRect(x: 1000, y: -200, width: 1920, height: 1080)
        XCTAssertFalse(StashGeometry.edgeIsFree(.right, screen: main, otherScreens: [external]))
        XCTAssertTrue(StashGeometry.edgeIsFree(.left, screen: main, otherScreens: [external]))
    }
}

final class TrialTests: XCTestCase {
    let start = Date(timeIntervalSince1970: 1_800_000_000)
    let day: TimeInterval = 86_400

    func testTrialCountsDown() {
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start, hasEntitlement: false), .trial(daysLeft: 14))
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start + day * 13.5, hasEntitlement: false), .trial(daysLeft: 1))
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start + day * 14, hasEntitlement: false), .expired)
        XCTAssertFalse(LicenseStatus.expired.canUseWindowmac)
    }

    func testLicenseWins() {
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start + day * 100, hasEntitlement: true), .licensed)
    }

    func testClockSetBackDoesNotExtend() {
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start - day * 30, hasEntitlement: false), .trial(daysLeft: 14))
    }

    func testDisabledLicensingIsFree() {
        XCTAssertEqual(TrialPolicy.status(trialStart: start, now: start + day * 100, hasEntitlement: false, licensingEnabled: false), .free)
        XCTAssertTrue(LicenseStatus.free.canUseWindowmac)
    }
}

final class StripTests: XCTestCase {
    let viewport = CGRect(x: 0, y: 25, width: 1200, height: 800)
    let gap: CGFloat = 10

    func strip(_ widths: [Double], focused: Int = 0) -> StripLayout {
        StripLayout(columns: widths.enumerated().map { .init(id: UInt32($0.offset + 1), width: $0.element) }, focused: focused)
    }

    func testTwoHalvesFillTheScreenWithEvenGaps() {
        let s = strip([0.5, 0.5])
        let f = s.frames(viewport: viewport, gap: gap)
        XCTAssertEqual(f[0], CGRect(x: 10, y: 35, width: 585, height: 780))
        XCTAssertEqual(f[1], CGRect(x: 605, y: 35, width: 585, height: 780))
        XCTAssertEqual(s.contentWidth(viewport: viewport, gap: gap), viewport.width)
        XCTAssertEqual(s.maxScroll(viewport: viewport, gap: gap), 0)
    }

    func testFocusingOffScreenColumnScrollsJustEnough() {
        var s = strip([0.5, 0.5, 0.5, 0.5])
        XCTAssertTrue(s.focus(by: 1))
        s.reveal(viewport: viewport, gap: gap)
        XCTAssertEqual(s.scroll, 0) // second column already fully visible
        s.focus(by: 1)
        s.reveal(viewport: viewport, gap: gap)
        let f = s.frames(viewport: viewport, gap: gap)[2]
        XCTAssertEqual(f.maxX, viewport.maxX - gap, accuracy: 0.5)
        XCTAssertFalse(s.focus(by: 5) && s.focused != 3)
        XCTAssertEqual(s.focused, 3)
        XCTAssertFalse(s.focus(by: 1)) // already at the end
    }

    func testScrollingBackLeft() {
        var s = strip([0.5, 0.5, 0.5], focused: 2)
        s.reveal(viewport: viewport, gap: gap)
        XCTAssertGreaterThan(s.scroll, 0)
        s.focus(index: 0)
        s.reveal(viewport: viewport, gap: gap)
        XCTAssertEqual(s.scroll, 0)
    }

    func testMoveColumnKeepsFocusOnIt() {
        var s = strip([0.5, 0.5, 0.5])
        XCTAssertTrue(s.moveFocused(by: 1))
        XCTAssertEqual(s.columns.map(\.id), [2, 1, 3])
        XCTAssertEqual(s.focused, 1)
        XCTAssertFalse(strip([0.5]).focusedID == nil)
        var one = strip([0.5])
        XCTAssertFalse(one.moveFocused(by: -1))
    }

    func testCycleWidthAndFullWidth() {
        var s = strip([0.5])
        s.cycleWidth()
        XCTAssertEqual(s.columns[0].width, 2.0 / 3.0, accuracy: 0.001)
        s.cycleWidth()
        XCTAssertEqual(s.columns[0].width, 1.0 / 3.0, accuracy: 0.001)
        s.toggleFullWidth()
        XCTAssertEqual(s.frames(viewport: viewport, gap: gap)[0].width, viewport.width - 2 * gap)
        s.cycleWidth() // leaves full width first
        XCTAssertFalse(s.columns[0].fullWidth)
        XCTAssertEqual(s.columns[0].width, 1.0 / 3.0, accuracy: 0.001)
    }

    func testWidthRoundTrip() {
        let s = strip([0.4])
        let w = s.width(of: 0, viewport: viewport, gap: gap)
        XCTAssertEqual(StripLayout.fraction(forWidth: w, viewport: viewport, gap: gap), 0.4, accuracy: 0.0001)
        XCTAssertEqual(StripLayout.clampWidth(5), 1)
        XCTAssertEqual(StripLayout.clampWidth(.nan), 0.5)
    }

    func testInsertAndRemove() {
        var s = strip([0.5, 0.5], focused: 0)
        s.insertAfterFocused(.init(id: 9, width: 0.5))
        XCTAssertEqual(s.columns.map(\.id), [1, 9, 2])
        XCTAssertEqual(s.focusedID, 9)
        XCTAssertTrue(s.remove(id: 9))
        XCTAssertEqual(s.focusedID, 1)
        s.focus(index: 1)
        s.remove(id: 2)
        XCTAssertEqual(s.focusedID, 1)
        s.remove(id: 1)
        XCTAssertTrue(s.isEmpty)
        XCTAssertNil(s.focusedID)
        XCTAssertFalse(s.remove(id: 1))
    }

    func testSettleSnapsToAColumnAndFocusesIt() {
        var s = strip([0.5, 0.5, 0.5, 0.5])
        s.scroll(by: 700, viewport: viewport, gap: gap)
        s.settle(viewport: viewport, gap: gap)
        XCTAssertEqual(s.scroll, 595, accuracy: 0.5) // column 2's left edge
        XCTAssertEqual(s.focused, 1)
        XCTAssertGreaterThanOrEqual(s.visibleFraction(of: s.focused, viewport: viewport, gap: gap), 0.99)
    }

    func testScrollIsClamped() {
        var s = strip([0.5, 0.5, 0.5])
        s.scroll(by: -500, viewport: viewport, gap: gap)
        XCTAssertEqual(s.scroll, 0)
        s.scroll(by: 10_000, viewport: viewport, gap: gap)
        XCTAssertEqual(s.scroll, s.maxScroll(viewport: viewport, gap: gap))
    }

    func testParkingOffScreenColumns() {
        let screen = CGRect(x: 0, y: 0, width: 1200, height: 850)
        let onScreen = CGRect(x: 10, y: 35, width: 585, height: 780)
        XCTAssertEqual(StripPlacement.frame(for: onScreen, screen: screen, peek: 8, leftFree: true, rightFree: true, bottomFree: true), onScreen)

        let farRight = CGRect(x: 1800, y: 35, width: 585, height: 780)
        XCTAssertEqual(StripPlacement.frame(for: farRight, screen: screen, peek: 8, leftFree: true, rightFree: true, bottomFree: true).minX, 1192)

        let farLeft = CGRect(x: -900, y: 35, width: 585, height: 780)
        XCTAssertEqual(StripPlacement.frame(for: farLeft, screen: screen, peek: 8, leftFree: true, rightFree: true, bottomFree: true).maxX, 8)

        // Partly visible with nothing beyond the edge: left where it is.
        let partly = CGRect(x: 1000, y: 35, width: 585, height: 780)
        XCTAssertEqual(StripPlacement.frame(for: partly, screen: screen, peek: 8, leftFree: true, rightFree: true, bottomFree: true), partly)

        // Another display on the right: hang it below the screen instead.
        let parked = StripPlacement.frame(for: partly, screen: screen, peek: 8, leftFree: true, rightFree: false, bottomFree: true)
        XCTAssertEqual(parked.minY, 842)
        XCTAssertLessThanOrEqual(parked.maxX, screen.maxX)
    }

    func testBottomIsFree() {
        let main = CGRect(x: 0, y: 0, width: 1440, height: 900)
        XCTAssertTrue(StripPlacement.bottomIsFree(screen: main, otherScreens: [main, CGRect(x: 1440, y: 0, width: 1920, height: 1080)]))
        XCTAssertFalse(StripPlacement.bottomIsFree(screen: main, otherScreens: [CGRect(x: 0, y: 900, width: 1920, height: 1080)]))
    }
}

final class StripSettingsTests: XCTestCase {
    func testStripActionsAreImmediateAndListed() {
        XCTAssertTrue(WindowAction.stripFocusRight.isImmediate)
        XCTAssertFalse(WindowAction.leftHalf.isImmediate)
        XCTAssertEqual(ActionCategory.strip.actions.count, 11)
    }

    func testDefaultStripKeysDontClash() {
        let combos = WindowmacSettings.defaultKeybinds.map { "\($0.keyCode)-\($0.modifiers.rawValue)" }
        XCTAssertEqual(combos.count, Set(combos).count)
        XCTAssertEqual(WindowmacSettings().shortcut(for: .stripToggle), "S")
        XCTAssertEqual(WindowmacSettings().shortcut(for: .stripMoveRight), "⇧D")
    }

    func testOldSetupsGetStripKeysWithoutOverwritingTheirs() throws {
        // A pre-Strip setup where the user bound A to Maximize.
        let json = #"{"keybinds":[{"keyCode":0,"modifiers":0,"actions":["maximize"]}]}"#
        let s = try JSONDecoder().decode(WindowmacSettings.self, from: Data(json.utf8))
        XCTAssertEqual(s.keybind(keyCode: 0, modifiers: [])?.actions, [.builtin(.maximize)])
        XCTAssertEqual(s.keybind(keyCode: 2, modifiers: [])?.actions, [.builtin(.stripFocusRight)])
        XCTAssertEqual(s.keybind(keyCode: 1, modifiers: [])?.actions, [.builtin(.stripToggle)])

        // Once saved, deleting a strip key sticks.
        var saved = s
        saved.keybinds.removeAll { $0.keyCode == 1 }
        let again = try JSONDecoder().decode(WindowmacSettings.self, from: JSONEncoder().encode(saved))
        XCTAssertNil(again.keybind(keyCode: 1, modifiers: []))
    }

    func testStripURLs() {
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://strip/toggle")!), .action(.builtin(.stripToggle)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://strip/move-left")!), .action(.builtin(.stripMoveLeft)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://strip/centre")!), .action(.builtin(.stripCenter)))
        XCTAssertEqual(CommandParser.parse(URL(string: "windowmac://action/strip-focus-right")!), .action(.builtin(.stripFocusRight)))
        for url in CommandParser.allCommands() {
            XCTAssertNotNil(CommandParser.parse(URL(string: url)!), url)
        }
    }
}
