import Foundation
#if canImport(CoreGraphics)
import CoreGraphics
#endif

/// Strip mode: the windows on a screen sit side by side as columns on one horizontal strip that
/// can be wider than the screen. Focusing a column scrolls the strip so it's in view.
///
/// This is the pure model: column order, widths, focus and scroll offset, and the geometry that
/// turns them into window frames. The app applies those frames through Accessibility.
public struct StripLayout: Equatable, Sendable {
    public struct Column: Equatable, Sendable {
        public var id: UInt32
        /// Fraction of the usable screen width (gaps included), 0.2...1.
        public var width: Double
        public var fullWidth: Bool

        public init(id: UInt32, width: Double, fullWidth: Bool = false) {
            self.id = id
            self.width = StripLayout.clampWidth(width)
            self.fullWidth = fullWidth
        }
    }

    /// Steps for Cycle Width.
    public static let widthPresets: [Double] = [1.0 / 3.0, 0.5, 2.0 / 3.0]
    public static let minWidth = 0.2

    public var columns: [Column]
    public var focused: Int
    /// How far the strip has scrolled, in points. 0 shows the first column at the left edge.
    public var scroll: CGFloat

    public init(columns: [Column] = [], focused: Int = 0, scroll: CGFloat = 0) {
        self.columns = columns
        self.focused = columns.isEmpty ? 0 : min(max(focused, 0), columns.count - 1)
        self.scroll = scroll
    }

    public static func clampWidth(_ w: Double) -> Double {
        min(max(w.isFinite ? w : 0.5, minWidth), 1)
    }

    public var isEmpty: Bool { columns.isEmpty }
    public var focusedID: UInt32? { columns.indices.contains(focused) ? columns[focused].id : nil }

    public func index(of id: UInt32) -> Int? {
        columns.firstIndex { $0.id == id }
    }

    // MARK: - Geometry

    /// Width in points. A fraction f of the screen fits exactly with gaps on both sides:
    /// two halves (or three thirds) fill the screen with even gaps.
    public func width(of i: Int, viewport: CGRect, gap: CGFloat) -> CGFloat {
        let c = columns[i]
        if c.fullWidth { return max(1, viewport.width - 2 * gap) }
        return max(1, CGFloat(c.width) * (viewport.width - gap) - gap)
    }

    /// Left edge of column `i` on the strip, before scrolling.
    public func left(of i: Int, viewport: CGRect, gap: CGFloat) -> CGFloat {
        var x = gap
        for j in 0..<i { x += width(of: j, viewport: viewport, gap: gap) + gap }
        return x
    }

    public func contentWidth(viewport: CGRect, gap: CGFloat) -> CGFloat {
        columns.isEmpty ? 0 : left(of: columns.count, viewport: viewport, gap: gap)
    }

    public func maxScroll(viewport: CGRect, gap: CGFloat) -> CGFloat {
        max(0, contentWidth(viewport: viewport, gap: gap) - viewport.width)
    }

    /// Where each column's window goes, in screen space. Frames can be off screen: the app parks those.
    public func frames(viewport: CGRect, gap: CGFloat) -> [CGRect] {
        var out: [CGRect] = []
        var x = gap
        for i in columns.indices {
            let w = width(of: i, viewport: viewport, gap: gap)
            out.append(CGRect(x: viewport.minX + x - scroll, y: viewport.minY + gap,
                              width: w, height: max(1, viewport.height - 2 * gap)).pixelAligned)
            x += w + gap
        }
        return out
    }

    /// How much of column `i` is on screen, 0...1.
    public func visibleFraction(of i: Int, viewport: CGRect, gap: CGFloat) -> CGFloat {
        let l = left(of: i, viewport: viewport, gap: gap) - scroll
        let w = width(of: i, viewport: viewport, gap: gap)
        let shown = min(l + w, viewport.width) - max(l, 0)
        return max(0, min(1, shown / w))
    }

    // MARK: - Scrolling

    public mutating func clampScroll(viewport: CGRect, gap: CGFloat) {
        scroll = min(max(scroll, 0), maxScroll(viewport: viewport, gap: gap))
    }

    /// Scrolls the least amount that shows the focused column in full (or centres it).
    public mutating func reveal(viewport: CGRect, gap: CGFloat, center: Bool = false) {
        guard columns.indices.contains(focused) else { return }
        let l = left(of: focused, viewport: viewport, gap: gap)
        let w = width(of: focused, viewport: viewport, gap: gap)
        if center {
            scroll = l + w / 2 - viewport.width / 2
        } else if l - gap < scroll {
            scroll = l - gap
        } else if l + w + gap > scroll + viewport.width {
            scroll = l + w + gap - viewport.width
        }
        clampScroll(viewport: viewport, gap: gap)
    }

    /// Centre the focused column, even at the ends of the strip.
    public mutating func centerFocused(viewport: CGRect, gap: CGFloat) {
        guard columns.indices.contains(focused) else { return }
        let l = left(of: focused, viewport: viewport, gap: gap)
        let w = width(of: focused, viewport: viewport, gap: gap)
        scroll = l + w / 2 - viewport.width / 2
    }

    public mutating func scroll(by delta: CGFloat, viewport: CGRect, gap: CGFloat) {
        scroll += delta
        clampScroll(viewport: viewport, gap: gap)
    }

