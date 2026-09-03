export type WeekId = 'week1' | 'week2' | 'week3' | 'week4';

export type StudyMode = 'study' | 'flashcards' | 'quiz' | 'exam';

export interface SlideReference {
  weekId: WeekId;
  page: number;
  label?: string;
}

export interface KeyConcept {
  id: string;
  term: string;
  thaiTerm?: string;
  definition: string;
  thaiDefinition?: string;
  example?: string;
  pdfPage: number;
  category?: string;
  important?: boolean;
}

export interface StudySubsection {
  id: string;
  title: string;
  thaiTitle?: string;
  pdfPage?: number;
  content: string; // rich markdown / text
  bulletPoints?: string[];
  thaiCommentary?: string;
  formula?: string;
  memoryTip?: string;
  infographicId?: string;
}

export interface StudyModule {
  id: string;
  weekId: WeekId;
  moduleNumber: number | string;
  title: string;
  thaiTitle: string;
  pdfPageStart: number;
  pdfPageEnd: number;
  overview?: string;
  subsections: StudySubsection[];
}

export interface Flashcard {
  id: string;
  weekId: WeekId;
  front: string;
  back: string;
  thaiExplanation?: string;
  category: string;
  pdfPage: number;
  examTip?: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  weekId: WeekId;
  question: string;
  thaiContext?: string;
  options: QuizOption[];
  pdfPage: number;
  topic: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  calculationDetails?: string;
}

export interface ExamAttempt {
  id: string;
  date: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  weekBreakdown: Record<WeekId, { total: number; correct: number }>;
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex
}

export interface WeekInfo {
  id: WeekId;
  weekNumber: number;
  title: string;
  thaiTitle: string;
  shortDesc: string;
  pdfFileName: string;
  pdfFilePath: string;
  totalPages: number;
  badge: string;
  accentColor: string;
  gradient: string;
}
