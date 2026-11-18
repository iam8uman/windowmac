---
title: "How to Arrange Displays on a Mac"
slug: arrange-displays-mac
description: "Use the Arrange view in Displays settings to match your Mac's screens to your desk, move the menu bar, mirror some displays, and fix a pointer that gets stuck at the edge."
publishedAt: 2026-11-17
type: how-to
tags:
  - multiple-monitors
  - how-to
primaryApp: windowmac
feature: tools/multi-monitor-planner
faq:
  - question: "Where is the Arrange option on a Mac?"
    answer: "Open System Settings, Displays, and click Arrange. It appears only when an external display is connected."
  - question: "How do I change which display has the menu bar?"
    answer: "In Arrange, drag the menu bar from one display icon to another. You can also select a display and set Use as to Main display."
  - question: "Why does my pointer get stuck between monitors?"
    answer: "The displays only share part of an edge in Arrange, or are placed differently from your desk. Drag the icons so the shared edge is as long as possible and matches where the screens really are."
  - question: "Can I mirror two displays and extend a third?"
    answer: "Yes. Set all displays to extended, then in Arrange hold Option and drag one display icon onto another to mirror that pair."
sources:
  - title: "Apple Support: Displays settings on Mac"
    url: "https://support.apple.com/guide/mac-help/mh40768"
  - title: "Apple Support: Extend or mirror your Mac desktop across multiple displays"
    url: "https://support.apple.com/guide/mac-help/extend-mirror-mac-desktop-multiple-displays-mchlb5f905a1/mac"
  - title: "Apple: macOS 27"
    url: "https://www.apple.com/macos/"
  - title: "Apple Support: Connect an external display to your Mac"
    url: "https://support.apple.com/guide/mac-help/connect-an-external-display-mchl7c7ebe08/mac"
seoTitle: "How to Arrange Displays on Mac (Fix Stuck Pointer Too)"
seoDescription: "Arrange your Mac's displays to match your desk, move the menu bar to another screen, mirror a pair and fix a pointer that sticks at the edge."
draft: true
---
To arrange displays on a Mac, open **System Settings → Displays** and click **Arrange**. Drag each display's icon until the layout matches where the screens sit on your desk, then click **Done**. Drag the menu bar onto a different icon to make that display the main one. The Arrange button only appears when an external display is connected.

Getting this right matters more than it seems: it decides which edge the pointer and windows cross, and a bad arrangement is the most common reason windows get lost or the pointer sticks.

## How do I arrange my displays?

1. Choose **Apple menu → System Settings** and click **Displays** in the sidebar.
2. Click **Arrange**. Each display appears as an icon, sized by its resolution.
3. Drag an icon to the left, right, above or below another to match your desk.
4. Slide it along the edge so the two screens line up the way they do in real life.
5. Click **Done**.

Test it by moving the pointer slowly across the gap. It should arrive on the other screen at about the same height it left.

## Why do the icons not match the real size of my screens?

Arrange shows each display by its resolution in points, the "looks like" size, not its physical size. A MacBook screen with high pixel density can look smaller in Arrange than a large monitor at a lower density, even if it seems similar on your desk. That is why lining up the icons by eye can still leave the pointer jumping up or down when it crosses.

The [multi-monitor planner](/tools/multi-monitor-planner/) draws your displays both ways, to scale on the desk and in points, and tells you how far to slide one icon so their centres line up.

## How do I change the main display?

The main display has the menu bar. Two ways to move it:

- In **Arrange**, drag the menu bar from the current main display's icon onto another icon.
- Select a display in Displays settings and set **Use as** to **Main display**.

## How do I mirror some displays and extend others?

Apple describes this for setups with more than two displays:

1. Set every display to **Extended** with the **Use as** menu.
2. Open **Arrange**.
3. Hold **Option** and drag one display's icon onto another. Those two now mirror each other, while the rest stay extended.

## Why does my pointer get stuck at the edge of a screen?

The pointer can only cross where two displays share an edge in Arrange. If a small laptop icon touches only the bottom corner of a tall monitor icon, the pointer crosses only there. Fixes:

- Slide the smaller icon to the middle of the larger one's edge.
- Put the displays side by side if they are side by side on your desk, not one above the other.
- If you rearranged and then reconnected, check Arrange again; Apple says macOS 27 keeps display arrangements when you reconnect, so on that version an arrangement you set should stick.

## How does the arrangement affect windows?

Windows follow the same rules as the pointer. Dragging a window across only works through the shared edge, and windows saved on a display that is now arranged elsewhere can open off-screen. If that happens, our guide to [getting an off-screen window back](/blog/window-off-screen-mac/) has the fixes.

Once the displays are arranged, moving windows is easier with a keyboard shortcut than dragging through a narrow edge. [Windowmac](/) sends the active window to the next or previous screen with Option-] or Option-[, keeping its layout, so the window lands fully on the other screen whatever the arrangement. More methods are in [how to move a window to another monitor](/blog/move-window-to-another-monitor-mac/).

## Which arrangement should I use?

| Desk setup | Arrange layout |
| --- | --- |
| Laptop beside a monitor | Side by side, centres aligned |
| Laptop below a monitor | Laptop icon below, centred under the monitor |
| Two monitors side by side | Side by side, top edges aligned if they are the same size |
| One portrait, one landscape | Side by side, portrait icon centred on the landscape edge |

For a portrait screen, see [how to set up a vertical monitor on a Mac](/blog/vertical-monitor-mac/).
