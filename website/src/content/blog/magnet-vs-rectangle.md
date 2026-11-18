---
title: "Magnet vs Rectangle (and the Free App That Beats Both)"
slug: magnet-vs-rectangle
description: "Magnet and Rectangle both snap Mac windows by dragging to the edges. Here is how they differ on price, macOS support and automation, and why Windowmac, free and open source, beats both."
publishedAt: 2026-11-17
type: comparison
tags:
  - alternatives
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "Is Rectangle better than Magnet?"
    answer: "Rectangle does more for free: it is open source and has more keyboard actions and URL automation, while Magnet adds App Store purchase and iCloud sync. If you want more than either, Windowmac is free, open source, supports macOS 13 and snaps with a flick instead of a drag to the edge."
  - question: "Is Magnet a one-time purchase?"
    answer: "Yes. Its Mac App Store listing describes a perpetual licence with no subscription and no in-app purchases. It costs $4.99 on the US store."
  - question: "Can I use Rectangle and Magnet together?"
    answer: "It is not a good idea. Both listen for the same kinds of drags and shortcuts, so they can fight over the same window. Pick one and quit the other."
  - question: "Does Magnet work on macOS 27?"
    answer: "Magnet's listing names Ventura, Sonoma and Sequoia and requires macOS 13.0 or later. Check the App Store page for the latest compatibility before buying."
  - question: "Is there a free alternative to Magnet besides Rectangle?"
    answer: "Yes: Windowmac. It is free and open source, runs on macOS 13 like Magnet, and snaps with a flick of the mouse instead of a drag to the edge. Loop and Raycast's free plan are other options."
sources:
  - title: "Magnet on the Mac App Store"
    url: "https://apps.apple.com/us/app/magnet/id441258766?mt=12"
  - title: "Rectangle"
    url: "https://rectangleapp.com/"
  - title: "Rectangle on GitHub"
    url: "https://github.com/rxhanson/Rectangle"
  - title: "Rectangle Pro"
    url: "https://rectangleapp.com/pro"
seoTitle: "Magnet vs Rectangle: Which Mac Window Manager to Use"
seoDescription: "Magnet vs Rectangle compared: price, open source, macOS version, snapping, shortcuts, sync and automation. Who should pick each, plus free alternatives."
draft: false
---
Between the two, Rectangle wins for most people: it is free, open source, has more keyboard actions and can be scripted with URLs, while Magnet suits people who want a Mac App Store purchase with iCloud sync. But both make you drag windows to the screen edge, and that is the part a better app removes. Our pick over either is **Windowmac**: free and open source like Rectangle, supported on macOS 13 like Magnet, and you flick the mouse toward a half, third or quarter instead of aiming at an edge.

> **Our pick: Windowmac.** Free, MIT licensed, macOS 13+, a shortcut for every layout, plus Strip, stash and undo. [Install it in one line](/#install).

Here is the detail behind that verdict, using facts from each app's own listing and site.

## How do Magnet and Rectangle compare?

| | Magnet | Rectangle | Windowmac (our pick) |
| --- | --- | --- | --- |
| Price | $4.99 on the US Mac App Store | Free | **Free** |
| Licence | Perpetual licence, no subscription, no in-app purchases | Open source, MIT licence | **Open source, MIT licence** |
| Where to get it | Mac App Store | rectangleapp.com, GitHub or Homebrew | windowmac.app, one-line install or .zip |
| macOS required | 13.0 or later | 14 or later (older builds for 10.13 to 13) | **13 or later, Apple silicon and Intel** |
| How you snap | Drag to trigger areas | Drag to snap areas at edges and corners | **Hold Option and flick toward the target; no edge to aim for** |
| Keyboard shortcuts | Yes, customisable | Yes, with sizes like sixths, eighths and ninths | **Yes, every layout while holding Option; every key rebindable** |
| Green button menu | Yes | Not listed | No |
| Custom layouts | Unlimited custom commands | Custom sizes are a Rectangle Pro feature | **Custom layouts included** |
| Settings sync | iCloud (optional) | Import and export a JSON file | Not listed |
| Automation | Not listed | `rectangle://execute-action` URLs | **`windowmac://` link for every action** |
| Crowded screens | Not listed | Tile all windows in rows or columns | **Strip: every window as scrolling columns** |

Magnet's facts come from its Mac App Store listing; Rectangle's from its website and GitHub page; Windowmac's from [its own site](/).

## What do they have in common?

Both are snapping window managers rather than automatic tilers. Nothing moves until you drag a window to an edge or press a shortcut, and both cover the layouts most people use: halves, quarters and maximise. Both also support external and vertical monitors and let you change the keys. If you have used one, the other will feel familiar within a few minutes.

## Where is Rectangle stronger?

- **It costs nothing and you can read the code.** Rectangle is MIT licensed and its source is on GitHub.
- **More keyboard actions.** Beyond halves, quarters and thirds, its README lists sixths, eighths and ninths, tiling all windows in rows or columns, and cycling through stacked windows.
- **Automation.** Every action can be triggered with a `rectangle://` URL, so you can drive it from scripts or launchers.
- **Spectacle compatibility.** Rectangle is based on Spectacle and offers Spectacle's default shortcuts on first run, which helps people moving from that discontinued app.
- **An upgrade path.** If you later want saved app layouts, the same developer sells Rectangle Pro, which imports Rectangle's shortcuts.

## Where is Magnet stronger?

- **Mac App Store.** You install and update it through the App Store, and it is tied to your Apple Account, which some people and companies prefer.
- **iCloud sync.** Settings can sync between your Macs without exporting files.
- **Green button menu.** Magnet can add its layouts to the menu that appears on the green window button, which is easy to discover.
- **macOS 13.** Magnet's current version supports Ventura. The current Rectangle needs macOS 14; on Ventura you would have to use an older Rectangle build.
- **Custom commands.** The listing describes an unlimited number of custom commands with configurable layout properties.

## Which should you choose?

| If you | Choose |
| --- | --- |
| Want the best of both, free | **Windowmac** |
| Have a big or ultrawide monitor | **Windowmac** |
| Want free and open source | Windowmac or Rectangle |
| Want to script window moves | Rectangle |
| Prefer the Mac App Store | Magnet |
| Use several Macs and want settings synced | Magnet |
| Are on macOS 13 Ventura | Windowmac or Magnet |
| Need sixths or ninths on a big screen | Rectangle |

## Why is Windowmac better than both?

Magnet and Rectangle solve the same problem the same way: drag a window to an edge or remember a shortcut. [Windowmac](/) keeps the shortcuts and replaces the drag. Hold Option, nudge the mouse toward where the window should go and let go; a ring under the pointer shows the target and an outline previews the result. That is faster on every screen and much faster on big ones.

- **Free and open source,** like Rectangle, with nothing to buy later.
- **macOS 13 and Intel supported,** like Magnet, where the current Rectangle needs macOS 14.
- **Things neither has:** Strip for crowded screens, stash, undo and click-to-cycle through half, third and two thirds.
- **Private:** no account, and it never connects to the internet.

The one thing to know: it is not on the Mac App Store. It is signed with a Developer ID and notarized by Apple, and installs with [one command](/#install) or a .zip.

And if you are on macOS Sequoia 15 or later, check whether you need an app at all: built-in tiling now covers halves, quarters and fill. Our [macOS tiling vs Rectangle](/blog/macos-tiling-vs-rectangle/) guide compares them. For more options, see the [Rectangle alternatives](/blog/rectangle-alternatives/) roundup or take the [window manager quiz](/quiz/which-mac-window-manager/).