    /// After free scrolling: snap to the nearest column edge and focus the column most in view.
    public mutating func settle(viewport: CGRect, gap: CGFloat) {
        guard !columns.isEmpty else { return }
        let edges = columns.indices.map { left(of: $0, viewport: viewport, gap: gap) - gap }
            + [contentWidth(viewport: viewport, gap: gap) - viewport.width]
        if let nearest = edges.min(by: { abs($0 - scroll) < abs($1 - scroll) }) { scroll = nearest }
        clampScroll(viewport: viewport, gap: gap)
        if visibleFraction(of: focused, viewport: viewport, gap: gap) < 0.99 {
            focused = columns.indices.max {
                visibleFraction(of: $0, viewport: viewport, gap: gap) < visibleFraction(of: $1, viewport: viewport, gap: gap)
            } ?? focused
            reveal(viewport: viewport, gap: gap)
        }
    }

    // MARK: - Editing

    @discardableResult
    public mutating func focus(by delta: Int) -> Bool {
        let next = min(max(focused + delta, 0), columns.count - 1)
        guard !columns.isEmpty, next != focused else { return false }
        focused = next
        return true
    }

    @discardableResult
    public mutating func focus(index: Int) -> Bool {
        guard columns.indices.contains(index), index != focused else { return false }
        focused = index
        return true
    }

    @discardableResult
    public mutating func moveFocused(by delta: Int) -> Bool {
        let next = min(max(focused + delta, 0), columns.count - 1)
        guard !columns.isEmpty, next != focused else { return false }
        columns.swapAt(focused, next)
        focused = next
        return true
    }

    /// ⅓ → ½ → ⅔ → ⅓ … (leaving full width first if it's on).
    public mutating func cycleWidth() {
        guard columns.indices.contains(focused) else { return }
        var c = columns[focused]
        if c.fullWidth {
            c.fullWidth = false
        } else {
            let presets = Self.widthPresets
            c.width = presets.first { $0 > c.width + 0.02 } ?? presets[0]
        }
        columns[focused] = c
    }

    public mutating func toggleFullWidth() {
        guard columns.indices.contains(focused) else { return }
        columns[focused].fullWidth.toggle()
    }

    public mutating func setWidth(_ width: Double, of i: Int) {
        guard columns.indices.contains(i) else { return }
        columns[i].width = Self.clampWidth(width)
        columns[i].fullWidth = false
    }

    /// Fraction of the screen that a window `points` wide takes up (inverse of `width(of:)`).
    public static func fraction(forWidth points: CGFloat, viewport: CGRect, gap: CGFloat) -> Double {
        guard viewport.width - gap > 0 else { return 0.5 }
        return clampWidth(Double((points + gap) / (viewport.width - gap)))
    }

    /// New windows open to the right of the focused one and take focus.
    public mutating func insertAfterFocused(_ column: Column) {
        let at = columns.isEmpty ? 0 : focused + 1
        columns.insert(column, at: at)
        focused = at
    }

    @discardableResult
    public mutating func remove(id: UInt32) -> Bool {
        guard let i = index(of: id) else { return false }
        columns.remove(at: i)
        // Closing the focused column focuses its left neighbour (usually the window it was opened from).
        if i <= focused { focused = max(0, focused - 1) }
        focused = min(focused, max(0, columns.count - 1))
        return true
    }
}

/// Where a strip window really goes. On-screen frames are used as is. Columns scrolled off the
/// screen are parked against the edge with a sliver showing (like Stash), so they never spill
/// onto a neighbouring display. If that edge touches another display they hang below the screen.
public enum StripPlacement {
    public static func frame(for target: CGRect, screen: CGRect, peek: CGFloat,
                             leftFree: Bool, rightFree: Bool, bottomFree: Bool) -> CGRect {
        let peek = max(1, peek)
        let spillsLeft = target.minX < screen.minX - 1
        let spillsRight = target.maxX > screen.maxX + 1
        guard spillsLeft || spillsRight else { return target }

        let visible = min(target.maxX, screen.maxX) - max(target.minX, screen.minX)
        // Partly in view, and the edge it pokes past has no display behind it: leave it there.
        if visible >= peek, (spillsLeft ? leftFree : rightFree), !(spillsLeft && spillsRight) {
            return target
        }
        var r = target
        if spillsLeft && leftFree && target.midX < screen.midX {
            r.origin.x = screen.minX - r.width + peek
        } else if spillsRight && rightFree && target.midX >= screen.midX {
            r.origin.x = screen.maxX - peek
        } else if bottomFree {
            r.origin.x = min(max(r.minX, screen.minX), screen.maxX - r.width)
            r.origin.y = screen.maxY - peek
        } else {
            r.origin.x = target.midX < screen.midX ? screen.minX - r.width + peek : screen.maxX - peek
        }
        return r.pixelAligned
    }

    public static func bottomIsFree(screen: CGRect, otherScreens: [CGRect]) -> Bool {
        for o in otherScreens where o != screen {
            let horizontalOverlap = min(o.maxX, screen.maxX) - max(o.minX, screen.minX) > 0
            if horizontalOverlap, abs(o.minY - screen.maxY) < 2 { return false }
        }
        return true
    }
}
