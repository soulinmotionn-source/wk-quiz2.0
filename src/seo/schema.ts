import { SITE_NAME, SITE_URL, canonicalUrl } from './site';
import type { JsonLd } from '../components/common/SEOHead';

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path)
    }))
  };
}

export function faqSchema(items: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer }
    }))
  };
}

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [
      'https://www.youtube.com/channel/UCeEZz94n1bmsnezrF3aI6fw',
      'https://www.instagram.com/wkquiz/',
      'https://www.facebook.com/wkquiz',
      'https://tiktok.com/@wkquizs'
    ]
  };
}

export function collectionSchema(name: string, description: string, path: string, items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: canonicalUrl(path),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: canonicalUrl(it.path)
      }))
    }
  };
}
