---
title: "Windowmac vs Loop: Two Radial Window Managers Compared"
slug: windowmac-vs-loop
description: "Windowmac and Loop both snap Mac windows with a radial gesture while you hold a key. How they differ on licence, Strip mode, drag snapping, install and maturity, and which one to pick."
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
    answer: "Loop is the more established project, installs with Homebrew and also snaps windows when you drag them to an edge. Windowmac adds Strip, which lines up every window on a screen as scrolling columns. For radial snapping alone, both do the job."
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
Windowmac and Loop work the same way at heart: hold a trigger key, move the mouse toward where a window should go, and let go. Both are free, open source and need macOS 13 or later. Choose **Loop** if you want the more established project with a large community, Homebrew installs and drag-to-edge snapping as well. Choose **Windowmac** if you want **Strip**, its scrolling-columns mode for screens with many windows, or prefer the more permissive MIT licence.

This comparison is written by the Windowmac team, so we have kept to facts from Loop's own README and been clear where Loop is ahead.

## How do Windowmac and Loop compare?

| | Windowmac | Loop |
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

If all you want is radial snapping, either will serve you well, and you can try one and then the other in a few minutes.

## Where is Loop ahead?

- **Maturity and community.** Loop has been around longer, has around 12,000 stars on GitHub and a long commit history. More people using it means more issues found and fixed.
- **Homebrew.** `brew install loop` installs and updates it alongside your other tools.
- **Drag snapping.** Loop also snaps windows when you drag them to a screen edge, so it can replace edge-snapping apps entirely.
- **AppleScript and shell.** Loop lists AppleScript as well as its URL scheme.
- **Focus switching.** Loop's comparison table marks it for switching focus between windows.

## Where is Windowmac ahead?

- **Strip.** Hold Option and press **S**, and every window on that screen becomes a column on one horizontal strip that can be wider than the screen. A and D move between columns, Shift-A and Shift-D reorder them, W cycles a column between a third, a half and two thirds, and a bar of app icons shows where you are. New windows join next to the one you are in. Turning Strip off puts every window back where it was. Loop's README does not list anything like it.
- **MIT licence.** More permissive than GPL-3.0 if you want to reuse the code in another project.
- **Privacy stated plainly.** Windowmac needs only the Accessibility permission, has no account and never connects to the internet.
- **A command to list every action** (`Windowmac --list`), handy when building scripts.

Windowmac is not on the Mac App Store. You install it with a one-line Terminal command or a .zip download, and it is signed with a Developer ID and notarized by Apple.

## Which should you choose?

| If you | Choose |
| --- | --- |
| Want the most established radial manager | Loop |
| Install everything with Homebrew | Loop |
| Also want drag-to-edge snapping | Loop |
| Often have more windows than fit on screen | Windowmac, for Strip |
| Want an MIT-licensed codebase | Windowmac |
| Just want radial snapping | Either |

To try Windowmac, the [home page](/) has a live demo you can drive with your mouse. If you are weighing other kinds of window managers too, our [Rectangle alternatives](/blog/rectangle-alternatives/) roundup and the [window manager quiz](/quiz/which-mac-window-manager/) cover the wider field, and the [best window managers for Mac](/blog/best-window-managers-mac-2027/) list puts both in context.
