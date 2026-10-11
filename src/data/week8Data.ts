import data from './week8Content.json';
import { StudyModule, Flashcard, QuizQuestion, KeyConcept } from '../types/course';
export const week8Modules = data.modules as StudyModule[];
export const week8Flashcards = data.flashcards as Flashcard[];
export const week8Quizzes = data.quizzes as QuizQuestion[];
export const week8KeyConcepts = data.concepts as KeyConcept[];
