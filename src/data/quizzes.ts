import type { QuizMetadata } from '../types/quiz';

export const FEATURED_QUIZZES: QuizMetadata[] = [
  {
    id: 'quiz-us-state-capitals',
    slug: 'us-state-capitals',
    title: 'US State Capitals Quiz',
    description: 'Test your knowledge of American geography by matching US states to their official capital cities.',
    category: 'Geography',
    subcategory: 'US State Capitals',
    difficulty: 'easy',
    estimatedTime: '4 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['USA', 'capitals', 'geography', 'states'],
    featured: true,
    popular: true,
    learningPoints: [
      'Identify capital cities for both large and small US states.',
      'Learn historical reasons why certain cities were designated as state capitals.',
      'Avoid common misconceptions between major metropolis hubs and actual state capitals.'
    ],
    faq: [
      {
        question: 'Is New York City the capital of New York State?',
        answer: 'No. Albany is the official capital of New York State, having served in that capacity since 1797.'
      },
      {
        question: 'What is the oldest state capital in the United States?',
        answer: 'Santa Fe, New Mexico is the oldest capital city in the US, founded in 1610.'
      }
    ]
  },
  {
    id: 'quiz-nursing-nclex',
    slug: 'nursing-nclex-prep',
    title: 'Nursing & NCLEX Clinical Practice Quiz',
    description: 'Practice high-yield NCLEX-style clinical scenario questions focusing on priority assessment, medication safety, and patient triage.',
    category: 'Nursing',
    subcategory: 'NCLEX',
    difficulty: 'medium',
    estimatedTime: '6 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['nursing', 'NCLEX', 'clinical-judgment', 'healthcare'],
    featured: true,
    popular: true,
    learningPoints: [
      'Apply Maslow’s hierarchy and the ABCs (Airway, Breathing, Circulation) to prioritize patient interventions.',
      'Recognize dangerous drug toxicity signs such as digoxin toxicity.',
      'Reinforce the Five Rights of Delegation to optimize team workflow safely.'
    ],
    faq: [
      {
        question: 'Are these official NCLEX examination questions?',
        answer: 'No. WKQuiz provides educational practice questions created for study and review purposes only, and is not affiliated with the NCSBN or official NCLEX.'
      }
    ]
  },
  {
    id: 'quiz-anatomy-bones',
    slug: 'human-anatomy-bones',
    title: 'Human Anatomy & Skeletal System Quiz',
    description: 'Explore the human skeleton, bone classifications, spinal vertebrae counts, and structural biomechanics.',
    category: 'Anatomy & Physiology',
    subcategory: 'Skeletal System',
    difficulty: 'easy',
    estimatedTime: '5 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['anatomy', 'bones', 'skeleton', 'physiology'],
    featured: true,
    popular: true,
    learningPoints: [
      'Identify the longest, strongest, and most delicate bones in the human body.',
      'Understand the regional segmentation of the vertebral column.',
      'Learn how tendons and ligaments articulate skeletal motion.'
    ]
  },
  {
    id: 'quiz-medical-terminology',
    slug: 'medical-terminology-essentials',
    title: 'Medical Terminology Essentials',
    description: 'Master clinical prefixes, suffixes, root words, and vital signs abbreviations used by healthcare professionals.',
    category: 'Medical',
    subcategory: 'Medical Terminology',
    difficulty: 'easy',
    estimatedTime: '4 mins',
    questionCount: 10,
    mode: 'practice',
    tags: ['medical', 'terminology', 'abbreviations', 'nursing'],
    popular: true,
    isNew: true,
    learningPoints: [
      'Deconstruct complex medical terms into prefixes, roots, and suffixes.',
      'Differentiate between common clinical look-alike words like dysphagia and dysphasia.'
    ]
  },
  {
    id: 'quiz-science-trivia',
    slug: 'science-trivia-master',
    title: 'General Science Trivia Master',
    description: 'Journey through physics, cell biology, chemistry, and atmospheric earth science questions.',
    category: 'Science',
    subcategory: 'General Science',
    difficulty: 'medium',
    estimatedTime: '5 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['science', 'biology', 'physics', 'chemistry'],
    popular: true,
    learningPoints: [
      'Deepen understanding of fundamental physical constants and atmospheric composition.',
      'Examine cellular bioenergetics and DNA base-pairing mechanisms.'
    ]
  },
  {
    id: 'quiz-electrical-symbols',
    slug: 'electrical-symbols-basics',
    title: 'Electrical Symbols & Circuit Essentials',
    description: 'Recognize standard electronic schematic symbols, Ohm’s law equations, and component functions.',
    category: 'Electrical',
    subcategory: 'Electrical Symbols',
    difficulty: 'medium',
    estimatedTime: '4 mins',
    questionCount: 8,
    mode: 'classic',
    tags: ['electrical', 'circuits', 'engineering', 'symbols'],
    learningPoints: [
      'Read electrical circuit schematics with confidence.',
      'Calculate voltage, current, and resistance using Ohm’s Law.'
    ]
  },
  {
    id: 'quiz-dmv-prep',
    slug: 'dmv-driver-license-practice',
    title: 'DMV Driver License Rules of the Road',
    description: 'Prepare for your driver permit exam with realistic traffic scenarios, road signs, and right-of-way rules.',
    category: 'USA Tests',
    subcategory: 'DMV Test',
    difficulty: 'easy',
    estimatedTime: '5 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['DMV', 'driving', 'road-signs', 'license'],
    popular: true,
    learningPoints: [
      'Safely navigate flashing signals, stop signs, and uncontrolled intersections.',
      'Maintain defensive following distances under adverse road conditions.'
    ]
  },
  {
    id: 'quiz-cartoon-characters',
    slug: 'cartoon-characters-quiz',
    title: 'Cartoon Characters & Classic Animation',
    description: 'How well do you know your favorite cartoon friends from Disney, Nickelodeon, and classic animation?',
    category: 'Entertainment',
    subcategory: 'Cartoon Characters',
    difficulty: 'easy',
    estimatedTime: '3 mins',
    questionCount: 8,
    mode: 'classic',
    tags: ['cartoons', 'animation', 'disney', 'entertainment'],
    isNew: true
  },
  {
    id: 'quiz-speed-math',
    slug: 'speed-math-arithmetic',
    title: 'Speed Math & Mental Arithmetic',
    description: 'Sharpen your mental reflexes with rapid arithmetic, sequence solving, and geometry problem-solving.',
    category: 'Mathematics',
    subcategory: 'Mental Math & Arithmetic',
    difficulty: 'medium',
    estimatedTime: '4 mins',
    questionCount: 10,
    mode: 'timed',
    tags: ['math', 'arithmetic', 'logic', 'mental-math'],
    popular: true
  },
  {
    id: 'quiz-mixed-sampler',
    slug: 'mixed-knowledge-classic',
    title: 'Mixed Knowledge Ultimate Sampler',
    description: 'A dynamic multi-category quiz combining geography, science, history, medical facts, and pop culture.',
    category: 'Mixed Quiz',
    subcategory: 'All Categories',
    difficulty: 'mixed',
    estimatedTime: '6 mins',
    questionCount: 10,
    mode: 'classic',
    tags: ['mixed', 'trivia', 'challenge', 'fun'],
    featured: true,
    popular: true
  }
];
