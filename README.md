# WKQuiz.com — Production-Ready Educational Quiz Platform

> **"Learn • Play • Grow"** | **Test Your Knowledge**

WKQuiz.com is a modern, responsive, mobile-first educational quiz application built with React, TypeScript, Vite, and a custom CSS design system. It features a reusable quiz engine, 34+ categorized question banks, true question and answer randomization, deterministic daily quizzes, gamification (XP, streaks, history via local storage), full SEO optimization with Schema.org structured data, non-intrusive AdSense-ready slots, and zero-config Cloudflare Pages static deployment.

---

## 🚀 Key Features

- **Mobile-First Responsive Design**: Tailored touch targets ($\ge 44\text{px}$), smooth one-hand operation, and tested viewports from 320px mobile to 1440px+ desktop.
- **Dual Visual Themes**:
  - **Light Mode**: Warm, inviting cream/beige canvas (`#FAF7F2`) with crisp white surfaces and energetic orange accents.
  - **Dark Mode**: Premium deep midnight navy/charcoal canvas (`#0B0F19`) with high-contrast emerald and orange highlights.
  - **Persistence**: Light / Dark / System toggle saved in `localStorage`.
- **Reusable Multi-Mode Quiz Engine**:
  - **Classic Quiz** (10 questions)
  - **Quick Quiz** (5 questions)
  - **Practice Mode** (Instant feedback and learning explanations)
  - **Timed Challenge** (Per-question countdown timer)
  - **Endless Mode** (Play until a wrong answer)
  - **Daily Quiz** (Deterministic challenge seeded by date)
  - **Mixed Quiz** (Multi-category question blend)
- **True Randomization**:
  - Fisher-Yates question order shuffling.
  - Dynamic answer option shuffling with index remapping so the correct answer is never predictably option A.
- **Question Bank Architecture**:
  - Partitioned modular JSON files under `src/data/questions/`.
  - Standalone automated validator (`npm run validate:questions`) checking for unique IDs, valid indices, non-empty text, and category constraints.
- **Comprehensive Results Screen**:
  - Score summary, percentage, grade message, and celebration confetti.
  - Question-by-question review with expandable explanations and choices.
  - "Retry Incorrect Questions" filter to reinforce retention.
- **Local Gamification**:
  - XP points (+10 XP per correct question, bonus for perfect/daily quizzes).
  - Daily learning streak counter.
  - Best scores and completed quiz history tracked without requiring a mandatory login.
- **SEO & Search Engine Ready**:
  - Dynamic document title and meta descriptions on every route.
  - Canonical URLs and OpenGraph social tags.
  - Schema.org JSON-LD structured data (`WebSite` and `Quiz`).
  - Pre-generated `sitemap.xml` and `robots.txt`.
- **AdSense-Ready Architecture**:
  - Reusable `AdSlot` components for banner, in-content, between-section, and results page placements.
  - Non-intrusive, compliant spacing that never overlaps answer buttons.
- **Responsible Healthcare & Legal Safeguards**:
  - Dedicated `/disclaimer` stating practice questions are for educational purposes only.
  - Clear non-affiliation notices regarding NCLEX, NCSBN, state DMVs, and government agencies.
  - Placeholder Privacy Policy, Terms & Conditions, and Cookie Policy.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | React 19 / TypeScript / Vite 8 |
| **Routing** | React Router DOM v7 (Client-side SPA) |
| **Styling** | Vanilla CSS with Design Tokens (`tokens.css`, `index.css`) |
| **Icons** | Lucide-React (Lightweight SVGs) |
| **Animations & FX**| Canvas-Confetti & CSS Micro-animations |
| **Hosting Target** | Cloudflare Pages (Static output to `dist/`) |

---

## 📦 Project Structure

