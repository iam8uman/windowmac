/**
 * Everything site-specific lives here. The content kit (layouts, blog, tools,
 * quizzes, robots, sitemap, llms.txt) reads only from this file, so the same
 * kit runs Windowmac and Slidemac.
 */

export type AppKey = 'windowmac' | 'slidemac' | 'screenmac';

export const SITE = {
  key: 'windowmac' as AppKey,
  name: 'Windowmac',
  url: 'https://www.windowmac.app',
  lang: 'en',
  ogLocale: 'en_US',
  tagline: 'Flick windows into place on your Mac',
  description:
    'Windowmac is a free, open-source window manager for macOS. Hold Option and flick to snap windows to halves, thirds, quarters or another screen.',
  installCommand: 'curl -fsSL https://www.windowmac.app/install.sh | bash',
  installHref: '/#install',
  ctaLabel: 'Install Windowmac free',
  ogImage: '/og.png',
  icon: '/icon.png',
  favicon: '/favicon.png',
  repoUrl: 'https://github.com/iam8uman/windowmac',
  repoLabel: 'Source on GitHub',
  vercelInsights: false as boolean,
  gaId: 'G-F4NBF6XKFE' as string | null,
  author: { name: 'Suman Sharma', url: 'https://github.com/iam8uman' },
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Ubuntu:wght@400;500;700&family=Ubuntu+Mono:wght@400;700&display=swap',
  /** Facts the guides may state about the product. Writers must not claim anything beyond these. */
  facts: [
    'Free and open source under the MIT license; no account, no tracking, never connects to the internet.',
    'macOS 13 Ventura or later, Apple silicon and Intel.',
    'Hold Option, flick the mouse toward a target, release: halves, thirds, two thirds, quarters, maximise, almost maximise, centre.',
    'Send windows to the next or previous display; keyboard shortcuts while holding Option for every layout.',
    'Strip: hold Option and press S to line up every window on a screen as sideways-scrolling columns.',
    'Stash windows behind the screen edge; resize and nudge; undo.',
    'Every action has a windowmac:// link for scripts, Shortcuts and Raycast.',
    'Needs only the Accessibility permission. Not on the Mac App Store; signed with a Developer ID and notarized by Apple (from version 1.2.1), so it opens without a Gatekeeper warning.',
  ],
} as const;

export interface AppInfo {
  key: AppKey;
  name: string;
  url: string;
  icon: string;
  pitch: string;
}

/** The three free Mac apps. Every guide cross-promotes all three. */
export const APPS: AppInfo[] = [
  {
    key: 'windowmac',
    name: 'Windowmac',
    url: 'https://www.windowmac.app/',
    icon: 'https://www.windowmac.app/icon.png',
    pitch: 'Hold Option and flick to snap any window to halves, thirds or another screen. Free and open source.',
  },
  {
    key: 'slidemac',
    name: 'Slidemac',
    url: 'https://www.slidemac.app/',
    icon: 'https://slidemac.vercel.app/icon.png',
    pitch: 'Slide along your trackpad edges for volume, brightness (even external monitors), apps and keyboard light.',
  },
  {
    key: 'screenmac',
    name: 'Screenmac',
    url: 'https://www.screenmac.app/',
    icon: 'https://www.screenmac.app/icon.png',
    pitch: 'Screenshots and screen recordings with annotation and redaction. Native, free, nothing uploaded.',
  },
];

/** Blog topics. A post's `tags` must use these keys; each gets a hub at /blog/topics/<key>/. */
export const TOPICS: Record<string, { label: string; description: string }> = {
  'how-to': {
    label: 'How-to guides',
    description: 'Step-by-step answers for arranging, snapping and moving windows on a Mac.',
  },
  'keyboard-shortcuts': {
    label: 'Keyboard shortcuts',
    description: 'Shortcuts for windows, spaces and displays on macOS, built-in and with Windowmac.',
  },
  'multiple-monitors': {
    label: 'Multiple monitors',
    description: 'Working across a MacBook screen, external displays and ultrawide monitors.',
  },
  'macos-features': {
    label: 'macOS features',
    description: 'Split View, Stage Manager, Mission Control, Spaces and macOS window tiling explained.',
  },
  alternatives: {
    label: 'Alternatives and comparisons',
    description: 'Honest comparisons of Mac window managers, including when another app is the better pick.',
  },
  'best-apps-2027': {
    label: 'Best Mac apps 2027',
    description: 'Roundups of the Mac apps worth installing in 2027.',
  },
  productivity: {
    label: 'Mac productivity',
    description: 'Setups and habits that make a Mac faster to work on.',
  },
  troubleshooting: {
    label: 'Troubleshooting',
    description: 'Fixes for windows that misbehave, open off-screen or will not resize.',
  },
};
