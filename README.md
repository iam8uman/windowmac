<p align="center">
  <img src="Resources/AppIcon.png" width="128" alt="Windowmac icon">
</p>

<h1 align="center">Windowmac</h1>

<p align="center"><b>Flick windows into place.</b><br>
Hold Option, flick the mouse toward where a window should go, and let go.</p>

<p align="center">
  <a href="https://github.com/iam8uman/windowmac/releases/latest/download/Windowmac.zip"><b>Download for macOS</b></a> ·
  <a href="https://windowmac.vercel.app">Website</a> ·
  <a href="https://windowmac.vercel.app/#install">Install guide</a><br>
  macOS 13+ · Apple silicon &amp; Intel · Free &amp; open source (MIT)
</p>

<p align="center">
  <img src="docs/demo.gif" width="880" alt="Windowmac demo: holding Option shows a ring at the cursor; flicking toward a direction snaps the window to that half, third or quarter.">
</p>
<p align="center"><sub>Same demo as on the <a href="https://windowmac.vercel.app">website</a>, where you can try it yourself. <a href="docs/demo.mp4">MP4 version</a>.</sub></p>

---

## Features

- **Radial menu.** Hold the trigger key (Left ⌥ by default) and move the cursor in a direction. Release to snap the window there. It works without looking, and a ring at the cursor shows what you'll get.
- **Live preview.** An outline shows exactly where the window will land before you commit.
- **Keyboard shortcuts.** Hold the trigger and press a key: ← → ↑ ↓ for halves, ↩ to maximize, C to centre, 1–4 for quarters, [ ] to change screens, and more. Every key can be rebound.
- **Cycles.** Press the same key again, or click while holding the trigger, to step through a direction: Right Half → Right Third → Right Two Thirds.
- **Stash.** Tuck a window behind the screen edge, leaving a sliver. Push the cursor against the edge to slide it out.
- **Every layout you'd expect:**
  - Maximize, Almost Maximize, Fullscreen, Centre, macOS Centre
  - Halves, quarters, horizontal and vertical thirds
  - Next, previous, left, right, top and bottom screen
  - Larger, Smaller, Grow and Shrink each edge, Move
  - Undo, Initial Frame, and your own **custom layouts**
- **Theming.** Change the radial menu's size, thickness, shape (circle or rounded square) and colour, and the preview's padding, corners, border and fill. It follows your macOS accent colour by default.
- **Automation** with the `windowmac://` URL scheme. It works from Terminal, Shortcuts, Raycast, Alfred and BetterTouchTool.
- Smooth animations, gaps between windows, haptic feedback, ignored apps, launch at login, and import/export of settings.
- **Private.** It needs only the Accessibility permission. There's no account, no network and no telemetry.

## Install

**Quickest:** paste this in Terminal. It downloads the latest release, puts Windowmac in Applications and opens it, with no security popup:

```bash
curl -fsSL https://windowmac.vercel.app/install.sh | bash
```

**Or download it:**

