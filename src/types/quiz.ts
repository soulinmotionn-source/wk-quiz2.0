export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type QuizMode = 
  | 'classic'    // Standard 10 questions
  | 'quick'      // Fast 5 questions
  | 'practice'   // Immediate feedback + explanation per question
  | 'timed'      // Time limit per question (e.g. 15s)
  | 'endless'    // Continues until an incorrect answer or manual end
  | 'mixed'      // Blended categories
  | 'daily'      // Daily deterministic challenge
  | 'category';  // Category-specific quiz

export interface Question {
  id: string;
  category: string;
  subcategory: string;
  difficulty: QuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  active?: boolean;
  source?: string;
  reference?: string;
  image?: string;
}

export interface ShuffledQuestion {
  originalId: string;
  category: string;
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  questionCount: number;
  popular?: boolean;
}

export interface QuizMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  difficulty: Difficulty;
  estimatedTime: string;
  questionCount: number;
  mode: QuizMode;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  learningPoints?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

export interface QuestionReviewItem {
  questionId: string;
  question: string;
  options: string[];
  userAnswerIndex: number | null;
  correctAnswerIndex: number;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  difficulty: Difficulty;
  mode: QuizMode;
  date: string;
  reviews: QuestionReviewItem[];
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastPlayedDate: string;
  completedQuizzes: number;
  bestScores: Record<string, number>;
  history: Array<{
    id: string;
    quizId: string;
    quizTitle: string;
    score: number;
    total: number;
    date: string;
  }>;
  achievements: string[];
}
