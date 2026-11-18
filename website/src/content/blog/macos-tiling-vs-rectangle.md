---
title: "Do You Still Need Rectangle Now macOS Has Window Tiling?"
slug: macos-tiling-vs-rectangle
description: "macOS Sequoia added window tiling with edge snapping and Fn-Control shortcuts. Here is exactly what it covers compared with Rectangle, what it still lacks, and who can uninstall their window manager."
publishedAt: 2026-11-17
type: comparison
tags:
  - alternatives
  - macos-features
primaryApp: windowmac
feature: tools/window-shortcut-cheat-sheet
faq:
  - question: "Is macOS tiling as good as Rectangle?"
    answer: "For halves, quarters, fill and centre, yes. Rectangle still adds thirds and smaller fractions, more keyboard actions, moving windows between displays and URL automation."
  - question: "Can I use macOS tiling and Rectangle at the same time?"
    answer: "You can, but both respond to dragging a window to the screen edge. If you keep Rectangle, consider turning off the macOS switches for dragging windows to tile in Desktop & Dock settings, or turning off Rectangle's snap areas."
  - question: "Does macOS tiling have thirds?"
    answer: "No. Built-in tiling splits the screen into halves and quarters only."
  - question: "Which macOS versions have built-in tiling?"
    answer: "macOS Sequoia 15 and later, including Tahoe 26 and macOS 27."
  - question: "Does Rectangle work on macOS 27?"
    answer: "The current Rectangle requires macOS 14 or later. Check its website or GitHub releases for the latest compatibility notes."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
  - title: "Rectangle"
    url: "https://rectangleapp.com/"
  - title: "Rectangle on GitHub"
    url: "https://github.com/rxhanson/Rectangle"
seoTitle: "macOS Tiling vs Rectangle: Do You Still Need It?"
seoDescription: "macOS tiling now snaps windows to halves and quarters. Compare it with Rectangle feature by feature to decide whether to keep a window manager."
draft: false
---
You no longer need Rectangle if you only use halves, quarters, fill and centre: macOS Sequoia 15 and later do all of those with edge snapping, the green button menu and **Fn-Control** shortcuts. Keep Rectangle, or another window manager, if you use **thirds**, move windows **between displays** from the keyboard, want shortcuts for every layout, or automate window moves. Built-in tiling has none of those.

Here is the comparison layout by layout, so you can decide in a few minutes.

## What does macOS tiling do now?

macOS Sequoia added window tiling, and it is in Tahoe 26 and macOS 27 too. It gives you:

- **Drag to tile.** Drag a window to the left or right edge for a half, a corner for a quarter, or the menu bar to fill. Hold Option while dragging to see targets sooner.
- **Green button layouts.** Hover over the green button to pick a half or quarter (Move & Resize) or a multi-window layout (Fill & Arrange).
- **Shortcuts.** <kbd>Fn</kbd>-<kbd>Control</kbd> with an arrow for halves, F to fill, C to centre, R to return, plus Shift and Option-Shift versions that arrange two or three windows.
- **Margins.** An option to leave gaps around tiled windows.

## How does it compare with Rectangle?

| Feature | macOS tiling | Rectangle |
| --- | --- | --- |
| Price | Built in | Free, open source (MIT) |
| macOS versions | 15 and later | 14 and later (older builds for older systems) |
| Halves by drag | Yes | Yes |
| Quarters by drag | Yes | Yes |
| Thirds | No | Yes, by drag and shortcut |
| Sixths, eighths, ninths | No | By shortcut |
| Halves by shortcut | Yes, Fn-Control-Arrow | Yes |
| Quarters by shortcut | Not by default (add via App Shortcuts) | Yes |
| Arrange two or three windows at once | Yes | Tile all windows in rows or columns |
| Fill without full screen | Yes | Yes, plus almost maximise |
| Move to next display | No shortcut | Yes |
| Repeat shortcut to cycle sizes | No | Yes |
| Ignore specific apps | No | Yes |
| URL automation | No | Yes, `rectangle://` |

Rectangle details are from its website and GitHub README; macOS details from Apple Support.

## When is macOS tiling enough?

You can likely uninstall your window manager if:

- You work on one screen, often a laptop.
- You mostly put two windows side by side, or fill the screen with one.
- You are fine dragging to edges or pressing <kbd>Fn</kbd>-<kbd>Control</kbd>-Arrow.
- You do not mind that quarters have no default shortcut.

Built-in tiling also has one thing many third-party snappers do not: the **Fill & Arrange** layouts, which place two or three of your recent windows in one move.

## When should you keep Rectangle or another window manager?

Keep a window manager if any of these apply:

- **Wide or ultrawide monitors.** Thirds make far better use of a 34-inch screen than halves, and macOS has no thirds. See our [ultrawide layouts guide](/blog/ultrawide-monitor-mac-layouts/).
- **More than one display.** There is no built-in shortcut to send a window to the other screen.
- **Heavy keyboard use.** Rectangle has shortcuts for nearly every position, and pressing a shortcut again cycles to another size.
- **Automation.** If you trigger window layouts from scripts or launchers, Rectangle's URL scheme does that and macOS tiling does not.
- **macOS 13 or 14.** Built-in tiling does not exist before Sequoia.

## Can I run both without conflicts?

Yes, with one adjustment. Both macOS and Rectangle respond when you drag a window to the edge of the screen, so choose one to handle dragging:

- To let Rectangle handle it, open **System Settings → Desktop & Dock**, scroll to **Windows**, and turn off the switches for dragging windows to the edges and the menu bar to tile.
- To let macOS handle it, turn off snap areas in Rectangle's settings and use Rectangle only for its shortcuts.

The Fn-Control shortcuts and Rectangle's own shortcuts use different keys, so both sets can stay on.

## What if you want something different from both?

Both macOS tiling and Rectangle ask you to drag to an edge or remember a shortcut. A radial window manager puts the targets under your pointer instead. [Windowmac](/) is free and open source: hold **Option**, flick toward where the window should go, and let go. It has thirds, quarters, next-screen moves and undo, works on macOS 13 or later, and its shortcuts only work while Option is held, so they never clash with Fn-Control. Its Strip mode also lines up every window on a screen as scrolling columns.

## So which should you use?

| You | Use |
| --- | --- |
| Use halves and fill on one screen | macOS tiling |
| Need thirds or multi-display moves | Rectangle or another window manager |
| Want to stop aiming at screen edges | A radial manager such as Windowmac |
| Want saved multi-app layouts | See [Rectangle alternatives](/blog/rectangle-alternatives/) |

Whichever you choose, the [cheat sheet builder](/tools/window-shortcut-cheat-sheet/) prints the shortcuts for built-in tiling and Windowmac side by side. For the full list of built-in keys, read [macOS window tiling shortcuts explained](/blog/macos-window-tiling-shortcuts/).
