---
title: "Magnet vs Rectangle: Which Mac Window Manager Should You Use?"
slug: magnet-vs-rectangle
description: "Magnet and Rectangle both snap Mac windows by dragging or with shortcuts. Here is how they differ on price, open source, macOS support, sync and automation, and which one suits whom."
publishedAt: 2026-11-17
type: comparison
tags:
  - alternatives
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "Is Rectangle better than Magnet?"
    answer: "For most people who are happy installing apps from outside the App Store, Rectangle does more for free: it is open source and has more keyboard actions and URL automation. Magnet is the better choice if you want a Mac App Store purchase with iCloud sync, or if you are on macOS 13."
  - question: "Is Magnet a one-time purchase?"
    answer: "Yes. Its Mac App Store listing describes a perpetual licence with no subscription and no in-app purchases. It costs $4.99 on the US store."
  - question: "Can I use Rectangle and Magnet together?"
    answer: "It is not a good idea. Both listen for the same kinds of drags and shortcuts, so they can fight over the same window. Pick one and quit the other."
  - question: "Does Magnet work on macOS 27?"
    answer: "Magnet's listing names Ventura, Sonoma and Sequoia and requires macOS 13.0 or later. Check the App Store page for the latest compatibility before buying."
  - question: "Is there a free alternative to Magnet besides Rectangle?"
    answer: "Yes. Loop and Windowmac are free and open source and use a radial gesture, and Raycast's free plan includes window management commands."
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
Rectangle is the better pick for most people: it is free, open source, has more keyboard actions and can be scripted with URLs. Magnet is the better pick if you want to buy from the Mac App Store, want settings synced through iCloud, or are on macOS 13, which the current Rectangle no longer supports. Both snap windows by dragging them to the screen edges or with keyboard shortcuts, so day to day they feel similar.

Here is the detail behind that verdict, using facts from each app's own listing and site.

## How do Magnet and Rectangle compare?

| | Magnet | Rectangle |
| --- | --- | --- |
| Price | $4.99 on the US Mac App Store | Free |
| Licence | Perpetual licence, no subscription, no in-app purchases | Open source, MIT licence |
| Where to get it | Mac App Store | rectangleapp.com, GitHub or Homebrew |
| macOS required | 13.0 or later | 14 or later (older builds for 10.13 to 13) |
| Snap by dragging | Yes, trigger areas | Yes, snap areas at edges and corners |
| Keyboard shortcuts | Yes, customisable | Yes, with sizes like sixths, eighths and ninths |
| Green button menu | Yes | Not listed |
| Custom layouts | Unlimited custom commands | Custom sizes are a Rectangle Pro feature |
| Settings sync | iCloud (optional) | Import and export a JSON file |
| Automation | Not listed | `rectangle://execute-action` URLs |
| Vertical displays | Supported | Portrait layouts supported |

Magnet's facts come from its Mac App Store listing; Rectangle's from its website and GitHub page.

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
| Want free and open source | Rectangle |
| Want to script window moves | Rectangle |
| Prefer the Mac App Store | Magnet |
| Use several Macs and want settings synced | Magnet |
| Are on macOS 13 Ventura | Magnet, or an older Rectangle build |
| Need sixths or ninths on a big screen | Rectangle |

## Is there a third option worth considering?

If what bothers you about both is dragging windows all the way to the screen edge, a radial window manager may suit you better. [Windowmac](/) is free and open source: hold Option, nudge the mouse toward where the window should go and let go, with no edge to aim for. It runs on macOS 13 or later and has thirds, quarters, next-screen moves and an undo. It is not on the App Store, though, so if that matters, Magnet is still the simpler choice.

And if you are on macOS Sequoia 15 or later, check whether you need an app at all: built-in tiling now covers halves, quarters and fill. Our [macOS tiling vs Rectangle](/blog/macos-tiling-vs-rectangle/) guide compares them. For more options, see the [Rectangle alternatives](/blog/rectangle-alternatives/) roundup or take the [window manager quiz](/quiz/which-mac-window-manager/).
