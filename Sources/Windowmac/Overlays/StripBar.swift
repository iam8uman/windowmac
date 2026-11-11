import AppKit
import SwiftUI
import WindowmacCore

/// The strip bar: a frosted row of app icons at the bottom of the screen, one per column, with
/// the focused column highlighted and a hint line of keys. It shows while the trigger is held
/// over a strip and briefly after each strip action. Tiles can be clicked while the trigger is held.
final class StripBarModel: ObservableObject {
    struct Tile: Identifiable, Equatable {
        let id: UInt32
        let icon: NSImage?
        let name: String
        /// How much of this column is on screen, 0...1.
        let visible: CGFloat
    }

    struct Hint: Equatable {
        let keys: String
        let label: String
    }

    struct Snapshot: Equatable {
        var tiles: [Tile] = []
        var focused = 0
        var hints: [Hint] = []
    }

    @Published var snapshot = Snapshot()
    @Published var accent = Color(nsColor: .controlAccentColor)
}

enum StripBarMetrics {
    static let tile: CGFloat = 40
    static let spacing: CGFloat = 8
    static let padding: CGFloat = 12
    static let hintHeight: CGFloat = 22
    static let bottomMargin: CGFloat = 14
    static let maxTiles = 14

    static func size(tiles: Int, showHints: Bool) -> CGSize {
        let n = CGFloat(max(1, min(tiles, maxTiles)))
        let tilesWidth = n * tile + (n - 1) * spacing
        let width = max(tilesWidth, showHints ? 420 : 0) + padding * 2
        let height = tile + padding * 2 + (showHints ? hintHeight : 0)
        return CGSize(width: width, height: height)
    }
}

struct StripBarView: View {
    @ObservedObject var model: StripBarModel

    var body: some View {
        let snap = model.snapshot
        let m = StripBarMetrics.self
        VStack(spacing: 0) {
            HStack(spacing: m.spacing) {
                ForEach(Array(snap.tiles.prefix(m.maxTiles).enumerated()), id: \.element.id) { index, tile in
                    tileView(tile, focused: index == snap.focused)
                }
            }
            .frame(height: m.tile)
            if !snap.hints.isEmpty {
                HStack(spacing: 10) {
                    ForEach(Array(snap.hints.enumerated()), id: \.offset) { _, hint in
                        HStack(spacing: 3) {
                            Text(hint.keys)
                                .font(.system(size: 10, weight: .semibold, design: .rounded))
                                .padding(.horizontal, 4)
                                .padding(.vertical, 1)
                                .background(RoundedRectangle(cornerRadius: 4).fill(.primary.opacity(0.1)))
                            if !hint.label.isEmpty {
                                Text(hint.label).font(.system(size: 10))
                            }
                        }
                    }
                }
                .foregroundStyle(.secondary)
                .lineLimit(1)
                .frame(height: m.hintHeight, alignment: .bottom)
            }
        }
        .padding(m.padding)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous).strokeBorder(.primary.opacity(0.1)))
    }

    private func tileView(_ tile: StripBarModel.Tile, focused: Bool) -> some View {
        let size = StripBarMetrics.tile
        return ZStack {
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .fill(focused ? model.accent.opacity(0.25) : Color.primary.opacity(0.06))
            if let icon = tile.icon {
                Image(nsImage: icon).resizable().interpolation(.high).frame(width: size - 10, height: size - 10)
            } else {
                Image(systemName: "macwindow").font(.system(size: 18))
            }
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .strokeBorder(model.accent, lineWidth: focused ? 2.5 : 0)
        }
        .frame(width: size, height: size)
        // Columns scrolled off screen are dimmed.
        .opacity(0.45 + 0.55 * Double(max(tile.visible, focused ? 1 : 0)))
        .help(tile.name)
    }
}

final class StripBarController {
    let model = StripBarModel()
    private lazy var panel = OverlayPanel(level: .statusBar, content: StripBarView(model: model))
    private var hideTimer: Timer?
    private var sticky = false
    private(set) var screen: ScreenInfo?

    var isVisible: Bool { panel.isVisible }

    /// `sticky` keeps it up until `hide(after:)`; otherwise it fades out on its own.
    func show(_ snapshot: StripBarModel.Snapshot, on info: ScreenInfo, sticky: Bool = false) {
        if sticky { self.sticky = true }
        model.accent = Color(nsColor: .controlAccentColor)
        model.snapshot = snapshot
        screen = info
        panel.setFrame(frame(for: snapshot, on: info), display: true)
        hideTimer?.invalidate()
        if !panel.isVisible {
            panel.alphaValue = 0
            panel.orderFrontRegardless()
        }
        NSAnimationContext.runAnimationGroup { ctx in
            ctx.duration = 0.12
            self.panel.animator().alphaValue = 1
        }
        if !self.sticky { scheduleHide(after: 1.4) }
    }

    func hide(after delay: TimeInterval = 0) {
        sticky = false
        scheduleHide(after: delay)
    }

    private func scheduleHide(after delay: TimeInterval) {
        hideTimer?.invalidate()
        let t = Timer(timeInterval: delay, repeats: false) { [weak self] _ in
            guard let self, !self.sticky else { return }
            NSAnimationContext.runAnimationGroup({ ctx in
                ctx.duration = 0.2
                self.panel.animator().alphaValue = 0
            }, completionHandler: {
                if self.panel.alphaValue == 0 { self.panel.orderOut(nil) }
            })
        }
        RunLoop.main.add(t, forMode: .common)
        hideTimer = t
    }

    /// AppKit frame: centred at the bottom of the usable area (above the Dock).
    private func frame(for snapshot: StripBarModel.Snapshot, on info: ScreenInfo) -> NSRect {
        let size = StripBarMetrics.size(tiles: snapshot.tiles.count, showHints: !snapshot.hints.isEmpty)
        let r = CGRect(x: info.visible.midX - size.width / 2,
                       y: info.visible.maxY - size.height - StripBarMetrics.bottomMargin,
                       width: size.width, height: size.height)
        return Screens.toAppKit(r)
    }

    /// Which tile is under `point` (screen space), if the bar is showing.
    func tileIndex(at point: CGPoint) -> Int? {
        guard panel.isVisible, panel.alphaValue > 0.5 else { return nil }
        let bar = Screens.toScreenSpace(panel.frame)
        guard bar.contains(point) else { return nil }
        let m = StripBarMetrics.self
        let count = min(model.snapshot.tiles.count, m.maxTiles)
        let tilesWidth = CGFloat(count) * m.tile + CGFloat(max(0, count - 1)) * m.spacing
        let startX = bar.midX - tilesWidth / 2
        let y = bar.minY + m.padding
        for i in 0..<count {
            let tile = CGRect(x: startX + CGFloat(i) * (m.tile + m.spacing), y: y, width: m.tile, height: m.tile)
            if tile.insetBy(dx: -m.spacing / 2, dy: -m.padding).contains(point) { return i }
        }
        return nil
    }

    /// The bar swallows clicks on its padding too, so they don't land on the window behind.
    func contains(_ point: CGPoint) -> Bool {
        panel.isVisible && panel.alphaValue > 0.5 && Screens.toScreenSpace(panel.frame).contains(point)
    }
}
