import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPICS } from './data/site';

const topicKeys = Object.keys(TOPICS) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().max(220),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    /** how-to | alternative | comparison | roundup | explainer | troubleshooting */
    type: z.enum(['how-to', 'alternative', 'comparison', 'roundup', 'explainer', 'troubleshooting']),
    tags: z.array(z.enum(topicKeys)).min(1),
    /** Which of the three apps this post is really about (ordered first in the callout). */
    primaryApp: z.enum(['windowmac', 'slidemac', 'screenmac']),
    /** Slug of a free tool or quiz on this site to feature, e.g. "tools/window-layout-calculator". */
    feature: z.string().optional(),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .min(3)
      .max(8),
    /** Sources actually opened while writing, for facts about other apps or macOS. */
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    seoTitle: z.string().max(60),
    seoDescription: z.string().min(70).max(160),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
