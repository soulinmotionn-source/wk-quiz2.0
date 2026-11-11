import type { SEOData } from '../components/common/SEOHead';

/**
 * During static prerendering (Node, no `document`) every page's SEOHead records its
 * data here so scripts/prerender.js can write real <head> tags into the HTML.
 */
const SERVER_KEY = '__WK_SEO__';

export function recordServerSEO(data: SEOData): void {
  (globalThis as Record<string, unknown>)[SERVER_KEY] = data;
}

export function takeServerSEO(): SEOData | null {
  const g = globalThis as Record<string, unknown>;
  const data = (g[SERVER_KEY] as SEOData | undefined) ?? null;
  delete g[SERVER_KEY];
  return data;
}
