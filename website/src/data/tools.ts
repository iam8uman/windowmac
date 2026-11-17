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
    related: [],
  },
];

export const toolPath = (slug: string) => `/tools/${slug}/`;
export const publishedTools = () => TOOLS.filter((t) => !t.draft);
export const getTool = (slug: string) => {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
};
