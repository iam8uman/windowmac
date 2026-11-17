import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Search engines and AI answer engines are welcome: being cited is how people find a free app.
const AGENTS = [
  '*', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended', 'Google-Extended', 'GPTBot', 'OAI-SearchBot',
  'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot',
  'Perplexity-User', 'DuckAssistBot', 'MistralAI-User', 'CCBot',
];

export const GET: APIRoute = () => {
  const body = [
    `# ${SITE.name}: search engines and AI answer engines are welcome.`,
    ...AGENTS.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${SITE.url}/sitemap.xml`,
    `# LLM summary: ${SITE.url}/llms.txt`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
