---
title: "Window Manager Stopped Working on Your Mac? Fix the Accessibility Permission"
slug: window-manager-not-working-mac
description: "Rectangle, Magnet, Windowmac or another window manager stopped moving windows? The usual cause is the Accessibility permission. How to check it, reset it and fix the other common causes."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
primaryApp: windowmac
feature: quiz/which-mac-window-manager
faq:
  - question: "Why does my window manager need Accessibility permission?"
    answer: "macOS only lets one app move and resize another app's windows through the Accessibility interface. Every window manager needs it, and none can work without it."
  - question: "My window manager is switched on in Accessibility but still does nothing. What now?"
    answer: "Turn the switch off and on again, quit and reopen the app. If that fails, remove the app from the list with the minus button or the reset command below, then reopen it and grant permission again."
  - question: "How do I reset Accessibility permission for one app?"
    answer: "In Terminal, run tccutil reset Accessibility followed by the app's bundle identifier, then reopen the app and allow access when macOS asks."
  - question: "Why does my window manager only fail in some apps?"
    answer: "Some windows have a fixed size, run full screen, or belong to apps the window manager has been told to ignore. Check the app's ignore list and try with a normal window."
sources:
  - title: "Apple Support: Allow accessibility apps to access your Mac"
    url: "https://support.apple.com/guide/mac-help/mh43185/mac"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
  - title: "Windowmac on GitHub"
    url: "https://github.com/iam8uman/windowmac"
seoTitle: "Window Manager Not Working on Mac? Fix Accessibility"
seoDescription: "Fix a Mac window manager that stopped moving windows: check and reset the Accessibility permission, find shortcut clashes and ignored apps."
draft: true
---
When a Mac window manager such as Rectangle, Magnet or Windowmac suddenly stops moving windows, the cause is almost always the **Accessibility permission**. Open **System Settings → Privacy & Security → Accessibility**, find the app, and turn its switch off and on again; then quit and reopen the app. If it still does nothing, remove it from the list or reset the permission, reopen it and allow access again when macOS asks.

## Why do window managers need Accessibility?

macOS only lets an app move and resize other apps' windows through its Accessibility interface. That is true for every window manager, built for the App Store or not. Without the permission, the app can run, show its menu bar icon and even show its own previews, but the windows will not move.

Apple's guide asks you to grant access only to apps you know and trust, because Accessibility access is powerful. A window manager uses it to move windows and, for gesture apps, to notice a held key.

## How do I check the permission?

1. Choose **Apple menu → System Settings**.
2. Click **Privacy & Security** in the sidebar.
3. Click **Accessibility** (scroll down if needed).
4. Find your window manager in the list and make sure its switch is on.

If the app is not in the list, click the **Add (+)** button at the bottom, find the app, select it and click **Open**.

## What if the switch is on but nothing works?

This is the most common case, and it often follows an app update. macOS ties the permission to the app's identity, and if that changes (for example after a reinstall from a different download), the old entry can stay switched on while no longer matching the app. Try in order:

1. Turn the app's switch **off**, then **on** again.
2. Quit the window manager and open it again.
3. Remove the app from the list (select it and click the minus button below the list), reopen the app, and allow access when asked.
4. Reset the permission in Terminal, then reopen the app:

```bash
tccutil reset Accessibility com.example.appid
```

Replace `com.example.appid` with the app's bundle identifier. For Windowmac it is `com.iam8uman.windowmac`, and Windowmac's menu bar icon also has a **Fix Accessibility Permission…** command that does this for you.

## What else can stop a window manager working?

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Nothing moves anywhere | Accessibility permission | Steps above |
| Shortcuts do nothing, dragging works | Another app took the shortcuts | Check launchers, remappers and other window managers |
| Works in most apps, not one | Fixed-size window, full screen, or app on the ignore list | Try a normal window; check the ignore list |
| Snapping fights with macOS tiling | Both respond to edge drags | Turn off one of them for dragging |
| Stopped after a macOS update | Permission entry out of date, or app needs an update | Reset permission; check for a new version |

Apple notes that some windows cannot be moved or resized, which no window manager can change. If macOS tiling itself is also misbehaving, see [Mac window tiling not working](/blog/window-tiling-not-working-mac/).

## How do I avoid two apps clashing?

Run one window manager at a time for each job. If you keep Rectangle for shortcuts and macOS tiling for dragging, turn off Rectangle's snap areas; if you use a gesture app like [Windowmac](/), its shortcuts only work while Option is held, so they will not clash with Fn-Control or most other apps. Our [macOS tiling vs Rectangle](/blog/macos-tiling-vs-rectangle/) guide covers running two together.

## When is it time to try a different app?

If a window manager keeps losing its permission or no longer supports your macOS version, it may be time to switch. Windowmac is free and open source, needs only the Accessibility permission, never connects to the internet and is signed with a Developer ID and notarized by Apple. For a wider look at the options, see the [Rectangle alternatives](/blog/rectangle-alternatives/) roundup or take the [window manager quiz](/quiz/which-mac-window-manager/).
