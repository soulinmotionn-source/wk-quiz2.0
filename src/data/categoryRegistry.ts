/**
 * WKQuiz.com Central Category Registry (Section 5 & 6)
 * Single Source of Truth for Approved Category Metadata & Subcategory Relationships.
 * Does NOT contain question counts (counts are dynamically calculated from the question bank).
 */

export interface CategoryRegistryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  order: number;
  active: boolean;
  popular?: boolean;
  subcategories: string[];
}

export const CATEGORY_REGISTRY: CategoryRegistryItem[] = [
  {
    id: 'nursing',
    name: 'Nursing',
    slug: 'nursing',
    description: 'Fundamentals of patient care, clinical triage, dosage safety, and nursing process.',
    iconName: 'HeartPulse',
    color: '#FF6B35',
    order: 1,
    active: true,
    popular: true,
    subcategories: ['Fundamentals', 'Patient Safety', 'Clinical Judgment', 'Infection Control']
  },
  {
    id: 'nclex',
    name: 'NCLEX',
    slug: 'nclex',
    description: 'Next-generation NCLEX clinical prioritization, delegation, and client-need categories.',
    iconName: 'Stethoscope',
    color: '#E8590C',
    order: 2,
    active: true,
    popular: true,
    subcategories: ['Priority & Delegation', 'Safe & Effective Care', 'Health Promotion', 'Pharmacological Therapies']
  },
  {
    id: 'medical',
    name: 'Medical',
    slug: 'medical',
    description: 'Clinical concepts, diagnostics, pathophysiology, and medical terminology.',
    iconName: 'Activity',
    color: '#2563EB',
    order: 3,
    active: true,
    popular: true,
    subcategories: ['Medical Terminology', 'Clinical Assessment', 'Cardiology', 'Pathophysiology']
  },
  {
    id: 'anatomy-physiology',
    name: 'Anatomy & Physiology',
    slug: 'anatomy-physiology',
    description: 'Human skeletal system, musculature, organ systems, and physiological pathways.',
    iconName: 'Bone',
    color: '#0891B2',
    order: 4,
    active: true,
    popular: true,
    subcategories: ['Skeletal System', 'Organ Systems', 'Cardiovascular System', 'Nervous System']
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology',
    slug: 'pharmacology',
    description: 'Drug classifications, mechanism of action, side effects, antidotes, and safety.',
    iconName: 'Pill',
    color: '#7C3AED',
    order: 5,
    active: true,
    popular: true,
    subcategories: ['Cardiovascular Pharmacology', 'Antibiotics & Antivirals', 'Antidotes & Toxicity', 'Endocrine Pharmacology']
  },
  {
    id: 'diseases-disorders',
    name: 'Diseases & Disorders',
    slug: 'diseases-disorders',
    description: 'Pathology, clinical manifestations, acute and chronic disease management.',
    iconName: 'ShieldAlert',
    color: '#DC2626',
    order: 6,
    active: true,
    subcategories: ['Chronic Illness', 'Infectious Diseases', 'Autoimmune Disorders', 'Emergency Conditions']
  },
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    slug: 'general-knowledge',
    description: 'Everyday trivia, world facts, natural wonders, and curiosities.',
    iconName: 'Globe',
    color: '#10B981',
    order: 7,
    active: true,
    popular: true,
    subcategories: ['World Trivia', 'Nature & Geography', 'Culture & Arts', 'Curiosities']
  },
  {
    id: 'history',
    name: 'History',
    slug: 'history',
    description: 'US history, ancient civilizations, world wars, and milestone human events.',
    iconName: 'Landmark',
    color: '#78350F',
    order: 8,
    active: true,
    popular: true,
    subcategories: ['US History', 'World History', 'Ancient Civilizations', 'Modern Milestones']
  },
  {
    id: 'geography',
    name: 'Geography',
    slug: 'geography',
    description: 'US state capitals, world nations, mountain ranges, oceans, and physical maps.',
    iconName: 'Compass',
    color: '#0D9488',
    order: 9,
    active: true,
    popular: true,
    subcategories: ['US State Capitals', 'World Capitals', 'Physical Geography', 'Nations & Territories']
  },
  {
    id: 'science',
    name: 'Science',
    slug: 'science',
    description: 'Biology, chemistry, physics, astronomy, and fundamental natural laws.',
    iconName: 'Atom',
    color: '#3B82F6',
    order: 10,
    active: true,
    popular: true,
    subcategories: ['Cell Biology', 'Chemistry', 'Physics', 'Earth & Astronomy']
  },
  {
    id: 'engineering',
    name: 'Engineering',
    slug: 'engineering',
    description: 'Mechanical concepts, civil structures, materials science, and physical engineering.',
    iconName: 'Wrench',
    color: '#475569',
    order: 11,
    active: true,
    subcategories: ['Mechanical Engineering', 'Civil Structures', 'Materials Science', 'Fluid Dynamics']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Ohm’s law, circuit analysis, residential wiring, and NEC electrical standards.',
    iconName: 'Zap',
    color: '#F59E0B',
    order: 12,
    active: true,
    popular: true,
    subcategories: ['Basic Circuits', 'Power Calculations', 'Wiring & Codes', 'Electrical Safety']
  },
  {
    id: 'electrical-symbols',
    name: 'Electrical Symbols',
    slug: 'electrical-symbols',
    description: 'Standard ANSI/IEEE schematic symbols, circuit component diagrams, and logic gates.',
    iconName: 'Cpu',
    color: '#EA580C',
    order: 13,
    active: true,
    subcategories: ['Schematic Symbols', 'Passive Components', 'Semiconductor Symbols', 'Switch & Relay Symbols']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Semiconductors, integrated circuits, microcontrollers, and digital logic gates.',
    iconName: 'CircuitBoard',
    color: '#6366F1',
    order: 14,
    active: true,
    subcategories: ['Semiconductors', 'Digital Logic', 'Microcontrollers', 'Amplifiers & Filters']
  },
  {
    id: 'hvac',
    name: 'HVAC',
    slug: 'hvac',
    description: 'Refrigeration cycle, airflow dynamics, heat transfer, and EPA certifications.',
    iconName: 'Wind',
    color: '#06B6D4',
    order: 15,
    active: true,
    subcategories: ['Refrigeration Cycle', 'Airflow & Ventilation', 'Heating Principles', 'EPA & Safety']
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Software development, cloud computing, cybersecurity, and computer science.',
    iconName: 'Laptop',
    color: '#4F46E5',
    order: 16,
    active: true,
    popular: true,
    subcategories: ['Web & Software', 'Networking & Security', 'Operating Systems', 'Data & Cloud']
  },
  {
    id: 'computers',
    name: 'Computers',
    slug: 'computers',
    description: 'PC hardware architecture, storage drives, processors, and peripheral interfaces.',
    iconName: 'Monitor',
    color: '#2563EB',
    order: 17,
    active: true,
    subcategories: ['Hardware Architecture', 'Memory & Storage', 'Motherboards & Buses', 'Peripherals & Ports']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Internal combustion engines, brakes, transmissions, OBD-II, and EV drivetrains.',
    iconName: 'Car',
    color: '#E11D48',
    order: 18,
    active: true,
    subcategories: ['Engine Mechanics', 'Brakes & Suspension', 'Electrical & Diagnostics', 'Transmissions']
  },
  {
    id: 'iq-logic',
    name: 'IQ & Logic',
    slug: 'iq-logic',
    description: 'Spatial reasoning, syllogisms, sequence patterns, and lateral thinking puzzles.',
    iconName: 'Brain',
    color: '#8B5CF6',
    order: 19,
    active: true,
    popular: true,
    subcategories: ['Pattern Sequences', 'Spatial Reasoning', 'Logical Deductions', 'Lateral Thinking']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'Arithmetic, algebra, geometry, probability, percentages, and problem-solving.',
    iconName: 'Calculator',
    color: '#059669',
    order: 20,
    active: true,
    popular: true,
    subcategories: ['Mental Math & Arithmetic', 'Algebra & Equations', 'Geometry & Angles', 'Percentages & Ratios']
  },
  {
    id: 'english-grammar',
    name: 'English & Grammar',
    slug: 'english-grammar',
    description: 'Parts of speech, punctuation rules, sentence syntax, idioms, and vocabulary.',
    iconName: 'BookOpen',
    color: '#0284C7',
    order: 21,
    active: true,
    subcategories: ['Parts of Speech', 'Punctuation & Syntax', 'Vocabulary & Etymology', 'Common Errors']
  },
  {
    id: 'usa-tests',
    name: 'USA Tests',
    slug: 'usa-tests',
    description: 'Civics test, US citizenship questions, Constitution, and national government.',
    iconName: 'Flag',
    color: '#1D4ED8',
    order: 22,
    active: true,
    popular: true,
    subcategories: ['US Civics', 'US Constitution', 'American Government', 'Rights & Symbols']
  },
  {
    id: 'dmv-test',
    name: 'DMV Test',
    slug: 'dmv-test',
    description: 'Driver permit rules of the road, traffic signs, right-of-way, and road safety.',
    iconName: 'ShieldCheck',
    color: '#16A34A',
    order: 23,
    active: true,
    popular: true,
    subcategories: ['Rules of the Road', 'Traffic Signs', 'Right of Way', 'Safe Driving Practices']
  },
  {
    id: 'license-plate-quiz',
    name: 'License Plate Quiz',
    slug: 'license-plate-quiz',
    description: 'US state plate slogans, nicknames, regional emblems, and scenic motifs.',
    iconName: 'CarFront',
    color: '#D97706',
    order: 24,
    active: true,
    subcategories: ['State Slogans', 'Plate Motifs', 'Regional Nicknames', 'Historical Plates']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Pop culture, blockbuster franchises, streaming hits, and entertainment lore.',
    iconName: 'Sparkles',
    color: '#D97706',
    order: 25,
    active: true,
    popular: true,
    subcategories: ['Pop Culture', 'Franchises & Fandoms', 'Streaming Hits', 'Trivia Milestones']
  },
  {
    id: 'movies',
    name: 'Movies',
    slug: 'movies',
    description: 'Academy Award winners, cinematic quotes, iconic directors, and classic cinema.',
    iconName: 'Film',
    color: '#B45309',
    order: 26,
    active: true,
    subcategories: ['Classic Cinema', 'Oscar Winners', 'Famous Quotes', 'Blockbusters']
  },
  {
    id: 'tv-shows',
    name: 'TV Shows',
    slug: 'tv-shows',
    description: 'Memorable sitcoms, prestige drama series, television pilots, and Emmy records.',
    iconName: 'Tv',
    color: '#4B5563',
    order: 27,
    active: true,
    subcategories: ['Sitcoms', 'Drama Series', 'TV History', 'Iconic Episodes']
  },
  {
    id: 'drama',
    name: 'Drama',
    slug: 'drama',
    description: 'Theater classics, Shakespearean masterpieces, stagecraft, and dramatic arts.',
    iconName: 'Drama',
    color: '#9333EA',
    order: 28,
    active: true,
    subcategories: ['Shakespeare', 'Modern Theater', 'Dramatic Arts', 'Stage Trivia']
  },
  {
    id: 'celebrity',
    name: 'Celebrity',
    slug: 'celebrity',
    description: 'Famous personalities, icons of history, red carpet milestones, and bios.',
    iconName: 'Star',
    color: '#F59E0B',
    order: 29,
    active: true,
    subcategories: ['Hollywood Icons', 'Music Icons', 'Biographical Facts', 'Award Records']
  },
  {
    id: 'music',
    name: 'Music',
    slug: 'music',
    description: 'Music theory, rock legends, chart-toppers, classical composers, and instruments.',
    iconName: 'Music',
    color: '#EC4899',
    order: 30,
    active: true,
    subcategories: ['Rock & Pop', 'Music Theory', 'Classical Masters', 'Musical Instruments']
  },
  {
    id: 'cartoon-characters',
    name: 'Cartoon Characters',
    slug: 'cartoon-characters',
    description: 'Animation classics, Disney, Pixar, Warner Bros, and animated heroes.',
    iconName: 'Smile',
    color: '#F59E0B',
    order: 31,
    active: true,
    popular: true,
    subcategories: ['Classic Cartoons', 'Disney & Pixar', 'Modern Animation', 'Superhero Cartoons']
  },
  {
    id: 'relationships',
    name: 'Relationships',
    slug: 'relationships',
    description: 'Interpersonal communication, emotional intelligence, empathy, and social skills.',
    iconName: 'HeartHandshake',
    color: '#F43F5E',
    order: 32,
    active: true,
    subcategories: ['Communication', 'Conflict Resolution', 'Emotional Intelligence', 'Friendship & Trust']
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    slug: 'wisdom',
    description: 'Philosophical insights, timeless proverbs, ethical dilemmas, and life lessons.',
    iconName: 'Feather',
    color: '#6B7280',
    order: 33,
    active: true,
    subcategories: ['Proverbs & Sayings', 'Ethics & Philosophy', 'Life Lessons', 'Mindfulness']
  },
  {
    id: 'mixed-quiz',
    name: 'Mixed Quiz',
    slug: 'mixed-quiz',
    description: 'A dynamic random sampler spanning active questions across all approved categories.',
    iconName: 'Shuffle',
    color: '#FF6B35',
    order: 34,
    active: true,
    popular: true,
    subcategories: ['All Categories']
  }
];

export const APPROVED_CATEGORIES = CATEGORY_REGISTRY
  .filter(c => c.id !== 'mixed-quiz')
  .map(c => c.name);

export const APPROVED_CATEGORY_MAP = new Map<string, CategoryRegistryItem>(
  CATEGORY_REGISTRY.map(c => [c.name.toLowerCase(), c])
);
