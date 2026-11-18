---
title: "How to Resize and Move a Window With the Keyboard on a Mac"
slug: resize-window-mac-keyboard
description: "What macOS lets you do to a window from the keyboard (tile, fill, centre, restore), how to add keys for the rest, and how a window manager adds nudging, growing and shrinking without the mouse."
publishedAt: 2026-11-17
type: how-to
tags:
  - keyboard-shortcuts
  - how-to
primaryApp: windowmac
feature: tools/shortcut-trainer
faq:
  - question: "Can you resize a window with the keyboard on a Mac?"
    answer: "Partly. macOS Sequoia 15 and later can tile, fill and centre a window with Fn-Control shortcuts, but it has no key to make a window a little bigger or smaller. A window manager adds those."
  - question: "How do I move a window with the keyboard on a Mac?"
    answer: "Built in, you can only move it to set places: halves with Fn-Control-Arrow, the centre with Fn-Control-C, or the full desktop with Fn-Control-F. To nudge it a few points at a time, use a window manager such as Windowmac, where Option-Shift-Arrow moves the window."
  - question: "What is the shortcut to make a window smaller on Mac?"
    answer: "There is none built in apart from Fn-Control-R, which returns a tiled window to its previous size, and Command-M, which minimises it. In Windowmac, hold Option and press the minus key to shrink the window."
  - question: "How do I resize a window that is bigger than the screen?"
    answer: "Press Fn-Control-F to fill the desktop, which fits the window to the screen, or a tiling shortcut to give it a half. If the window cannot be resized at all, the app has fixed its size."
sources:
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
  - title: "Apple Support: Create keyboard shortcuts for apps on Mac"
    url: "https://support.apple.com/guide/mac-help/create-keyboard-shortcuts-for-apps-mchlp2271/mac"
seoTitle: "Resize and Move Windows With the Keyboard on Mac"
seoDescription: "Resize and move Mac windows without the mouse: Fn-Control tiling keys, custom App Shortcuts, and window manager keys to nudge, grow and shrink."
draft: false
---
On a Mac you can resize and move a window from the keyboard to fixed positions only: **Fn-Control** with an arrow key tiles it to a half, **Fn-Control-F** fills the desktop, **Fn-Control-C** centres it and **Fn-Control-R** puts it back. These need macOS Sequoia 15 or later. To make a window a little bigger or nudge it a few points, which macOS cannot do from the keyboard, you need a window manager.

Here is what is built in, how to stretch it further, and what a window manager adds.

## What can macOS do to a window from the keyboard?

| Shortcut | Size and position |
| --- | --- |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> / <kbd>→</kbd> | Left or right half, full height |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↑</kbd> / <kbd>↓</kbd> | Top or bottom half, full width |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd> | Fill the desktop |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd> | Centre, size unchanged |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>R</kbd> | Back to the size and place before tiling |
| <kbd>Command</kbd>-<kbd>M</kbd> | Minimise to the Dock |
| <kbd>Control</kbd>-<kbd>Command</kbd>-<kbd>F</kbd> | Full screen in its own space |

Think of these as jumps to preset places. They are quick and need no setup, but there is nothing in between: no "a bit wider", no "move down a little", and no thirds. The full list, including shortcuts that arrange two or three windows, is in our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/).

## How do I add keyboard shortcuts for the other layouts?

Every layout in the **Window → Move & Resize** menu can get a shortcut of your own, including the four quarters, which have none by default.

1. Open **System Settings → Keyboard → Keyboard Shortcuts** and select **App Shortcuts**.
2. Click **Add (+)** and set **Application** to **All Applications**.
3. Type the menu command in **Menu title** exactly as it appears in the Window menu, joining submenu levels with `->` as Apple describes.
4. Click **Keyboard shortcut**, press your combination and click **Done**.

This still gives you only the layouts in the menu. It cannot add a step-by-step resize, because there is no such command in the menu to point at.

## How do I resize a window precisely without the keyboard?

For completeness, two mouse tricks from Apple are worth knowing because they are faster than dragging a corner:

- **Double-click an edge** of a window to expand the window on that side.
- **Drag an edge next to another window** and it stops when it lines up with the neighbour's edge, so two windows meet without a gap or overlap.

## How do I nudge, grow and shrink windows from the keyboard?

This is where a window manager earns its place. In [Windowmac](/), which is free and open source, every key works while you hold **Option**:

| Hold Option and press | What happens |
| --- | --- |
| <kbd>=</kbd> | Make the window larger |
| <kbd>-</kbd> | Make the window smaller |
| <kbd>Shift</kbd>-<kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Move the window in that direction |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Halves, then thirds, then two thirds |
| <kbd>1</kbd> to <kbd>4</kbd> | Quarters |
| <kbd>C</kbd> | Centre |
| <kbd>Z</kbd> | Undo the last change |

Windowmac also has actions to grow or shrink a single edge, which you can put on any key you like, and the step size for resizing and moving is a slider in its settings. Typing is not affected: keys that are not Windowmac shortcuts pass straight through while Option is held, so Option-E still types an accent.

The undo is the part most people come to rely on. When you overshoot with a few presses of the larger key, Option-Z steps back through the window's last positions.

## Why won't a window resize from the keyboard?

If a shortcut does nothing, the window is probably one of the kinds Apple says cannot be resized or moved, such as some dialogs, settings windows and apps that fix their own size. Tiling shortcuts also need the window to be in front, so click it first or bring it forward with <kbd>Command</kbd>-<kbd>`</kbd>. On macOS Ventura 13 or Sonoma 14, the Fn-Control shortcuts do not exist at all.

## Which keyboard method is right for you?

| You want | Use |
| --- | --- |
| Halves, fill and centre, nothing installed | Fn-Control shortcuts |
| Quarters from the keyboard | App Shortcuts for the Window menu commands |
| Fine control: nudge, grow, shrink, undo | A window manager |
| Thirds on a wide monitor | A window manager |

Once you have chosen your keys, the free [shortcut trainer](/tools/shortcut-trainer/) helps them stick. For the rest of the keyboard shortcuts that manage windows, such as switching, hiding and Mission Control, see [every Mac shortcut for windows and apps](/blog/mac-window-keyboard-shortcuts/).
