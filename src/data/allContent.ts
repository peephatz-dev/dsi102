import week5Supplement from './week5Supplement.json';
import week6Supplement from './week6Supplement.json';
import { week8Modules, week8KeyConcepts, week8Flashcards, week8Quizzes } from './week8Data';
import { week7Modules, week7KeyConcepts, week7Flashcards, week7Quizzes } from './week7Data';
import { WeekId, StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';
import { week1Modules, week1KeyConcepts, week1Flashcards, week1Quizzes } from './week1Data';
import { week2Modules, week2KeyConcepts, week2Flashcards, week2Quizzes } from './week2Data';
import { week3Modules, week3KeyConcepts, week3Flashcards, week3Quizzes } from './week3Data';
import { week4Modules, week4KeyConcepts, week4Flashcards, week4Quizzes } from './week4Data';
import { week5Modules, week5KeyConcepts, week5Flashcards, week5Quizzes } from './week5Data';
import { week6Modules, week6KeyConcepts, week6Flashcards, week6Quizzes } from './week6Data';
import { WEEKS_INFO, ALL_WEEKS_LIST } from './weeksInfo';

export const ALL_MODULES: Record<WeekId, StudyModule[]> = {
  week1: week1Modules,
  week2: week2Modules,
  week3: week3Modules,
  week4: week4Modules,
  week5: [...week5Modules, ...week5Supplement as StudyModule[]],
  week6: [...week6Modules, ...week6Supplement as StudyModule[]],
  week7: week7Modules,
  week8: week8Modules,
};

export const ALL_KEY_CONCEPTS: Record<WeekId, KeyConcept[]> = {
  week1: week1KeyConcepts,
  week2: week2KeyConcepts,
  week3: week3KeyConcepts,
  week4: week4KeyConcepts,
  week5: week5KeyConcepts,
  week6: week6KeyConcepts,
  week7: week7KeyConcepts,
  week8: week8KeyConcepts,
};

export const ALL_FLASHCARDS: Record<WeekId, Flashcard[]> = {
  week1: week1Flashcards,
  week2: week2Flashcards,
  week3: week3Flashcards,
  week4: week4Flashcards,
  week5: week5Flashcards,
  week6: week6Flashcards,
  week7: week7Flashcards,
  week8: week8Flashcards,
};

export const ALL_QUIZZES: Record<WeekId, QuizQuestion[]> = {
  week1: week1Quizzes,
  week2: week2Quizzes,
  week3: week3Quizzes,
  week4: week4Quizzes,
  week5: week5Quizzes,
  week6: week6Quizzes,
  week7: week7Quizzes,
  week8: week8Quizzes,
};

// Flattened list of all flashcards
export const getAllFlashcards = (): Flashcard[] => [
  ...week1Flashcards,
  ...week2Flashcards,
  ...week3Flashcards,
  ...week4Flashcards,
  ...week5Flashcards,
  ...week6Flashcards,
  ...week8Flashcards,
  ...week7Flashcards,
];

// Flattened list of all quizzes
export const getAllQuizzes = (): QuizQuestion[] => [
  ...week1Quizzes,
  ...week2Quizzes,
  ...week3Quizzes,
  ...week4Quizzes,
  ...week5Quizzes,
  ...week6Quizzes,
  ...week8Quizzes,
  ...week7Quizzes,
];

// Flattened list of all key concepts
export const getAllKeyConcepts = (): KeyConcept[] => [
  ...week1KeyConcepts,
  ...week2KeyConcepts,
  ...week3KeyConcepts,
  ...week4KeyConcepts,
  ...week5KeyConcepts,
  ...week6KeyConcepts,
  ...week8KeyConcepts,
  ...week7KeyConcepts,
];

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
export const getCourseStats = () => ({
  totalWeeks: ALL_WEEKS_LIST.length,
  totalSlides: ALL_WEEKS_LIST.reduce((n, w) => n + w.totalPages, 0),
  totalModules: Object.values(ALL_MODULES).flat().length,
  totalSections: Object.values(ALL_MODULES).flat().reduce((n, m) => n + m.subsections.length, 0),
  totalFlashcards: getAllFlashcards().length,
  totalQuizzes: getAllQuizzes().length,
  totalConcepts: getAllKeyConcepts().length,
});
export const generateExamQuestions = (count = 20): QuizQuestion[] => {
  const pools = shuffle(Object.values(ALL_QUIZZES)).map(shuffle);
  const selected: QuizQuestion[] = [];
  while (selected.length < count && pools.some(p => p.length)) {
    for (const pool of pools) { if (pool.length && selected.length < count) selected.push(pool.pop()!); }
  }
  return shuffle(selected);
};
