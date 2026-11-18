---
title: "How to Centre a Window on a Mac"
slug: center-window-mac
description: "Centre any Mac window with Fn-Control-C, the Window menu or the green button, what to do on older macOS, and how to centre a window at a set size with a window manager."
publishedAt: 2026-11-17
type: how-to
tags:
  - how-to
  - keyboard-shortcuts
primaryApp: windowmac
feature: tools/window-size-calculator
faq:
  - question: "What is the shortcut to centre a window on a Mac?"
    answer: "Press Fn-Control-C on macOS Sequoia 15 or later. The window moves to the middle of the desktop and keeps its size."
  - question: "Does centring change the window size?"
    answer: "No. Center only moves the window. If you want it bigger and centred, use Fill first, or a window manager layout such as almost maximise, which leaves an even margin all round."
  - question: "How do I centre a window on macOS Ventura or Sonoma?"
    answer: "Those versions have no Center command. Drag the window by eye, or use a window manager. Windowmac centres the active window when you hold Option and press C."
  - question: "Why is the centred window slightly above the middle?"
    answer: "macOS places a window a little above the true centre when an app asks it to centre one. Windowmac offers both: press Option-C once for the exact centre and again for this slightly higher macOS-style position."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
seoTitle: "How to Center a Window on Mac (Shortcut and Menu)"
seoDescription: "Centre a Mac window with Fn-Control-C, Window > Center or the green button. Plus how to centre on Ventura or Sonoma and centre at a fixed size."
draft: true
---
To centre a window on a Mac, press **Fn-Control-C**, or choose **Window → Center** from the menu bar. The window moves to the middle of the desktop and keeps its current size. Both need macOS Sequoia 15 or later; on earlier versions there is no built-in centre command, so you drag by eye or use a window manager.

Centring sounds trivial, but it is the layout many people use most on a large monitor: one window in front of you, with space on both sides. Here are all the ways to do it.

## How do I centre a window with the keyboard?

On macOS Sequoia 15, Tahoe 26 or macOS 27:

1. Click the window to make it active.
2. Press <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd>.

**Fn** is the bottom-left key, marked with a globe on many keyboards. If you change your mind, <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>R</kbd> returns the window to where it was. Both keys are part of Apple's window tiling shortcuts, listed in full in our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/).

## How do I centre a window with the mouse?

Two built-in ways:

- **Window menu.** With the window active, choose **Window → Center**.
- **Green button.** Hover over the green button in the window's top-left corner, hold **Option**, and click the centred tile icon under **Fill & Arrange**. Apple's tiling guide describes this Option-click as the way to centre the window from that menu.

The Window menu is the easier of the two to remember, and it works even when the window's title bar is off the screen, which makes it a good rescue for a lost window. If that is your problem, see [how to get a window back when it is off-screen](/blog/window-off-screen-mac/).

## Does centring change the window's size?

No. Center only moves the window. That is usually what you want for a document or browser you have already sized, but it means a small window stays small and a huge one stays huge. If the window is too big, use **Window → Fill** first, then resize it.

To pick a sensible size before centring, the [window size calculator](/tools/window-size-calculator/) shows the exact size of halves, thirds and other layouts on your display, so you can match a centred window to, say, a third of the screen.

## How do I centre a window on macOS Ventura or Sonoma?

macOS Ventura 13 and Sonoma 14 do not have window tiling, so there is no **Center** command or shortcut. Your options are:

1. Drag the window by its title bar until it looks centred.
2. Use a window manager that supports your version.

[Windowmac](/) runs on macOS 13 or later. Hold **Option** and press <kbd>C</kbd> to centre the active window. Press <kbd>C</kbd> again, still holding Option, for **macOS Centre**, which places the window slightly above the true middle, matching where macOS puts a window when an app asks it to centre one.

## How do I centre a window at a set size?

A centred window at a fixed fraction of the screen is a common layout on wide displays: the main app in the middle, nothing else competing. There are a few ways to get it:

- **Almost maximise.** In Windowmac, hold Option and press <kbd>Return</kbd> twice. The first press maximises, the second gives **Almost Maximise**, which leaves an even margin on every side.
- **Centre third.** Hold Option and press <kbd>T</kbd> for the middle third of the screen at full height. On an ultrawide monitor this is often the most comfortable reading width; our [ultrawide layouts guide](/blog/ultrawide-monitor-mac-layouts/) has more.
- **Custom layouts.** Windowmac lets you add your own layouts as fractions of the screen, for example 60% wide and 80% tall, centred, and put it on a key or a direction of the radial ring.

## Which way of centring should I use?

| You want | Use |
| --- | --- |
| Centre without changing size, macOS 15+ | Fn-Control-C or Window → Center |
| Centre on macOS 13 or 14 | A window manager such as Windowmac |
| Centre and fill most of the screen | Almost maximise |
| A centred column on a wide monitor | Centre third or a custom layout |
| Undo a centre | Fn-Control-R, or Option-Z in Windowmac |

For other single-window moves, see [how to snap windows on a Mac](/blog/how-to-snap-windows-on-mac/) and [how to maximise a window without full screen](/blog/maximize-window-mac-without-full-screen/).
