import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { CONTACT_EMAIL } from '../../seo/site';

export const TermsPage: React.FC = () => (
  <LegalPage
    title="Terms & Conditions"
    description="The rules for using WKQuiz.com: educational purpose, acceptable use, intellectual property, disclaimers and limits of liability."
    path="/terms-and-conditions"
  >
    <p>
      By using WKQuiz.com (“the site”) you agree to these terms. If you do not agree, please do not use the site.
    </p>

    <h2>1. What WKQuiz is</h2>
    <p>
      WKQuiz offers free practice quizzes, study guides and a brain-teaser test for learning and entertainment. It is an independent site and is not affiliated with, endorsed by, or connected to the NCSBN, the NCLEX program, any state DMV or government agency, USCIS, or any exam provider.
    </p>

    <h2>2. Educational use only</h2>
    <p>
      Content is provided to support study. It is not professional, medical, legal or driving-licence advice and does not replace official handbooks, textbooks, instructors, licensed professionals or hospital policy. See our <Link to="/disclaimer">Disclaimer</Link>. The brain test gives an entertainment-grade estimate, not a clinical IQ assessment.
    </p>

    <h2>3. Accuracy</h2>
    <p>
      We work to keep questions and explanations accurate and describe our process in the <Link to="/editorial-policy">Editorial Policy</Link>, but we cannot guarantee that every item is complete, current or free of errors. Rules such as traffic laws differ by place and change over time. If you find a mistake, please tell us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>

    <h2>4. Acceptable use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>copy, scrape or republish a substantial part of our questions or guides without permission;</li>
      <li>interfere with the site, attempt to break its security, or overload it with automated requests;</li>
      <li>use the site in a way that is unlawful or that harms others;</li>
      <li>present our content or scores as an official qualification, licence or professional assessment.</li>
    </ul>

    <h2>5. Intellectual property</h2>
    <p>
      The site design, text, questions, explanations, graphics and code are owned by WKQuiz or its licensors and are protected by copyright. You may use the site for personal, non-commercial study and may share links and your own score cards. Trademarks mentioned (for example NCLEX) belong to their owners and are used only to describe the subject of a quiz.
    </p>

    <h2>6. Scores, progress and data on your device</h2>
    <p>
      Your results, XP and streaks are saved in your browser and may be lost if you clear your data or switch devices. We do not guarantee that progress will be kept.
    </p>

    <h2>7. Advertising and third-party links</h2>
    <p>
      The site shows advertising and links to other sites. We do not control third-party content, and you use it at your own risk. See the <Link to="/advertising-disclosure">Advertising Disclosure</Link>.
    </p>

    <h2>8. No warranties</h2>
    <p>
      The site is provided “as is” and “as available”, without warranties of any kind, to the fullest extent permitted by law. We do not promise that the site will be uninterrupted or error-free, or that using it will improve exam results or lead to any particular outcome.
    </p>

    <h2>9. Limitation of liability</h2>
    <p>
      To the fullest extent permitted by law, WKQuiz and its owners are not liable for indirect, incidental or consequential losses arising from your use of the site, including any decision you make based on its content. Nothing in these terms limits liability that cannot lawfully be limited.
    </p>

    <h2>10. Changes and termination</h2>
    <p>
      We may change the site or these terms at any time. Continued use after a change means you accept the updated terms. We may restrict access for anyone who breaks these terms.
    </p>

    <h2>11. Contact</h2>
    <p>
      Questions about these terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit the <Link to="/contact">contact page</Link>. For privacy matters, see the <Link to="/privacy-policy">Privacy Policy</Link>.
    </p>
  </LegalPage>
);
