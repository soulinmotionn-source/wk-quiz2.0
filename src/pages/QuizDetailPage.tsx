import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { QuizPlayer } from '../components/quiz/QuizPlayer';
import { QuizCard } from '../components/cards/QuizCard';
import { AdSlot } from '../components/common/AdSlot';
import { FEATURED_QUIZZES } from '../data/quizzes';
import { CATEGORIES } from '../data/categories';

export const QuizDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find quiz by slug
  const quiz = FEATURED_QUIZZES.find(q => q.slug === slug) || FEATURED_QUIZZES[0];

  // Matching category
  const categoryInfo = CATEGORIES.find(c => c.name.toLowerCase() === quiz.category.toLowerCase());

  // Related quizzes
  const relatedQuizzes = FEATURED_QUIZZES.filter(
    q => q.id !== quiz.id && (q.category === quiz.category || q.difficulty === quiz.difficulty)
  ).slice(0, 3);

  // Schema.org Quiz metadata
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: quiz.title,
    description: quiz.description,
    educationalLevel: quiz.difficulty,
    about: {
      '@type': 'Thing',
      name: quiz.category
    },
    provider: {
      '@type': 'Organization',
      name: 'WKQuiz.com',
      url: 'https://wkquiz.com'
    }
  };

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title={`${quiz.title} — Test & Practice Online`}
        description={`${quiz.description} Practice interactive multiple-choice questions with verified explanations on WKQuiz.com.`}
        canonicalPath={`/quizzes/${quiz.slug}`}
        schema={quizSchema}
      />

      <div className="app-container">
        {/* Navigation Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-lg)'
          }}
        >
          <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          <span>/</span>
          <Link to="/quizzes" style={{ color: 'var(--color-text-muted)' }}>Quizzes</Link>
          <span>/</span>
          {categoryInfo && (
            <>
              <Link to={`/categories/${categoryInfo.slug}`} style={{ color: 'var(--color-text-muted)' }}>
                {quiz.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{quiz.title}</span>
        </div>

        {/* Header Intro for humans first */}
        <div style={{ maxWidth: '780px', margin: '0 auto var(--space-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-primary">{quiz.category}</span>
            <span className={`badge badge-${quiz.difficulty}`}>{quiz.difficulty}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Clock size={14} />
              {quiz.estimatedTime}
            </span>
          </div>

          <h1 className="h1-title" style={{ fontSize: '2.4rem', marginBottom: 'var(--space-xs)' }}>
            {quiz.title}
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {quiz.description}
          </p>
        </div>

        {/* ACTIVE QUIZ ENGINE */}
        <QuizPlayer
          quizId={quiz.id}
          quizTitle={quiz.title}
          category={quiz.category}
          subcategory={quiz.subcategory}
          difficulty={quiz.difficulty}
          mode={quiz.mode}
          count={quiz.questionCount}
          categorySlug={categoryInfo?.slug}
        />

        {/* WHAT YOU'LL LEARN */}
        {quiz.learningPoints && quiz.learningPoints.length > 0 && (
          <section
            className="card"
            style={{
              maxWidth: '780px',
              margin: 'var(--space-3xl) auto var(--space-xl)',
              padding: 'var(--space-xl)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-md)' }}>
              <BookOpen size={22} color="var(--color-primary)" />
              <h2 className="h2-title" style={{ fontSize: '1.4rem' }}>
                What You'll Learn in This Quiz
              </h2>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quiz.learningPoints.map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ ACCORDION (If present) */}
        {quiz.faq && quiz.faq.length > 0 && (
          <section
            style={{
              maxWidth: '780px',
              margin: 'var(--space-xl) auto var(--space-2xl)'
            }}
          >
            <h3 className="h3-title" style={{ marginBottom: 'var(--space-md)' }}>
              Frequently Asked Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {quiz.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                    {item.question}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AdSense In-Content Slot */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <AdSlot type="in-content" slotId="quiz-detail-footer" />
        </div>

        {/* RELATED QUIZZES */}
        {relatedQuizzes.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h3 className="h2-title" style={{ marginBottom: 'var(--space-lg)' }}>
              Related Quizzes
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              {relatedQuizzes.map(q => (
                <QuizCard key={q.id} quiz={q} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
