---
title: "Best Window Layouts for an Ultrawide Monitor on a Mac"
slug: ultrawide-monitor-mac-layouts
description: "How to split an ultrawide monitor on a Mac: thirds, two thirds plus a third, a wide centre with two sides, or a scrolling strip. Real sizes for common ultrawides and the tools that make each layout one move."
publishedAt: 2026-11-17
type: how-to
tags:
  - multiple-monitors
  - productivity
primaryApp: windowmac
feature: tools/ultrawide-split-calculator
faq:
  - question: "How do I split an ultrawide monitor into three on a Mac?"
    answer: "macOS tiling only does halves and quarters, so you need a window manager for thirds. In Windowmac, hold Option and press Left Arrow twice for the left third, Option-T for the centre third, and Right Arrow twice for the right third."
  - question: "Is half of an ultrawide too wide?"
    answer: "Often, yes. Half of a 34-inch 3440 by 1440 ultrawide is about 40 cm wide, which is wider than most web pages and documents are designed for. Thirds or two thirds plus a third usually fit better."
  - question: "Does macOS support ultrawide monitors properly?"
    answer: "Yes. Apple says macOS 27 adds support for higher resolutions on ultrawide displays, such as 5K at 120Hz, and keeps display arrangements when you reconnect."
  - question: "What is the best layout for coding on an ultrawide?"
    answer: "A good starting point is the editor in the middle third or a wide centre column, with a terminal or browser on one side and documentation on the other."
  - question: "Should I use scaling on an ultrawide?"
    answer: "A 34-inch 3440 by 1440 ultrawide has about 110 pixels per inch, so native resolution gives usable text. Denser panels such as 40-inch 5K2K models show smaller text at native resolution, so a scaled looks-like size can help."
sources:
  - title: "Apple: macOS 27 (ultrawide display support)"
    url: "https://www.apple.com/macos/"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Rectangle on GitHub"
    url: "https://github.com/rxhanson/Rectangle"
  - title: "Amethyst on GitHub"
    url: "https://github.com/ianyh/Amethyst"
seoTitle: "Best Ultrawide Monitor Window Layouts for Mac"
seoDescription: "Split an ultrawide monitor on a Mac into thirds, 2/3 + 1/3 or a wide centre. Real window sizes for 34 and 49-inch screens, and how to snap each layout."
draft: false
---
The best window layout for an ultrawide monitor on a Mac is usually **thirds**: three full-height columns, each about as wide as a small laptop screen. For one main app, use **two thirds plus a third**; for an editor between two references, a **wide centre with narrow sides**. macOS tiling only splits into halves and quarters, so you need a window manager to get thirds.

Below are the layouts that work, with real sizes for common ultrawides, and how to set each one up quickly.

## Why don't halves work well on an ultrawide?

Because each half is very wide. On a 34-inch 3440 by 1440 ultrawide, the screen is about 80 cm across, so a half is about 40 cm wide and 1,720 points across. Most web pages, documents and chat apps are designed for far less, so you get long lines of text or wide empty margins.

Halves still have a place: two big spreadsheets side by side, or a timeline next to a preview. But for everyday work, narrower columns use the space better.

| Monitor | One half | One third |
| --- | --- | --- |
| 34" 3440×1440 | 1,720 points, about 40 cm | 1,147 points, about 26.5 cm |
| 49" 5120×1440 | 2,560 points, about 60 cm | 1,707 points, about 40 cm |

These are worked out from each screen's size and resolution with no gaps. Run your own monitor and gap through the [ultrawide split calculator](/tools/ultrawide-split-calculator/).

## Which layouts work best on an ultrawide?

### Thirds (1:1:1)

Three equal columns. Good for anyone who keeps three apps in view: browser, editor and chat, or email, calendar and notes. On a 34-inch screen, each third is close to the width of a small laptop screen and much taller, so documents read well.

### Two thirds plus a third (2:1)

One main app gets two thirds and a second app gets the rest. This is the most comfortable layout for design work, video editing or a big spreadsheet, with a reference window or messages alongside.

### Wide centre with two sides (1:2:1)

The centre column is twice the width of each side. It keeps your main work straight in front of you instead of off to one side, so you look at the centre of the screen most of the time.

### Quarters and sixths

On 49-inch "super ultrawide" screens, even thirds are wide. Quarters across the screen (four columns) or a two-by-three grid make more sense there. Some window managers have sixths; [Rectangle](https://github.com/rxhanson/Rectangle), for example, lists sixths, eighths and ninths among its keyboard actions.

## How do I set up thirds on a Mac?

macOS window tiling has halves and quarters, and nothing narrower. For thirds:

1. Install a window manager with thirds. [Windowmac](/) is free and open source.
2. Hold **Option** and press <kbd>←</kbd>: the window goes to the left half. Press <kbd>←</kbd> again: left third. Again: left two thirds.
3. Hold **Option** and press <kbd>T</kbd> for the centre third.
4. Do the same with <kbd>→</kbd> for the right side.

With the mouse, hold Option and flick toward the left or right; click while still holding to step from half to third to two thirds. Because the gesture happens right under the pointer, you never have to drag a window across 80 cm of screen to reach the edge, which is the main problem with edge snapping on wide displays.

For the 1:2:1 layout, Windowmac lets you add your own layouts as fractions of the screen. A centre column from one quarter to three quarters, plus left and right quarters, gives you the wide-centre arrangement on a key or ring direction of your choice.

## What about lots of windows on an ultrawide?

When you have more than three or four windows, columns get too narrow. Two approaches handle that:

- **Automatic tiling** managers such as Amethyst offer column layouts (its README lists 3Column-Left, 3Column-Middle and 3Column-Right) that rearrange themselves as windows open.
- **A scrolling strip.** Windowmac's Strip (hold Option and press S) lines up every window on the screen as a row of columns that can run wider than the monitor. Press A and D to move between columns, and W to cycle a column between a third, a half and two thirds. On an ultrawide, three or four columns are visible at once and the rest are a keypress away.

## Should I use scaling on an ultrawide?

A 34-inch 3440 by 1440 ultrawide has about 110 pixels per inch, so text is a usable size at native resolution, which keeps the numbers above exact. A 40-inch 5120 by 2160 panel has about 139 pixels per inch, so text is noticeably smaller at native resolution, and a scaled "looks like" size makes it larger. Apple says macOS 27 supports higher resolutions for ultrawide displays, such as 5K at 120Hz, so check your settings after updating. The [display scaling calculator](/tools/display-scaling-calculator/) shows how big text will look at each size.

## Which layout should I pick?

| Your work | Layout |
| --- | --- |
| Three apps always open | Thirds |
| One big app plus reference | Two thirds plus a third |
| Editor with docs and terminal | Wide centre, two sides |
| Many windows, constantly changing | Strip or an automatic tiler |
| Two large documents | Halves |

If you also have your laptop screen open beside the ultrawide, see [how to move a window to another monitor](/blog/move-window-to-another-monitor-mac/) for keeping layouts intact as windows cross. More setups are in the [multiple monitors guides](/blog/topics/multiple-monitors/).
