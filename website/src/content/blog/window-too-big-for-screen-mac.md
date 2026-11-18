---
title: "How to Fix a Window That Is Too Big for the Screen on a Mac"
slug: window-too-big-for-screen-mac
description: "When a Mac window is taller or wider than your screen and you cannot reach its edges or buttons, here is how to shrink it back with Fill, tiling shortcuts, the Window menu or a different resolution."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
  - how-to
primaryApp: windowmac
feature: tools/window-size-calculator
faq:
  - question: "How do I resize a window that is bigger than my Mac screen?"
    answer: "Make the app active and choose Window, Fill, or press Fn-Control-F on macOS Sequoia 15 or later. The window shrinks to fit the desktop, and you can then drag its edges to any size."
  - question: "Why is the window too big after I unplugged my monitor?"
    answer: "The app remembers the size it had on the larger monitor. On the smaller laptop screen that size no longer fits. Fill or tile the window once and it will fit again."
  - question: "Why can't I make the window smaller?"
    answer: "Some apps set a minimum window size. If the minimum is larger than your screen at its current resolution, the only fix is a resolution with more space in Displays settings."
  - question: "Can I see how big my screen is in points?"
    answer: "Open System Settings, Displays and read the size the display looks like. That is the space windows have, minus the menu bar and Dock."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Change your display's resolution on Mac"
    url: "https://support.apple.com/guide/mac-help/change-your-displays-resolution-mchl86d72b76/mac"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
seoTitle: "Mac Window Too Big for the Screen? How to Fix It"
seoDescription: "Shrink a Mac window that is bigger than the screen: Window > Fill, Fn-Control tiling keys, a title bar double-click, or a resolution with more space."
draft: true
---
If a window is too big for your Mac's screen, make its app active and choose **Window → Fill** from the menu bar, or press **Fn-Control-F** on macOS Sequoia 15 or later. macOS resizes the window to fit the desktop, with the menu bar and Dock still visible, and you can then drag its edges to whatever size you want. A tiling shortcut such as **Fn-Control-Left Arrow** works too.

This usually happens after you unplug a large monitor, change the resolution, or open an app that remembers an old size. Here is how to fix it in each case.

## Why is my window bigger than the screen?

- **You moved from a bigger display.** An app sized for a 27-inch monitor reopens at that size on a 13-inch laptop.
- **You changed resolution.** Choosing a larger text size in Displays makes the desktop smaller in points, so existing windows no longer fit. Apple notes that at some scaled resolutions, some app windows may not fit entirely on the screen.
- **The app has a large minimum size.** Some apps refuse to shrink below a certain width or height.
- **The window was dragged up under the menu bar**, so its top edge, and the buttons, are out of reach.

## How do I shrink the window with the menu?

1. Click the app's icon in the Dock, or use <kbd>Command</kbd>-<kbd>Tab</kbd>, so its menus show in the menu bar.
2. Choose **Window → Fill** to fit it to the screen.
3. Or choose **Window → Move & Resize → Halves** and pick a half.

Both work even when you cannot see the window's title bar or corners.

## How do I shrink it with the keyboard?

On macOS Sequoia 15 or later, with the app active:

| Shortcut | Result |
| --- | --- |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd> | Fill the screen exactly |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> or <kbd>→</kbd> | Left or right half |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd> | Centre, at its current size |

Centring alone will not help, because it keeps the size. Fill or a half is what fixes an oversized window. All the shortcuts are in our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/).

## What if I am on macOS Ventura or Sonoma?

Without tiling, try these:

- **Double-click the title bar**, if it is visible. Depending on the setting in **Desktop & Dock**, this zooms or fills the window.
- **Option-click the green button**, which Apple's guide for these versions says maximises the window instead of entering full screen.
- **Use a window manager.** [Windowmac](/) runs on macOS 13 or later; hold Option and press Return to maximise the active window, or an arrow key for a half. It works on the active window even when its edges are off the screen.

## What if the window still will not fit?

If Fill leaves part of the window off-screen, the app's minimum size is bigger than your desktop. Options:

1. Choose a resolution with more space in **System Settings → Displays**. A smaller text size gives a bigger desktop.
2. Hide the Dock, which frees up its height for windows. See [auto-hiding the Dock](/blog/auto-hide-dock-mac/).
3. Use the app on a larger external display.

The [window size calculator](/tools/window-size-calculator/) shows the exact usable space on your display, with or without the Dock, so you can check whether an app's minimum size will fit before changing settings.

## How do I stop it happening again?

- Before unplugging a monitor, put frequently used windows into a layout on the laptop screen, or quit apps there so they remember a laptop-sized window.
- Move windows between screens by layout instead of size. A window manager that sends a window to the next screen as, say, the left half, sizes it for the new screen automatically; Windowmac does this with Option-].
- If a window has disappeared completely rather than being too big, see [how to get a window back when it is off-screen](/blog/window-off-screen-mac/).

## Quick fixes

| Problem | Fix |
| --- | --- |
| Window too tall, bottom hidden | Window → Fill or Fn-Control-F |
| Title bar under the menu bar | Window → Fill, then drag it down |
| Too big after unplugging a monitor | Fill or tile once on the laptop screen |
| Still too big after Fill | More space in Displays, or hide the Dock |
| macOS 13 or 14 | Option-click green, or a window manager |
