import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Check, X, ArrowRight, Lightbulb, Zap } from 'lucide-react';

interface HeroQuestion {
  category: string;
  categorySlug: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const HERO_QUESTIONS: HeroQuestion[] = [
  {
    category: 'Science',
    categorySlug: 'science',
    question: 'Which cellular organelle synthesizes ATP through cellular respiration?',
    options: ['Ribosome', 'Mitochondrion', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
    correctAnswer: 1,
    explanation: 'Mitochondria generate over 90% of cellular energy (ATP), earning the title "powerhouse of the cell".'
  },
  {
    category: 'Nursing',
    categorySlug: 'nursing',
    question: 'Under Maslow & ABC priority, which patient requires immediate nurse assessment?',
    options: [
      'Stable client with blood sugar 170 mg/dL',
      'Post-op client rating surgical site pain 5/10',
      'Asthmatic client with stridor and intercostal retractions',
      'Client requesting pre-discharge prescription teaching'
    ],
    correctAnswer: 2,
    explanation: 'Stridor and retractions indicate acute airway compromise (the "A" in ABCs) requiring urgent clinical intervention.'
  },
  {
    category: 'Geography',
    categorySlug: 'geography',
    question: 'What is the official state capital of California?',
    options: ['Los Angeles', 'Sacramento', 'San Francisco', 'San Diego'],
    correctAnswer: 1,
    explanation: 'Sacramento has been the official capital of California since 1854, chosen for its inland river port location.'
  },
  {
    category: 'Anatomy',
    categorySlug: 'anatomy-physiology',
    question: 'What is the longest and strongest bone in the human skeleton?',
    options: ['Tibia', 'Femur (Thigh bone)', 'Humerus', 'Fibula'],
    correctAnswer: 1,
    explanation: 'The femur supports substantial mechanical loads and is both the longest and strongest human bone.'
  },
  {
    category: 'DMV & Driving',
    categorySlug: 'dmv-test',
    question: 'What must a driver do when facing a flashing red traffic signal?',
    options: [
      'Slow down and proceed without stopping',
      'Come to a complete stop, yield to traffic, and proceed when safe',
      'Accelerate before cross traffic arrives',
      'Stop only if other vehicles are close'
    ],
    correctAnswer: 1,
    explanation: 'A flashing red light has the exact same legal effect as a stop sign: stop completely and yield.'
  }
];

export const InteractiveHeroQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const currentQ = HERO_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      setXpEarned(x => x + 10);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(prev => (prev + 1) % HERO_QUESTIONS.length);
  };

  return (
    <div
      className="card"
      style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1.5px solid var(--color-border)',
        position: 'relative',
        backgroundColor: 'var(--color-surface)',
        transition: 'all var(--transition-base)'
      }}
    >
      {/* Interactive Topic Switcher Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              animation: 'pulseGlow 2s infinite'
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-primary)'
            }}
          >
            Live Mini-Quiz
          </span>
        </div>

        {/* XP Counter */}
        {xpEarned > 0 && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            <Zap size={13} fill="currentColor" />
            +{xpEarned} XP
          </span>
        )}
      </div>

      {/* Category selector pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: 'var(--space-md)',
          scrollbarWidth: 'none'
        }}
      >
        {HERO_QUESTIONS.map((q, idx) => (
          <button
            key={q.category}
            type="button"
            onClick={() => {
              setCurrentIndex(idx);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: currentIndex === idx ? 'var(--color-primary)' : 'var(--color-bg)',
              color: currentIndex === idx ? '#FFFFFF' : 'var(--color-text-secondary)',
              border: `1px solid ${currentIndex === idx ? 'var(--color-primary)' : 'var(--color-border)'}`,
              transition: 'all var(--transition-fast)'
            }}
          >
            {q.category}
          </button>
        ))}
      </div>

      {/* Question Text */}
      <h3
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.45,
          marginBottom: 'var(--space-md)'
        }}
      >
        {currentQ.question}
      </h3>

      {/* Interactive Answer Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-md)' }}>
        {currentQ.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedOption === idx;
          const isCorrect = currentQ.correctAnswer === idx;

          let bg = 'var(--color-bg)';
          let borderColor = 'var(--color-border)';
          let textColor = 'var(--color-text-primary)';

          if (isAnswered) {
            if (isCorrect) {
              bg = 'var(--color-success-light)';
              borderColor = 'var(--color-success)';
            } else if (isSelected && !isCorrect) {
              bg = 'var(--color-error-light)';
              borderColor = 'var(--color-error)';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: bg,
                border: `1.5px solid ${borderColor}`,
                color: textColor,
                fontSize: '0.875rem',
                fontWeight: 500,
                textAlign: 'left',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all var(--transition-fast)',
                minHeight: '46px'
              }}
              className={!isAnswered ? 'hover-lift' : ''}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: isAnswered && isCorrect ? 'var(--color-success)' : isAnswered && isSelected ? 'var(--color-error)' : 'var(--color-border)',
                    color: isAnswered && (isCorrect || isSelected) ? '#FFFFFF' : 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {letter}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && isCorrect && (
                <Check size={16} color="var(--color-success)" strokeWidth={3} />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <X size={16} color="var(--color-error)" strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Next Trigger */}
      {isAnswered ? (
        <div style={{ animation: 'fadeIn 200ms ease-out' }}>
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: selectedOption === currentQ.correctAnswer ? 'var(--color-success-light)' : 'var(--color-error-light)',
              border: `1px solid ${selectedOption === currentQ.correctAnswer ? 'var(--color-success-border)' : 'var(--color-error-border)'}`,
              marginBottom: 'var(--space-md)',
              fontSize: '0.825rem',
              lineHeight: 1.45,
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start'
            }}
          >
            <Lightbulb size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{currentQ.explanation}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              style={{ flex: 1, borderRadius: 'var(--radius-md)', height: '42px', fontSize: '0.875rem' }}
            >
              <span>Next Question</span>
              <ArrowRight size={16} />
            </button>

            <Link
              to={`/categories/${currentQ.categorySlug}`}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-md)', height: '42px', fontSize: '0.875rem' }}
            >
              Full Quiz
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '4px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Tap an answer above to test yourself instantly!
          </span>
        </div>
      )}
    </div>
  );
};
