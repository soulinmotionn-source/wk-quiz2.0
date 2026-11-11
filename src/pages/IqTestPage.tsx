import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brain, Clock, Play, Share2, Link2, Download, RotateCcw, ChevronDown, Flame, Info, Swords } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { AdSlot } from '../components/common/AdSlot';
import { Glyph } from '../iq/Glyph';
import { FigView } from '../iq/FigView';
import { buildTest, type Cell, type Puzzle, type TestMode, type TestSet } from '../iq/puzzles';
import { dailySeed } from '../iq/rng';
import {
  DOMAIN_LABEL,
  brainTitle,
  domainScores,
  formatTime,
  iqEstimate,
  loadHistory,
  percentBelow,
  saveRecord,
  weightedScore,
  type Answered,
  type IqRecord
} from '../iq/scoring';
import { renderShareCard } from '../iq/shareCard';
import { breadcrumbSchema, faqSchema } from '../seo/schema';

type Phase = 'intro' | 'memorize' | 'play' | 'results';

const FAQS = [
  {
    question: 'Is this a real IQ test?',
    answer:
      'No. A clinical IQ test is given one-to-one by a trained psychologist and compared against large, carefully built norms. This test is a free, entertainment-grade brain teaser that uses the same kinds of puzzles. Its score is an estimate, so treat it as a fun benchmark rather than a diagnosis.'
  },
  {
    question: 'How is the score worked out?',
    answer:
      'Harder puzzles count for more than easy ones. Your weighted share of correct answers is converted onto the usual IQ scale (average 100) using our own calibration. We show a range, not a single exact number, because short online tests are not precise.'
  },
  {
    question: 'What kinds of puzzles are in it?',
    answer:
      'Pattern matrices and shape series, mirror images, rotating figures, symmetry, counting, odd-one-out shapes, number series, word analogies, logic questions and a short memory task. The shape puzzles are generated fresh every time, so a retake does not repeat them.'
  },
  {
    question: 'How can I challenge a friend?',
    answer:
      'After your test, copy the challenge link. Your friend gets exactly the same puzzles, so you can compare scores fairly.'
  },
  {
    question: 'Do you save my results?',
    answer:
      'Your results and history stay on your own device in your browser storage. We do not ask for an account, an email address or payment, and your score is never hidden behind a paywall.'
  }
];

const mascot = (score: number | null) => (score === null ? '🧠' : score >= 118 ? '🤩' : score >= 100 ? '😎' : '🙂');

const PuzzleBody: React.FC<{
  puzzle: Puzzle;
  picked: number | null;
  onPick: (i: number) => void;
}> = ({ puzzle, picked, onPick }) => {
  const pictureOptions = puzzle.options.every(o => o.kind !== 'text');
  const stem = puzzle.stem;
  return (
    <>
      <h2 className="iq-prompt">{puzzle.prompt}</h2>

      {stem?.kind === 'matrix' && (
        <div className="iq-matrix" role="img" aria-label="3 by 3 pattern with the bottom-right cell missing">
          {stem.cells.map((cell, i) => (
            <div key={i} className={`iq-cell${cell ? '' : ' iq-missing'}`}>
              {cell ? <Glyph cell={cell} /> : <span aria-hidden="true">?</span>}
            </div>
          ))}
        </div>
      )}

      {stem?.kind === 'series' && (
        <div className="iq-series" role="img" aria-label="A row of shapes with the last one missing">
          {stem.cells.map((cell, i) => (
            <div key={i} className={`iq-cell${cell ? '' : ' iq-missing'}`}>
              {cell ? <Glyph cell={cell} /> : <span aria-hidden="true">?</span>}
            </div>
          ))}
        </div>
      )}

      {stem?.kind === 'figs' && (
        <figure className={`iq-figs${stem.joined ? ' is-joined' : ''}`}>
          <div className="iq-figs-row" role="img" aria-label="Figures, with the last one missing where shown as a question mark">
            {stem.figs.map((fig, i) => (
              <div key={i} className={`iq-figbox${fig ? '' : ' iq-missing'}`}>
                {fig ? <FigView fig={fig} /> : <span aria-hidden="true">?</span>}
              </div>
            ))}
          </div>
          {stem.caption && <figcaption>{stem.caption}</figcaption>}
        </figure>
      )}

      {stem?.kind === 'scatter' && (
        <div className="iq-scatter" style={{ gridTemplateColumns: `repeat(${stem.cols}, 1fr)` }} role="img" aria-label="A scattered set of shapes to count">
          {stem.cells.map((cell, i) => (
            <div key={i} className="iq-dot">
              {cell && <Glyph cell={cell} />}
            </div>
          ))}
        </div>
      )}

      <div className={pictureOptions ? 'iq-options iq-options-cells' : 'iq-options'}>
        {puzzle.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={`iq-option${picked === i ? ' is-picked' : ''}`}
            onClick={() => onPick(i)}
            disabled={picked !== null}
            aria-label={opt.kind === 'text' ? opt.text : `Option ${i + 1}`}
          >
            <span className="iq-key">{i + 1}</span>
            {opt.kind === 'cell' && <Glyph cell={opt.cell as Cell} title={`Option ${i + 1}`} />}
            {opt.kind === 'fig' && <FigView fig={opt.fig} title={`Option ${i + 1}`} />}
            {opt.kind === 'text' && <span className="iq-opt-text">{opt.text}</span>}
          </button>
        ))}
      </div>
    </>
  );
};

