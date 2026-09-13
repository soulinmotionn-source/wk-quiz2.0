import React from 'react';
import { Calendar, Flame, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { QuizPlayer } from '../components/quiz/QuizPlayer';
import { useQuizStorage } from '../hooks/useQuizStorage';

export const DailyQuizPage: React.FC = () => {
  const { progress } = useQuizStorage();

  const todayDateStr = new Date().toISOString().slice(0, 10);
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div style={{ padding: 'var(--space-2xl) 0' }}>
      <SEOHead
        title={`Daily Quiz — ${todayFormatted} Challenge`}
        description="Take today's official WKQuiz daily challenge. 10 mixed trivia and educational questions refreshed every 24 hours. Keep your streak alive!"
        canonicalPath="/daily-quiz"
      />

      <div className="app-container">
        {/* Navigation */}
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Daily Header Banner */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto var(--space-xl)',
            textAlign: 'center'
          }}
        >
          {/* Badges row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-sm)'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              <Flame size={14} fill="currentColor" />
              <span>{progress.streak} Day Streak</span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-warning-light)',
                color: '#D97706',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              <Award size={14} />
              <span>+50 Bonus XP</span>
            </span>
          </div>

          <h1 className="h1-title" style={{ fontSize: '2.4rem', marginBottom: 'var(--space-xs)' }}>
            Daily Challenge
          </h1>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-sm)'
            }}
          >
            <Calendar size={16} />
            <span>{todayFormatted}</span>
          </div>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
            10 deterministic questions chosen across medical facts, world geography, sciences, and general trivia. All users answer the same challenge today.
          </p>
        </div>

        {/* Live Daily Quiz Player */}
        <QuizPlayer
          quizId={`daily-${todayDateStr}`}
          quizTitle={`Daily Challenge — ${todayFormatted}`}
          category="Mixed Quiz"
          difficulty="mixed"
          mode="daily"
        />
      </div>
    </div>
  );
};
