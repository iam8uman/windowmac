import type { APIRoute } from 'astro';
import { publishedQuizzes, quizPath } from '../data/quizzes';
import { SITE, TOPICS } from '../data/site';
import { publishedTools, toolPath } from '../data/tools';
import { absoluteUrl, getPublishedPosts, postPath, topicPath } from '../lib/content';

/** Bump when the hand-built landing page (public/index.html) changes meaningfully. */
const HOME_LASTMOD = '2026-11-17';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const day = (d: Date) => d.toISOString().slice(0, 10);
  const newest = posts[0] ? day(posts[0].data.updatedAt ?? posts[0].data.publishedAt) : HOME_LASTMOD;
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: absoluteUrl('/'), lastmod: HOME_LASTMOD },
    { loc: absoluteUrl('/blog/'), lastmod: newest },
    { loc: absoluteUrl('/tools/') },
    ...Object.keys(TOPICS)
      .filter((k) => posts.some((p) => p.data.tags.includes(k)))
      .map((k) => ({ loc: absoluteUrl(topicPath(k)), lastmod: newest })),
    ...publishedTools().map((t) => ({ loc: absoluteUrl(toolPath(t.slug)) })),
    ...publishedQuizzes().map((q) => ({ loc: absoluteUrl(quizPath(q.slug)) })),
    ...posts.map((p) => ({ loc: absoluteUrl(postPath(p.data.slug)), lastmod: day(p.data.updatedAt ?? p.data.publishedAt) })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
