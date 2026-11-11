import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { CATEGORY_REGISTRY } from './data/categoryRegistry';
import { FEATURED_QUIZZES } from './data/quizzes';
import type { SEOData } from './components/common/SEOHead';
import { takeServerSEO } from './seo/serverSeo';

export interface RouteInfo {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

/** Every indexable URL on the site — the single source for prerendering and the sitemap. */
export function getRoutes(): RouteInfo[] {
  const routes: RouteInfo[] = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/categories', changefreq: 'daily', priority: '0.9' },
    { path: '/quizzes', changefreq: 'daily', priority: '0.9' },
    { path: '/daily-quiz', changefreq: 'daily', priority: '0.9' },
    { path: '/search', changefreq: 'weekly', priority: '0.5' }
  ];
  for (const c of CATEGORY_REGISTRY.filter(c => c.active)) {
    routes.push({ path: `/categories/${c.slug}`, changefreq: 'weekly', priority: c.popular ? '0.85' : '0.8' });
  }
  for (const q of FEATURED_QUIZZES) {
    routes.push({ path: `/quizzes/${q.slug}`, changefreq: 'weekly', priority: q.featured || q.popular ? '0.85' : '0.8' });
  }
  routes.push(
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms-and-conditions', changefreq: 'monthly', priority: '0.3' },
    { path: '/cookie-policy', changefreq: 'monthly', priority: '0.3' },
    { path: '/disclaimer', changefreq: 'monthly', priority: '0.3' }
  );
  return routes;
}

/** Old URLs that must keep working: path -> destination. */
export const REDIRECTS: Record<string, string> = {
  '/quizzes/medical-abbreviations': '/quizzes/medical-terminology-essentials'
};

export async function render(url: string): Promise<{ html: string; seo: SEOData | null }> {
  const stream = await renderToReadableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    {
      onError(err) {
        throw err;
      }
    }
  );
  // Wait for every lazy route chunk so the complete page is in the HTML
  await stream.allReady;
  const html = await new Response(stream).text();
  return { html, seo: takeServerSEO() };
}
