// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/data/site.ts';

// The landing page is the hand-built public/index.html (served as-is).
// Astro adds the guides, tools and quizzes around it.
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
