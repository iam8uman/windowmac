import { getCollection, type CollectionEntry } from 'astro:content';
import { APPS, SITE, type AppKey } from '../data/site';

export type Post = CollectionEntry<'blog'>;

export const absoluteUrl = (path: string) => new URL(path, SITE.url).toString();
export const postPath = (slug: string) => `/blog/${slug}/`;
export const topicPath = (topic: string) => `/blog/topics/${topic}/`;

/** Published posts, newest first. Drafts never reach pages, the sitemap or llms.txt. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

/** Posts sharing the most tags, then the same type, newest first. */
export function relatedPosts(post: Post, all: Post[], count = 4): Post[] {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score:
        p.data.tags.filter((t) => tags.has(t)).length * 2 +
        (p.data.type === post.data.type ? 1 : 0) +
        (p.data.primaryApp === post.data.primaryApp ? 0.5 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.p.data.publishedAt.getTime() - a.p.data.publishedAt.getTime())
    .slice(0, count)
    .map(({ p }) => p);
}

/** The three apps, with the post's primary app first and this site's app second. */
export function appsFor(primary: AppKey) {
  const rank = (k: AppKey) => (k === primary ? 0 : k === SITE.key ? 1 : 2);
  return [...APPS].sort((a, b) => rank(a.key) - rank(b.key));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
