---
title: "How to Arrange Three or Four Windows on a Mac"
slug: arrange-three-or-four-windows-mac
description: "Put three or four windows on one Mac screen: built-in Quarters and Left & Quarters layouts, the three-window shortcut, dragging to corners, and thirds with a window manager."
publishedAt: 2026-11-17
type: how-to
tags:
  - how-to
  - macos-features
primaryApp: windowmac
feature: tools/window-size-calculator
faq:
  - question: "How do I split my Mac screen into four?"
    answer: "Drag each window into a different corner of the screen and release when the highlight appears, or hover over the green button and choose the Quarters layout under Fill & Arrange to place four recent windows at once. Both need macOS Sequoia 15 or later."
  - question: "What is the shortcut for three windows on a Mac?"
    answer: "Fn-Control-Option-Shift with an arrow key. Left Arrow puts the active window on the left half and two more windows in the right-hand quarters."
  - question: "Can I put three windows side by side in equal columns?"
    answer: "Not with built-in tiling, which has no thirds. A window manager such as Windowmac or Rectangle can place three equal columns."
  - question: "Which windows does Fill & Arrange use?"
    answer: "It uses the active window plus the windows you used most recently, in that order. Click the windows you want in reverse order of importance before you arrange them."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
seoTitle: "How to Arrange 3 or 4 Windows on a Mac Screen"
seoDescription: "Fit three or four windows on one Mac screen with Quarters and Left & Quarters layouts, the three-window shortcut, corner dragging or thirds."
draft: true
---
To arrange four windows on a Mac, drag each one into a different corner of the screen, or hover over the green button and choose the **Quarters** layout under **Fill & Arrange**, which places four of your recent windows at once. For three windows, press **Fn-Control-Option-Shift-Left Arrow**: the active window takes the left half and the next two fill the right-hand quarters. Both need macOS Sequoia 15 or later. For three equal columns, you need a window manager, because macOS tiling has no thirds.

## What layouts does macOS have for three or four windows?

Apple's tiling includes these multi-window arrangements. "Active window" is the one in front; the others are the windows you used just before it.

| Layout | Windows | Keyboard |
| --- | --- | --- |
| Quarters | Four, one per corner | None |
| Left & Quarters | Active window left half, two in the right quarters | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> |
| Right & Quarters | Active window right half, two in the left quarters | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>→</kbd> |
| Top & Quarters | Active window top half, two in the bottom quarters | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>↑</kbd> |
| Bottom & Quarters | Active window bottom half, two in the top quarters | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>↓</kbd> |

All of them are also in the green button menu under **Fill & Arrange** (hold Option to see more) and in **Window → Move & Resize → Arrange** in the menu bar.

## How do I arrange four windows?

**One at a time, by dragging:**

1. Drag the first window by its title bar into the top-left corner and release when the highlight appears.
2. Repeat with the other three windows in the other corners.

**All at once:**

1. Click the four windows you want, one after another, ending with the one you want in the main position.
2. Hover over the green button of the last one.
3. Under **Fill & Arrange**, click the quarters layout.

There is no default keyboard shortcut for single quarters. You can add one for each quarter through **System Settings → Keyboard → Keyboard Shortcuts → App Shortcuts**, as explained in our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/).

## How do I arrange three windows?

The "& Quarters" layouts are the built-in three-window option. One window gets half the screen and two smaller ones share the other half. That suits a main document with a chat window and a reference window beside it.

1. Click the two supporting windows, then the main one, so the main one is active.
2. Press <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> to put the main window on the left.

## How do I get three equal columns?

macOS tiling only splits in halves and quarters. Three equal columns need a window manager. In [Windowmac](/), free and open source:

| Hold Option and press | Window goes to |
| --- | --- |
| <kbd>←</kbd> twice | Left third |
| <kbd>T</kbd> | Centre third |
| <kbd>→</kbd> twice | Right third |
| <kbd>←</kbd> three times | Left two thirds |

With the mouse, hold Option, flick left or right, and click while holding to step from half to third to two thirds. Windowmac's quarters are on <kbd>1</kbd> to <kbd>4</kbd> with Option held. Thirds are the better choice on wide monitors; on a laptop screen, quarters can get cramped.

## How small will each window be?

It depends on your display. On a 14-inch MacBook Pro at its default size of 1512 by 982 points, a quarter is about 756 by 472 points once the menu bar is taken off, which is tight for most apps. On a 27-inch monitor that looks like 2560 by 1440, a quarter is 1280 by about 708, comfortably usable. The [window size calculator](/tools/window-size-calculator/) gives exact sizes for your screen, including the menu bar, Dock and gaps.

If quarters are too small, consider [using multiple desktops](/blog/multiple-desktops-mac/) for some of the windows instead, or Windowmac's **Strip** (hold Option and press S), which lines up every window as a full-height column and lets the row scroll sideways when they do not all fit.

## Which arrangement should I pick?

| Windows | Small screen | Large or wide screen |
| --- | --- | --- |
| Three | One half plus two quarters | Thirds |
| Four | Two halves on two desktops | Quarters |
| Five or more | Spaces or a strip | Strip, or a tiling window manager |

For two windows side by side, see [how to split screen on a Mac](/blog/how-to-split-screen-on-mac/).
