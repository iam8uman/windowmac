---
title: "How to Stop Windows Opening on the Wrong Monitor on a Mac"
slug: windows-open-on-wrong-monitor-mac
description: "Apps opening on your laptop when you want the big monitor, or the other way round? Set the main display, assign apps to a display, and use the settings that decide where windows appear."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
  - multiple-monitors
primaryApp: windowmac
feature: tools/multi-monitor-planner
faq:
  - question: "How do I make apps open on my external monitor?"
    answer: "Make the monitor the main display in System Settings, Displays, or assign specific apps to it: Control-click the app in the Dock, choose Options, then Desktop on Display for that monitor."
  - question: "Why does an app always open on the same screen?"
    answer: "Most apps reopen windows where they were last closed. Move the window to the screen you want, then quit the app there so it remembers that position."
  - question: "Why is Desktop on Display missing from the Dock menu?"
    answer: "It only appears when more than one display is connected and Displays have separate Spaces is turned on in Desktop & Dock settings."
  - question: "Do new windows follow the pointer to the active screen?"
    answer: "It depends on the app. Many open new windows on the screen where the app's last window was. Assigning the app to a display gives you more control."
sources:
  - title: "Apple Support: Work in multiple spaces on Mac"
    url: "https://support.apple.com/guide/mac-help/work-in-multiple-spaces-mh14112/mac"
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
seoTitle: "Mac Windows Opening on the Wrong Monitor? How to Fix It"
seoDescription: "Stop Mac apps opening on the wrong screen: set the main display, assign apps to a display from the Dock, and make apps remember the right monitor."
draft: true
---
To stop windows opening on the wrong monitor, first make the screen you use most the **main display** in **System Settings → Displays**. Then assign stubborn apps to a display: Control-click the app in the Dock, choose **Options**, and pick **Desktop on Display** for the monitor you want. For the rest, move the window where you want it and quit the app there, since most apps reopen windows where they were last closed.

## Why do windows open on the wrong screen?

There is no single rule, which is why this is confusing. Where a window appears depends on:

- **The app's memory.** Most apps save where each window was and reopen it there.
- **The main display.** The display with the menu bar is the default home for many new windows.
- **App assignments.** An app assigned to a desktop or display opens there.
- **Space settings.** With **When switching to an application, switch to a Space with open windows for the application** on, macOS jumps to the space that already has the app's windows.

## How do I set the main display?

1. Open **System Settings → Displays**.
2. Select the monitor you want as the main one and set **Use as** to **Main display**.
3. Or click **Arrange** and drag the menu bar onto that display's icon.

This moves the menu bar to that screen. See [how to arrange displays on a Mac](/blog/arrange-displays-mac/) for the Arrange view.

## How do I make an app always open on one monitor?

1. Turn on **Displays have separate Spaces** in **System Settings → Desktop & Dock**, under Mission Control.
2. Open the app and move it to the monitor where it should live.
3. Control-click its icon in the Dock and choose **Options**.
4. Under **Assign To**, choose **Desktop on Display** followed by that monitor.

Apple describes this option as opening the app in the current space on a specific display. It only appears with more than one display connected. Other choices are **This Desktop**, **All Desktops** and **None**.

## How do I make an app remember the right screen?

For apps you do not want to assign:

1. Open the app and drag its window to the right monitor.
2. Size it how you like.
3. Quit the app with <kbd>Command</kbd>-<kbd>Q</kbd> while the window is there.

Next time, most apps reopen on that monitor. If **Close windows when quitting an application** is on in **Desktop & Dock**, apps start fresh instead of restoring old windows, which can make them open on the main display.

## What if windows land on a monitor that is not connected?

Then they open off-screen. Our guide on [getting an off-screen window back](/blog/window-off-screen-mac/) has the quickest fixes, starting with **Window → Fill**.

## How do I move a window quickly when it opens in the wrong place?

Even with the settings right, some windows will land on the wrong screen. The fastest fix is a shortcut. macOS has none for moving a window between displays, but window managers do. In [Windowmac](/), hold Option and press <kbd>]</kbd> for the next screen or <kbd>[</kbd> for the previous one; the window keeps its layout and the pointer follows it. For every other way, see [how to move a window to another monitor](/blog/move-window-to-another-monitor-mac/).

## Which fix should I use?

| Problem | Fix |
| --- | --- |
| Most new windows go to the laptop | Make the monitor the main display |
| One app always on the wrong screen | Dock → Options → Desktop on Display |
| An app forgets where it was | Move it, then quit it there |
| Windows open where no screen is | Window → Fill, then fix Arrange |
| Occasional strays | A next-screen shortcut from a window manager |

Planning a new layout? The [multi-monitor planner](/tools/multi-monitor-planner/) shows how your displays line up before you rearrange them.
