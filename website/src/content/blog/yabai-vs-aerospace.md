---
title: "yabai vs AeroSpace: Which Mac Tiling Window Manager?"
slug: yabai-vs-aerospace
description: "yabai and AeroSpace both tile Mac windows automatically, but they differ on workspaces, SIP, configuration and hotkeys. A fair comparison from their own documentation, and who should pick each."
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
    answer: "Yes. Snapping window managers only move a window when you ask. Windowmac's Strip mode also lines every window up as scrolling columns on demand, without a config file."
sources:
  - title: "yabai on GitHub"
    url: "https://github.com/koekeishiya/yabai"
  - title: "AeroSpace on GitHub"
    url: "https://github.com/nikitabobko/AeroSpace"
seoTitle: "yabai vs AeroSpace: Mac Tiling Window Managers Compared"
seoDescription: "yabai vs AeroSpace compared from their own docs: workspaces, SIP, config, hotkeys, macOS support and stability. Who should pick each tiling manager."
draft: false
---
Pick **AeroSpace** if you want an i3-style tiling window manager that works out of the box: it has its own workspaces, keybindings in a single config file, and never asks you to touch System Integrity Protection (SIP). Pick **yabai** if you want maximum control and scripting, prefer to keep native macOS Spaces, and are happy to add a separate hotkey tool. Both are free, open source under the MIT licence, and tile windows automatically as they open.

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
| Want tiling working in ten minutes | AeroSpace |
| Prefer one dotfile with keys included | AeroSpace |
| Will not change SIP settings | AeroSpace, or yabai without the SIP features |
| Want native Spaces and Mission Control to stay in charge | yabai |
| Want to script every behaviour from the shell | yabai |
| Want focus-follows-mouse and more than 16 spaces | yabai |

## Do you actually want automatic tiling?

Tiling managers rearrange everything whenever a window opens or closes. That is efficient on a big monitor with a fixed set of apps, and frustrating if you like to drag a window somewhere and have it stay. Amethyst is another automatic tiler with many ready-made layouts, while snapping tools move a window only when you ask.

[Windowmac](/) is one of the latter, with a twist: its **Strip** mode (hold Option and press S) lines up every window on a screen as scrolling columns, like a tiler, but only when you turn it on, with no config file. If you are not sure which camp you are in, take the [tiler or floater quiz](/quiz/tiler-or-floater/), or read our wider [best window managers for Mac](/blog/best-window-managers-mac-2027/) roundup. For a broader list of options, see [Rectangle alternatives](/blog/rectangle-alternatives/).
