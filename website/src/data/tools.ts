/**
 * Free browser tools. One entry per tool; the page itself lives at
 * src/pages/tools/<slug>.astro and wraps its UI in <ToolLayout slug="...">.
 * The /tools/ hub, sitemap, llms.txt and JSON-LD all read from here.
 */

export interface Faq {
  question: string;
  answer: string;
}

export interface ToolEntry {
  slug: string;
  name: string;
  /** One line for cards and llms.txt. */
  card: string;
  /** H1 lede: the direct answer to what the tool does. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  faq: Faq[];
  /** Blog slugs to link under the tool. */
  related: string[];
  draft?: boolean;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: 'window-size-calculator',
    name: 'Window Size Calculator',
    card: 'Exact pixel sizes for halves, thirds, two thirds and quarters on any Mac display.',
    intro:
      'Enter your display resolution and gap to see the exact pixel size and position of every common window layout: halves, thirds, two thirds, quarters and a centred window.',
    seoTitle: 'Mac Window Size Calculator: Halves, Thirds, Quarters',
    seoDescription:
      'Free calculator for exact window sizes on any Mac display. Halves, thirds, two thirds and quarters in pixels, with gaps, for any resolution.',
    faq: [
      {
        question: 'What resolution should I enter for a Retina display?',
        answer:
          'Enter the "looks like" resolution from System Settings, Displays, not the panel resolution. macOS positions windows in points, so a 14-inch MacBook Pro set to its default looks like 1512 by 982.',
      },
      {
        question: 'Why does the menu bar matter?',
        answer:
          'Windows cannot cover the menu bar, so the usable height is the display height minus the menu bar (about 24 points, or about 37 on Macs with a notch) and minus the Dock if it is always shown.',
      },
      {
        question: 'Does Windowmac use these exact sizes?',
        answer:
          'Yes. Windowmac divides the usable screen area the same way and applies the gap you set in its Settings between windows and at the screen edges.',
      },
    ],
    related: ['how-to-split-screen-on-mac', 'maximize-window-mac-without-full-screen', 'ultrawide-monitor-mac-layouts'],
  },
  {
    slug: 'window-shortcut-cheat-sheet',
    name: 'Mac Window Shortcut Cheat Sheet',
    card: 'Build a printable sheet of the window shortcuts you actually use: macOS built-in, Mission Control and Windowmac.',
    intro:
      'Pick your macOS version and the groups of shortcuts you want, and this builds a one-page cheat sheet of Mac window shortcuts you can print or save as a PDF. Built-in macOS shortcuts and Windowmac shortcuts are listed side by side.',
    seoTitle: 'Mac Window Shortcuts Cheat Sheet (Printable)',
    seoDescription:
      'Build a printable cheat sheet of Mac window shortcuts: tiling, hide, minimise, Mission Control, Spaces and Windowmac. Pick your groups, then print.',
    faq: [
      {
        question: 'Why are the tiling shortcuts missing for my macOS version?',
        answer:
          'The Fn-Control window tiling shortcuts arrived with macOS Sequoia 15. On macOS Ventura 13 or Sonoma 14 they do not exist, so the sheet leaves them out and you need a window manager for keyboard snapping.',
      },
      {
        question: 'What does Fn mean on my keyboard?',
        answer:
          'Fn is the key in the bottom-left corner of Mac keyboards. On many recent keyboards it is also marked with a globe and is called the Globe key.',
      },
      {
        question: 'Do the Windowmac shortcuts clash with the built-in ones?',
        answer:
          'No. Windowmac shortcuts only work while you hold its trigger key, Left Option by default, so Fn-Control shortcuts keep working. Keys that are not Windowmac shortcuts type as normal.',
      },
      {
        question: 'How do I save the sheet as a PDF?',
        answer:
          'Click Print, then in the print dialog open the PDF menu and choose Save as PDF. Only the sheet is printed, not the rest of this page.',
      },
    ],
    related: ['mac-window-keyboard-shortcuts', 'macos-window-tiling-shortcuts', 'mission-control-mac'],
  },
  {
    slug: 'ultrawide-split-calculator',
    name: 'Ultrawide Split Calculator',
    card: 'Split an ultrawide monitor into columns and see each column’s pixel width and real-world size.',
    intro:
      'Choose your ultrawide monitor and a column pattern such as 1:1:1 or 1:2:1, and this works out the exact width of each window in points and in centimetres or inches, and which ordinary monitor size each column is like.',
    seoTitle: 'Ultrawide Monitor Split Calculator for Mac',
    seoDescription:
      'Work out how to split an ultrawide monitor into 2, 3 or 4 columns: exact window widths in points, physical size, and the equivalent normal monitor.',
    faq: [
      {
        question: 'Should I use halves or thirds on an ultrawide?',
        answer:
          'On a 34-inch 3440 by 1440 display, a half is about 40 cm wide, as wide as an 18-inch 16:9 screen and much taller, which is more than many single apps need. Thirds give three columns about 26.5 cm wide each, so they are the usual choice for three apps. Run the calculator with your monitor to see its numbers.',
      },
      {
        question: 'What does the 1:2:1 pattern mean?',
        answer:
          'It splits the screen into a wide middle column twice as wide as the two side columns. It suits a main app such as an editor in the centre with reference windows on each side.',
      },
      {
        question: 'Why does the calculator ask for the looks-like resolution?',
        answer:
          'macOS positions windows in points. Most ultrawides run at their native resolution, so points and pixels are the same, but if you chose a scaled mode in Displays settings, enter the size it says the display looks like.',
      },
      {
        question: 'Can a window manager use custom splits like 1:2:1?',
        answer:
          'Thirds and two thirds are built into most window managers, including Windowmac, which covers 1:1:1 and 1:2. Other ratios need custom layouts; Windowmac lets you add your own layouts as fractions of the screen.',
      },
    ],
    related: ['ultrawide-monitor-mac-layouts', 'how-to-split-screen-on-mac', 'best-window-managers-mac-2027'],
  },
  {
    slug: 'display-scaling-calculator',
    name: 'Display Scaling and PPI Calculator',
    card: 'Pixel density, "looks like" sizes and text size for any monitor on a Mac.',
    intro:
      'Enter a monitor’s resolution and size to get its pixel density (PPI), the scaled "looks like" resolutions you could use on a Mac, and how large text and windows will look on each one compared with a MacBook screen.',
    seoTitle: 'Mac Display Scaling Calculator: PPI and Looks Like',
    seoDescription:
      'Calculate PPI and compare macOS scaled resolutions for any monitor. See how big text looks at each "looks like" size and which modes are sharpest.',
    faq: [
      {
        question: 'What does "looks like" mean in Displays settings?',
        answer:
          'It is the size of the desktop in points, which decides how big text and windows appear. A 4K panel that looks like 1920 by 1080 shows the same amount of content as a 1080p screen, drawn with four times as many pixels.',
      },
      {
        question: 'Which scaled mode is the sharpest?',
        answer:
          'A mode whose looks-like size is exactly half the panel resolution in each direction, such as 1920 by 1080 on a 3840 by 2160 panel, maps every point to a 2 by 2 block of pixels. Other modes are drawn at twice the looks-like size and then resized to fit the panel.',
      },
      {
        question: 'Is a 27-inch 4K monitor good for a Mac?',
        answer:
          'At about 163 PPI it sits between a typical 1x monitor and a Retina laptop. Looks like 1920 by 1080 is sharp but large; looks like 2560 by 1440 gives more space and is a good compromise. Enter your monitor here to compare.',
      },
      {
        question: 'Does scaling slow my Mac down?',
        answer:
          'Apple notes that a scaled resolution may affect performance. On most current Macs the effect is small for everyday work, but it can matter for demanding graphics.',
      },
    ],
    related: ['ultrawide-monitor-mac-layouts', 'move-window-to-another-monitor-mac', 'window-off-screen-mac'],
  },
  {
    slug: 'shortcut-trainer',
    name: 'Mac Window Shortcut Trainer',
    card: 'A quick drill that teaches the Mac shortcuts for snapping, hiding and switching windows.',
    intro:
      'Pick a set of Mac window shortcuts and answer one question at a time. Shortcuts you miss come back until you get them right, and you finish with a score and a list of the ones to practise.',
    seoTitle: 'Mac Keyboard Shortcut Trainer for Windows and Apps',
    seoDescription:
      'Practise Mac window shortcuts in your browser: tiling, Command-Tab, hide, minimise, Mission Control and Windowmac keys. Missed ones repeat until learned.',
    faq: [
      {
        question: 'Why do I pick an answer instead of pressing the keys?',
        answer:
          'Many of these shortcuts are handled by macOS before the browser sees them. Pressing Command-H would hide your browser and Control-Up Arrow would open Mission Control, so the trainer asks you to recognise the combination instead.',
      },
      {
        question: 'How does the trainer decide what to ask again?',
        answer:
          'Each shortcut you get wrong goes back into the queue a few questions later. A round ends when every shortcut in the set has been answered correctly once.',
      },
      {
        question: 'Is my score saved?',
        answer:
          'No. Everything runs in your browser and nothing is stored or sent anywhere. Reload the page to start fresh.',
      },
    ],
    related: ['mac-window-keyboard-shortcuts', 'macos-window-tiling-shortcuts', 'resize-window-mac-keyboard'],
  },
  {
    slug: 'multi-monitor-planner',
    name: 'Multi-Monitor Arrangement Planner',
    card: 'Draw up to three displays to scale and see how macOS will line them up.',
    intro:
      'Enter the size and resolution of up to three displays to see them drawn to scale on your desk and as macOS sees them in points. The planner shows where the edges line up, how much faster the pointer travels on each screen, and how to place each display in Arrange.',
    seoTitle: 'Multi-Monitor Setup Planner for Mac (Free)',
    seoDescription:
      'Plan a dual or triple monitor setup for your Mac. See displays to scale, how macOS arranges them in points, and where windows and the pointer will cross.',
    faq: [
      {
        question: 'Why does my pointer jump when it moves between screens?',
        answer:
          'macOS moves the pointer in points. If two displays have different points per inch, the same movement covers a different physical distance on each, and edges that look aligned on your desk may not be aligned in Arrange.',
      },
      {
        question: 'How do I line the displays up in macOS?',
        answer:
          'Open System Settings, Displays, click Arrange, and drag each display so its edge matches where it sits on your desk. The planner tells you how far down to drag a smaller display so the centres line up.',
      },
      {
        question: 'What should I enter for a MacBook screen?',
        answer:
          'Enter the panel resolution and the "looks like" size from Displays settings. For example, a 14-inch MacBook Pro is a 3024 by 1964 panel that looks like 1512 by 982 by default.',
      },
      {
        question: 'Can I move a window to the other display with one key?',
        answer:
          'macOS has no built-in shortcut for that. Window managers add one; in Windowmac, hold Option and press the right bracket key to send the window to the next screen with its layout kept.',
      },
    ],
    related: ['move-window-to-another-monitor-mac', 'window-off-screen-mac', 'ultrawide-monitor-mac-layouts'],
  },
];

export const toolPath = (slug: string) => `/tools/${slug}/`;
export const publishedTools = () => TOOLS.filter((t) => !t.draft);
export const getTool = (slug: string) => {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
};
