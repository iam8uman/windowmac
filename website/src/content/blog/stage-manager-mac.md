---
title: "Stage Manager on Mac: How It Works and How to Turn It Off"
slug: stage-manager-mac
description: "What Stage Manager does on a Mac, how to turn it on or off from Control Center or System Settings, how to group apps, the settings worth changing, and when a different tool suits you better."
publishedAt: 2026-11-17
type: explainer
tags:
  - macos-features
  - how-to
primaryApp: windowmac
feature: quiz/mac-multitasking-style
faq:
  - question: "How do I turn off Stage Manager on a Mac?"
    answer: "Click Control Center in the menu bar and click the Stage Manager control, or open System Settings, Desktop & Dock, and turn off Stage Manager under Desktop & Stage Manager."
  - question: "Why can't I turn on Stage Manager?"
    answer: "Stage Manager is dimmed unless Displays have separate Spaces is on. Turn that on in System Settings, Desktop & Dock, under Mission Control, then try again."
  - question: "How do I hide the app strip on the left in Stage Manager?"
    answer: "Turn off Show recent apps in Stage Manager in Desktop & Dock settings. The strip hides until you move the pointer to the left edge of the screen."
  - question: "Can I use more than one window at a time in Stage Manager?"
    answer: "Yes. Drag an app from the strip on the left into the centre to add it to the current group. The windows can be moved, resized and overlapped freely."
  - question: "Is Stage Manager a window manager?"
    answer: "It organises which apps are in front, but it does not snap or tile windows into halves or thirds. You can use window tiling or a window manager alongside it to arrange the windows in a group."
sources:
  - title: "Apple Support: Use Stage Manager on Mac"
    url: "https://support.apple.com/guide/mac-help/use-stage-manager-mchl534ba392/mac"
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
seoTitle: "Stage Manager on Mac: How It Works and How to Turn It Off"
seoDescription: "How Stage Manager works on a Mac, how to turn it on or off, group apps, hide the side strip, and fix it when the switch is greyed out."
draft: false
---
Stage Manager is a macOS feature that puts the app you are using in the centre of the screen and lines up your other recent apps as thumbnails along the left side; click a thumbnail to swap it in. To turn it on or off, click **Control Center** in the menu bar and click **Stage Manager**, or use **System Settings → Desktop & Dock**. If the switch is greyed out, turn on **Displays have separate Spaces** first.

That covers most questions. Below is how Stage Manager behaves day to day, the settings that change it most, and when something else might suit you better.

## How does Stage Manager work?

With Stage Manager on, your screen has two areas:

- **The stage** in the centre, where the current app's windows sit. You can move, resize and overlap them as normal.
- **The strip** on the left, showing recent apps (or groups of apps) as small thumbnails.

Clicking an app in the strip sends the current app to the strip and brings the new one to the stage. The effect is a tidier screen: only what you are working on is visible, and everything else is one click away.

## How do I turn Stage Manager on or off?

From the menu bar:

1. Click **Control Center** in the menu bar.
2. Click the **Stage Manager** control to toggle it.

From System Settings:

1. Open **Apple menu → System Settings → Desktop & Dock**.
2. Under **Desktop & Stage Manager**, switch **Stage Manager** on or off.

If you switch it often, put it in the menu bar: open **Control Center**, choose **Edit Controls**, go to **Desktop & Finder**, hover over Stage Manager, click the **More** button, choose **Add to Menu Bar** and click **Done**.

### Why is the Stage Manager switch greyed out?

Stage Manager depends on a Mission Control setting. In **System Settings → Desktop & Dock**, scroll to **Mission Control** and turn on **Displays have separate Spaces**. The Stage Manager switch then becomes available.

## How do I group apps in Stage Manager?

Groups are what make Stage Manager useful for real work, because you can keep the apps for one task together.

- **Add an app to the current group:** drag its thumbnail from the strip into the centre.
- **Remove an app from the group:** drag its window back to the strip on the left.
- **Switch groups:** click a group's thumbnail in the strip; all its windows come to the stage together.

A writing group might be a text editor and a browser; a meeting group might be a video call and notes. Inside a group, you still arrange the windows yourself, so it pairs well with window tiling: snap the two windows side by side and the group is ready to work in.

## Which Stage Manager settings are worth changing?

All of these are in **System Settings → Desktop & Dock**, under Desktop & Stage Manager.

| Setting | What it changes |
| --- | --- |
| **Show recent apps in Stage Manager** | Turn off to hide the strip until you move the pointer to the left edge, giving the stage the whole screen |
| **Show windows from an application** | **All at Once** brings every window of an app forward; **One at a Time** shows only the latest, and clicking the app again cycles to the next |
| **Show Items: In Stage Manager** | Whether desktop files and folders are visible while Stage Manager is on; if off, click the desktop to see them |
| **Show Desktop** | Whether clicking the wallpaper clears windows away: always, or only in Stage Manager |

Hiding the recent apps strip is the change most people make first, especially on a laptop screen where the strip takes noticeable space.

## Is Stage Manager better than a window manager?

They solve different problems. Stage Manager decides **which** apps are on screen; a window manager decides **where** windows go. There is no snapping or tiling in Stage Manager itself.

| | Stage Manager | Window tiling or a window manager |
| --- | --- | --- |
| Hides apps you are not using | Yes | No |
| Snaps windows into halves or thirds | No | Yes |
| Groups apps by task | Yes | Some managers save layouts |
| Uses the left side of the screen | Yes, for the strip (can be hidden) | No |
| Keyboard driven | Mostly mouse | Usually both |

Many people end up using both, or neither. If you like the idea of separate contexts but find the strip distracting, [multiple desktops (Spaces)](/blog/multiple-desktops-mac/) give each task its own full screen instead. If what you really want is two or three windows neatly side by side, [snapping windows](/blog/how-to-snap-windows-on-mac/) is the more direct route, and a gesture tool such as [Windowmac](/) makes that a single flick.

## When should I turn Stage Manager off?

Stage Manager tends to get in the way if you:

- Work with many windows visible at once, such as on a large or ultrawide monitor.
- Drag files between apps that are not in the same group.
- Rely on Mission Control or Command-Tab more than on clicking.

It tends to help if you mostly work on a laptop, jump between a few tasks and like a clean screen. Not sure which camp you are in? The [Mac multitasking style quiz](/quiz/mac-multitasking-style/) compares Stage Manager with Spaces, Split View and tiling in seven questions, and our [Mission Control guide](/blog/mission-control-mac/) covers the other built-in way to see everything at once.
