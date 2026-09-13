import type { CategoryInfo } from '../types/quiz';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'nursing',
    slug: 'nursing',
    name: 'Nursing',
    description: 'Practice questions covering nursing fundamentals, patient care, triage, and clinical judgment.',
    iconName: 'HeartPulse',
    color: '#FF6B35',
    questionCount: 45,
    popular: true
  },
  {
    id: 'nclex',
    slug: 'nclex',
    name: 'NCLEX',
    description: 'Next-generation NCLEX-style clinical scenario questions for RN and PN candidates.',
    iconName: 'Stethoscope',
    color: '#E8590C',
    questionCount: 50,
    popular: true
  },
  {
    id: 'medical',
    slug: 'medical',
    name: 'Medical',
    description: 'Clinical concepts, pathophysiology, medical terminology, and diagnostic medicine.',
    iconName: 'Activity',
    color: '#2563EB',
    questionCount: 40,
    popular: true
  },
  {
    id: 'anatomy',
    slug: 'anatomy-physiology',
    name: 'Anatomy & Physiology',
    description: 'Human skeletal system, organ systems, musculature, and physiological pathways.',
    iconName: 'Bone',
    color: '#0891B2',
    questionCount: 38,
    popular: true
  },
  {
    id: 'pharmacology',
    slug: 'pharmacology',
    name: 'Pharmacology',
    description: 'Drug classifications, mechanism of actions, side effects, and safe dosage calculations.',
    iconName: 'Pill',
    color: '#7C3AED',
    questionCount: 35
  },
  {
    id: 'diseases',
    slug: 'diseases-disorders',
    name: 'Diseases & Disorders',
    description: 'Pathology, clinical manifestations, prevention, and therapeutic interventions.',
    iconName: 'ShieldAlert',
    color: '#DC2626',
    questionCount: 30
  },
  {
    id: 'entertainment',
    slug: 'entertainment',
    name: 'Entertainment',
    description: 'Pop culture, box office hits, famous franchises, and viral entertainment moments.',
    iconName: 'Sparkles',
    color: '#D97706',
    questionCount: 40,
    popular: true
  },
  {
    id: 'movies',
    slug: 'movies',
    name: 'Movies',
    description: 'Academy Award winners, cinematic trivia, iconic directors, and legendary quotes.',
    iconName: 'Film',
    color: '#B45309',
    questionCount: 32
  },
  {
    id: 'tv-shows',
    slug: 'tv-shows',
    name: 'TV Shows',
    description: 'Binge-worthy series, memorable sitcoms, drama pilots, and television history.',
    iconName: 'Tv',
    color: '#4B5563',
    questionCount: 28
  },
  {
    id: 'drama',
    slug: 'drama',
    name: 'Drama',
    description: 'Theater classics, Broadway hits, dramatic arts, and character studies.',
    iconName: 'Drama',
    color: '#9333EA',
    questionCount: 20
  },
  {
    id: 'celebrity',
    slug: 'celebrity',
    name: 'Celebrity',
    description: 'Famous personalities, icons, red carpet milestones, and biographical trivia.',
    iconName: 'Star',
    color: '#F59E0B',
    questionCount: 25
  },
  {
    id: 'music',
    slug: 'music',
    name: 'Music',
    description: 'Chart-topping artists, music theory, rock legends, and classical composers.',
    iconName: 'Music',
    color: '#EC4899',
    questionCount: 30
  },
  {
    id: 'general',
    slug: 'general-knowledge',
    name: 'General Knowledge',
    description: 'Everyday trivia, common facts, curiosities, and world knowledge.',
    iconName: 'Globe',
    color: '#10B981',
    questionCount: 65,
    popular: true
  },
  {
    id: 'history',
    slug: 'history',
    name: 'History',
    description: 'US history, world civilizations, ancient empires, and pivotal battles.',
    iconName: 'Landmark',
    color: '#78350F',
    questionCount: 42,
    popular: true
  },
  {
    id: 'geography',
    slug: 'geography',
    name: 'Geography',
    description: 'US state capitals, world nations, mountain ranges, oceans, and flags.',
    iconName: 'Compass',
    color: '#0D9488',
    questionCount: 55,
    popular: true
  },
  {
    id: 'science',
    slug: 'science',
    name: 'Science',
    description: 'Biology, chemistry, astronomy, physics, and earth sciences exploration.',
    iconName: 'Atom',
    color: '#3B82F6',
    questionCount: 48,
    popular: true
  },
  {
    id: 'engineering',
    slug: 'engineering',
    name: 'Engineering',
    description: 'Mechanical concepts, civil structures, materials science, and aerospace.',
    iconName: 'Wrench',
    color: '#475569',
    questionCount: 26
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical',
    description: 'Ohm’s law, circuit diagrams, alternating currents, and electrical codes.',
    iconName: 'Zap',
    color: '#F59E0B',
    questionCount: 34
  },
  {
    id: 'electrical-symbols',
    slug: 'electrical-symbols',
    name: 'Electrical Symbols',
    description: 'Schematic symbols, component recognition, transistors, diodes, and switches.',
    iconName: 'Cpu',
    color: '#EA580C',
    questionCount: 22
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    description: 'Semiconductors, integrated circuits, microcontrollers, and digital logic.',
    iconName: 'CircuitBoard',
    color: '#6366F1',
    questionCount: 30
  },
  {
    id: 'hvac',
    slug: 'hvac',
    name: 'HVAC',
    description: 'Refrigeration cycles, air flow dynamics, heating principles, and EPA certifications.',
    iconName: 'Wind',
    color: '#06B6D4',
    questionCount: 20
  },
  {
    id: 'technology',
    slug: 'technology',
    name: 'Technology',
    description: 'Software development, cloud computing, cyber security, and tech giants.',
    iconName: 'Laptop',
    color: '#4F46E5',
    questionCount: 45,
    popular: true
  },
  {
    id: 'computers',
    slug: 'computers',
    name: 'Computers',
    description: 'Operating systems, PC hardware components, storage architecture, and networking.',
    iconName: 'Monitor',
    color: '#2563EB',
    questionCount: 32
  },
  {
    id: 'automotive',
    slug: 'automotive',
    name: 'Automotive',
    description: 'Internal combustion engines, EV drivetrains, OBD-II diagnostics, and maintenance.',
    iconName: 'Car',
    color: '#E11D48',
    questionCount: 24
  },
  {
    id: 'iq-logic',
    slug: 'iq-logic',
    name: 'IQ & Logic',
    description: 'Number patterns, spatial reasoning, lateral thinking, and brain teasers.',
    iconName: 'Brain',
    color: '#8B5CF6',
    questionCount: 36,
    popular: true
  },
  {
    id: 'mathematics',
    slug: 'mathematics',
    name: 'Mathematics',
    description: 'Arithmetic, algebra, plane geometry, percentages, and probability questions.',
    iconName: 'Calculator',
    color: '#059669',
    questionCount: 38
  },
  {
    id: 'english-grammar',
    slug: 'english-grammar',
    name: 'English & Grammar',
    description: 'Parts of speech, punctuation rules, vocabulary building, and sentence syntax.',
    iconName: 'BookOpen',
    color: '#0284C7',
    questionCount: 30
  },
  {
    id: 'usa-tests',
    slug: 'usa-tests',
    name: 'USA Tests',
    description: 'Civics exam practice, US Constitution, national symbols, and citizenship prep.',
    iconName: 'Flag',
    color: '#1D4ED8',
    questionCount: 40,
    popular: true
  },
  {
    id: 'dmv-test',
    slug: 'dmv-test',
    name: 'DMV Test',
    description: 'Driver permit questions, right-of-way rules, road signs, and driving safety.',
    iconName: 'ShieldCheck',
    color: '#16A34A',
    questionCount: 50,
    popular: true
  },
  {
    id: 'license-plate',
    slug: 'license-plate-quiz',
    name: 'License Plate Quiz',
    description: 'Identify US state slogans, plate colors, and state motifs from coast to coast.',
    iconName: 'CarFront',
    color: '#D97706',
    questionCount: 25
  },
  {
    id: 'cartoon-characters',
    slug: 'cartoon-characters',
    name: 'Cartoon Characters',
    description: 'Classic animation, Saturday morning heroes, Pixar, Disney, and anime icons.',
    iconName: 'Smile',
    color: '#F59E0B',
    questionCount: 35,
    popular: true
  },
  {
    id: 'relationships',
    slug: 'relationships',
    name: 'Relationships',
    description: 'Interpersonal communication, empathy, social intelligence, and conflict resolution.',
    iconName: 'HeartHandshake',
    color: '#F43F5E',
    questionCount: 20
  },
  {
    id: 'wisdom',
    slug: 'wisdom',
    name: 'Wisdom',
    description: 'Philosophical thoughts, timeless proverbs, ethical dilemmas, and life insights.',
    iconName: 'Feather',
    color: '#6B7280',
    questionCount: 22
  },
  {
    id: 'mixed-quiz',
    slug: 'mixed-quiz',
    name: 'Mixed Quiz',
    description: 'A thrilling random sampler covering questions across all topics and categories.',
    iconName: 'Shuffle',
    color: '#FF6B35',
    questionCount: 100,
    popular: true
  }
];
