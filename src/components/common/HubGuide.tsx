import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, Info } from 'lucide-react';
import type { HubContent } from '../../content/hubs';

function formatReviewed(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Long-form study guide + FAQ shown under a hub's quiz launcher. */
export const HubGuide: React.FC<{ hub: HubContent; categoryName: string }> = ({ hub, categoryName }) => (
  <section id="study-guide" className="guide" aria-labelledby="study-guide-title">
    <div className="guide-meta">
      <BookOpen size={16} aria-hidden="true" />
      <span>Study guide</span>
      <span aria-hidden="true">·</span>
      <span>Last updated {formatReviewed(hub.reviewed)}</span>
    </div>

    <h2 id="study-guide-title" className="guide-title">
      {hub.headline}
    </h2>

    {hub.intro.map((p, i) => (
      <p key={i} className="guide-lead">
        {p}
      </p>
    ))}

    {hub.sections.map(section => (
      <div key={section.heading} className="guide-section">
        <h3>{section.heading}</h3>
        {section.paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {section.bullets && (
          <ul>
            {section.bullets.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    ))}

    <div className="guide-cta">
      <p>
        Ready to test what you just read?{' '}
        <button type="button" className="guide-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Start a {categoryName} quiz
        </button>{' '}
        or{' '}
        <Link to="/daily-quiz">try today’s daily challenge</Link>.
      </p>
    </div>

    <div className="guide-section">
      <h3>Frequently asked questions</h3>
      <div className="faq-list">
        {hub.faqs.map(f => (
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

    {hub.note && (
      <p className="guide-note">
        <Info size={16} aria-hidden="true" />
        <span>{hub.note}</span>
      </p>
    )}
  </section>
);
