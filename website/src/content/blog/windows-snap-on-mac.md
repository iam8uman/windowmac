---
title: "How to Get Windows-Style Snap on a Mac"
slug: windows-snap-on-mac
description: "Coming from Windows? The Mac equivalents of Windows key + Arrow, Snap layouts, Snap Assist and snap groups, what macOS still lacks, and how to make snapping feel familiar."
publishedAt: 2026-11-17
type: how-to
tags:
  - how-to
  - alternatives
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "What is the Mac equivalent of Windows key + Arrow?"
    answer: "Fn-Control plus an arrow key, on macOS Sequoia 15 or later. It moves the active window to the left, right, top or bottom half of the screen."
  - question: "Does the Mac have Snap layouts like Windows 11?"
    answer: "Partly. Hover over the green button in a window's top-left corner and macOS shows layouts under Move & Resize and Fill & Arrange. Hold Option to see more. There are halves and quarters but no thirds."
  - question: "Is there a Snap Assist on Mac?"
    answer: "Not as such. macOS does not show thumbnails of other windows after you snap one. The closest is Fn-Control-Shift-Arrow, which places your two most recent windows side by side in one step."
  - question: "Why doesn't dragging a window to the edge snap it on my Mac?"
    answer: "Snapping by dragging needs macOS Sequoia 15 or later, and the switches in System Settings, Desktop & Dock, under Windows, must be on. On older versions, use a window manager."
  - question: "What is the best free app for Windows-style snapping on a Mac?"
    answer: "Rectangle is a popular free option with Windows-like keyboard shortcuts and edge snapping. Windowmac is a free alternative that uses a gesture under the pointer instead of the screen edges. Both are open source."
sources:
  - title: "Microsoft Support: Snap your windows"
    url: "https://support.microsoft.com/en-us/windows/snap-your-windows-885a9b1e-a983-a3b1-16cd-c531795e6241"
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Use Stage Manager on Mac"
    url: "https://support.apple.com/guide/mac-help/use-stage-manager-mchl534ba392/mac"
  - title: "Rectangle"
    url: "https://rectangleapp.com/"
seoTitle: "Windows Snap on Mac: Equivalents for Every Snap Feature"
seoDescription: "The Mac equivalents of Windows Snap: Fn-Control-Arrow for Win+Arrow, the green button for Snap layouts, and free apps that fill the gaps."
draft: false
---
The Mac equivalent of Windows Snap is macOS window tiling, built in since macOS Sequoia 15: drag a window to the left or right edge or a corner to snap it, or press **Fn-Control** with an arrow key, which works like **Windows key + Arrow**. Hovering over the green button in a window's corner shows a menu of layouts, similar to Snap layouts. A few things, such as Snap Assist and thirds, have no direct Mac version; a window manager fills those gaps.

Here is each Windows snap feature, its closest Mac match, and how to make the Mac feel more like home.

## What are the Mac equivalents of each Windows snap feature?

| On Windows | On a Mac | Notes |
| --- | --- | --- |
| Windows key + ← / → | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> / <kbd>→</kbd> | Left or right half (macOS 15+) |
| Windows key + ↑ / ↓ | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↑</kbd> / <kbd>↓</kbd> | Top or bottom half |
| Drag to the left or right edge | Same | Snaps to that half |
| Drag to a corner | Same | Snaps to a quarter |
| Drag to the top | Drag to the menu bar | Fills the desktop |
| Snap layouts (Windows key + Z, or hover the maximise button) | Hover over the green button | Move & Resize and Fill & Arrange layouts |
| Snap Assist | No direct match | <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> arranges your two recent windows |
| Snap groups | Stage Manager groups, roughly | Restores a set of apps together |

One difference trips up most switchers: on a Mac, the window buttons are in the **top-left** corner, and the green one is not a plain maximise. Clicking it enters full screen, which moves the app into a separate space. Hover over it instead to get the layouts.

## How do I snap with the keyboard like Windows key + Arrow?

On macOS Sequoia 15 or later:

- <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> or <kbd>→</kbd>: left or right half.
- <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd>: fill the screen, the Mac version of maximise.
- <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>R</kbd>: put the window back the way it was.

**Fn** is the bottom-left key, marked with a globe on many keyboards. It is an extra key compared with Windows because Control-Arrow is already used to switch desktops and open Mission Control. Our guide to [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/) lists every combination.

## How do I get Snap layouts on a Mac?

1. Hover the pointer over the **green button** of a window. Do not click.
2. Under **Move & Resize**, click a half or quarter to place this window.
3. Under **Fill & Arrange**, click a layout to place several windows at once.
4. Hold **Option** while the menu is open to see more layouts.

The same options are in the menu bar under **Window → Move & Resize**. What you will not find is any layout with thirds: macOS tiling only splits into halves and quarters.

## What does the Mac still not do that Windows Snap does?

- **Snap Assist.** After you snap one window, Windows offers thumbnails to fill the other half. macOS does not; you snap the second window yourself, or use the two-window arrangement shortcut.
- **Thirds.** macOS tiling has no thirds at all, which matters most on wide and ultrawide monitors.
- **Snapping on older systems.** Edge snapping needs macOS 15; on macOS Ventura 13 or Sonoma 14 there is no built-in snapping on the normal desktop.

## Which app makes a Mac snap most like Windows?

If the built-in tiling is not enough, two free, open-source options are worth trying first:

- **Rectangle** is a keyboard and edge-snapping window manager that many switchers like because it feels close to Windows: drag to an edge or use a shortcut. Its site lists macOS 14 or later for the current version.
- **[Windowmac](/)** takes a different approach that is quicker on big monitors: hold **Option**, nudge the mouse toward where the window should go, and let go. You never have to reach the screen edge, which matters on an ultrawide display. It runs on macOS 13 or later, so it also brings snapping to Ventura and Sonoma. Holding Option and pressing an arrow key gives halves, then thirds, then two thirds.

For a fuller comparison, including paid apps such as Magnet, see our [Rectangle alternatives](/blog/rectangle-alternatives/) roundup.

## Which should I use?

| Your situation | Best fit |
| --- | --- |
| macOS 15 or later, mostly halves | Built-in tiling and Fn-Control shortcuts |
| You want thirds or Windows-like shortcuts | A window manager such as Rectangle |
| Large or ultrawide monitor | A gesture window manager such as Windowmac |
| macOS 13 or 14 | Any window manager that supports your version |

The [Mac window manager quiz](/quiz/which-mac-window-manager/) matches your habits to a style in six questions. If you mostly put two apps side by side, start with [how to split screen on a Mac](/blog/how-to-split-screen-on-mac/).
