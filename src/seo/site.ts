export const SITE_URL = 'https://wkquiz.com';
export const SITE_NAME = 'WKQuiz.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Absolute canonical URL for a route path ("/" keeps its slash, everything else has none). */
export function canonicalUrl(path: string): string {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

export function withSiteName(title: string): string {
  return title.includes('WKQuiz') ? title : `${title} | ${SITE_NAME}`;
}

/** Trim to a search-snippet friendly length without cutting mid-word. */
export function clampDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—]+$/, '')}…`;
}

/** Public inbox shown on the site. Change this if you use a different support address. */
export const CONTACT_EMAIL = 'privacy@wkquiz.com';
