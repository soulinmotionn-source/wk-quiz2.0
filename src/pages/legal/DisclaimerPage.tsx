import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../../components/common/LegalPage';
import { CONTACT_EMAIL } from '../../seo/site';

export const DisclaimerPage: React.FC = () => (
  <LegalPage
    title="Disclaimer"
    seoTitle="Disclaimer: Medical, NCLEX, DMV and IQ Test Notices | WKQuiz.com"
    description="Important notices about WKQuiz.com: educational purpose, not medical advice, not affiliated with the NCSBN, DMVs or exam providers, and the brain test is for entertainment."
    path="/disclaimer"
  >
    <h2>Educational purpose</h2>
    <p>
      Everything on WKQuiz.com, including quizzes, explanations, study guides and the brain test, is provided for general education and entertainment. It is not a substitute for professional advice, official course materials or examination guidance.
    </p>

    <h2>Healthcare, nursing and NCLEX content</h2>
    <p>
      Nursing, NCLEX, medical and anatomy content is for study and revision only. It is not medical advice, must not be used to diagnose or treat any condition, and does not replace clinical judgment, your instructors, the policies of your workplace, or current clinical guidelines. Practices and reference ranges vary by institution and change over time. If you have a health concern, speak to a qualified professional.
    </p>

    <h2>Not affiliated with exam bodies or agencies</h2>
    <p>
      WKQuiz is independent. We are not affiliated with, sponsored by or endorsed by the NCSBN, the NCLEX program, any nursing regulator, any state DMV or motor-vehicle agency, USCIS or any government agency. Our questions are original practice items, not real exam questions, and we do not provide or claim to provide “actual” or “leaked” exam content. Names such as NCLEX are trademarks of their respective owners and are used only to describe what a quiz covers.
    </p>

    <h2>Driving and DMV content</h2>
    <p>
      Traffic laws, speed limits, fines and test formats differ between states and countries and change over time. Our DMV questions cover general rules that are similar in most places. Always study your own state’s official driver handbook and confirm requirements with your licensing agency.
    </p>

    <h2>Brain test and IQ-style estimates</h2>
    <p>
      The brain test is an entertainment-grade puzzle set. Its “IQ-style estimate” is calculated with our own scoring and is not a clinical IQ score, a diagnosis, or a measure suitable for educational, employment or medical decisions. If you have concerns about learning or cognition, please speak to a qualified professional.
    </p>

    <h2>Accuracy and corrections</h2>
    <p>
      We take care with our content, as described in our <Link to="/editorial-policy">Editorial Policy</Link>, but errors can happen. We do not guarantee that any information is complete, accurate or up to date, and we are not responsible for decisions made on the basis of it. Found a mistake? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will review it.
    </p>

    <h2>External links and advertising</h2>
    <p>
      We link to third-party sites and show advertising. We do not control or endorse them. See the <Link to="/advertising-disclosure">Advertising Disclosure</Link> and <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>.
    </p>
  </LegalPage>
);
