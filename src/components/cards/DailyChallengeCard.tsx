import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Play, Flame } from 'lucide-react';

export const DailyChallengeCard: React.FC = () => {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Glow background accent */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, rgba(255, 107, 53, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 107, 53, 0.2)',
              color: '#FF7849',
              border: '1px solid rgba(255, 107, 53, 0.4)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            <Flame size={14} fill="#FF7849" />
            Daily Challenge
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <Calendar size={14} />
            {todayFormatted}
          </span>
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#FBBF24',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <Award size={16} />
          +50 Bonus XP
        </span>
      </div>

      <div>
        <h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: 'var(--space-xs)',
            letterSpacing: '-0.02em',
            color: '#FFFFFF'
          }}
        >
          Today's Daily Mind Sharpener
        </h3>
        <p style={{ color: '#CBD5E1', fontSize: '1rem', maxWidth: '650px', lineHeight: 1.6 }}>
          10 deterministic questions chosen across science, geography, healthcare, and general trivia. Keep your learning streak alive today!
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--space-md)'
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--space-lg)', fontSize: '0.9rem', color: '#94A3B8' }}>
          <span><strong>10</strong> Questions</span>
          <span><strong>Mixed</strong> Difficulty</span>
          <span>~<strong>5 mins</strong></span>
        </div>

        <Link
          to="/daily-quiz"
          className="btn btn-primary btn-lg"
          style={{
            borderRadius: 'var(--radius-full)',
            padding: '12px 28px'
          }}
        >
          <Play size={18} fill="currentColor" />
          <span>Start Daily Challenge</span>
        </Link>
      </div>
    </div>
  );
};
