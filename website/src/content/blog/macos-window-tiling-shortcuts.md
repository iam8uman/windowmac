---
title: "macOS Window Tiling Shortcuts Explained"
slug: macos-window-tiling-shortcuts
description: "Every built-in macOS window tiling shortcut, what each one does, why they all start with Fn-Control, what is missing, and how to give a tiling command a shortcut of your own."
publishedAt: 2026-11-17
type: explainer
tags:
  - keyboard-shortcuts
  - macos-features
primaryApp: windowmac
feature: tools/window-shortcut-cheat-sheet
faq:
  - question: "What is the macOS shortcut to tile a window left?"
    answer: "Press Fn-Control-Left Arrow. Fn-Control-Right Arrow tiles it right, and the Up and Down arrows give the top and bottom halves."
  - question: "Why do the tiling shortcuts need the Fn key?"
    answer: "Control with an arrow key is already used by Mission Control and Spaces: Control-Up opens Mission Control and Control-Left or Right switches desktops. Adding Fn (the Globe key) gives tiling its own combination."
  - question: "Is there a shortcut for quarters or thirds?"
    answer: "No. Apple's list has no shortcut for the four quarters, and macOS tiling has no thirds at all. You can assign your own shortcut to a quarter through App Shortcuts, or use a window manager for thirds."
  - question: "Which macOS versions have tiling shortcuts?"
    answer: "Window tiling and its shortcuts arrived with macOS Sequoia 15 and are in Tahoe 26 and macOS 27. Ventura 13 and Sonoma 14 do not have them."
  - question: "Can I change the tiling shortcuts?"
    answer: "You can add your own shortcut for any tiling command in the Window menu using System Settings, Keyboard, Keyboard Shortcuts, App Shortcuts, with All Applications selected."
sources:
  - title: "Apple Support: Mac window tiling icons and keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Apple Support: Tile app windows on Mac"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchlef287e5d/mac"
  - title: "Apple Support: Create keyboard shortcuts for apps on Mac"
    url: "https://support.apple.com/guide/mac-help/create-keyboard-shortcuts-for-apps-mchlp2271/mac"
  - title: "Apple Support: Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
seoTitle: "macOS Window Tiling Shortcuts: Full List Explained"
seoDescription: "All macOS window tiling shortcuts in one table: Fn-Control arrows, fill, centre, restore and multi-window layouts. Plus what is missing and how to add your own."
draft: false
---
macOS window tiling shortcuts all start with **Fn-Control**: add an arrow key to move the active window to that half of the screen, **F** to fill the desktop, **C** to centre it and **R** to put it back. Add **Shift** to arrange the two front windows at once, and **Option-Shift** to arrange three. They work on macOS Sequoia 15 and later, including Tahoe 26 and macOS 27.

That is the short version. Below is the full list from Apple, why the keys are built the way they are, the gaps, and how to fill them.

## What are all the macOS window tiling shortcuts?

These act on the active window. **Fn** is the key in the bottom-left corner of the keyboard, often marked with a globe.

| Shortcut | Name in the Window menu | What it does |
| --- | --- | --- |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>←</kbd> | Left | Left half |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>→</kbd> | Right | Right half |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↑</kbd> | Top | Top half |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↓</kbd> | Bottom | Bottom half |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>F</kbd> | Fill | Fills the desktop, menu bar and Dock stay |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>C</kbd> | Center | Centres the window |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>R</kbd> | Return to Previous Size | Undoes the tiling |

And these move two or three windows in one go. "Second window" means the one you used before the active one.

| Shortcut | Name | What it does |
| --- | --- | --- |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> | Left & Right | Active window left, second window right |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>→</kbd> | Right & Left | Active window right, second window left |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>↑</kbd> | Top & Bottom | Active window on top, second below |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>↓</kbd> | Bottom & Top | Active window below, second on top |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> | Left & Quarters | Active window left, two more in the right quarters |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>→</kbd> | Right & Quarters | Active window right, two more in the left quarters |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>↑</kbd> | Top & Quarters | Active window on top, two more in the bottom quarters |
| <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>↓</kbd> | Bottom & Quarters | Active window below, two more in the top quarters |

