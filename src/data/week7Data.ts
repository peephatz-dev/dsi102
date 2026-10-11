import data from './week7Content.json';
import { StudyModule, Flashcard, QuizQuestion, KeyConcept } from '../types/course';
export const week7Modules = data.modules as StudyModule[];
export const week7Flashcards = data.flashcards as Flashcard[];
export const week7Quizzes = data.quizzes as QuizQuestion[];
export const week7KeyConcepts = data.concepts as KeyConcept[];
