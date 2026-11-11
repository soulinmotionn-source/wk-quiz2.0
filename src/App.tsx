import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ConsentBanner } from './components/common/ConsentBanner';

// Route-level code splitting: in the browser each page is its own chunk that downloads
// when needed. During static prerendering the same pages are passed in eagerly
// (see entry-server.tsx) so the generated HTML contains real content, not Suspense fallbacks.
const lazyPages = {
  HomePage: lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage }))),
  CategoriesPage: lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage }))),
  CategoryDetailPage: lazy(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage }))),
  QuizzesPage: lazy(() => import('./pages/QuizzesPage').then(m => ({ default: m.QuizzesPage }))),
  QuizDetailPage: lazy(() => import('./pages/QuizDetailPage').then(m => ({ default: m.QuizDetailPage }))),
  DailyQuizPage: lazy(() => import('./pages/DailyQuizPage').then(m => ({ default: m.DailyQuizPage }))),
  IqTestPage: lazy(() => import('./pages/IqTestPage').then(m => ({ default: m.IqTestPage }))),
  SearchPage: lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage }))),
  AboutPage: lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage }))),
  ContactPage: lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage }))),
  PrivacyPolicyPage: lazy(() => import('./pages/legal/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage }))),
  TermsPage: lazy(() => import('./pages/legal/TermsPage').then(m => ({ default: m.TermsPage }))),
  CookiePolicyPage: lazy(() => import('./pages/legal/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage }))),
  DisclaimerPage: lazy(() => import('./pages/legal/DisclaimerPage').then(m => ({ default: m.DisclaimerPage }))),
  EditorialPolicyPage: lazy(() => import('./pages/legal/EditorialPolicyPage').then(m => ({ default: m.EditorialPolicyPage }))),
  AdvertisingPage: lazy(() => import('./pages/legal/AdvertisingPage').then(m => ({ default: m.AdvertisingPage }))),
  AccessibilityPage: lazy(() => import('./pages/legal/AccessibilityPage').then(m => ({ default: m.AccessibilityPage }))),
  SiteMapPage: lazy(() => import('./pages/SiteMapPage').then(m => ({ default: m.SiteMapPage }))),
  NotFoundPage: lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
} satisfies Record<string, React.ComponentType>;

export type PageSet = Record<keyof typeof lazyPages, React.ComponentType>;

const RouteFallback: React.FC = () => (
  <div className="route-loading" aria-busy="true" aria-label="Loading page">
    <div className="quiz-spinner" aria-hidden="true" />
    <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>
  </div>
);

export const App: React.FC<{ pages?: PageSet }> = ({ pages = lazyPages }) => {
  const {
    HomePage, CategoriesPage, CategoryDetailPage, QuizzesPage, QuizDetailPage, DailyQuizPage, IqTestPage, SearchPage, AboutPage, ContactPage, PrivacyPolicyPage, TermsPage, CookiePolicyPage, DisclaimerPage, EditorialPolicyPage, AdvertisingPage, AccessibilityPage, SiteMapPage, NotFoundPage
  } = pages;
  return (
    <>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" className="main-content" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:category" element={<CategoryDetailPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              {/* Alias / Redirect for legacy indexed slug */}
              <Route path="/quizzes/medical-abbreviations" element={<Navigate to="/quizzes/medical-terminology-essentials" replace />} />
              <Route path="/quizzes/:slug" element={<QuizDetailPage />} />
              <Route path="/daily-quiz" element={<DailyQuizPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/iq-test" element={<IqTestPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Legal routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
              <Route path="/advertising-disclosure" element={<AdvertisingPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/site-map" element={<SiteMapPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileBottomNav />
        <ConsentBanner />
      </div>
    </>
  );
};

export default App;
