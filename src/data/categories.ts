import type { CategoryInfo } from '../types/quiz';
import { getCategoryQuestionCount } from './questionBank';

interface RawCategoryDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  popular?: boolean;
}

const RAW_CATEGORIES: RawCategoryDefinition[] = [
  {
    id: 'nursing',
    slug: 'nursing',
    name: 'Nursing',
    description: 'Practice questions covering nursing fundamentals, patient care, triage, and clinical judgment.',
    iconName: 'HeartPulse',
    color: '#FF6B35',
    popular: true
  },
  {
    id: 'nclex',
    slug: 'nclex',
    name: 'NCLEX',
    description: 'Next-generation NCLEX-style clinical scenario questions for RN and PN candidates.',
    iconName: 'Stethoscope',
    color: '#E8590C',
    popular: true
  },
  {
    id: 'medical',
    slug: 'medical',
    name: 'Medical',
    description: 'Clinical concepts, pathophysiology, medical terminology, and diagnostic medicine.',
    iconName: 'Activity',
    color: '#2563EB',
    popular: true
  },
  {
    id: 'anatomy',
    slug: 'anatomy-physiology',
    name: 'Anatomy & Physiology',
    description: 'Human skeletal system, organ systems, musculature, and physiological pathways.',
    iconName: 'Bone',
    color: '#0891B2',
    popular: true
  },
  {
    id: 'pharmacology',
    slug: 'pharmacology',
    name: 'Pharmacology',
    description: 'Drug classifications, mechanism of actions, side effects, and safe dosage calculations.',
    iconName: 'Pill',
    color: '#7C3AED',
    popular: true
  },
  {
    id: 'science',
    slug: 'science',
    name: 'Science',
    description: 'Biology, chemistry, astronomy, physics, and earth sciences exploration.',
    iconName: 'Atom',
    color: '#3B82F6',
    popular: true
  },
  {
    id: 'geography',
    slug: 'geography',
    name: 'Geography',
    description: 'US state capitals, world nations, mountain ranges, oceans, and flags.',
    iconName: 'Compass',
    color: '#0D9488',
    popular: true
  },
  {
    id: 'history',
    slug: 'history',
    name: 'History',
    description: 'US history, world civilizations, ancient empires, and pivotal world events.',
    iconName: 'Landmark',
    color: '#78350F',
    popular: true
  },
  {
    id: 'usa-tests',
    slug: 'usa-tests',
    name: 'USA Tests',
    description: 'Civics exam practice, US Constitution, national symbols, and DMV permit prep.',
    iconName: 'Flag',
    color: '#1D4ED8',
    popular: true
  },
  {
    id: 'dmv-test',
    slug: 'dmv-test',
    name: 'DMV Test',
    description: 'Driver permit questions, right-of-way rules, road signs, and driving safety.',
    iconName: 'ShieldCheck',
    color: '#16A34A',
    popular: true
  },
  {
    id: 'mathematics',
    slug: 'mathematics',
    name: 'Mathematics',
    description: 'Arithmetic, algebra, plane geometry, percentages, and problem-solving.',
    iconName: 'Calculator',
    color: '#059669',
    popular: true
  },
  {
    id: 'iq-logic',
    slug: 'iq-logic',
    name: 'IQ & Logic',
    description: 'Number patterns, spatial reasoning, lateral thinking, and brain teasers.',
    iconName: 'Brain',
    color: '#8B5CF6',
    popular: true
  },
  {
    id: 'technology',
    slug: 'technology',
    name: 'Technology',
    description: 'Software development, operating systems, networking, and tech fundamentals.',
    iconName: 'Laptop',
    color: '#4F46E5',
    popular: true
  },
  {
    id: 'computers',
    slug: 'computers',
    name: 'Computers',
    description: 'Operating systems, PC hardware components, storage architecture, and networking.',
    iconName: 'Monitor',
    color: '#2563EB'
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical',
    description: 'Ohm’s law, circuit diagrams, power calculations, and electrical codes.',
    iconName: 'Zap',
    color: '#F59E0B',
    popular: true
  },
  {
    id: 'electrical-symbols',
    slug: 'electrical-symbols',
    name: 'Electrical Symbols',
    description: 'Schematic symbols, component recognition, transistors, diodes, and switches.',
    iconName: 'Cpu',
    color: '#EA580C'
  },
  {
    id: 'entertainment',
    slug: 'entertainment',
    name: 'Entertainment',
    description: 'Pop culture, box office hits, famous franchises, and classic animation.',
    iconName: 'Sparkles',
    color: '#D97706',
    popular: true
  },
  {
    id: 'cartoon-characters',
    slug: 'cartoon-characters',
    name: 'Cartoon Characters',
    description: 'Classic animation, Saturday morning heroes, Pixar, Disney, and cartoon icons.',
    iconName: 'Smile',
    color: '#F59E0B',
    popular: true
  },
  {
    id: 'general',
    slug: 'general-knowledge',
    name: 'General Knowledge',
    description: 'Everyday trivia, world wonders, science curiosities, and world knowledge.',
    iconName: 'Globe',
    color: '#10B981',
    popular: true
  },
  {
    id: 'movies',
    slug: 'movies',
    name: 'Movies',
    description: 'Academy Award winners, cinematic trivia, iconic directors, and quotes.',
    iconName: 'Film',
    color: '#B45309'
  },
  {
    id: 'mixed-quiz',
    slug: 'mixed-quiz',
    name: 'Mixed Quiz',
    description: 'A thrilling random sampler covering questions across all topics and categories.',
    iconName: 'Shuffle',
    color: '#FF6B35',
    popular: true
  },
  // Upcoming specialized categories
  {
    id: 'diseases',
    slug: 'diseases-disorders',
    name: 'Diseases & Disorders',
    description: 'Pathology, clinical manifestations, prevention, and therapeutic interventions.',
    iconName: 'ShieldAlert',
    color: '#DC2626'
  },
  {
    id: 'engineering',
    slug: 'engineering',
    name: 'Engineering',
    description: 'Mechanical concepts, civil structures, materials science, and aerospace.',
    iconName: 'Wrench',
    color: '#475569'
  },
  {
    id: 'hvac',
    slug: 'hvac',
    name: 'HVAC',
    description: 'Refrigeration cycles, air flow dynamics, heating principles, and EPA certifications.',
    iconName: 'Wind',
    color: '#06B6D4'
  },
  {
    id: 'automotive',
    slug: 'automotive',
    name: 'Automotive',
    description: 'Internal combustion engines, EV drivetrains, OBD-II diagnostics, and maintenance.',
    iconName: 'Car',
    color: '#E11D48'
  },
  {
    id: 'english-grammar',
    slug: 'english-grammar',
    name: 'English & Grammar',
    description: 'Parts of speech, punctuation rules, vocabulary building, and sentence syntax.',
    iconName: 'BookOpen',
    color: '#0284C7'
  },
  {
    id: 'tv-shows',
    slug: 'tv-shows',
    name: 'TV Shows',
    description: 'Binge-worthy series, memorable sitcoms, drama pilots, and television history.',
    iconName: 'Tv',
    color: '#4B5563'
  },
  {
    id: 'celebrity',
    slug: 'celebrity',
    name: 'Celebrity',
    description: 'Famous personalities, icons, red carpet milestones, and biographical trivia.',
    iconName: 'Star',
    color: '#F59E0B'
  },
  {
    id: 'music',
    slug: 'music',
    name: 'Music',
    description: 'Chart-topping artists, music theory, rock legends, and classical composers.',
    iconName: 'Music',
    color: '#EC4899'
  },
  {
    id: 'relationships',
    slug: 'relationships',
    name: 'Relationships',
    description: 'Interpersonal communication, empathy, social intelligence, and conflict resolution.',
    iconName: 'HeartHandshake',
    color: '#F43F5E'
  },
  {
    id: 'wisdom',
    slug: 'wisdom',
    name: 'Wisdom',
    description: 'Philosophical thoughts, timeless proverbs, ethical dilemmas, and life insights.',
    iconName: 'Feather',
    color: '#6B7280'
  }
];

/**
 * Dynamically maps exact verified question counts directly from the question bank.
 * Guarantees that card counters are 100% accurate and never show mismatched or fake numbers.
 */
export const CATEGORIES: CategoryInfo[] = RAW_CATEGORIES.map(cat => ({
  ...cat,
  questionCount: getCategoryQuestionCount(cat.slug || cat.name)
}));