To keep these handy, build a printable sheet with the [window shortcut cheat sheet](/tools/window-shortcut-cheat-sheet/).

## Why do the tiling shortcuts start with Fn-Control?

Because **Control** plus an arrow key was already taken. In Apple's keyboard shortcut list, <kbd>Control</kbd>-<kbd>↑</kbd> opens Mission Control, <kbd>Control</kbd>-<kbd>↓</kbd> shows all windows of the current app, and <kbd>Control</kbd>-<kbd>←</kbd> or <kbd>→</kbd> moves between desktop spaces. Adding **Fn** keeps those working and gives tiling a set of its own.

The pattern is easy to remember once you see it:

- **Fn-Control** = one window.
- **+ Shift** = two windows.
- **+ Option + Shift** = three windows.

If the shortcuts do nothing, check that you are on macOS 15 or later and that the app's window can be resized. Apple notes that some windows cannot be moved or resized, and tiling skips those.

## What can't the built-in shortcuts do?

The tiling shortcuts cover halves and a few combinations, and leave out a lot:

- **No quarters.** Top Left, Top Right, Bottom Left and Bottom Right are in the Window menu but have no shortcut.
- **No thirds or two thirds.** macOS tiling only splits in halves and quarters, which is a problem on wide and ultrawide monitors.
- **No "next display".** There is no tiling shortcut to send a window to another monitor.
- **No cycling.** Pressing the same shortcut twice does the same thing twice, rather than stepping to a different size.
- **Three-window layouts need a three-key chord plus Fn.** <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Option</kbd>-<kbd>Shift</kbd>-<kbd>←</kbd> is hard to press with one hand.

## How do I add my own shortcut for a tiling command?

Any command in the **Window** menu can get a custom shortcut through App Shortcuts. This is how you fill the quarters gap.

1. Open **System Settings → Keyboard**, then click **Keyboard Shortcuts**.
2. Select **App Shortcuts** and click the **Add (+)** button.
3. Set **Application** to **All Applications**.
4. In **Menu title**, type the command exactly as it appears in the menu. Apple's rule for submenus is to join levels with `->`, so check the exact path in **Window → Move & Resize** in your macOS version and copy its wording, such as the quarter's name.
5. Click **Keyboard shortcut**, press the combination you want, and click **Done**.

Pick a combination that no app already uses. Some apps do not allow custom shortcuts, and the command must be visible in that app's Window menu for it to work.

## How do window managers handle shortcuts differently?

Window managers add the missing layouts and usually make the keys shorter. In [Windowmac](/), every shortcut works while you hold **Option**:

| Hold Option and press | Result |
| --- | --- |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Halves; press again for a third, then two thirds |
| <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> | Quarters |
| <kbd>Return</kbd> | Maximise, then almost maximise |
| <kbd>C</kbd> | Centre |
| <kbd>[</kbd> <kbd>]</kbd> | Previous or next screen |
| <kbd>Z</kbd> | Undo |

Because they only work while Option is held, they do not clash with the Fn-Control set, so you can keep using both. Every key can be changed in Windowmac's settings.

## Should I learn the built-in shortcuts or use an app?

| If you | Then |
| --- | --- |
| Mostly use halves on one screen | The built-in Fn-Control shortcuts are enough |
| Want quarters by keyboard | Add App Shortcuts, or use a window manager |
| Use a wide monitor or two displays | A window manager with thirds and "next screen" |
| Are on macOS 13 or 14 | A window manager, since tiling shortcuts do not exist |

Once the keys are in your head, the [shortcut trainer](/tools/shortcut-trainer/) is a quick way to make them stick. For the wider set of window, app and Mission Control shortcuts, see [every Mac keyboard shortcut for windows and apps](/blog/mac-window-keyboard-shortcuts/).
