---
title: "Mac Window Tiling Not Working? How to Fix It"
slug: window-tiling-not-working-mac
description: "Dragging to the edge does nothing, Fn-Control shortcuts don't tile, or Mission Control opens instead? The causes of broken window tiling on a Mac and how to fix each one."
publishedAt: 2026-11-17
type: troubleshooting
tags:
  - troubleshooting
  - macos-features
primaryApp: windowmac
feature: tools/window-shortcut-cheat-sheet
faq:
  - question: "Why can't I tile windows on my Mac?"
    answer: "Window tiling needs macOS Sequoia 15 or later. If you have that, check the switches for dragging windows to tile in System Settings, Desktop & Dock, under Windows."
  - question: "Why does dragging a window to the top open Mission Control?"
    answer: "Drag windows to top of screen to enter Mission Control is on. Turn it off in the Mission Control section of Desktop & Dock settings."
  - question: "Why don't the Fn-Control tiling shortcuts work?"
    answer: "Make sure you are pressing Fn (the globe key on many keyboards) as well as Control, that the app's window can be resized, and that no other app has taken the same shortcut."
  - question: "Can another window manager stop macOS tiling working?"
    answer: "Yes. If another app also responds to dragging windows to the edges or to the same shortcuts, the two can interfere. Turn off one of them for that feature."
sources:
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Change Desktop & Dock settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-desktop-dock-settings-mchlp1119/mac"
  - title: "Apple Support: Work with app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/work-with-app-windows-mchlp2469/mac"
seoTitle: "Mac Window Tiling Not Working? 6 Fixes"
seoDescription: "Fix Mac window tiling: check your macOS version and Desktop & Dock switches, stop Mission Control grabbing drags, and fix Fn-Control shortcuts."
draft: true
---
If window tiling is not working on your Mac, check three things first: that you are on **macOS Sequoia 15 or later**; that the tiling switches are on in **System Settings → Desktop & Dock**, under **Windows**; and that **Drag windows to top of screen to enter Mission Control** is off if dragging to the top opens Mission Control. If only the keyboard shortcuts fail, make sure you are holding **Fn** (the globe key) as well as **Control**.

Here is each cause with its fix, in the order most likely to help.

## 1. Is your macOS version new enough?

Built-in window tiling arrived with macOS Sequoia 15, and is in Tahoe 26 and macOS 27. Choose **Apple menu → About This Mac** to check. On macOS Ventura 13 or Sonoma 14 there is no edge snapping and no Fn-Control shortcuts; Split View is the only built-in side-by-side option. A window manager adds snapping on those versions; see [how to snap windows on older macOS](/blog/snap-windows-older-macos/).

## 2. Are the tiling switches on?

1. Open **System Settings → Desktop & Dock**.
2. Scroll to **Windows**.
3. Turn on the switches you want. On macOS 27 they are:
   - **Drag windows to left or right edge of screen to tile**
   - **Drag windows to menu bar to fill screen**
   - **Hold ⌥ key while dragging windows to tile**

The names can differ slightly on earlier versions. With the last option, holding Option while dragging shows the tile targets sooner.

## 3. Is Mission Control taking over the drag?

If dragging a window to the top of the screen opens Mission Control instead of filling the screen, **Drag windows to top of screen to enter Mission Control** is on. Turn it off in the **Mission Control** section of **Desktop & Dock**. Apple's tiling guide names this switch for exactly this reason.

## 4. Are the shortcuts being pressed correctly?

The tiling shortcuts need four keys in the right combination: <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd>, not just <kbd>Control</kbd>-<kbd>←</kbd>. Without Fn, Control-Left Arrow switches to the previous desktop space instead. Check:

- You are holding **Fn** or the **globe** key. If your keyboard has no Fn key, use the Window menu or add your own shortcut in App Shortcuts.
- No other app has claimed the same keys. Window managers, launchers and remapping tools can all grab shortcuts.

Our full list of [macOS window tiling shortcuts](/blog/macos-window-tiling-shortcuts/) shows every combination.

## 5. Can the window be tiled at all?

Apple notes that some windows cannot be moved and many cannot be resized. Settings windows, dialogs and some single-purpose apps keep a fixed size, so they will not tile. Full-screen windows cannot be tiled either; exit full screen first.

## 6. Is another window manager getting in the way?

If you run Rectangle, Magnet or another snapping app, both it and macOS may respond to dragging windows to the screen edge, and the result can look like neither works. Decide which one handles dragging and turn the other's drag snapping off. Shortcuts usually do not clash, since they use different keys. [macOS tiling vs Rectangle](/blog/macos-tiling-vs-rectangle/) explains how to run both cleanly.

## What if it still doesn't work?

- Try the same window in a different app, to see whether one app is the problem.
- Use **Window → Move & Resize** from the menu bar: if that works but dragging does not, the issue is a setting or another app.
- Restart the Mac and try again.

## Is there an alternative that avoids these problems?

If dragging to edges keeps misfiring, a window manager that does not use edges can be more predictable. [Windowmac](/) works from a ring under the pointer: hold Option, flick toward a direction and let go. Its shortcuts work only while Option is held, so they never compete with the Fn-Control set. Print both sets side by side with the [cheat sheet builder](/tools/window-shortcut-cheat-sheet/).

| Symptom | Fix |
| --- | --- |
| Nothing happens when dragging | Check macOS version and the Windows switches |
| Mission Control opens | Turn off drag-to-top for Mission Control |
| Shortcut switches desktops | Add Fn to the shortcut |
| One app never tiles | Its window is fixed size |
| Tiling flickers or fights | Turn off drag snapping in the other app |
