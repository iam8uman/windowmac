---
title: "How to Move a Window to Another Monitor on a Mac"
slug: move-window-to-another-monitor-mac
description: "Move a window from your MacBook to an external monitor, or between two monitors, by dragging, from the Window menu, or with one keystroke. Plus how to keep its size and fix windows that won't cross."
publishedAt: 2026-11-17
type: how-to
tags:
  - multiple-monitors
  - how-to
  - keyboard-shortcuts
primaryApp: windowmac
feature: tools/multi-monitor-planner
faq:
  - question: "What is the keyboard shortcut to move a window to another screen on a Mac?"
    answer: "macOS has no built-in shortcut for it. Window managers add one; in Windowmac you hold Option and press the right bracket key for the next screen or the left bracket key for the previous one."
  - question: "Why won't my window move to the other monitor?"
    answer: "Usually the displays are arranged differently in System Settings from how they sit on your desk, so you are dragging toward an edge that is not shared. Open Displays, click Arrange and line the displays up."
  - question: "How do I move a full-screen app to another monitor?"
    answer: "Leave full screen first with the green button or Control-Command-F, drag the window to the other display, then make it full screen again there."
  - question: "Why does the window change size when it moves to the other monitor?"
    answer: "Displays with different resolutions or scaling show the same window at a different physical size, and a window that is larger than the new screen gets squeezed. A window manager that moves windows by layout, such as left half to left half, avoids this."
  - question: "How do I make an app always open on my external monitor?"
    answer: "With Displays have separate Spaces on, Control-click the app in the Dock, choose Options and pick the Desktop on Display option for that monitor."
sources:
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
  - title: "Apple Support: Work in multiple spaces on Mac"
    url: "https://support.apple.com/guide/mac-help/work-in-multiple-spaces-mh14112/mac"
  - title: "Apple Support: Use your iPad as a second display for your Mac"
    url: "https://support.apple.com/guide/mac-help/use-your-ipad-as-a-second-display-mchlf3c6f7ae/mac"
  - title: "Apple Support: Use Mission Control on Mac"
    url: "https://support.apple.com/guide/mac-help/use-mission-control-mh35798/mac"
seoTitle: "How to Move a Window to Another Monitor on Mac"
seoDescription: "Move windows between your MacBook and an external monitor: drag across, use the Window menu or press one key with a free app. Plus fixes when windows stick."
draft: false
---
To move a window to another monitor on a Mac, drag it by its title bar past the edge of your screen that touches the other display; it slides across and keeps its size where it can. macOS has no keyboard shortcut for this, so if you do it often, a window manager such as Windowmac can send the active window to the next screen with one key and keep its layout.

Here are all the ways, starting with nothing to install, plus what to do when a window refuses to cross.

## How do I drag a window to my other display?

1. Click and hold the window's **title bar** (the strip across the top).
2. Drag toward the side of the screen where your other display is.
3. Keep going past the edge. The pointer and window appear on the other display.
4. Let go once the window is where you want it.

Which edge to drag toward depends on how the displays are arranged in macOS, not on your desk. If your monitor sits to the right but macOS thinks it is above, you have to drag up. Fix that in **System Settings → Displays → Arrange** by dragging the display icons to match your desk.

On macOS Sequoia 15 or later you can tile the window as soon as it lands: keep dragging to the left or right edge of the new display, or press <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> or <kbd>→</kbd> after you let go.

## Can I move a window with Mission Control?

Mission Control is tied to each display. Apple notes that opening it on a second display shows only that display's windows and spaces, so it is not a reliable way to move a window between monitors. It is good for moving windows between desktop spaces on the same display: open it with <kbd>Control</kbd>-<kbd>↑</kbd> and drag a window onto a space at the top.

For moving between displays, dragging or a window manager is quicker.

## Is there a menu command to move a window to another display?

Sometimes. Apple's guide for using an iPad as a second display says you can choose **Window → Move to** in an app to send a window to the iPad. With an external monitor, open the app's **Window** menu and look for a **Move to** item naming your other display. Not every app shows one, so dragging remains the method that always works.

## How do I move a window to another monitor with the keyboard?

macOS does not include a shortcut, but window managers do. With [Windowmac](/):

- Hold **Option** and press <kbd>]</kbd> to send the window to the next screen.
- Hold **Option** and press <kbd>[</kbd> to send it to the previous screen.

The window keeps its layout: a window on the left half of your laptop lands on the left half of the monitor, scaled to fit, instead of keeping a pixel size that may be too large or tiny on the other screen. The pointer moves with it, so you can keep working without hunting for it. Every Windowmac action also has a link, so `windowmac://screen/next` does the same from a script or a Shortcuts shortcut.

## Why does a window change size or end up off-screen when I move it?

The two displays probably have different resolutions or scaling. A window that is 1600 points wide fits on a 2560-wide monitor but not on a laptop that looks like 1470 wide, so it either shrinks to fit or hangs over the edge. Common fixes:

- **Tile it after moving** so it fits the new screen.
- **Match the scaling** of the two displays more closely. The [display scaling calculator](/tools/display-scaling-calculator/) shows how big things will look at each setting.
- **Align the displays in Arrange** so their edges overlap. If only a small part of the edges is shared, windows can only cross along that strip.

If a window has ended up mostly off the screen, our guide on [getting a window back when it is off-screen](/blog/window-off-screen-mac/) walks through the fixes.

## How do I make apps open on a particular monitor?

macOS remembers where an app's windows were, but you can also pin an app to a display:

1. Make sure **Displays have separate Spaces** is on in **System Settings → Desktop & Dock**, under Mission Control.
2. Control-click the app's icon in the Dock and choose **Options**.
3. Under **Assign To**, pick **Desktop on Display** followed by the display you want.

## Which method should I use?

| Situation | Best way |
| --- | --- |
| Occasional moves | Drag across the shared edge |
| Window lands too big or too small | Drag, then tile, or use a window manager |
| You move windows many times a day | A keyboard shortcut from a window manager |
| An app should always open on one monitor | Assign it to that display from the Dock |
| Windows only cross at the top or bottom | Fix the layout in Displays → Arrange |

Planning a new setup? The [multi-monitor planner](/tools/multi-monitor-planner/) draws your displays to scale and tells you how to line them up in Arrange. More guides are in the [multiple monitors topic](/blog/topics/multiple-monitors/).