1. [Download Windowmac.zip](https://github.com/iam8uman/windowmac/releases/latest/download/Windowmac.zip), unzip it, and drag **Windowmac** into **Applications**.
2. Open it. macOS says *"Windowmac.app" Not Opened*. Click **Done**. (Windowmac isn't notarized by Apple yet.)
3. Open **System Settings → Privacy & Security**, scroll down, and click **Open Anyway** next to Windowmac. Confirm with your password and click **Open Anyway** again. On macOS 13–14 you can instead right-click Windowmac → **Open**.
4. Allow **Accessibility** when asked (System Settings → Privacy & Security → Accessibility → Windowmac).
5. Hold **Left ⌥ (Option)** and flick the mouse. 🎉

The [website](https://windowmac.vercel.app/#install) shows each of these screens.

## Default controls

| While holding the trigger | Does |
|---|---|
| Move the cursor | Pick a direction on the ring |
| Click | Next step in the cycle |
| Release | Apply |
| Esc / right-click | Cancel |
| ← → ↑ ↓ | Halves → thirds → two-thirds (cycle) |
| ⇧ + arrows | Move the window |
| ↩ | Maximize → Almost Maximize |
| C | Centre → macOS Centre |
| F | Fullscreen |
| T | Centre third |
| 1 2 3 4 | Quarters |
| [ ] | Previous / next screen |
| = − | Larger / smaller |
| , . / | Stash left / stash right / unstash |
| Z / I | Undo / initial frame |
| M / H | Minimize / hide app |

Typing normally while holding the trigger is never blocked. Keys that aren't Windowmac shortcuts pass straight through.

## Automation

```bash
open -g "windowmac://action/maximize"
open -g "windowmac://action/right-two-thirds"
open -g "windowmac://screen/next"
open -g "windowmac://direction/top-left"     # whatever that direction does on your ring
open -g "windowmac://custom/Writing%20Mode"  # your own layout
open -g "windowmac://stash/right"

# chain them
open -g "windowmac://action/left-half" && sleep 0.3 && open -g "windowmac://screen/next"

# list everything
/Applications/Windowmac.app/Contents/MacOS/Windowmac --list
```

## Build from source

You need Xcode 15 or later on macOS 13 or later.

```bash
git clone https://github.com/iam8uman/windowmac.git
cd windowmac
swift test                    # core logic tests
./scripts/build-app.sh        # → build/Windowmac.app
open build/Windowmac.app
```

To develop in Xcode, run `open Package.swift`. URL schemes and launch at login need the bundled app from `build-app.sh`.

Releases are automatic. Bump `CFBundleShortVersionString` in `Resources/Info.plist` and push to `main`, and GitHub Actions tests, builds and smoke-tests a universal `Windowmac.zip`, then publishes it as release `v<version>`. Pushing a `v*` tag does the same.

The product requirements, design decisions and roadmap are in [docs/PRD.md](docs/PRD.md).

### Licensing (RevenueCat)

Windowmac uses RevenueCat for a 14-day free trial and a one-time lifetime license (entitlement `swoop_pro`, product `swoop_lifetime`, offering `default`).

- **Debug builds** (`swift run`) use the RevenueCat **Test Store**, so purchases are simulated. `WINDOWMAC_TRIAL_EXPIRED=1 swift run` shows the "trial ended" screen immediately.
- **Release builds** stay free until `RevenueCatAPIKey` (a production public key) and `RevenueCatWebPurchaseURL` (a RevenueCat Web Purchase Link) are set in `Resources/Info.plist`. Test Store keys are ignored in release builds, because RevenueCat crashes release builds that contain one.

### Project layout

```
Sources/WindowmacCore   Pure logic: actions, geometry, radial math, cycles, settings, URL commands (unit-tested)
Sources/Windowmac       The app: Accessibility, trigger key event tap, radial menu, preview, stash, settings UI
website/            Landing page (static, deployed on Vercel)
```

## FAQ

**Why does it need Accessibility?** macOS only lets apps move other apps' windows through the Accessibility API. Windowmac uses it for that and nothing else.

**Do I have to grant permission again after updating?** Yes, once. Builds aren't signed with a Developer ID yet, so macOS treats each update as a new app. Windowmac (and the one-line installer) clears the old entry so macOS asks again; just turn Windowmac back on. If it ever stops responding, choose **Fix Accessibility Permission…** from the menu bar icon, or run `tccutil reset Accessibility com.iam8uman.windowmac` and reopen Windowmac.

**Can I use Caps Lock as the trigger?** Remap Caps Lock to Control in System Settings → Keyboard → Modifier Keys, then choose Right Control in Windowmac. You can also use Hyperkey or Karabiner-Elements.

## License

MIT © 2026 Suman Sharma ([@iam8uman](https://github.com/iam8uman)). Inspired by radial window managers like [Loop](https://github.com/MrKai77/Loop). Windowmac is an independent implementation with no shared code.