```text
new-wk-quiz/
├── public/
│   ├── _redirects           # Cloudflare Pages SPA rewrite rule (/* /index.html 200)
│   ├── favicon.svg          # High-res vector knowledge logo
│   ├── manifest.json        # Web app manifest for PWA installability
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # XML Sitemap with all key URLs
├── scripts/
│   └── validateQuestions.js # Automated question-bank validation script
├── src/
│   ├── components/
│   │   ├── cards/           # CategoryCard, QuizCard, DailyChallengeCard
│   │   ├── common/          # AdSlot, SEOHead, ThemeToggle, IconHelper, ScrollToTop
│   │   ├── layout/          # Header (with mobile drawer), Footer (with disclaimers)
│   │   └── quiz/            # QuizPlayer, QuestionCard, AnswerOption, QuizProgress, ResultsCard, ReviewList, ExplanationCard
│   ├── data/
│   │   ├── questions/       # Modular JSON question banks (nursing, medical, anatomy, geography, science, tech, etc.)
│   │   ├── categories.ts    # Directory of all 34 required categories with icons and colors
│   │   ├── questionBank.ts  # Unified loader, Fisher-Yates randomizer, and deterministic daily quiz generator
│   │   └── quizzes.ts       # Curated quiz catalog with SEO slugs, learning points, and FAQs
│   ├── hooks/
│   │   ├── useQuizEngine.ts # Reusable quiz lifecycle hook
│   │   ├── useQuizStorage.ts# Gamification, streaks, XP, and history hook
│   │   └── useTheme.ts      # Light/Dark/System theme switcher with localStorage
│   ├── pages/
│   │   ├── legal/           # PrivacyPolicyPage, TermsPage, CookiePolicyPage, DisclaimerPage
│   │   ├── AboutPage.tsx    # Brand story, mission, educational philosophy
│   │   ├── CategoriesPage.tsx # All 34 categories with instant live filter
│   │   ├── CategoryDetailPage.tsx # Mode selector, difficulty tabs, live quiz launcher
│   │   ├── ContactPage.tsx  # Interactive contact form
│   │   ├── DailyQuizPage.tsx # Date-seeded daily quiz
│   │   ├── HomePage.tsx     # Hero, categories, daily quiz, popular quizzes, Why WKQuiz
│   │   ├── NotFoundPage.tsx # Friendly 404 page
│   │   ├── QuizDetailPage.tsx # Individual SEO landing with live quiz player
│   │   ├── QuizzesPage.tsx  # Full searchable quiz catalog
│   │   └── SearchPage.tsx   # Live search over quizzes, categories, and tags
│   ├── styles/
│   │   ├── tokens.css       # Centralized design tokens (colors, fonts, shadows, radius)
│   │   └── index.css        # Global resets, button styles, touch targets >= 44px
│   ├── types/
│   │   └── quiz.ts          # TypeScript interfaces for questions, quizzes, and progress
│   ├── App.tsx              # Root router and layout
│   └── main.tsx             # Application bootstrap
├── package.json
└── vite.config.ts
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm (or yarn / pnpm)

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Validate Question Banks
Verify that all question JSON files have valid IDs, non-empty options, and in-bounds correct answers:
```bash
npm run validate:questions
```

### 3. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
This compiles TypeScript and outputs an optimized static build to the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📝 How to Add New Questions

The quiz engine is completely data-driven. **You never need to edit React components to add or update questions.**

### Step 1: Open or Create a JSON File
Questions are organized by topic in `src/data/questions/`:
- `nursing.json`
- `medical.json`
- `anatomy.json`
- `geography.json`
- `science.json`
- `technology.json`
- `history.json`
- `entertainment.json`
- `usa-tests.json`
- `mathematics.json`
- Or add a new file (e.g., `pharmacology.json`).

### Step 2: Question Schema
Add your question adhering to this JSON format:
```json
{
  "id": "geo-042",
  "category": "Geography",
  "subcategory": "US State Capitals",
  "difficulty": "easy",
  "question": "What is the capital of California?",
  "options": [
    "Sacramento",
    "Los Angeles",
    "San Diego",
    "San Francisco"
  ],
  "correctAnswer": 0,
  "explanation": "Sacramento has been the official capital of California since 1854.",
  "tags": ["USA", "states", "capitals"],
  "active": true
}
```

#### Field Specifications:
- `id` *(string, required)*: Unique identifier (e.g. `nurs-007`, `hist-012`).
- `category` *(string, required)*: Name matching one of the 34 categories in `src/data/categories.ts`.
- `subcategory` *(string, optional)*: Specific sub-topic.
- `difficulty` *(string, required)*: One of `"easy"`, `"medium"`, `"hard"`, or `"expert"`.
- `question` *(string, required)*: The question text displayed to the user.
- `options` *(string[], required)*: Array of at least 2 distinct multiple-choice options.
- `correctAnswer` *(number, required)*: Zero-based index of the correct option in `options` (e.g., `0` for the first option). The engine will automatically shuffle the display order at runtime!
- `explanation` *(string, required)*: Educational context shown after the user answers.
- `tags` *(string[], optional)*: Keywords used for search indexing.
- `active` *(boolean, optional)*: Set to `false` to temporarily exclude a question without deleting it.

### Step 3: Run the Automated Validator
```bash
npm run validate:questions
```
If any question has a missing field, duplicate ID, or invalid answer index, the script will pinpoint the exact line and error.

---

## 🌐 Connecting GitHub to Cloudflare Pages (Automatic Deployment)

WKQuiz.com is designed for instant static deployment on Cloudflare Pages.

### Setup Steps:
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production-ready WKQuiz.com platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/wkquiz.git
   git push -u origin main
   ```
