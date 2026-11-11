import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Flame, Zap, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { QuizCard } from '../components/cards/QuizCard';
import { DailyChallengeCard } from '../components/cards/DailyChallengeCard';
import { InteractiveHeroQuiz } from '../components/home/InteractiveHeroQuiz';
import { IconHelper } from '../components/common/IconHelper';
import { Mascot } from '../components/common/Mascot';
import { AdSlot } from '../components/common/AdSlot';
import { CATEGORIES } from '../data/categories';
import { FEATURED_QUIZZES } from '../data/quizzes';
import { getQuestionStats } from '../data/questionBank';
import { useQuizStorage } from '../hooks/useQuizStorage';
import { HUBS } from '../content/hubs';
import { organizationSchema } from '../seo/schema';

const XP_PER_LEVEL = 200;

export const HomePage: React.FC = () => {
  const stats = getQuestionStats();
  const { progress } = useQuizStorage();

  const hubCards = HUBS.map(h => ({ hub: h, cat: CATEGORIES.find(c => c.slug === h.slug) })).filter(
    (x): x is { hub: (typeof HUBS)[number]; cat: (typeof CATEGORIES)[number] } => Boolean(x.cat)
  );
  const otherCategories = CATEGORIES.filter(c => !HUBS.some(h => h.slug === c.slug));
  const popularQuizzes = FEATURED_QUIZZES.filter(q => q.popular).slice(0, 4);

  const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
  const levelPct = Math.round(((progress.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);
  const questionTotal = `${(Math.floor(stats.activeQuestions / 100) * 100).toLocaleString()}+`;

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WKQuiz.com',
    url: 'https://wkquiz.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wkquiz.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Free practice quizzes with explanations: NCLEX and nursing, medical terminology, anatomy, DMV permit test, geography, science and history.'
  };

  return (
    <>
      <SEOHead
        title="WKQuiz — Free Practice Quizzes: NCLEX, DMV, Anatomy, Geography & More"
        description="Free practice quizzes with a clear explanation for every answer. Study NCLEX and nursing, medical terminology, anatomy, the DMV permit test, geography, science and history."
        canonicalPath="/"
        schema={[homeSchema, organizationSchema()]}
      />

      {/* HERO */}
      <section className="hero2">
        <div className="app-container hero2-grid">
          <div>
            <span className="hero2-eyebrow">
              <Sparkles size={14} aria-hidden="true" /> Learn something every day
            </span>
            <h1>
              Practice smarter. <em>Know why</em> every answer is right.
            </h1>
            <p className="hero2-sub">
              Free quizzes for nursing and NCLEX, medical terminology, anatomy, the DMV permit test, geography and more. Every question comes with a plain-English explanation and a study guide to go with it.
            </p>
            <div className="hero2-actions">
              <Link to="/quizzes/mixed-knowledge-classic" className="btn btn-primary btn-lg">
                <Play size={18} fill="currentColor" aria-hidden="true" />
                <span>Play a quick quiz</span>
              </Link>
              <Link to="/categories" className="btn btn-secondary btn-lg">
                <span>Browse topics</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero2-trust">
              <span>✓ {questionTotal} questions</span>
              <span>✓ Explanations on every answer</span>
              <span>✓ Free, no sign-up</span>
            </div>
          </div>

          <div>
            <InteractiveHeroQuiz />
          </div>
        </div>
      </section>

      {/* TOPIC RAIL */}
      <section className="app-container" style={{ paddingTop: 20 }} aria-label="Jump to a topic">
        <div className="topic-rail">
          <Link to="/iq-test" className="topic-chip" style={{ ['--hub' as string]: '#7C3AED', borderColor: '#7C3AED' }}>
            <span aria-hidden="true">🧠</span>
            <span>Free IQ test</span>
          </Link>
          {hubCards.map(({ hub, cat }) => (
            <Link key={hub.slug} to={`/categories/${cat.slug}`} className="topic-chip" style={{ ['--hub' as string]: cat.color }}>
              <IconHelper name={cat.iconName} size={18} color={cat.color} />
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link to="/categories" className="topic-chip">
            <span>All topics</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* TWO DOORS: play for fun, or study for something */}
      <section className="section2" style={{ paddingBottom: 0 }} aria-label="Choose how you want to use WKQuiz">
        <div className="app-container">
          <div className="section2-head">
            <div>
              <h2>What do you feel like today?</h2>
              <p>Quick games when you want fun, focused practice when you have something to prepare for.</p>
            </div>
          </div>
          <div className="doors">
            <div className="door" style={{ ['--door' as string]: '#7C3AED' }}>
              <span className="door-tag">Play</span>
              <h3>Brain games and daily fun</h3>
              <p>Test your reasoning, keep your streak alive and challenge a friend with a score card.</p>
              <div className="door-links">
                <Link to="/iq-test">🧠 Free IQ test</Link>
                <Link to="/daily-quiz">🔥 Daily quiz</Link>
                <Link to="/quizzes/mixed-knowledge-classic">🎲 Mixed trivia</Link>
              </div>
              <span className="door-mascot floaty" aria-hidden="true">
                <Mascot mood="cheer" size={92} color="#7C3AED" />
              </span>
            </div>
            <div className="door" style={{ ['--door' as string]: '#0D9488' }}>
              <span className="door-tag">Study</span>
              <h3>Exam prep and study guides</h3>
              <p>Practice questions with explanations, plus a written guide for each topic.</p>
              <div className="door-links">
                <Link to="/categories/nclex">NCLEX</Link>
                <Link to="/categories/dmv-test">DMV test</Link>
                <Link to="/categories/medical">Medical terms</Link>
                <Link to="/categories/anatomy-physiology">Anatomy</Link>
              </div>
              <span className="door-mascot" aria-hidden="true">
                <Mascot mood="thinking" size={92} color="#0D9488" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYER PROGRESS + DAILY */}
      <section className="section2">
        <div className="app-container" style={{ display: 'grid', gap: 18 }}>
          <div className="stat-strip" aria-label="Your progress">
            <div className="stat-tile">
              <b>
                <Flame size={20} color="#FF6B35" aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px' }} /> {progress.streak}
              </b>
              <span>Day streak</span>
            </div>
            <div className="stat-tile">
              <b>
                <Zap size={20} color="#F59E0B" aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px' }} /> {progress.xp}
              </b>
              <span>XP earned</span>
            </div>
            <div className="stat-tile">
              <b>
                <Trophy size={20} color="#2563EB" aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px' }} /> {level}
              </b>
              <span>Level</span>
              <div className="level-bar" role="progressbar" aria-valuenow={levelPct} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to next level">
                <i style={{ width: `${levelPct}%` }} />
              </div>
            </div>
          </div>
          <DailyChallengeCard />
        </div>
      </section>

      {/* TOP TOPICS */}
      <section className="section2" style={{ paddingTop: 8 }}>
        <div className="app-container">
          <div className="section2-head">
            <div>
              <h2>Start with a topic</h2>
              <p>Each topic has a quiz, a written study guide and answers to common questions.</p>
            </div>
            <Link to="/categories" className="link-arrow">
              All categories <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="hub-grid">
            {hubCards.map(({ hub, cat }) => (
              <Link
                key={hub.slug}
                to={`/categories/${cat.slug}`}
                className="hub-card"
                style={{ ['--hub' as string]: cat.color }}
              >
                <span className="hub-icon">
                  <IconHelper name={cat.iconName} size={24} />
                </span>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <div className="hub-meta">
                  <span>
                    <BookOpen size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> Quiz + guide
                  </span>
                  <span className="hub-go">
                    Start <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="app-container">
        <AdSlot type="banner" slotId="home-mid-banner" />
      </div>

      {/* HOW IT WORKS */}
      <section className="section2">
        <div className="app-container">
          <div className="section2-head">
            <div>
              <h2>How WKQuiz helps you learn</h2>
              <p>Short sessions, instant feedback and a reason behind every answer.</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Pick a topic and a mode</h3>
              <p>Classic, quick five, timed or endless. Choose how many questions and how hard.</p>
            </div>
            <div className="step">
              <h3>Read the explanation</h3>
              <p>You see right away why an answer is correct and why the others are not.</p>
            </div>
            <div className="step">
              <h3>Build a streak</h3>
              <p>Come back daily, earn XP and level up. Progress is saved on your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE CATEGORIES */}
      <section className="section2" style={{ paddingTop: 8 }}>
        <div className="app-container">
          <div className="section2-head">
            <div>
              <h2>More to explore</h2>
              <p>Fun trivia, tech, trades and everyday knowledge.</p>
            </div>
          </div>
          <div className="cat-grid">
            {otherCategories.map(cat => (
              <Link key={cat.id} to={`/categories/${cat.slug}`} className="cat-tile" style={{ ['--hub' as string]: cat.color }}>
                <span className="hub-icon">
                  <IconHelper name={cat.iconName} size={20} />
                </span>
                <span>
                  <b>{cat.name}</b>
                  <small>{cat.questionCount > 0 ? `${cat.questionCount} questions` : 'Mixed topics'}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR QUIZZES */}
      <section className="section2" style={{ paddingTop: 8 }}>
        <div className="app-container">
          <div className="section2-head">
            <div>
              <h2>Popular quizzes</h2>
              <p>Hand-picked sets with a short description of what you will learn.</p>
            </div>
            <Link to="/quizzes" className="link-arrow">
              All quizzes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid-responsive">
            {popularQuizzes.map(q => (
              <QuizCard key={q.id} quiz={q} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
