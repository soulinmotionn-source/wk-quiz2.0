import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { CONTACT_EMAIL } from '../../seo/site';

export const AccessibilityPage: React.FC = () => (
  <LegalPage
    title="Accessibility Statement"
    description="WKQuiz.com's commitment to accessibility: keyboard use, contrast, light and dark themes, reduced motion, known limits and how to give feedback."
    path="/accessibility"
    eyebrow="Trust & Quality"
  >
    <p>
      We want everyone to be able to learn and play on WKQuiz. We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA, and we keep improving.
    </p>

    <h2>What we have built in</h2>
    <ul>
      <li>
        <strong>Keyboard use:</strong> every quiz can be played from the keyboard. In quizzes, press 1–4 or A–D to answer and Enter to continue. A “skip to main content” link appears on the first Tab press.
      </li>
      <li>
        <strong>Light and dark themes:</strong> choose light, dark or your system setting at any time from the header.
      </li>
      <li>
        <strong>Readable colour contrast</strong> for text and buttons in both themes, and answers are never shown by colour alone: correct and incorrect answers also show an icon.
      </li>
      <li>
        <strong>Reduced motion:</strong> if your device asks for less motion, animations are switched off.
      </li>
      <li>
        <strong>Large touch targets</strong> and a layout that works from small phones to wide desktops, with text that can be zoomed.
      </li>
      <li>
        <strong>Clear structure:</strong> headings, landmarks, labelled form fields and descriptive links.
      </li>
    </ul>

    <h2>Known limits</h2>
    <ul>
      <li>The brain test uses shape and pattern puzzles that rely on vision. Each option is labelled, but some puzzles are difficult to complete with a screen reader.</li>
      <li>Timed quiz modes put a clock on each question. If time pressure is a barrier, use Classic or Practice mode, which have no time limit.</li>
      <li>Some third-party advertising content is outside our control.</li>
    </ul>

    <h2>Tell us what is not working</h2>
    <p>
      If you find something hard to use, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact">contact page</Link>. Tell us the page, what you were trying to do and, if you like, which device or assistive technology you use. We will respond and do our best to fix it.
    </p>
  </LegalPage>
);
