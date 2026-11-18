---
title: "How to Switch Between Windows of the Same App on a Mac"
slug: switch-windows-same-app-mac
description: "Command-Tab switches apps, not windows. Here is how to jump between windows of one app on a Mac with Command-`, App Exposé, the Window menu, the Dock and tabs."
publishedAt: 2026-11-17
type: how-to
tags:
  - keyboard-shortcuts
  - how-to
primaryApp: windowmac
feature: tools/shortcut-trainer
faq:
  - question: "How do I switch between windows of the same app on a Mac?"
    answer: "Press Command and the grave accent key (Command-`). Each press brings the next window of the current app to the front. Add Shift to go backwards."
  - question: "Why doesn't Command-Tab switch windows?"
    answer: "Command-Tab switches between apps. Once you are in the right app, use Command-` to move between its windows."
  - question: "How can I see all of an app's windows at once?"
    answer: "Press Control-Down Arrow for App Exposé, which shows only the current app's windows. Click the one you want."
  - question: "Command-` does nothing on my keyboard. Why?"
    answer: "Make sure you are pressing the key that types the grave accent (`), which sits in different places on different keyboard layouts. The app also needs more than one open window on the current desktop."
sources:
  - title: "Apple Support: Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
  - title: "Apple Support: Use Mission Control on Mac"
    url: "https://support.apple.com/guide/mac-help/use-mission-control-mh35798/mac"
  - title: "AltTab on GitHub"
    url: "https://github.com/lwouis/alt-tab-macos"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
seoTitle: "Switch Between Windows of the Same App on Mac"
seoDescription: "Switch windows of one app on a Mac with Command-`, see them all with Control-Down Arrow, or pick one from the Window menu or Dock. Steps for each."
draft: true
---
To switch between windows of the same app on a Mac, press **Command-`** (Command and the grave accent key). Each press brings the next window of the current app to the front; add **Shift** to go the other way. To see all of the app's windows at once and pick one, press **Control-Down Arrow**.

This catches out nearly everyone coming from Windows, where Alt-Tab lists every window. On a Mac, **Command-Tab** lists apps, and Command-` moves between windows inside one app.

## What are the ways to switch windows within an app?

| Method | How | Best for |
| --- | --- | --- |
| Keyboard | <kbd>Command</kbd>-<kbd>`</kbd>, <kbd>Shift</kbd>-<kbd>Command</kbd>-<kbd>`</kbd> | Two or three windows |
| App Exposé | <kbd>Control</kbd>-<kbd>↓</kbd> | Many windows, pick by sight |
| Window menu | Window → choose the window by name | Many windows with clear titles |
| Dock | Control-click the app icon, choose a window | Mouse users |
| Tabs | Window → Merge All Windows | Apps you use with many windows |

## How does Command-` work?

1. Make sure you are in the right app (use <kbd>Command</kbd>-<kbd>Tab</kbd> to get there).
2. Press <kbd>Command</kbd>-<kbd>`</kbd>. The next window comes forward.
3. Keep pressing to cycle. <kbd>Shift</kbd>-<kbd>Command</kbd>-<kbd>`</kbd> cycles backwards.

The two shortcuts are listed in Apple's Mac keyboard shortcuts as "switch between the windows of the app you are using" and "activate the previous open window". The key is the grave accent, the same one that types a backtick. Its position depends on your keyboard layout.

## How do I see every window of one app?

Press <kbd>Control</kbd>-<kbd>↓</kbd>. macOS shows only the current app's windows, spread out so none overlap; Apple calls this App Exposé. Click the one you want. If you have turned on the App Exposé gesture in Trackpad settings, swiping down with three or four fingers does the same.

App Exposé is better than Command-` when you have more than three or four windows, because you can see them instead of cycling blind.

## Can I pick a window from a menu?

Yes. Most apps list their open windows at the bottom of the **Window** menu in the menu bar. Choose one by its title. Control-clicking an app's icon in the Dock also shows its open windows at the top of the menu.

## Should I use tabs instead?

If an app supports tabs, merging its windows can make switching easier. Choose **Window → Merge All Windows** to combine an app's windows into one tabbed window. Apple notes that you can split a tab back out with **Window → Move Tab to New Window** or by dragging the tab away. In **Desktop & Dock** settings, **Prefer tabs when opening documents** controls whether new documents open as tabs.

## What about switching windows across all apps?

macOS has no built-in switcher that lists every window of every app the way Windows' Alt-Tab does. Your options:

- **Mission Control** (<kbd>Control</kbd>-<kbd>↑</kbd>) shows every window on the current desktop. See our [Mission Control guide](/blog/mission-control-mac/).
- **Command-Tab, then Command-`** gets to any window in two steps.
- **AltTab**, a free open-source app, adds a Windows-style window switcher.

## Does Command-` work across desktops and full screen?

Command-` cycles through the windows of the current app that macOS can bring forward. A window that is minimised in the Dock or open in full screen in its own space behaves differently: click a minimised window in the Dock to restore it, and use Mission Control or a swipe to reach a full-screen window. If the app's windows are spread over several desktop spaces, the setting **When switching to an application, switch to a Space with open windows for the application** in **Desktop & Dock** decides whether macOS jumps to them.

## Which method should I use?

| Windows open in the app | Best way to switch |
| --- | --- |
| Two | Command-` |
| Three to five | Command-` or App Exposé |
| Many, with clear titles | The Window menu |
| Many, similar-looking | App Exposé, or merge them into tabs |

## How do I stop needing to switch so much?

Switching is often a symptom of windows sitting on top of each other. Arranging two or three windows side by side means you can see them all and just click. [Snapping windows](/blog/how-to-snap-windows-on-mac/) covers the built-in way. With [Windowmac](/), its Strip mode (hold Option and press S) lines up every window on the screen as columns, and Option-A and Option-D jump between them, which turns window switching into moving left or right.

To drill these keys until they are automatic, use the [shortcut trainer](/tools/shortcut-trainer/).
