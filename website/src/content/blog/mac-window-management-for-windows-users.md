---
title: "Mac Window Management for Windows Users"
slug: mac-window-management-for-windows-users
description: "Switching from Windows? How Mac windows differ: buttons on the left, the green button, closing vs quitting, Command-Tab vs Alt-Tab, the Dock vs the taskbar, and how to get maximise and snap back."
publishedAt: 2026-11-17
type: explainer
tags:
  - how-to
  - keyboard-shortcuts
primaryApp: windowmac
feature: tools/window-shortcut-cheat-sheet
faq:
  - question: "How do I maximise a window on a Mac like on Windows?"
    answer: "On macOS Sequoia 15 or later, press Fn-Control-F or choose Window, Fill. Clicking the green button makes the app full screen instead, which is different from Windows maximise."
  - question: "What is Alt-Tab on a Mac?"
    answer: "Command-Tab switches between apps. To switch between windows of the same app, use Command-` (the grave accent key)."
  - question: "Why does the app keep running after I close the window?"
    answer: "On a Mac, closing a window does not usually quit the app. Press Command-Q to quit. A dot under the Dock icon shows the app is still open."
  - question: "Is the Command key the same as Ctrl on Windows?"
    answer: "For most everyday shortcuts, yes. Apple's switcher guide says many Mac shortcuts use Command where Windows uses Ctrl, so Ctrl-C becomes Command-C."
  - question: "Can I snap windows on a Mac like Windows Snap?"
    answer: "Yes, on macOS Sequoia 15 and later: drag to an edge or corner, or press Fn-Control with an arrow key. Window managers add thirds and more."
sources:
  - title: "Apple Support: Mac tips for Windows switchers"
    url: "https://support.apple.com/en-gb/HT204216"
  - title: "Apple Support: Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
seoTitle: "Mac Window Management for Windows Users: Key Differences"
seoDescription: "Coming from Windows? How Mac windows work: left-side buttons, the green button, close vs quit, Command-Tab, the Dock and how to maximise and snap."
draft: true
---
Mac windows work differently from Windows in five ways that matter: the window buttons are on the **left**; the green button makes an app **full screen** rather than maximising it; **closing a window doesn't quit the app**; **Command-Tab switches apps, not windows**; and the menu bar at the top belongs to whichever app is in front. Once you know those, the rest feels familiar, and macOS now has Windows-style snapping built in.

## Where are the close, minimise and maximise buttons?

In the **top-left** corner of every window, in this order: red (close), yellow (minimise), green (full screen, with tiling options when you hover). Apple's guide for Windows switchers points this out first because it is the most common stumble.

The big difference is the green button. On Windows, the third button maximises. On a Mac, clicking green moves the app into **full screen** in its own space, hiding the menu bar and Dock. To get a Windows-style maximise:

- Press <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd>, or choose **Window → Fill** (macOS Sequoia 15 or later).
- Or hover over the green button and choose the fill option.

Our guide to [maximising without full screen](/blog/maximize-window-mac-without-full-screen/) has every option, including older macOS versions.

## Why does the menu bar sit at the top of the screen?

On Windows, each window has its own menus. On a Mac, there is one menu bar at the top of the screen, and it shows the menus of the **app you are using**. Click a different window and the menu bar changes. If you cannot find a command, check you have clicked the right app first.

## What is the difference between closing and quitting?

| Windows habit | Mac equivalent | What happens on a Mac |
| --- | --- | --- |
| Click the X | Click red, or <kbd>Command</kbd>-<kbd>W</kbd> | The window closes; the app usually keeps running |
| Alt-F4 on the last window | <kbd>Command</kbd>-<kbd>Q</kbd> | The app quits |
| Task Manager, End Task | <kbd>Option</kbd>-<kbd>Command</kbd>-<kbd>Esc</kbd> | Force Quit window |

An app with no windows still shows a dot under its icon in the Dock. That is normal. Quit it with Command-Q if you want it gone. The full set of options is in [hide vs minimise vs close](/blog/hide-minimize-close-mac/).

## How do I switch between apps and windows?

- <kbd>Command</kbd>-<kbd>Tab</kbd> switches **apps**. Hold Command and keep tapping Tab to move along the list.
- <kbd>Command</kbd>-<kbd>`</kbd> switches **windows** of the current app.
- <kbd>Control</kbd>-<kbd>↑</kbd> opens **Mission Control**, showing every window at once, the nearest thing to Windows Task View.

So where Alt-Tab on Windows gets you to any window, on a Mac it is usually Command-Tab to the app, then Command-` to the window. See [switching between windows of the same app](/blog/switch-windows-same-app-mac/) for more.

## Is the Dock the same as the taskbar?

Roughly. The Dock holds app shortcuts and shows which apps are running with a dot. Minimised windows go into it, and the Trash (the Mac's Recycle Bin) lives at its end. Unlike the taskbar, it does not list each window separately, which is another reason Command-` and Mission Control matter.

## Which shortcuts change?

Apple's switcher tips say many Mac shortcuts use the **Command** key where Windows uses Ctrl:

| Windows | Mac |
| --- | --- |
| Ctrl-C, Ctrl-V, Ctrl-X | <kbd>Command</kbd>-<kbd>C</kbd>, <kbd>V</kbd>, <kbd>X</kbd> |
| Ctrl-Z | <kbd>Command</kbd>-<kbd>Z</kbd> |
| Alt-Tab | <kbd>Command</kbd>-<kbd>Tab</kbd> |
| Ctrl-W (close tab or window) | <kbd>Command</kbd>-<kbd>W</kbd> |
| Windows key search | <kbd>Command</kbd>-<kbd>Space</kbd> (Spotlight) |
| Windows key + Arrow (snap) | <kbd>Fn</kbd>-<kbd>Control</kbd>-Arrow |

Right-click is a two-finger click on a trackpad, or a click on the right side of an Apple mouse.

## How do I snap windows like on Windows?

Since macOS Sequoia 15, dragging a window to the left or right edge snaps it to that half, corners give quarters, and the menu bar fills the screen. The keyboard version is <kbd>Fn</kbd>-<kbd>Control</kbd> with an arrow. What macOS does not have is thirds or Snap Assist. Our [Windows-style snap on Mac](/blog/windows-snap-on-mac/) guide maps each Windows Snap feature to its Mac equivalent.

If you want more than the built-in options, [Windowmac](/) is a free, open-source window manager: hold Option and flick the mouse toward where the window should go, or press an arrow key while holding Option for halves, then thirds. Print the shortcuts you are learning with the [cheat sheet builder](/tools/window-shortcut-cheat-sheet/), which shows built-in and Windowmac keys side by side.
