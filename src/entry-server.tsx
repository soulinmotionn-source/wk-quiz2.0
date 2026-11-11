import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App, { type PageSet } from './App';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizDetailPage } from './pages/QuizDetailPage';
import { DailyQuizPage } from './pages/DailyQuizPage';
import { IqTestPage } from './pages/IqTestPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CookiePolicyPage } from './pages/legal/CookiePolicyPage';
import { DisclaimerPage } from './pages/legal/DisclaimerPage';
import { EditorialPolicyPage } from './pages/legal/EditorialPolicyPage';
import { AdvertisingPage } from './pages/legal/AdvertisingPage';
import { AccessibilityPage } from './pages/legal/AccessibilityPage';
import { SiteMapPage } from './pages/SiteMapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CATEGORY_REGISTRY } from './data/categoryRegistry';
import { FEATURED_QUIZZES } from './data/quizzes';
import type { SEOData } from './components/common/SEOHead';
import { takeServerSEO } from './seo/serverSeo';
import { isCategoryIndexable, isQuizIndexable } from './seo/indexing';

const eagerPages: PageSet = {
  HomePage: HomePage,
  CategoriesPage: CategoriesPage,
  CategoryDetailPage: CategoryDetailPage,
  QuizzesPage: QuizzesPage,
  QuizDetailPage: QuizDetailPage,
  DailyQuizPage: DailyQuizPage,
  IqTestPage: IqTestPage,
  SearchPage: SearchPage,
  AboutPage: AboutPage,
  ContactPage: ContactPage,
  PrivacyPolicyPage: PrivacyPolicyPage,
  TermsPage: TermsPage,
  CookiePolicyPage: CookiePolicyPage,
  DisclaimerPage: DisclaimerPage,
  EditorialPolicyPage: EditorialPolicyPage,
  AdvertisingPage: AdvertisingPage,
  AccessibilityPage: AccessibilityPage,
  SiteMapPage: SiteMapPage,
  NotFoundPage: NotFoundPage
};

export interface RouteInfo {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  /** false = prerendered for visitors but noindex and left out of the sitemap */
  indexable: boolean;
}

/** Every indexable URL on the site — the single source for prerendering and the sitemap. */
export function getRoutes(): RouteInfo[] {
  const routes: RouteInfo[] = [
    { path: '/', changefreq: 'daily', priority: '1.0', indexable: true },
    { path: '/categories', changefreq: 'daily', priority: '0.9', indexable: true },
    { path: '/quizzes', changefreq: 'daily', priority: '0.9', indexable: true },
    { path: '/daily-quiz', changefreq: 'daily', priority: '0.9', indexable: true },
    { path: '/iq-test', changefreq: 'weekly', priority: '0.9', indexable: true },
    { path: '/search', changefreq: 'weekly', priority: '0.5', indexable: true }
  ];
  for (const c of CATEGORY_REGISTRY.filter(c => c.active)) {
    routes.push({ path: `/categories/${c.slug}`, changefreq: 'weekly', priority: '0.85', indexable: isCategoryIndexable(c.slug) });
  }
  for (const q of FEATURED_QUIZZES) {
    routes.push({ path: `/quizzes/${q.slug}`, changefreq: 'weekly', priority: '0.8', indexable: isQuizIndexable(q) });
  }
  routes.push(
    { path: '/about', changefreq: 'monthly', priority: '0.6', indexable: true },
    { path: '/contact', changefreq: 'monthly', priority: '0.5', indexable: true },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/terms-and-conditions', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/cookie-policy', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/disclaimer', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/editorial-policy', changefreq: 'monthly', priority: '0.6', indexable: true },
    { path: '/advertising-disclosure', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/accessibility', changefreq: 'monthly', priority: '0.3', indexable: true },
    { path: '/site-map', changefreq: 'weekly', priority: '0.5', indexable: true }
  );
  return routes;
}

/** Old URLs that must keep working: path -> destination. */
export const REDIRECTS: Record<string, string> = {
  '/quizzes/medical-abbreviations': '/quizzes/medical-terminology-essentials'
};

export async function render(url: string): Promise<{ html: string; seo: SEOData | null }> {
  // prerender() waits for every lazy route chunk and returns fully resolved HTML:
  // no Suspense fallbacks or streaming swap scripts, so hydration sees plain markup.
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App pages={eagerPages} />
    </StaticRouter>,
    {
      // Never split large boundaries into late-streamed segments: keep the HTML fully inline.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError(err) {
        throw err;
      }
    }
  );
  const html = await new Response(prelude).text();
  return { html, seo: takeServerSEO() };
}
