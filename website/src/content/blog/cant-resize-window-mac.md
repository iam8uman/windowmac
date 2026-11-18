---
title: "Why Can't I Resize a Window on My Mac?"
slug: cant-resize-window-mac
description: "Some Mac windows won't resize by dragging, tiling or a window manager. Why that happens, which windows are fixed, and the fixes that work when a resizable window gets stuck."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
primaryApp: windowmac
feature: tools/window-size-calculator
faq:
  - question: "Why won't my Mac window resize?"
    answer: "Either the app has made the window a fixed size, the window has reached its minimum or maximum size, or the window is in full screen. Apple notes that some windows cannot be resized or moved."
  - question: "Why can't I resize a window in full screen?"
    answer: "Full-screen windows always fill their space. Leave full screen with Control-Command-F first, then resize."
  - question: "Why does my window manager not resize some apps?"
    answer: "Window managers use the Accessibility permission to move windows. Windows that are fixed in size by the app cannot be resized by any tool, and the window manager needs the permission switched on."
  - question: "How do I resize a window without dragging its corner?"
    answer: "Double-click an edge to expand that side, use Window, Fill, or a tiling shortcut such as Fn-Control-Left Arrow on macOS Sequoia 15 or later."
sources:
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
  - title: "Apple Support: Use apps in full screen on Mac"
    url: "https://support.apple.com/guide/mac-help/use-apps-in-full-screen-mchl9c21d2be/mac"
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
seoTitle: "Can't Resize a Window on Mac? Causes and Fixes"
seoDescription: "Why some Mac windows won't resize, how to tell if the size is fixed, and fixes for full screen, minimum sizes and window managers that can't move an app."
draft: true
---
You usually can't resize a window on a Mac for one of four reasons: the app has made it a **fixed size** (common for settings panels and dialogs), it has hit its **minimum or maximum size**, it is in **full screen**, or you are dragging a spot that is not quite the edge. Apple's own guide notes that most windows can be resized but some cannot. Fixed windows cannot be resized by any method; the rest can be fixed with the steps below.

## Is the window a fixed size?

Signs that the app has fixed the size:

- The pointer never changes to a resize arrow at the edges or corners.
- The window is a settings panel, an About box, a dialog or an alert.
- Tiling commands and window managers move the window but leave its size unchanged.

If so, nothing will change its size, because the app decides. The best you can do is move it, for example with **Window → Center**.

## Is the window in full screen?

A full-screen window fills its own space, with the menu bar hidden. You cannot drag its edges. Press <kbd>Control</kbd>-<kbd>Command</kbd>-<kbd>F</kbd>, or hover over the green button and choose **Exit Full Screen**, then resize. Our guide to [exiting full screen](/blog/exit-full-screen-mac/) has every method.

## Has it reached its minimum or maximum size?

Many apps set limits: a chat app might refuse to get narrower than a sidebar, and a video app might keep a fixed shape. When you drag past the limit, the edge just stops. That is normal. If the minimum size is larger than your screen, see [fixing a window that is too big for the screen](/blog/window-too-big-for-screen-mac/).

## Am I grabbing the right spot?

Resize handles are thin. Some tips:

1. Move the pointer slowly onto the very edge or corner until it changes to a double arrow, then drag.
2. **Double-click an edge** to expand the window on that side, which Apple lists as an alternative to dragging.
3. **Drag an edge toward a neighbouring window**: Apple notes the edge stops when it lines up with the other window, which is handy for making two windows meet.

Windows with very thin borders, or no visible border at all, are the hardest to grab. The keyboard methods below avoid the problem.

## How can I resize without dragging?

On macOS Sequoia 15 or later:

- **Window → Fill**, or <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd>, fits the window to the screen.
- **Window → Move & Resize**, or <kbd>Fn</kbd>-<kbd>Control</kbd> with an arrow, gives halves and quarters.

With a window manager, you get finer steps. In [Windowmac](/), hold Option and press <kbd>=</kbd> to make a window larger or <kbd>-</kbd> to make it smaller, step by step, and <kbd>Z</kbd> to undo. See [resizing windows with the keyboard](/blog/resize-window-mac-keyboard/) for more.

## Why can't my window manager resize an app?

Window managers move and resize other apps' windows through the macOS Accessibility permission. If one stops working:

- Check that it is switched on in **System Settings → Privacy & Security → Accessibility**.
- Remember it cannot resize windows the app has fixed; those windows will move but not change size.

## Which fix applies to me?

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No resize arrow anywhere | Fixed-size window | Move it instead; size is up to the app |
| Edges stop part-way | Minimum or maximum size | Normal; use more screen space |
| No title bar, no menu bar | Full screen | Control-Command-F, then resize |
| Hard to grab the edge | Thin border | Window → Fill or a tiling shortcut |
| Window manager moves but won't resize | Fixed window or permission | Check Accessibility settings |

To see what size a half, third or quarter would be on your display before you resize, use the [window size calculator](/tools/window-size-calculator/).
