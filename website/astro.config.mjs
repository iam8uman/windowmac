// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/data/site.ts';

// The landing page is the hand-built public/index.html (served as-is).
// Astro adds the guides, tools and quizzes around it.
// In production that file is copied to dist/index.html and the host serves it at /.
// The dev server does not: it only routes src/pages, so / 404s while /index.html works.
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  vite: {
    plugins: [
      {
        name: 'windowmac-dev-home',
        configureServer(server) {
          return () => {
            server.middlewares.stack.unshift({
              route: '',
              handle(req, _res, next) {
                const q = req.url ?? '';
                const path = q.split('?')[0];
                if (path === '/') {
                  const search = q.includes('?') ? q.slice(q.indexOf('?')) : '';
                  req.url = '/index.html' + search;
                }
                next();
              },
            });
          };
        },
      },
    ],
  },
});
