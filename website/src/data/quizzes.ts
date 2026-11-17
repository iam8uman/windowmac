/**
 * Data-driven quizzes, built by src/pages/quiz/[slug].astro.
 * Each answer adds points to one or more outcomes; the top outcome wins and
 * the runner-up is shown too. A new quiz only needs an entry here.
 * Every outcome `href` must be a real page (checked by scripts/check-links.mjs).
 */
import type { Faq } from './tools';

export interface QuizOutcome {
  id: string;
  name: string;
  what: string;
  href: string;
  hrefLabel: string;
}

export interface QuizQuestion {
  question: string;
  options: { label: string; to: Record<string, number> }[];
}

export interface Quiz {
  slug: string;
  name: string;
  card: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  questions: QuizQuestion[];
  outcomes: QuizOutcome[];
  faq: Faq[];
  draft?: boolean;
}

export const QUIZZES: Quiz[] = [
  {
    slug: 'which-mac-window-manager',
    name: 'Which Mac Window Manager Fits You?',
    card: 'Six questions to match how you work with a window manager style.',
    intro:
      'Mac window managers fall into a few styles: gesture snapping, keyboard snapping, automatic tiling and saved layouts. Answer six questions to find the style that fits how you work.',
    seoTitle: 'Which Mac Window Manager Fits You? Free Quiz',
    seoDescription:
      'Take a six-question quiz to find the Mac window manager style that fits you: gesture snapping, keyboard snapping, auto tiling or saved layouts.',
    questions: [
      {
        question: 'How do you usually move a window today?',
        options: [
          { label: 'I drag it with the mouse or trackpad', to: { gesture: 2, builtin: 1 } },
          { label: 'Keyboard shortcuts whenever I can', to: { keyboard: 2, tiling: 1 } },
          { label: 'I mostly leave windows where they open', to: { builtin: 2 } },
          { label: 'I wish windows arranged themselves', to: { tiling: 2 } },
        ],
      },
      {
        question: 'How many windows are open on a typical screen?',
        options: [
          { label: 'One or two', to: { builtin: 2, gesture: 1 } },
          { label: 'Three or four', to: { gesture: 2, keyboard: 1 } },
          { label: 'Five or more', to: { tiling: 2, keyboard: 1 } },
        ],
      },
      {
        question: 'Do you use more than one display?',
        options: [
          { label: 'Just the laptop screen', to: { builtin: 1, gesture: 1 } },
          { label: 'A laptop plus one monitor', to: { gesture: 2, keyboard: 1 } },
          { label: 'Several monitors or an ultrawide', to: { tiling: 1, keyboard: 2 } },
        ],
      },
      {
        question: 'How do you feel about configuration files?',
        options: [
          { label: 'Happy to write one', to: { tiling: 3 } },
          { label: 'A settings window is enough', to: { gesture: 1, keyboard: 1 } },
          { label: 'I want zero setup', to: { builtin: 2, gesture: 1 } },
        ],
      },
      {
        question: 'Which matters more?',
        options: [
          { label: 'Not having to look or aim', to: { gesture: 3 } },
          { label: 'Never touching the mouse', to: { keyboard: 2, tiling: 1 } },
          { label: 'Installing nothing', to: { builtin: 3 } },
        ],
      },
      {
        question: 'Do you want windows to move by themselves when a new one opens?',
        options: [
          { label: 'Yes, keep everything tiled', to: { tiling: 3 } },
          { label: 'No, only when I ask', to: { gesture: 1, keyboard: 1, builtin: 1 } },
        ],
      },
    ],
    outcomes: [
      {
        id: 'gesture',
        name: 'Gesture snapping',
        what: 'You want to point roughly where a window goes and let go, without aiming at a small target or remembering keys. A radial gesture window manager like Windowmac fits you.',
        href: '/',
        hrefLabel: 'Try Windowmac',
      },
      {
        id: 'keyboard',
        name: 'Keyboard snapping',
        what: 'You want a shortcut for every layout. Most snapping apps, including Windowmac with Option held, give you halves, thirds and quarters from the keyboard.',
        href: '/tools/window-size-calculator/',
        hrefLabel: 'Plan your layouts',
      },
      {
        id: 'tiling',
        name: 'Automatic tiling',
        what: 'You want windows to arrange themselves in a grid as they open. Tiling window managers configured with a file suit you; Windowmac’s Strip gives a lighter version of this.',
        href: '/tools/window-size-calculator/',
        hrefLabel: 'See tile sizes',
      },
      {
        id: 'builtin',
        name: 'Built-in macOS tools',
        what: 'macOS already includes Split View, Stage Manager and window tiling. Start with those, and add a window manager if they start to feel slow.',
        href: '/blog/',
        hrefLabel: 'Read the guides',
      },
    ],
    faq: [
      {
        question: 'Is this quiz based on my actual setup?',
        answer:
          'It is based only on your answers. Nothing is sent anywhere; the result is worked out in your browser.',
      },
      {
        question: 'Do I need a window manager at all?',
        answer:
          'Not always. If you keep one or two windows open, the built-in macOS tiling and Split View may be enough.',
      },
      {
        question: 'Can I use more than one style?',
        answer:
          'Yes. Windowmac, for example, supports both a mouse gesture and keyboard shortcuts for the same layouts.',
      },
    ],
  },
];

export const quizPath = (slug: string) => `/quiz/${slug}/`;
export const publishedQuizzes = () => QUIZZES.filter((q) => !q.draft);
