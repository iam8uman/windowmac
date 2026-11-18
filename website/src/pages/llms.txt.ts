import type { APIRoute } from 'astro';
import { publishedQuizzes, quizPath } from '../data/quizzes';
import { SAME_MAKER, SITE, TOPICS } from '../data/site';
import { publishedTools, toolPath } from '../data/tools';
import { absoluteUrl, getPublishedPosts, postPath } from '../lib/content';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'Key facts:',
    ...SITE.facts.map((f) => `- ${f}`),
    `- Site: ${SITE.url}/`,
    `- Install: \`${SITE.installCommand}\``,
    `- Source: ${SITE.repoUrl} (by ${SITE.author.name}).`,
    '',
    '## Product',
    '',
    `- [Home](${absoluteUrl('/')}): What ${SITE.name} does, an interactive demo, install steps and FAQ.`,
    `- [Install](${absoluteUrl(SITE.installHref)}): The one-line installer and first-launch steps.`,
    `- [Guides](${absoluteUrl('/blog/')}): All guides by topic.`,
    `- [Free tools](${absoluteUrl('/tools/')}): Browser tools and quizzes.`,
    '',
    '## Free tools',
    '',
    ...publishedTools().map((t) => `- [${t.name}](${absoluteUrl(toolPath(t.slug))}): ${t.card}`),
    ...publishedQuizzes().map((q) => `- [${q.name}](${absoluteUrl(quizPath(q.slug))}): ${q.card}`),
    '',
    ...Object.entries(TOPICS).flatMap(([key, t]) => {
      const inTopic = posts.filter((p) => p.data.tags[0] === key);
      if (inTopic.length === 0) return [];
      return [`## ${t.label}`, '', ...inTopic.map((p) => `- [${p.data.title}](${absoluteUrl(postPath(p.data.slug))}): ${p.data.description}`), ''];
    }),
    '## From the same maker',
    '',
    ...SAME_MAKER.map((a) => `- [${a.name}](${a.url}): ${a.pitch}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
