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
  {
    slug: 'tiler-or-floater',
    name: 'Are You a Tiler or a Floater?',
    card: 'Seven questions on how you like windows to behave: tiled automatically, snapped on demand, lined up in a strip or left floating.',
    intro:
      'Some people want every window tiled automatically, others want windows to stay exactly where they drop them. Answer seven questions to see which of four window styles fits you, and which tools match it.',
    seoTitle: 'Tiling or Floating Windows? Mac Window Style Quiz',
    seoDescription:
      'Are you a tiler or a floater? Take a seven-question quiz to find your Mac window style: auto tiling, snapping on demand, a scrolling strip or free floating.',
    questions: [
      {
        question: 'A new window opens. What should happen?',
        options: [
          { label: 'The other windows shrink to make room for it', to: { tiler: 3 } },
          { label: 'It joins the row next to what I am working on', to: { strip: 3 } },
          { label: 'Nothing; I will place it if I care', to: { snapper: 2, floater: 1 } },
          { label: 'It opens wherever, I don’t mind overlap', to: { floater: 3 } },
        ],
      },
      {
        question: 'How do you feel about overlapping windows?',
        options: [
          { label: 'I hate them; every pixel should be used', to: { tiler: 2, strip: 1 } },
          { label: 'Fine for a moment, then I tidy up', to: { snapper: 2 } },
          { label: 'Overlap is how I work', to: { floater: 3 } },
        ],
      },
      {
        question: 'How many windows do you keep open on one screen?',
        options: [
          { label: 'One or two', to: { floater: 2, snapper: 1 } },
          { label: 'Three or four', to: { snapper: 2, tiler: 1 } },
          { label: 'Five or more', to: { strip: 2, tiler: 2 } },
        ],
      },
      {
        question: 'Would you edit a config file to get your layout right?',
        options: [
          { label: 'Yes, I keep my dotfiles in Git', to: { tiler: 3 } },
          { label: 'I would rather use a settings window', to: { snapper: 1, strip: 1 } },
          { label: 'No setup at all, please', to: { floater: 2, snapper: 1 } },
        ],
      },
      {
        question: 'Which screen do you mostly work on?',
        options: [
          { label: 'A laptop screen', to: { strip: 2, floater: 1 } },
          { label: 'A standard external monitor', to: { snapper: 2, tiler: 1 } },
          { label: 'An ultrawide or several monitors', to: { tiler: 2, snapper: 1 } },
        ],
      },
      {
        question: 'How do you switch to a window that is buried?',
        options: [
          { label: 'A keyboard shortcut that focuses it directly', to: { tiler: 2, strip: 1 } },
          { label: 'Command-Tab or clicking it in the Dock', to: { floater: 2, snapper: 1 } },
          { label: 'I scroll or swipe to it', to: { strip: 3 } },
          { label: 'Mission Control', to: { floater: 1, snapper: 1 } },
        ],
      },
      {
        question: 'What annoys you most?',
        options: [
          { label: 'Dragging edges to resize windows by hand', to: { snapper: 2, tiler: 1 } },
          { label: 'Windows moving when I did not ask', to: { floater: 2, snapper: 1 } },
          { label: 'Squeezed windows that are too narrow to read', to: { strip: 3 } },
          { label: 'Wasted space between windows', to: { tiler: 2 } },
        ],
      },
    ],
    outcomes: [
      {
        id: 'tiler',
        name: 'Tiler',
        what: 'You want windows arranged for you, with no gaps and no overlap, and you are happy to configure it. Automatic tiling window managers such as yabai and AeroSpace are built for you.',
        href: '/blog/yabai-vs-aerospace/',
        hrefLabel: 'Compare yabai and AeroSpace',
      },
      {
        id: 'snapper',
        name: 'Snapper',
        what: 'You like windows to stay put until you tell them to move, then snap neatly into halves, thirds or quarters. macOS tiling or a snapping window manager such as Windowmac suits you.',
        href: '/blog/how-to-snap-windows-on-mac/',
        hrefLabel: 'How to snap windows',
      },
      {
        id: 'strip',
        name: 'Strip scroller',
        what: 'You keep many windows open but want each one wide enough to use. A scrolling strip of columns, like Windowmac’s Strip (hold Option and press S), lets the row run wider than the screen.',
        href: '/#strip',
        hrefLabel: 'See Strip in action',
      },
      {
        id: 'floater',
        name: 'Floater',
        what: 'You are comfortable with overlapping windows and switch between them as you go. The built-in tools, Command-Tab, Mission Control and Stage Manager, may be all you need.',
        href: '/blog/stage-manager-mac/',
        hrefLabel: 'Try Stage Manager',
      },
    ],
    faq: [
      {
        question: 'What is the difference between tiling and snapping?',
        answer:
          'A tiling window manager arranges every window automatically as they open and close. A snapping tool moves a window only when you ask, using a shortcut, a drag or a gesture.',
      },
      {
        question: 'Can I be a tiler on a laptop screen?',
        answer:
          'Yes, but tiling many windows on a small screen makes each one narrow. Many laptop users prefer full-height columns they can scroll through, or one or two snapped windows at a time.',
      },
      {
        question: 'Is my answer stored?',
        answer: 'No. The result is worked out in your browser and nothing is sent anywhere.',
      },
    ],
  },
  {
    slug: 'multi-monitor-setup',
    name: 'Which Monitor Setup Suits Your Mac?',
    card: 'Six questions to match your work to a laptop-only, dual-screen, ultrawide or multi-monitor setup.',
    intro:
      'A second screen is not always the best upgrade. Answer six questions about how you work, and this quiz suggests whether a laptop screen with desktop spaces, a laptop plus one monitor, an ultrawide or several monitors fits you best.',
    seoTitle: 'Best Monitor Setup for Your Mac: Free Quiz',
    seoDescription:
      'Laptop only, dual monitors, ultrawide or three screens? Answer six questions to find the Mac monitor setup that fits the way you work.',
    questions: [
      {
        question: 'Where do you work most days?',
        options: [
          { label: 'Different places: cafés, trains, sofas', to: { laptop: 3 } },
          { label: 'At one desk', to: { dual: 1, ultrawide: 1, multi: 1 } },
          { label: 'A desk at home and on the move', to: { dual: 2, laptop: 1 } },
        ],
      },
      {
        question: 'How many apps do you need to see at the same time?',
        options: [
          { label: 'One, full attention', to: { laptop: 2 } },
          { label: 'Two side by side', to: { dual: 2, ultrawide: 1 } },
          { label: 'Three, like an editor between two references', to: { ultrawide: 3 } },
          { label: 'Four or more, including dashboards', to: { multi: 3 } },
        ],
      },
      {
        question: 'Do you work with wide content like timelines or spreadsheets?',
        options: [
          { label: 'Yes, all the time', to: { ultrawide: 3 } },
          { label: 'Sometimes', to: { dual: 1, ultrawide: 1 } },
          { label: 'Rarely', to: { laptop: 1, dual: 1 } },
        ],
      },
      {
        question: 'Do you like a bezel between tasks?',
        options: [
          { label: 'Yes, one screen per task keeps me focused', to: { dual: 2, multi: 2 } },
          { label: 'No, I want one uninterrupted canvas', to: { ultrawide: 3 } },
          { label: 'I switch desktop spaces instead', to: { laptop: 3 } },
        ],
      },
      {
        question: 'How often do you plug in and unplug?',
        options: [
          { label: 'Several times a day', to: { laptop: 2, dual: 1 } },
          { label: 'Once a day at most', to: { dual: 1, ultrawide: 1 } },
          { label: 'Never, it is a desktop setup', to: { multi: 2, ultrawide: 1 } },
        ],
      },
      {
        question: 'How much desk space do you have?',
        options: [
          { label: 'Barely room for a laptop', to: { laptop: 3 } },
          { label: 'Room for one large monitor', to: { ultrawide: 2, dual: 2 } },
          { label: 'A long desk', to: { multi: 3 } },
        ],
      },
    ],
    outcomes: [
      {
        id: 'laptop',
        name: 'Laptop screen plus desktop spaces',
        what: 'You move around and focus on one or two apps at a time. Use several desktop spaces and swipe between them instead of carrying a monitor.',
        href: '/blog/multiple-desktops-mac/',
        hrefLabel: 'Set up multiple desktops',
      },
      {
        id: 'dual',
        name: 'Laptop plus one monitor',
        what: 'A single external monitor beside your laptop gives you two clear work areas. The skill to learn is moving windows between the two screens quickly.',
        href: '/blog/move-window-to-another-monitor-mac/',
        hrefLabel: 'Move windows between monitors',
      },
      {
        id: 'ultrawide',
        name: 'One ultrawide monitor',
        what: 'You want three apps side by side or wide timelines without a bezel in the middle. An ultrawide split into thirds suits you.',
        href: '/blog/ultrawide-monitor-mac-layouts/',
        hrefLabel: 'Ultrawide layouts',
      },
      {
        id: 'multi',
        name: 'Two or more external monitors',
        what: 'You watch several things at once and have the desk for it. Plan the sizes so the screens line up and the pointer crosses cleanly. Check how many displays your Mac supports first.',
        href: '/tools/multi-monitor-planner/',
        hrefLabel: 'Plan your monitors',
      },
    ],
    faq: [
      {
        question: 'How many external displays does my Mac support?',
        answer:
          'It depends on the model and chip. Open System Settings, choose Help in the menu bar, open your Mac’s Specifications and look under Display Support or Video Support.',
      },
      {
        question: 'Is an ultrawide better than two monitors?',
        answer:
          'Neither is better for everyone. An ultrawide gives one continuous area that suits three columns or long timelines; two monitors give a natural split between tasks and can mix sizes and orientations.',
      },
      {
        question: 'Is my answer stored?',
        answer: 'No. The result is worked out in your browser and nothing is sent anywhere.',
      },
    ],
  },
  {
    slug: 'mac-multitasking-style',
    name: 'What Is Your Mac Multitasking Style?',
    card: 'Seven questions to find which macOS multitasking feature fits you: Spaces, Stage Manager, Split View or tiling.',
    intro:
      'macOS has four main ways to juggle apps: desktop spaces, Stage Manager, full-screen Split View and window tiling. Answer seven questions to see which one matches how you already work, with a guide to get started.',
    seoTitle: 'Mac Multitasking Style Quiz: Spaces or Stage Manager?',
    seoDescription:
      'Spaces, Stage Manager, Split View or tiling? Take a seven-question quiz to find the macOS multitasking feature that matches how you work.',
    questions: [
      {
        question: 'You are switching from email to a design project. What do you do?',
        options: [
          { label: 'Swipe to another desktop that has the design apps', to: { spaces: 3 } },
          { label: 'Click the group of design apps at the side of the screen', to: { stage: 3 } },
          { label: 'Put two apps full screen side by side', to: { split: 3 } },
          { label: 'Snap the windows I need into halves', to: { tiling: 3 } },
        ],
      },
      {
        question: 'How do you feel about the menu bar and Dock?',
        options: [
          { label: 'Hide them; I want every bit of screen', to: { split: 2 } },
          { label: 'Keep them visible', to: { tiling: 2, stage: 1 } },
          { label: 'I don’t notice them', to: { spaces: 1, stage: 1 } },
        ],
      },
      {
        question: 'Which trackpad habit sounds like you?',
        options: [
          { label: 'Swiping sideways with three or four fingers', to: { spaces: 2, split: 1 } },
          { label: 'Swiping up to see everything', to: { spaces: 1, stage: 1 } },
          { label: 'I mostly use the keyboard', to: { tiling: 2 } },
        ],
      },
      {
        question: 'How many projects do you juggle in a day?',
        options: [
          { label: 'One, in depth', to: { split: 2, tiling: 1 } },
          { label: 'Two or three, each with its own apps', to: { spaces: 2, stage: 2 } },
          { label: 'Lots of small tasks', to: { tiling: 2, stage: 1 } },
        ],
      },
      {
        question: 'Do you need to see the desktop and its files often?',
        options: [
          { label: 'Yes', to: { stage: 1, tiling: 1 } },
          { label: 'Not really', to: { split: 1, spaces: 1 } },
        ],
      },
      {
        question: 'How big is your main screen?',
        options: [
          { label: 'A laptop screen', to: { split: 2, spaces: 1 } },
          { label: 'A large monitor', to: { tiling: 2, stage: 1 } },
          { label: 'Several screens', to: { spaces: 1, tiling: 2 } },
        ],
      },
      {
        question: 'Which bothers you most?',
        options: [
          { label: 'Clutter from windows I am not using', to: { stage: 3 } },
          { label: 'Losing track of which desktop an app is on', to: { stage: 1, tiling: 2 } },
          { label: 'Distractions while I focus', to: { split: 3 } },
          { label: 'Mixing up work and personal apps', to: { spaces: 3 } },
        ],
      },
    ],
    outcomes: [
      {
        id: 'spaces',
        name: 'Desktop spaces',
        what: 'You think in separate rooms: one desktop for each project or context. Set up a few spaces and swipe between them, or assign apps to a space.',
        href: '/blog/multiple-desktops-mac/',
        hrefLabel: 'Set up desktop spaces',
      },
      {
        id: 'stage',
        name: 'Stage Manager',
        what: 'You want the current app front and centre, with other apps tucked into a strip at the side and grouped by task.',
        href: '/blog/stage-manager-mac/',
        hrefLabel: 'Learn Stage Manager',
      },
      {
        id: 'split',
        name: 'Full-screen Split View',
        what: 'You focus on one or two apps and like distractions gone. Split View puts two apps full screen side by side in a space of their own.',
        href: '/blog/how-to-split-screen-on-mac/',
        hrefLabel: 'Split your screen',
      },
      {
        id: 'tiling',
        name: 'Window tiling',
        what: 'You keep several windows open and want them neatly arranged with the menu bar and Dock in view. Built-in tiling or a window manager such as Windowmac fits.',
        href: '/blog/how-to-snap-windows-on-mac/',
        hrefLabel: 'Snap your windows',
      },
    ],
    faq: [
      {
        question: 'Is Split View the same as tiling?',
        answer:
          'No. Split View puts two apps full screen in a desktop space of their own, with the menu bar and Dock hidden. Tiling arranges windows on your normal desktop, so everything else stays available.',
      },
      {
        question: 'Why will Stage Manager not turn on?',
        answer:
          'Stage Manager needs "Displays have separate Spaces" to be on. Turn it on in System Settings, Desktop & Dock, under Mission Control.',
      },
      {
        question: 'Is my answer stored?',
        answer: 'No. The result is worked out in your browser and nothing is sent anywhere.',
      },
    ],
  },
];

export const quizPath = (slug: string) => `/quiz/${slug}/`;
export const publishedQuizzes = () => QUIZZES.filter((q) => !q.draft);
