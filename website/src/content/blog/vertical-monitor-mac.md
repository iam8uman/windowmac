---
title: "How to Set Up a Vertical Monitor on a Mac"
slug: vertical-monitor-mac
description: "Rotate an external monitor to portrait on a Mac, line it up in Arrange, and use window layouts that suit a tall screen: top and bottom halves, vertical thirds and stacked windows."
publishedAt: 2026-11-17
type: how-to
tags:
  - multiple-monitors
  - how-to
primaryApp: windowmac
feature: tools/multi-monitor-planner
faq:
  - question: "How do I rotate my monitor to vertical on a Mac?"
    answer: "Turn the monitor on its stand, then open System Settings, Displays, select the monitor and choose 90° or 270° from the Rotation menu. The option appears only for external displays that support it."
  - question: "Why is there no Rotation option?"
    answer: "Apple notes that rotation depends on the display. The built-in screen of a MacBook or iMac cannot be rotated, and some external displays or adapters do not offer it."
  - question: "What window layouts work on a vertical monitor?"
    answer: "Top and bottom halves, and on tall screens vertical thirds: top, middle and bottom. macOS tiling has top and bottom halves; a window manager adds vertical thirds."
  - question: "Which way should I rotate, 90 or 270 degrees?"
    answer: "Whichever matches how you physically turned the monitor. If the picture is upside down, choose the other option."
sources:
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
  - title: "Apple Support: Mac window tiling keyboard shortcuts"
    url: "https://support.apple.com/guide/mac-help/tile-app-windows-mchl9674d0b0/mac"
  - title: "Magnet on the Mac App Store"
    url: "https://apps.apple.com/us/app/magnet/id441258766?mt=12"
seoTitle: "How to Set Up a Vertical Monitor on Mac (Rotate and Tile)"
seoDescription: "Rotate a monitor to portrait on your Mac, line it up in Displays Arrange, and use top, bottom and vertical-third layouts that suit a tall screen."
draft: true
---
To set up a vertical monitor on a Mac, turn the monitor to portrait on its stand, then open **System Settings → Displays**, select that monitor and choose **90°** or **270°** from the **Rotation** menu. Then click **Arrange** and drag the tall display so its edge lines up with your other screen. For windows, use top and bottom halves, or vertical thirds from a window manager, because left and right halves are too narrow on a portrait screen.

## How do I rotate the display?

1. Physically rotate the monitor on its stand or mount.
2. Open **Apple menu → System Settings** and click **Displays** in the sidebar.
3. Select the external monitor.
4. Open the **Rotation** menu and choose **90°** or **270°**.
5. If the picture is upside down, choose the other value.

Apple notes that rotation depends on the display and is only offered for external displays. If there is no Rotation menu, the monitor, cable or adapter may not support it.

## How do I line the vertical monitor up with my other screen?

After rotating, macOS treats the display as tall and narrow, so its icon in Arrange changes shape.

1. In **Displays**, click **Arrange**.
2. Drag the portrait display's icon to the side where it sits on your desk.
3. Slide it up or down so the shared edge matches the real height of the screens.

Because a portrait display is usually taller than the screen next to it, there will be a stretch of its edge that does not touch the other display. Windows and the pointer only cross where the edges overlap. The [multi-monitor planner](/tools/multi-monitor-planner/) draws both screens to scale and tells you how far to move one so their centres line up.

## Which window layouts suit a vertical monitor?

A 27-inch 1440p monitor turned on its side looks like 1440 points wide and 2560 tall. Halves side by side would be 720 points wide each, too narrow for most apps, so split it top to bottom instead.

| Layout | Size on a 1440×2560 portrait screen | Good for |
| --- | --- | --- |
| Full screen | 1440 × 2560 | Long documents, code, PDFs |
| Top and bottom halves | 1440 × about 1270 each | A document over a chat or terminal |
| Vertical thirds | 1440 × about 845 each | Three feeds, logs or inboxes |
| Top two thirds + bottom third | 1440 × about 1690 and 845 | Main app over a small helper |

Sizes are approximate, after the menu bar if this is the main display.

## How do I snap windows on a vertical monitor?

**Built-in (macOS Sequoia 15 or later):** drag a window to the top or bottom area, or press <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↑</kbd> for the top half and <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>↓</kbd> for the bottom half. <kbd>Fn</kbd>-<kbd>Control</kbd>-<kbd>Shift</kbd>-<kbd>↑</kbd> puts your two most recent windows on top of each other in one step. There are no vertical thirds.

**With a window manager:** [Windowmac](/) includes top, middle and bottom thirds and top and bottom two thirds. With Option held, the up and down arrow keys already cycle from a half to a third to two thirds, and you can put the middle third on any key or direction of the ring in Settings. Magnet's App Store listing also says it supports vertical displays.

To move a window between your landscape and portrait screens with its layout kept, hold Option and press <kbd>]</kbd> in Windowmac. See [how to move a window to another monitor](/blog/move-window-to-another-monitor-mac/) for the built-in ways.

## What is a vertical monitor good for?

- **Code and long documents**: far more lines visible at once.
- **Reading PDFs and web articles** without scrolling as often.
- **Chat, email and feeds** stacked in thirds next to your main screen.

It is less good for video, wide spreadsheets or design canvases.

## Which setup should I use?

| Main use | Layout on the vertical screen |
| --- | --- |
| Coding | Editor full height, or editor top two thirds, terminal bottom third |
| Writing | Document full height |
| Communication | Thirds: email, chat, calendar |
| Reference | Top and bottom halves |

For more multi-screen setups, browse the [multiple monitors guides](/blog/topics/multiple-monitors/).
