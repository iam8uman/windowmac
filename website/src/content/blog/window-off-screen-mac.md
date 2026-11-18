---
title: "How to Get a Window Back When It Is Off-Screen on a Mac"
slug: window-off-screen-mac
description: "A window stuck off the edge of your Mac screen, or on a monitor you unplugged? Bring it back with the Window menu, a tiling shortcut, Mission Control or Displays settings."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
  - multiple-monitors
primaryApp: windowmac
feature: tools/multi-monitor-planner
faq:
  - question: "How do I move a window that is off-screen on a Mac?"
    answer: "Click the app to make it active, then choose Window, Fill, or Window, Center, from the menu bar. On macOS Sequoia 15 or later, Fn-Control-F or Fn-Control-C does the same from the keyboard."
  - question: "Why do windows open off-screen on my Mac?"
    answer: "Usually because the app remembers a position on a monitor that is no longer connected, or on part of a display arrangement that has changed. The window opens where that position used to be."
  - question: "How do I get a window back from a disconnected monitor?"
    answer: "Make the app active and use Window, Fill or Fn-Control-F to bring it onto your current screen. If that fails, reconnect the monitor, move the window across, then disconnect it again."
  - question: "What if the app has no Window menu?"
    answer: "Try Mission Control (Control-Up Arrow) and click the window, then use a tiling shortcut. A window manager can also move the active window from the keyboard, for example Option-C to centre in Windowmac."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Connect an external display to your Mac"
    url: "https://support.apple.com/guide/mac-help/connect-an-external-display-mchl7c7ebe08/mac"
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
  - title: "Apple Support: Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
seoTitle: "Mac Window Off Screen? How to Get It Back (5 Fixes)"
seoDescription: "Get a Mac window back when it is off-screen or stuck on an unplugged monitor: Window menu, Fn-Control shortcuts, Mission Control and Displays fixes."
draft: false
---
To get an off-screen window back on a Mac, click its app in the Dock so it is active, then choose **Window → Fill** or **Window → Center** from the menu bar. The window jumps back onto your screen. On macOS Sequoia 15 or later, **Fn-Control-F** (fill) and **Fn-Control-C** (centre) do the same from the keyboard, and they work even when you cannot see any part of the window.

If that does not work, the fixes below go from quickest to most thorough.

## Why do windows end up off-screen?

The common causes are:

- **A monitor was unplugged.** The app remembers that its window was on the external display and puts it back there, even though that display is gone.
- **The display arrangement changed.** If you moved a display in **Displays → Arrange**, or plugged into a different monitor, a saved position can fall outside the area the screens now cover.
- **The resolution changed.** Switching to a lower resolution or a larger "looks like" size makes the desktop smaller, and windows near the right or bottom edge may hang off it.
- **The window was dragged too far.** Title bars can be pushed up under the menu bar or out past an edge.

## How do I bring the window back with the Window menu?

This is the quickest fix because it does not need you to see the window.

1. Click the app's icon in the **Dock**, or press <kbd>Command</kbd>-<kbd>Tab</kbd> to it, so its menus are in the menu bar.
2. Open the **Window** menu.
3. Choose **Fill** to fit the window to the screen, or **Center** to move it to the middle at its current size.

If the app has several windows, press <kbd>Command</kbd>-<kbd>`</kbd> to cycle to the lost one first. On older macOS versions without tiling, look for **Zoom** in the Window menu, which resizes the window and can bring it back into view.

## How do I fix it with the keyboard?

On macOS Sequoia 15 or later, with the app active:

| Shortcut | Result |
| --- | --- |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd> | Fill the screen, which brings the whole window into view |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd> | Centre the window on the current display |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> | Snap it to the left half |

These are the same tiling shortcuts described in our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/).

## Can Mission Control help find it?

Yes, if the window is partly visible or on another space. Press <kbd>Control</kbd>-<kbd>↑</kbd> to open Mission Control, or <kbd>Control</kbd>-<kbd>↓</kbd> to see only the current app's windows, and click the window you want. That makes it active, ready for one of the commands above. If the window is on another desktop, drag it from the Spaces bar into the current one.

## What if the window is stuck on a monitor I unplugged?

1. Try the Window menu or keyboard fix above first. It usually works.
2. If not, reconnect the monitor. If macOS does not see it, open **System Settings → Displays**, hold **Option** and click **Detect Displays**.
3. Drag the window back to your main screen, or use the [move window to another monitor](/blog/move-window-to-another-monitor-mac/) methods.
4. Quit the app while the window is on the main screen, so it remembers the new position, then disconnect the monitor.

## How do I stop windows going off-screen again?

- **Line up your displays in Arrange.** In **System Settings → Displays → Arrange**, make the displays' edges overlap as much as possible, matching how they sit on your desk. The [multi-monitor planner](/tools/multi-monitor-planner/) shows how to line up displays of different sizes.
- **Disconnect cleanly.** Put windows on the laptop screen before you unplug, especially for apps you reopen often.
- **Use layout-based moves.** Window managers move windows by layout rather than pixel position. In [Windowmac](/), Option-] sends a window to the next screen in the same layout, Option-C centres it and Option-Z undoes the last move, so windows land on a screen in a known layout instead of at an old pixel position.

## Which fix should I try first?

| Situation | Try |
| --- | --- |
| Window partly or fully off the edge | Window → Fill, or Fn-Control-F |
| App has several windows, one is lost | Command-` then Window → Center |
| Window on an unplugged monitor | Window → Fill; if that fails, reconnect and drag back |
| It keeps happening after you dock | Fix the layout in Displays → Arrange |

For other window problems, see the [troubleshooting guides](/blog/topics/troubleshooting/).
