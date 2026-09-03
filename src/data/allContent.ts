import { WeekId, StudyModule, KeyConcept, Flashcard, QuizQuestion } from '../types/course';
import { week1Modules, week1KeyConcepts, week1Flashcards, week1Quizzes } from './week1Data';
import { week2Modules, week2KeyConcepts, week2Flashcards, week2Quizzes } from './week2Data';
import { week3Modules, week3KeyConcepts, week3Flashcards, week3Quizzes } from './week3Data';
import { week4Modules, week4KeyConcepts, week4Flashcards, week4Quizzes } from './week4Data';
import { WEEKS_INFO, ALL_WEEKS_LIST } from './weeksInfo';

export const ALL_MODULES: Record<WeekId, StudyModule[]> = {
  week1: week1Modules,
  week2: week2Modules,
  week3: week3Modules,
  week4: week4Modules,
};

export const ALL_KEY_CONCEPTS: Record<WeekId, KeyConcept[]> = {
  week1: week1KeyConcepts,
  week2: week2KeyConcepts,
  week3: week3KeyConcepts,
  week4: week4KeyConcepts,
};

export const ALL_FLASHCARDS: Record<WeekId, Flashcard[]> = {
  week1: week1Flashcards,
  week2: week2Flashcards,
  week3: week3Flashcards,
  week4: week4Flashcards,
};

export const ALL_QUIZZES: Record<WeekId, QuizQuestion[]> = {
  week1: week1Quizzes,
  week2: week2Quizzes,
  week3: week3Quizzes,
  week4: week4Quizzes,
};

// Flattened list of all flashcards
export const getAllFlashcards = (): Flashcard[] => [
  ...week1Flashcards,
  ...week2Flashcards,
  ...week3Flashcards,
  ...week4Flashcards,
];

// Flattened list of all quizzes
export const getAllQuizzes = (): QuizQuestion[] => [
  ...week1Quizzes,
  ...week2Quizzes,
  ...week3Quizzes,
  ...week4Quizzes,
];

// Flattened list of all key concepts
export const getAllKeyConcepts = (): KeyConcept[] => [
  ...week1KeyConcepts,
  ...week2KeyConcepts,
  ...week3KeyConcepts,
  ...week4KeyConcepts,
];

// Total statistics helper
export const getCourseStats = () => {
  const flashcards = getAllFlashcards();
  const quizzes = getAllQuizzes();
  const concepts = getAllKeyConcepts();
  let totalSections = 0;

  Object.values(ALL_MODULES).forEach(mods => {
    mods.forEach(m => {
      totalSections += m.subsections.length;
    });
  });

  return {
    totalWeeks: 4,
    totalSlides: 48 + 54 + 78 + 48, // 228 pages
    totalModules: week1Modules.length + week2Modules.length + week3Modules.length + week4Modules.length,
    totalSections,
    totalFlashcards: flashcards.length,
    totalQuizzes: quizzes.length,
    totalConcepts: concepts.length,
  };
};

// Helper for generating balanced mock exam questions
export const generateExamQuestions = (count: number = 20): QuizQuestion[] => {
  const w1 = [...week1Quizzes].sort(() => 0.5 - Math.random());
  const w2 = [...week2Quizzes].sort(() => 0.5 - Math.random());
  const w3 = [...week3Quizzes].sort(() => 0.5 - Math.random());
  const w4 = [...week4Quizzes].sort(() => 0.5 - Math.random());

  const perWeek = Math.floor(count / 4);
  const remainder = count % 4;

  const selected: QuizQuestion[] = [
    ...w1.slice(0, perWeek + (remainder > 0 ? 1 : 0)),
    ...w2.slice(0, perWeek + (remainder > 1 ? 1 : 0)),
    ...w3.slice(0, perWeek + (remainder > 2 ? 1 : 0)),
    ...w4.slice(0, perWeek),
  ];

  // Shuffle final selection
  return selected.sort(() => 0.5 - Math.random());
};
