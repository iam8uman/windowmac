---
title: "Which Scaled Resolution Should You Use for a 4K Monitor on a Mac?"
slug: 4k-monitor-scaling-mac
description: "How macOS scaling works on a 4K monitor, what 'looks like 1920 by 1080' and 'looks like 2560 by 1440' mean, which is sharpest, and how to pick the right setting for 24, 27 and 32-inch screens."
publishedAt: 2026-11-17
type: explainer
tags:
  - multiple-monitors
  - macos-features
primaryApp: windowmac
feature: tools/display-scaling-calculator
faq:
  - question: "What is the best resolution for a 27-inch 4K monitor on a Mac?"
    answer: "Looks like 1920 by 1080 is the sharpest but makes everything large. Looks like 2560 by 1440 gives more space with text a little larger than on a MacBook Air, at the cost of extra scaling work. Try both and keep the one you can read comfortably."
  - question: "Why is text blurry on my 4K monitor?"
    answer: "Usually the monitor is set to a resolution macOS has to scale up, or it is running at a low resolution. Choose Default or a scaled option in Displays settings rather than a low-resolution mode."
  - question: "Does scaling slow down my Mac?"
    answer: "Apple notes that a scaled resolution may affect performance. For everyday work the difference is usually small, but it can matter for demanding graphics."
  - question: "How do I see all resolutions?"
    answer: "In System Settings, Displays, select the monitor and turn on Show all resolutions, or Control-click the thumbnails and choose Show List."
sources:
  - title: "Apple Support: Change your display's resolution on Mac"
    url: "https://support.apple.com/guide/mac-help/change-your-displays-resolution-mchl86d72b76/mac"
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
seoTitle: "Best Scaled Resolution for a 4K Monitor on Mac"
seoDescription: "Looks like 1920x1080 or 2560x1440? How Mac scaling works on a 4K monitor, which mode is sharpest, and what to choose for 24, 27 and 32-inch screens."
draft: true
---
For a 4K monitor on a Mac, choose **looks like 1920 by 1080** for the sharpest image with large text, or **looks like 2560 by 1440** for more space with text closer to MacBook size. On a 27-inch 4K screen, 2560 by 1440 is a good compromise; on a 24-inch screen, 2560 by 1440 gives text about the size of a MacBook Air's; on a 32-inch screen, 2560 by 1440 or a little more. Pick in **System Settings → Displays** and judge by whether text is comfortable to read.

## What does "looks like" mean?

macOS lays out windows and text in **points**, not pixels. The "looks like" size is how many points wide and tall your desktop is. A 4K panel has 3840 by 2160 pixels:

- **Looks like 1920 by 1080**: each point is a 2-by-2 block of pixels. You see as much as on a 1080p monitor, drawn with four times the detail.
- **Looks like 2560 by 1440**: you see as much as on a 1440p monitor. macOS draws the desktop at 5120 by 2880 and scales that image down to the 3840 by 2160 panel.
- **Native 3840 by 2160**: one point per pixel. Lots of space, but on most 4K monitors text is very small.

## Which mode is sharpest?

The mode where twice the looks-like size equals the panel exactly. On a 4K panel that is 1920 by 1080, because 2 × 1920 = 3840. No resizing is needed, so text edges are as crisp as the panel allows. Every other scaled mode is drawn larger and resized to fit, which on a high-density panel is still very sharp but slightly less precise.

## What should I choose for my screen size?

The size of text you see depends on the points per inch of each setting. Here is what each common option gives, compared with a 13.6-inch MacBook Air at its default:

| 4K monitor | Looks like | Points per inch | Text size vs MacBook Air |
| --- | --- | --- | --- |
| 24-inch | 1920 × 1080 | About 92 | About 1.4 times larger |
| 24-inch | 2560 × 1440 | About 122 | About the same |
| 27-inch | 1920 × 1080 | About 82 | About 1.6 times larger |
| 27-inch | 2560 × 1440 | About 109 | About 1.2 times larger |
| 32-inch | 2560 × 1440 | About 92 | About 1.4 times larger |
| 32-inch | 3008 × 1692 | About 108 | About 1.2 times larger |

These come from each screen's size and resolution; the MacBook Air figure uses Apple's 13.6-inch, 2560 by 1664 panel at its default looks-like width of 1470. Run your exact monitor through the [display scaling calculator](/tools/display-scaling-calculator/) to see every option.

## How do I change the resolution?

1. Open **System Settings → Displays** and select the monitor.
2. Hover over the thumbnails to see each size, and click one.
3. For more options, turn on **Show all resolutions**, or Control-click the thumbnails and choose **Show List**.

If the screen goes black after a change, Apple says to wait 15 seconds for it to revert, or press Esc.

## Does scaling cost performance?

Apple notes that scaled resolutions may affect performance and that some app windows may not fit on screen at some sizes. If you do heavy graphics work, compare both modes on your own machine.

## How does scaling change window layouts?

The looks-like size is the area window managers divide up. At 1920 by 1080, halves are 960 points wide, which is tight for two documents. At 2560 by 1440, halves are 1280 points and thirds about 853, enough for three narrow apps. If you want to work with thirds, the larger looks-like size makes them practical.

To see exact window sizes at either setting, use the [window size calculator](/tools/window-size-calculator/). [Windowmac](/) snaps to halves, thirds and quarters of whatever size you choose. If your 4K monitor sits beside a MacBook, matching text size on both screens also makes windows feel the same size as they move between them; see [setting up a MacBook with an external monitor](/blog/macbook-external-monitor-setup/).

## Which setting should I pick?

| You want | Choose |
| --- | --- |
| The sharpest text, large UI | Looks like 1920 × 1080 |
| More space, text a little larger than a MacBook's | Looks like 2560 × 1440 |
| Thirds side by side | 2560 × 1440 or larger |
| Maximum space and tiny text | Native 3840 × 2160 |
