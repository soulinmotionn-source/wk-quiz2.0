import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE, canonicalUrl, clampDescription, withSiteName } from '../../seo/site';
import { recordServerSEO } from '../../seo/serverSeo';

export type JsonLd = Record<string, unknown>;

export interface SEOData {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schema?: JsonLd | JsonLd[];
  noindex?: boolean;
  image?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const SEOHead: React.FC<SEOData> = props => {
  const { title, description, canonicalPath = '/', type = 'website', schema, noindex = false, image = DEFAULT_OG_IMAGE } = props;

  if (typeof document === 'undefined') {
    recordServerSEO(props);
  }

  const schemaJson = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    const fullTitle = withSiteName(title);
    const desc = clampDescription(description);
    const url = canonicalUrl(canonicalPath);

    document.title = fullTitle;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

    // Canonical only for indexable pages
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', 'WKQuiz.com');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', image);

    let script = document.getElementById('wkquiz-schema-jsonld') as HTMLScriptElement | null;
    if (schemaJson) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'wkquiz-schema-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = schemaJson;
    } else {
      script?.remove();
    }
  }, [title, description, canonicalPath, type, noindex, image, schemaJson]);

  return null;
};