2. **Log into Cloudflare Dashboard**:
   - Navigate to **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. **Select your `wkquiz` repository**.
4. **Configure Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. **Click "Save and Deploy"**.

### Automatic Updates:
Whenever you push question additions or styling updates to GitHub, Cloudflare Pages will automatically trigger a build, run question validation, and update the live website within seconds.

> [!NOTE]
> The `public/_redirects` file (`/* /index.html 200`) is automatically copied to `dist/` during build, ensuring all client-side routes (like `/quizzes/nursing-nclex-prep` and `/categories/anatomy-physiology`) work seamlessly without 404 errors upon direct link visit or page refresh.

---

## ⚖️ Customizing Legal & Policy Placeholders

Before official commercial launch, review and customize the policy files located in `src/pages/legal/`:
1. **[PrivacyPolicyPage.tsx](file:///d:/projects/new%20wk%20quiz/src/pages/legal/PrivacyPolicyPage.tsx)**: Update contact email, analytics provider, and cookie disclosures.
2. **[TermsPage.tsx](file:///d:/projects/new%20wk%20quiz/src/pages/legal/TermsPage.tsx)**: Update governing jurisdiction and terms of service.
3. **[CookiePolicyPage.tsx](file:///d:/projects/new%20wk%20quiz/src/pages/legal/CookiePolicyPage.tsx)**: Update cookie retention policies.
4. **[DisclaimerPage.tsx](file:///d:/projects/new%20wk%20quiz/src/pages/legal/DisclaimerPage.tsx)**: Retains medical, NCLEX, and DMV educational non-affiliation notices.

---

## 💰 Configuring Google AdSense

WKQuiz is built with dedicated ad placeholders via the reusable `AdSlot` component (`src/components/common/AdSlot.tsx`).

To activate live Google AdSense ads:
1. Add your AdSense publisher script to `index.html` inside `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. In `src/components/common/AdSlot.tsx`, replace the placeholder markup with an `<ins className="adsbygoogle" ... />` element and trigger `(adsbygoogle = window.adsbygoogle || []).push({});`.

---

## 📊 Configuring Analytics

To track anonymous pageviews and user engagement:
1. Set an environment variable in `.env`:
   ```env
   VITE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
2. Check for `import.meta.env.VITE_ANALYTICS_ID` in `src/components/common/SEOHead.tsx` or `main.tsx` to conditionally load Google Analytics or Plausible.

---

## 💡 Future Scalability Roadmap

The architecture was intentionally structured to allow seamless extension without rewrites:
- **User Accounts & Cloud Sync**: Add Supabase or Firebase Auth to sync XP, streaks, and history across multiple devices.
- **Multiplayer / Live Battles**: Connect WebSockets or Supabase Realtime to host live trivia showdowns.
- **Community Question Submissions**: Add an admin review dashboard where educators can submit questions directly into the bank.
- **Multilingual Support**: Question files can easily be partitioned by locale (e.g. `questions/es/`, `questions/fr/`).
