import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ScrollToTop } from './components/common/ScrollToTop';

// Route-level code splitting: each page becomes its own chunk that only
// downloads when the user navigates to it. The homepage bundle stays lean.
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage })));
const QuizzesPage = lazy(() => import('./pages/QuizzesPage').then(m => ({ default: m.QuizzesPage })));
const QuizDetailPage = lazy(() => import('./pages/QuizDetailPage').then(m => ({ default: m.QuizDetailPage })));
const DailyQuizPage = lazy(() => import('./pages/DailyQuizPage').then(m => ({ default: m.DailyQuizPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/legal/TermsPage').then(m => ({ default: m.TermsPage })));
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const DisclaimerPage = lazy(() => import('./pages/legal/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const RouteFallback: React.FC = () => (
  <div className="route-loading" aria-busy="true" aria-label="Loading page">
    <div className="quiz-spinner" aria-hidden="true" />
    <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className="main-content">
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
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Legal routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
