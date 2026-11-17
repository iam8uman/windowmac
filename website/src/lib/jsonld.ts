import { SITE } from '../data/site';
import { absoluteUrl } from './content';

const AUTHOR_ID = `${SITE.url}/#author`;
const WEBSITE_ID = `${SITE.url}/#website`;
const APP_ID = `${SITE.url}/#app`;

export interface Crumb {
  name: string;
  path: string;
}

export function authorJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: SITE.author.name,
    url: SITE.author.url,
    sameAs: [SITE.author.url],
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: Date;
  updatedAt?: Date;
  type: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': input.type === 'how-to' || input.type === 'troubleshooting' ? 'TechArticle' : 'BlogPosting',
    '@id': `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(SITE.ogImage),
    datePublished: input.publishedAt.toISOString(),
    dateModified: (input.updatedAt ?? input.publishedAt).toISOString(),
    inLanguage: SITE.lang,
    author: { '@id': AUTHOR_ID, '@type': 'Person', name: SITE.author.name, url: SITE.author.url },
    publisher: { '@type': 'Person', name: SITE.author.name, url: SITE.author.url },
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': APP_ID },
  };
}

export function webAppJsonLd(input: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (runs in the browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': AUTHOR_ID, '@type': 'Person', name: SITE.author.name },
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
