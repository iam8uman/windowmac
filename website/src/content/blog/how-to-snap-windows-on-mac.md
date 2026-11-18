---
title: "How to Snap Windows on a Mac"
slug: how-to-snap-windows-on-mac
description: "Snap windows to the edges, corners and halves of your Mac screen by dragging, with a keyboard shortcut, or with one flick. What works on each macOS version and how to fix snapping that won't trigger."
publishedAt: 2026-11-17
type: how-to
tags:
  - how-to
  - macos-features
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "Does a Mac snap windows like Windows does?"
    answer: "Yes, since macOS Sequoia 15. Drag a window to the left or right edge, a corner or the menu bar and it snaps into that area. On older versions you need a window manager app to get snapping."
  - question: "How do I snap a window to a quarter of the screen?"
    answer: "Drag the window by its title bar into a corner of the screen and release when the highlight appears. There is no built-in keyboard shortcut for quarters, but window managers such as Windowmac have one."
  - question: "Why do my windows snap when I don't want them to?"
    answer: "Edge snapping is on by default. Open System Settings, Desktop & Dock, and in the Windows section turn off the switches for dragging windows to the screen edges and menu bar."
  - question: "Can I snap windows without dragging all the way to the edge?"
    answer: "Hold Option while you drag and macOS shows the snap areas sooner. A gesture window manager goes further: in Windowmac you hold Option and nudge the mouse a short way in any direction."
  - question: "How do I make windows snap with gaps between them?"
    answer: "Turn on Tiled windows have margins in the Windows section of Desktop & Dock settings. Window managers usually have their own gap setting too."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
  - title: "Apple Newsroom: macOS Sequoia (window tiling)"
    url: "https://www.apple.com/newsroom/2024/06/macos-sequoia-takes-productivity-and-intelligence-on-mac-to-new-heights/"
seoTitle: "How to Snap Windows on Mac (Drag, Keys or One Flick)"
seoDescription: "Snap Mac windows to halves, quarters or the full desktop by dragging to an edge, with Fn-Control shortcuts or a free gesture app. Plus fixes when it fails."
draft: false
---
To snap a window on a Mac, drag it by its title bar to the left or right edge of the screen, a corner, or the menu bar, and let go when a highlighted area appears. The window fills that half, quarter or the whole desktop. This built-in snapping arrived in macOS Sequoia 15; on older versions, or if you want snapping without aiming at an edge, use a window manager.

Snapping is the quick, one-window version of arranging your screen. If you want two apps side by side in one go, our guide on [how to split screen on a Mac](/blog/how-to-split-screen-on-mac/) covers that in detail. Here the focus is getting any single window into place fast.

## Where can I snap a window on a Mac?

macOS calls snapping "tiling". When you drag a window, these are the drop zones:

| Drag the window to | It snaps to |
| --- | --- |
| Left edge | Left half |
| Right edge | Right half |
| Any corner | That quarter of the screen |
| The menu bar | Fills the desktop (not full screen) |

The window keeps the menu bar and Dock visible, unlike full screen, so you can still see everything else on your desktop. Apple also notes that dragging a window near another one lines it up next to it without overlapping, and dragging a shared edge stops when it meets the neighbour's edge. That is a softer kind of snapping that works anywhere on screen.

## How do I snap a window by dragging?

1. Point at the window's title bar (the strip across the top) and hold down the mouse or trackpad.
2. Drag toward an edge, a corner or the menu bar.
3. Wait for the highlighted outline to appear, then let go.

Two tips make this faster:

- **Hold Option while dragging.** The highlight appears as soon as you head toward an edge, so you do not have to push all the way into it.
- **Use the green button instead.** Hover over the green button in the window's top-left corner and pick a layout under **Move & Resize**. The same options are under **Window → Move & Resize** in the menu bar, which helps when the title bar is hard to reach.

## Can I snap windows with the keyboard?

Yes, on macOS Sequoia 15 or later. The core shortcuts are <kbd>Fn</kbd>-<kbd>Control</kbd> plus an arrow key for halves, <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd> to fill the desktop and <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd> to centre. Apple's list has no shortcut for the quarters, which you can only reach by dragging, the green button or the Window menu.

Our [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/) guide lists every one, including the multi-window arrangements and how to change the keys.

## Why won't my Mac snap windows?

If dragging to an edge does nothing, check these in order:

1. **Your macOS version.** Choose **Apple menu → About This Mac**. Snapping by dragging needs macOS Sequoia 15 or later.
2. **The tiling switches.** Open **System Settings → Desktop & Dock** and scroll to **Windows**. On macOS 27 the switches are called **Drag windows to left or right edge of screen to tile**, **Drag windows to menu bar to fill screen** and **Hold ⌥ key while dragging windows to tile**. Make sure the ones you want are on.
3. **Mission Control is grabbing the drag.** If **Drag windows to top of screen to enter Mission Control** is on, dragging to the top can open Mission Control instead of filling the screen. Turn it off in the Mission Control section of the same settings page.
4. **The app's window is fixed.** Apple notes that some windows cannot be moved, and many cannot be resized. Settings panels and some dialogs fall into this group, so they will not snap.

## How do I snap windows on older macOS versions?

macOS Ventura 13 and Sonoma 14 do not have edge snapping. You can still use **Split View** from the green button, which places two apps full screen side by side, but for snapping on the normal desktop you need a window manager. Most of them work on these versions, and [Windowmac](/) runs on macOS 13 or later.

## How do I snap windows without aiming for the edge?

Dragging to an edge is easy on a laptop but slow on a big or ultrawide monitor, where the edge can be a long way from the window. Gesture-based window managers fix this by putting the targets right under your pointer.

With Windowmac, a free and open-source window manager:

1. Hold **Option**. A small ring appears under the pointer.
2. Nudge the mouse toward where the window should go: left or right for halves, up to maximise, diagonally for a quarter.
3. Let go. An outline shows where the window will land before you release.

Click while still holding Option to step through sizes: half, then third, then two thirds. Windowmac also does the things macOS snapping does not: thirds for wide screens, sending a window to your other display, and an undo for the last move.

## Which way of snapping should I use?

| Situation | Best way to snap |
| --- | --- |
| Laptop, macOS Sequoia 15 or later | Drag to the edge, holding Option |
| Hands on the keyboard | Fn-Control-Arrow shortcuts |
| Older macOS (Ventura, Sonoma) | A window manager |
| Large or ultrawide monitor | A gesture or keyboard window manager with thirds |
| You want windows arranged automatically | A tiling window manager, see our [window manager roundup](/blog/best-window-managers-mac-2027/) |

Not sure which style suits you? The [Mac window manager quiz](/quiz/which-mac-window-manager/) takes about a minute. For more step-by-step answers, browse the [Mac how-to guides](/blog/topics/how-to/).
