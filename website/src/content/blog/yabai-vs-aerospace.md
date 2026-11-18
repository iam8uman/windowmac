---
title: "yabai vs AeroSpace (and the Easier Way to Tile Mac Windows)"
slug: yabai-vs-aerospace
description: "yabai and AeroSpace both tile Mac windows automatically but differ on workspaces, SIP, config and hotkeys. The comparison, plus why Windowmac's Strip is the easier pick for most people."
publishedAt: 2026-11-17
type: comparison
tags:
  - alternatives
primaryApp: windowmac
feature: quiz/tiler-or-floater
faq:
  - question: "Is AeroSpace better than yabai?"
    answer: "AeroSpace is easier to start with: one config file, built-in keybindings, its own workspaces and no need to touch System Integrity Protection. yabai is more flexible and scriptable, works with native macOS Spaces, and can do more if you partially disable SIP."
  - question: "Does yabai require disabling SIP?"
    answer: "No. yabai works with SIP on. Partly disabling SIP is optional and lets yabai load a scripting addition into the Dock for features that need elevated privileges."
  - question: "Does AeroSpace use macOS Spaces?"
    answer: "No. AeroSpace emulates its own virtual workspaces because, according to its documentation, native Spaces have considerable limitations for a tiling window manager."
  - question: "Do I need skhd with yabai?"
    answer: "yabai has no keyboard shortcuts of its own; you control it with a command-line tool. Most people bind keys with skhd or another hotkey app."
  - question: "Is there something lighter than a full tiling manager?"
    answer: "Yes, and it is what we recommend for most people: Windowmac. Hold Option and press S, and every window on the screen becomes a scrolling column, tiled like AeroSpace or yabai, with no config file, no hotkey daemon and no SIP changes. Press S again and windows go back where they were."
sources:
  - title: "yabai on GitHub"
    url: "https://github.com/koekeishiya/yabai"
  - title: "AeroSpace on GitHub"
    url: "https://github.com/nikitabobko/AeroSpace"
seoTitle: "yabai vs AeroSpace: Mac Tiling Window Managers Compared"
seoDescription: "yabai vs AeroSpace compared from their own docs: workspaces, SIP, config, hotkeys, macOS support and stability. Who should pick each tiling manager."
draft: false
---
If you want tiled windows without writing a config file, the easiest option is **Windowmac**: hold Option and press S, and every window on the screen lines up as scrolling columns, with a flick gesture for everything else. If you want a full-time automatic tiler, pick **AeroSpace** for an i3-style manager that works out of the box: it has its own workspaces, keybindings in a single config file, and never asks you to touch System Integrity Protection (SIP). Pick **yabai** if you want maximum control and scripting, prefer to keep native macOS Spaces, and are happy to add a separate hotkey tool. Both are free, open source under the MIT licence, and tile windows automatically as they open.

> **Our pick for most people: Windowmac.** Tiling when you want it, free placement when you do not, and zero configuration. [Install it in one line](/#install).

The details below come from each project's own README.

## How do yabai and AeroSpace compare?

| | yabai | AeroSpace |
| --- | --- | --- |
| Licence | MIT, free | MIT, free |
| Tiling model | Binary space partitioning | i3-like tree |
| Workspaces | Native macOS Spaces (more than 16 possible) | Its own virtual workspaces, not macOS Spaces |
| SIP | Works with SIP on; partly disabling it unlocks extra features | Not required |
| Keyboard shortcuts | None built in; use skhd or similar | Built in, defined in the config file |
| Configuration | Shell commands and a config script | One plain-text file (TOML in the example) |
| Install | Several methods documented in its wiki | `brew install --cask nikitabobko/tap/aerospace` |
| macOS support listed | Intel: Big Sur 11 to Tahoe 26; Apple silicon: Monterey 12 to Tahoe 26 | macOS 13 or later |
| Status | Long-running project | Public beta; breaking changes possible before 1.0 |
| Notarized | Build from source must be code-signed | Not notarized; the Homebrew install removes the quarantine flag |

Neither README listed macOS 27 explicitly when we checked, so look at each project's issues and releases before updating.

## What is it like to set up each one?

**AeroSpace** is close to install-and-go. You install with Homebrew, grant Accessibility access, and start from its default config file, which already defines keybindings. You then edit one dotfile to change keys, gaps and rules. Because it is designed around the keyboard and has a command-line interface with man pages, it suits people who already live in a terminal.

**yabai** is a toolkit. It extends the macOS window manager and you drive it with a CLI. A working setup normally means installing yabai, writing a config, installing a hotkey daemon such as skhd and writing key bindings for it. It requires **Displays have separate Spaces** to be on and recommends several other Mission Control settings. Window animations need the Screen Recording permission. The upside is that almost every behaviour can be scripted.

## How do workspaces differ?

This is the biggest practical difference.

- **yabai uses real macOS Spaces.** Mission Control, the Spaces bar and full-screen apps behave as normal. Its README also lists creating more than the usual 16 spaces and switching spaces without animations; check its documentation for which features need SIP partly disabled.
- **AeroSpace emulates its own workspaces.** Its README says native Spaces have considerable limitations, so it manages workspaces itself. Switching is fast and has no animation, and multi-monitor support is a stated focus. The trade-off is that Mission Control's idea of spaces and AeroSpace's workspaces are not the same thing.

## What about SIP?

System Integrity Protection is a macOS security feature. yabai works with SIP enabled, but some window control functions need a scripting addition loaded into the Dock, which requires partly disabling SIP. The yabai README makes no recommendation either way. AeroSpace states that it does not require disabling SIP at all. If you manage a work Mac or simply do not want to change security settings, that alone may decide it.

## Which should you choose?

| If you | Choose |
| --- | --- |
| Want tiling working in ten seconds, with no config | **Windowmac** (Strip) |
| Want tiling sometimes and free placement the rest of the time | **Windowmac** |
| Want a full-time tiler working in ten minutes | AeroSpace |
| Prefer one dotfile with keys included | AeroSpace |
| Will not change SIP settings | AeroSpace, or yabai without the SIP features |
| Want native Spaces and Mission Control to stay in charge | yabai |
| Want to script every behaviour from the shell | yabai |
| Want focus-follows-mouse and more than 16 spaces | yabai |

## Is there an easier way to tile windows?

Tiling managers rearrange everything whenever a window opens or closes. That is efficient on a big monitor with a fixed set of apps, and frustrating if you like to drag a window somewhere and have it stay. Amethyst is another automatic tiler with many ready-made layouts, while snapping tools move a window only when you ask.

[Windowmac](/) gives you both, which is why it is our pick. Day to day you flick windows into halves, thirds and quarters with Option held. When a screen gets crowded, **Strip** (hold Option and press S) lines up every window as scrolling columns, like a tiler: A and D move between columns, W cycles a column's width, and new windows join next to the one you are in. Press S again and everything goes back. No config file, no hotkey daemon, no SIP changes, and it never connects to the internet. If you are not sure which camp you are in, take the [tiler or floater quiz](/quiz/tiler-or-floater/), or read our wider [best window managers for Mac](/blog/best-window-managers-mac-2027/) roundup. For a broader list of options, see [Rectangle alternatives](/blog/rectangle-alternatives/).
