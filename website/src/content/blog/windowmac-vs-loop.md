---
title: "Windowmac vs Loop: Why Windowmac Is the Better Radial Window Manager"
slug: windowmac-vs-loop
description: "Windowmac and Loop both snap Mac windows with a radial gesture. Windowmac adds Strip, a simpler MIT licence and a no-network promise. Here is the full comparison and why we pick Windowmac."
publishedAt: 2026-11-17
type: comparison
tags:
  - alternatives
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "Is Windowmac a fork of Loop?"
    answer: "No. Windowmac was inspired by radial window managers like Loop, but it is an independent implementation with no shared code."
  - question: "Are Windowmac and Loop free?"
    answer: "Yes, both are free and open source. Windowmac uses the MIT licence and Loop uses GPL-3.0."
  - question: "Which is better, Loop or Windowmac?"
    answer: "Windowmac. It does everything the radial menu in Loop does (preview, cycles, stash, custom layouts, URL automation) and adds Strip, which lines up every window on a screen as scrolling columns, under the more permissive MIT licence and with no network access at all."
  - question: "Can I use Caps Lock as the trigger key in either app?"
    answer: "Both suggest the same approach: remap Caps Lock to Control in System Settings, Keyboard, Modifier Keys, then choose Right Control as the trigger. Hyperkey or Karabiner-Elements also work."
  - question: "Do they work on the same macOS versions?"
    answer: "Yes. Both require macOS 13 Ventura or later and run on Apple silicon and Intel Macs."
sources:
  - title: "Loop on GitHub"
    url: "https://github.com/MrKai77/Loop"
  - title: "Loop latest release"
    url: "https://github.com/MrKai77/Loop/releases/latest"
  - title: "Windowmac on GitHub"
    url: "https://github.com/iam8uman/windowmac"
seoTitle: "Windowmac vs Loop: Radial Mac Window Managers Compared"
seoDescription: "Windowmac vs Loop: both free, open-source radial window managers for Mac. Compare licence, Strip, drag snapping, install and maturity to pick one."
draft: false
---
**Windowmac** is the better radial window manager for most people. Both apps work the same way at heart: hold a trigger key, move the mouse toward where a window should go, and let go. Both are free, open source and need macOS 13 or later. Windowmac matches Loop on the radial menu, preview, cycles, stash and custom layouts, then adds **Strip**, a scrolling-columns mode for screens with too many windows, under the more permissive MIT licence, with no account and no network access.

> **Our pick: Windowmac.** Everything you would use Loop for, plus Strip. [Install it in one line](/#install) or try the [live demo](/).

This comparison is written by the Windowmac team. Facts about Loop come from its own README.

## How do Windowmac and Loop compare?

| | Windowmac (our pick) | Loop |
| --- | --- | --- |
| Price | Free | Free |
| Licence | MIT | GPL-3.0 |
| macOS | 13 or later, Apple silicon and Intel | 13 or later |
| Radial menu with preview | Yes | Yes |
| Keyboard shortcuts with the trigger | Yes, every key can be changed | Yes, any key can be assigned |
| Cycles (press again for the next size) | Yes | Yes |
| Halves, thirds, quarters, screens, grow and shrink, undo | Yes | Yes |
| Custom layouts | Yes | Yes |
| Stash at the screen edge | Yes | Yes |
| Snap by dragging to an edge | Not part of Windowmac | Yes |
| Strip: scrolling columns per screen | Yes | Not listed |
| Scripting | `windowmac://` URLs and a `--list` command | `loop://` URLs, shell and AppleScript |
| Theming of ring and preview | Yes | Yes |
| Install | One-line installer or .zip | Homebrew (`brew install loop`) or .zip |
| Community | New project | About 12,000 GitHub stars when we checked |

## What do they have in common?

A lot, by design. Windowmac's README credits radial window managers like Loop as its inspiration, while being an independent implementation with no shared code. In both apps:

- A ring appears at the pointer when you hold the trigger key (Left Option by default in Windowmac).
- An outline previews where the window will land before you release.
- Clicking or pressing the same key again steps through a cycle, such as right half, right third, right two thirds.
- The trigger can be changed, and both suggest the same Caps Lock trick: remap Caps Lock to Control and pick Right Control.
- Windows can be stashed behind a screen edge and slid back out.
- Every action can be run from outside the app with a URL, so both work with Shortcuts and launchers.

So the radial basics are a tie. The difference is in what each app adds on top, and that is where Windowmac pulls ahead.

## Why is Windowmac better?

- **Strip.** Hold Option and press **S**, and every window on that screen becomes a column on one horizontal strip that can be wider than the screen. A and D move between columns, Shift-A and Shift-D reorder them, W cycles a column between a third, a half and two thirds, and a bar of app icons shows where you are. New windows join next to the one you are in. Turning Strip off puts every window back where it was. Loop's README does not list anything like it.
- **MIT licence.** More permissive than GPL-3.0 if you want to reuse the code in another project.
- **Privacy stated plainly.** Windowmac needs only the Accessibility permission, has no account and never connects to the internet.
- **A command to list every action** (`Windowmac --list`), handy when building scripts.

## What does Loop have that Windowmac does not?

Loop is older and has a bigger community (around 12,000 GitHub stars when we checked), installs with Homebrew, also snaps windows dragged to a screen edge, and lists AppleScript and focus switching. If drag-to-edge snapping is the one thing you cannot live without, that is Loop's niche. For everyone else, the radial gesture makes edge dragging unnecessary, and Strip is the feature you will use every day.

Windowmac is not on the Mac App Store. You install it with a one-line Terminal command or a .zip download, and it is signed with a Developer ID and notarized by Apple.

## Which should you choose?

| If you | Choose |
| --- | --- |
| Want the best radial window manager | **Windowmac** |
| Often have more windows than fit on screen | **Windowmac**, for Strip |
| Want an MIT-licensed codebase | **Windowmac** |
| Want an app that never touches the network | **Windowmac** |
| Must also drag windows to screen edges | Loop |
| Install everything with Homebrew | Loop |

To try Windowmac, the [home page](/) has a live demo you can drive with your mouse. If you are weighing other kinds of window managers too, our [Rectangle alternatives](/blog/rectangle-alternatives/) roundup and the [window manager quiz](/quiz/which-mac-window-manager/) cover the wider field, and the [best window managers for Mac](/blog/best-window-managers-mac-2027/) list puts both in context.