export const IqTestPage: React.FC = () => {
  const [params] = useSearchParams();
  const challengeSeed = Number(params.get('c')) || null;
  const challengeScore = Number(params.get('s')) || null;
  const challengerName = (params.get('n') ?? '').slice(0, 24);

  const [phase, setPhase] = useState<Phase>('intro');
  const [test, setTest] = useState<TestSet | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [name, setName] = useState('');
  const [history, setHistory] = useState<IqRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const questionStart = useRef(0);
  const timer = useRef<number | null>(null);
  const advance = useRef<number | null>(null);
  const tickBase = useRef(0);

  // History lives in localStorage; read it after mount so the prerendered HTML matches.
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (phase !== 'play') return;
    tickBase.current = Date.now() - elapsed * 1000;
    timer.current = window.setInterval(() => setElapsed(Math.floor((Date.now() - tickBase.current) / 1000)), 500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // elapsed is intentionally read once when the play phase begins
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(
    () => () => {
      if (advance.current) window.clearTimeout(advance.current);
    },
    []
  );

  const start = (mode: TestMode) => {
    const seed = mode === 'daily' ? dailySeed() : challengeSeed ?? Math.floor(Math.random() * 2 ** 31);
    const set = buildTest(seed, mode);
    setTest(set);
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setElapsed(0);
    setCopied(false);
    setPhase(set.memoryCode ? 'memorize' : 'play');
    questionStart.current = Date.now();
    window.scrollTo({ top: 0 });
  };

  const beginPlay = () => {
    questionStart.current = Date.now();
    setPhase('play');
  };

  const finish = (all: Answered[], set: TestSet, seconds: number) => {
    const p = weightedScore(all);
    const est = iqEstimate(p);
    setHistory(
      saveRecord({
        date: new Date().toISOString(),
        score: set.mode === 'full' ? est.score : all.filter(a => a.correct).length,
        seed: set.seed,
        seconds
      })
    );
    setPhase('results');
    window.scrollTo({ top: 0 });
    const strong = set.mode === 'full' ? est.score >= 115 : all.filter(a => a.correct).length >= 5;
    if (strong) {
      import('canvas-confetti').then(({ default: confetti }) => confetti({ particleCount: 140, spread: 80, origin: { y: 0.35 } })).catch(() => {});
    }
  };

  const pick = (i: number) => {
    if (!test || picked !== null) return;
    const puzzle = test.puzzles[index];
    const record: Answered = {
      puzzle,
      chosen: i,
      correct: i === puzzle.answer,
      seconds: Math.max(1, Math.round((Date.now() - questionStart.current) / 1000))
    };
    const all = [...answers, record];
    setPicked(i);
    setAnswers(all);
    advance.current = window.setTimeout(() => {
      if (index + 1 >= test.puzzles.length) {
        finish(all, test, Math.floor((Date.now() - tickBase.current) / 1000));
      } else {
        setIndex(index + 1);
        setPicked(null);
        questionStart.current = Date.now();
      }
    }, 420);
  };

  // Keyboard: 1–6 pick an option
  useEffect(() => {
    if (phase !== 'play' || !test) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= test.puzzles[index].options.length) pick(n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ---------------------------------------------------------------- results
  const result = useMemo(() => {
    if (phase !== 'results' || !test) return null;
    const p = weightedScore(answers);
    const est = iqEstimate(p);
    return {
      est,
      percent: percentBelow(est.score),
      title: brainTitle(est.score),
      domains: domainScores(answers),
      correct: answers.filter(a => a.correct).length
    };
  }, [phase, test, answers]);

  const challengeUrl = () => {
    if (!test || !result) return 'https://wkquiz.com/iq-test';
    const q = new URLSearchParams({ c: String(test.seed), s: String(test.mode === 'full' ? result.est.score : result.correct) });
    if (name.trim()) q.set('n', name.trim().slice(0, 24));
    return `${window.location.origin}/iq-test?${q.toString()}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copy your challenge link:', challengeUrl());
    }
  };

  const shareCardBlob = () =>
    renderShareCard({
      name: name.trim(),
      score: result!.est.score,
      title: result!.title.title,
      percent: result!.percent,
      seconds: formatTime(elapsed),
      domains: result!.domains,
      mode: test!.mode,
      correct: result!.correct,
      total: answers.length
    });

  const shareImage = async () => {
    if (!result || !test) return;
    setBusy(true);
    try {
      const blob = await shareCardBlob();
      const file = new File([blob], 'my-brain-test-result.png', { type: 'image/png' });
      const text = test.mode === 'full' ? `I scored ${result.est.score} on the WKQuiz brain test. Can you beat me?` : `I solved ${result.correct}/${answers.length} on today's WKQuiz brain teaser!`;
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url: challengeUrl() });
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'my-brain-test-result.png';
        a.click();
        URL.revokeObjectURL(a.href);
      }
    } catch {
      // user cancelled sharing
    } finally {
      setBusy(false);
    }
  };

  const best = history.filter(h => h.score > 0).reduce((m, h) => Math.max(m, h.score), 0);
  const streakNote = history.length > 1 ? `${history.length} tests taken` : null;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'WKQuiz Brain Test: free IQ-style test',
      url: 'https://wkquiz.com/iq-test',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Brain Test', path: '/iq-test' }
    ]),
    faqSchema(FAQS)
  ];

  return (
    <div className="iq">
      <SEOHead
        title="Free IQ Test: 20-Puzzle Brain Test With Instant Results"
        description="Take a free IQ-style brain test with pattern, number, word and logic puzzles. See your score and strengths instantly, then challenge a friend. No sign-up."
        canonicalPath="/iq-test"
        schema={schema}
      />

      {/* ------------------------------------------------------------- INTRO */}
      {phase === 'intro' && (
        <>
          <section className="iq-hero">
            <div className="app-container iq-hero-grid">
              <div>
                <span className="hero2-eyebrow">
                  <Brain size={14} aria-hidden="true" /> Free brain test
                </span>
                <h1>How sharp is your brain? Find out in about 12 minutes.</h1>
                <p className="hero2-sub">
                  Twenty-one fresh puzzles: shape patterns, mirrors and rotations, numbers, words, logic and memory. Your result, strengths and a shareable score card appear instantly. Free, no sign-up, nothing hidden behind a paywall.
                </p>

                {challengeSeed && (
                  <div className="iq-challenge" role="status">
                    <Swords size={20} aria-hidden="true" />
                    <span>
                      {challengerName || 'A friend'} challenged you{challengeScore ? ` and scored ${challengeScore}` : ''}. You will get exactly the same puzzles.
                    </span>
                  </div>
                )}

                <div className="hero2-actions">
                  <button type="button" className="btn btn-primary btn-lg" onClick={() => start('full')}>
                    <Play size={18} fill="currentColor" aria-hidden="true" />
                    <span>{challengeSeed ? 'Accept the challenge' : 'Start the brain test'}</span>
                  </button>
                  <button type="button" className="btn btn-secondary btn-lg" onClick={() => start('daily')}>
                    <Flame size={18} aria-hidden="true" />
                    <span>Daily teaser (1 min)</span>
                  </button>
                </div>
                <div className="hero2-trust">
                  <span>✓ New puzzles every test</span>
                  <span>✓ Free results</span>
                  <span>✓ Share and challenge</span>
                </div>
              </div>

              <div className="iq-hero-art floaty" aria-hidden="true">
                <div className="iq-demo">
                  {[
                    { shape: 2, count: 1, fill: 1, size: 2, rot: 0 },
                    { shape: 1, count: 2, fill: 0, size: 1, rot: 0 },
                    { shape: 0, count: 3, fill: 2, size: 1, rot: 0 },
                    { shape: 1, count: 1, fill: 2, size: 2, rot: 45 },
                    { shape: 2, count: 2, fill: 1, size: 1, rot: 0 },
                    { shape: 0, count: 1, fill: 0, size: 2, rot: 0 }
                  ].map((c, i) => (
                    <div key={i} className="iq-cell">
                      <Glyph cell={c as Cell} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {history.length > 0 && (
            <section className="app-container" style={{ paddingTop: 20 }} aria-label="Your recent results">
              <div className="iq-history">
                <b>Your history</b>
                <span>Best: {best || '—'}</span>
                {streakNote && <span>{streakNote}</span>}
                <span className="iq-spark" aria-hidden="true">
                  {history.slice(0, 8).reverse().map((h, i) => (
                    <i key={i} style={{ height: `${Math.max(14, Math.min(100, h.score <= 12 ? h.score * 8 : (h.score - 60) * 1.2))}%` }} />
                  ))}
                </span>
              </div>
            </section>
          )}
        </>
      )}

      {/* ---------------------------------------------------------- MEMORIZE */}
      {phase === 'memorize' && test?.memoryCode && (
        <section className="app-container iq-stage">
          <div className="iq-card iq-center">
            <span className="iq-mascot floaty" aria-hidden="true">🧠</span>
            <h2 className="iq-prompt">Memorise this code</h2>
            <p className="text-secondary">You will be asked about it near the end. Order matters.</p>
            <div className="iq-code" aria-label={`Code: ${test.memoryCode.join(', ')}`}>
              {test.memoryCode.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <button type="button" className="btn btn-primary btn-lg" onClick={beginPlay}>
              I have it, start the puzzles
            </button>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- PLAY */}
      {phase === 'play' && test && (
        <section className="app-container iq-stage">
          <div className="iq-topbar">
            <span className="iq-pill">
              <Brain size={14} aria-hidden="true" /> {DOMAIN_LABEL[test.puzzles[index].domain]}
            </span>
            <span className="iq-count">
              {index + 1} / {test.puzzles.length}
            </span>
            <span className="iq-pill" aria-label="Time elapsed">
              <Clock size={14} aria-hidden="true" /> {formatTime(elapsed)}
            </span>
          </div>
          <div className="iq-progress" role="progressbar" aria-valuemin={0} aria-valuemax={test.puzzles.length} aria-valuenow={index}>
            <i style={{ width: `${(index / test.puzzles.length) * 100}%` }} />
          </div>

          <div className="iq-card" key={test.puzzles[index].id}>
            <PuzzleBody puzzle={test.puzzles[index]} picked={picked} onPick={pick} />
          </div>
          <p className="iq-hint">Tip: tap an answer, or press the number key. No going back, so trust your first instinct.</p>
        </section>
      )}

      {/* ----------------------------------------------------------- RESULTS */}
      {phase === 'results' && test && result && (
        <section className="app-container iq-stage">
          <div className="iq-card iq-center iq-result">
            <span className="iq-mascot" aria-hidden="true">
              {mascot(test.mode === 'full' ? result.est.score : result.correct * 20)}
            </span>
            {test.mode === 'full' ? (
              <>
                <p className="iq-kicker">Your IQ-style estimate</p>
                <div className="iq-score" aria-live="polite">
                  {result.est.score}
                </div>
                <p className="iq-range">likely range {result.est.low}–{result.est.high}</p>
                <h1 className="iq-title">{result.title.title}</h1>
                <p className="text-secondary">
                  {result.title.blurb} On the standard IQ scale this sits above roughly {result.percent}% of people.
                </p>
              </>
            ) : (
              <>
                <p className="iq-kicker">Daily brain teaser</p>
                <div className="iq-score">
                  {result.correct}/{answers.length}
                </div>
                <h1 className="iq-title">{result.correct >= 5 ? 'Brilliant!' : result.correct >= 3 ? 'Nice work' : 'Keep going'}</h1>
                <p className="text-secondary">Come back tomorrow for a new set. Everyone gets the same one each day.</p>
              </>
            )}
            <div className="iq-meta">
              <span>
                <Clock size={14} aria-hidden="true" /> {formatTime(elapsed)}
              </span>
              <span>
                {result.correct} of {answers.length} correct
              </span>
              {best > 0 && test.mode === 'full' && <span>Best: {best}</span>}
            </div>
          </div>

          <div className="iq-card">
            <h2 className="iq-h2">Your strengths</h2>
            <div className="iq-bars">
              {result.domains.map(d => (
                <div key={d.domain} className="iq-bar">
                  <span>{DOMAIN_LABEL[d.domain]}</span>
                  <div>
                    <i style={{ width: `${d.pct}%` }} />
                  </div>
                  <b>{d.pct}%</b>
                </div>
              ))}
            </div>
          </div>

          <div className="iq-card">
            <h2 className="iq-h2">
              <Share2 size={20} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-3px' }} /> Share and challenge
            </h2>
            <label className="iq-label" htmlFor="iq-name">
              Name on your card (optional)
            </label>
            <input id="iq-name" className="iq-input" value={name} maxLength={24} onChange={e => setName(e.target.value)} placeholder="e.g. Sam" autoComplete="given-name" />
            <div className="iq-actions">
              <button type="button" className="btn btn-primary" onClick={shareImage} disabled={busy}>
                <Download size={16} aria-hidden="true" />
                <span>{busy ? 'Making card…' : 'Share score card'}</span>
              </button>
              <button type="button" className="btn btn-secondary" onClick={copyLink}>
                <Link2 size={16} aria-hidden="true" />
                <span>{copied ? 'Link copied!' : 'Copy challenge link'}</span>
              </button>
            </div>
            <p className="iq-hint" style={{ textAlign: 'left' }}>
              Your friend gets the same puzzles, so the comparison is fair.
            </p>
          </div>

          <div className="iq-actions iq-actions-center">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => start(test.mode)}>
              <RotateCcw size={18} aria-hidden="true" />
              <span>{test.mode === 'daily' ? 'Replay today’s teaser' : 'Retake with new puzzles'}</span>
            </button>
            {test.mode === 'full' ? (
              <button type="button" className="btn btn-secondary btn-lg" onClick={() => start('daily')}>
                Daily teaser
              </button>
            ) : (
              <button type="button" className="btn btn-secondary btn-lg" onClick={() => setPhase('intro')}>
                Full brain test
              </button>
            )}
          </div>

          <AdSlot type="results" slotId="iq-results" />

          <div className="iq-card">
            <h2 className="iq-h2">Review your answers</h2>
            <div className="faq-list">
              {answers.map((a, i) => (
                <details key={a.puzzle.id} className="faq-item">
                  <summary>
                    <span>
                      {a.correct ? '✅' : '❌'} Question {i + 1}: {DOMAIN_LABEL[a.puzzle.domain]}
                    </span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <p>
                    <b>{a.puzzle.prompt}</b>
                    <br />
                    {a.puzzle.explanation}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <p className="iq-disclaimer">
            <Info size={16} aria-hidden="true" /> This is an entertainment-grade estimate, not a clinical IQ assessment, and it can’t diagnose anything.
          </p>

          <div className="iq-actions iq-actions-center">
            <Link to="/categories/general-knowledge" className="btn btn-secondary">
              More quizzes
            </Link>
            <Link to="/daily-quiz" className="btn btn-secondary">
              Daily quiz
            </Link>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- CONTENT */}
      {(phase === 'intro' || phase === 'results') && (
        <section className="app-container iq-article">
          <div className="guide" style={{ marginTop: phase === 'intro' ? 36 : 28 }}>
            <h2 className="guide-title">What an online IQ-style test can and can’t tell you</h2>
            <p className="guide-lead">
              Intelligence tests try to measure reasoning: spotting patterns, working with numbers and words, thinking through logic and holding information in mind. This brain test samples all of those with short puzzles that get harder as you go.
            </p>

            <div className="guide-section">
              <h3>The six skills in the test</h3>
              <ul>
                <li>
                  <b>Pattern:</b> matrices, shape series, counting and odd-one-out puzzles, which check how well you spot rules without being told them.
                </li>
                <li>
                  <b>Spatial:</b> mirror images, rotating figures and symmetry, which test how well you can turn and flip shapes in your head.
                </li>
                <li>
                  <b>Numbers:</b> number series, from simple steps to interleaved and doubling patterns.
                </li>
                <li>
                  <b>Words:</b> analogies that test how you see relationships between ideas.
                </li>
                <li>
                  <b>Logic:</b> short reasoning questions and classic trick puzzles.
                </li>
                <li>
                  <b>Memory:</b> a code you memorise at the start and recall at the end.
                </li>
              </ul>
            </div>

            <div className="guide-section">
              <h3>How to get your best score</h3>
              <ul>
                <li>Take it when you are rested and won’t be interrupted.</li>
                <li>For matrices and series, check one attribute at a time: shape, then count, then fill, then size.</li>
                <li>For mirror puzzles, follow the top row of the figure and see where it ends up when the figure is flipped.</li>
                <li>For number series, look at the gaps between numbers first, then at the gaps between the gaps.</li>
                <li>Don’t dwell: a first instinct is right more often than a long second-guess.</li>
              </ul>
            </div>

            <div className="guide-section">
              <h3>Frequently asked questions</h3>
              <div className="faq-list">
                {FAQS.map(f => (
                  <details key={f.question} className="faq-item">
                    <summary>
                      <span>{f.question}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <p className="guide-note">
              <Info size={16} aria-hidden="true" />
              <span>
                Entertainment and education only. Scores from a short online test can’t replace a professional assessment. If you have concerns about learning or cognition, speak to a qualified professional.
              </span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
