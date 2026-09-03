import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeekId, StudyMode, ExamAttempt } from '../types/course';

interface AppContextType {
  currentWeek: WeekId | 'all';
  setCurrentWeek: (week: WeekId | 'all') => void;
  currentMode: StudyMode;
  setCurrentMode: (mode: StudyMode) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Dual-Pane PDF state
  pdfViewerOpen: boolean;
  setPdfViewerOpen: (open: boolean) => void;
  pdfPage: number;
  setPdfPage: (page: number) => void;
  activePdfWeek: WeekId;
  setActivePdfWeek: (week: WeekId) => void;
  jumpToPdf: (weekId: WeekId, page: number) => void;
  pdfSplitPercent: number;
  setPdfSplitPercent: (percent: number) => void;
  // Progress & Mastery Tracking
  completedSections: Record<string, boolean>;
  toggleSectionCompleted: (sectionId: string) => void;
  flashcardMastery: Record<string, 'known' | 'review'>;
  markFlashcard: (cardId: string, status: 'known' | 'review') => void;
  resetFlashcardMastery: (weekId?: WeekId) => void;
  quizScores: Record<string, { bestScore: number; totalQuestions: number; lastAttemptDate: string; attempts: number }>;
  recordQuizScore: (quizKey: string, score: number, total: number) => void;
  examHistory: ExamAttempt[];
  saveExamAttempt: (attempt: ExamAttempt) => void;
  clearExamHistory: () => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'dsi102_theme',
  COMPLETED_SECTIONS: 'dsi102_completed_sections',
  FLASHCARD_MASTERY: 'dsi102_flashcard_mastery',
  QUIZ_SCORES: 'dsi102_quiz_scores',
  EXAM_HISTORY: 'dsi102_exam_history',
  PDF_SPLIT: 'dsi102_pdf_split',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentWeek, setCurrentWeek] = useState<WeekId | 'all'>('week1');
  const [currentMode, setCurrentMode] = useState<StudyMode>('study');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dual pane PDF
  const [pdfViewerOpen, setPdfViewerOpen] = useState<boolean>(true);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [activePdfWeek, setActivePdfWeek] = useState<WeekId>('week1');
  const [pdfSplitPercent, setPdfSplitPercent] = useState<number>(45);

  // LocalStorage-backed state
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [flashcardMastery, setFlashcardMastery] = useState<Record<string, 'known' | 'review'>>({});
  const [quizScores, setQuizScores] = useState<Record<string, { bestScore: number; totalQuestions: number; lastAttemptDate: string; attempts: number }>>({});
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_SECTIONS);
      if (savedCompleted) setCompletedSections(JSON.parse(savedCompleted));

      const savedMastery = localStorage.getItem(STORAGE_KEYS.FLASHCARD_MASTERY);
      if (savedMastery) setFlashcardMastery(JSON.parse(savedMastery));

      const savedQuizzes = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
      if (savedQuizzes) setQuizScores(JSON.parse(savedQuizzes));

      const savedExams = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
      if (savedExams) setExamHistory(JSON.parse(savedExams));

      const savedSplit = localStorage.getItem(STORAGE_KEYS.PDF_SPLIT);
      if (savedSplit) setPdfSplitPercent(Number(savedSplit));
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
  }, []);

  // Sync activePdfWeek with currentWeek when switching weeks (if not 'all')
  useEffect(() => {
    if (currentWeek !== 'all') {
      setActivePdfWeek(currentWeek);
      setPdfPage(1);
    }
  }, [currentWeek]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  const jumpToPdf = (weekId: WeekId, page: number) => {
    setActivePdfWeek(weekId);
    setPdfPage(page);
    setPdfViewerOpen(true);
  };

  const toggleSectionCompleted = (sectionId: string) => {
    setCompletedSections(prev => {
      const next = { ...prev, [sectionId]: !prev[sectionId] };
      localStorage.setItem(STORAGE_KEYS.COMPLETED_SECTIONS, JSON.stringify(next));
      return next;
    });
  };

  const markFlashcard = (cardId: string, status: 'known' | 'review') => {
    setFlashcardMastery(prev => {
      const next = { ...prev, [cardId]: status };
      localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY, JSON.stringify(next));
      return next;
    });
  };

  const resetFlashcardMastery = (weekId?: WeekId) => {
    setFlashcardMastery(prev => {
      let next = { ...prev };
      if (!weekId) {
        next = {};
      } else {
        Object.keys(next).forEach(k => {
          if (k.startsWith(`${weekId}-`)) {
            delete next[k];
          }
        });
      }
      localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY, JSON.stringify(next));
      return next;
    });
  };

  const recordQuizScore = (quizKey: string, score: number, total: number) => {
    setQuizScores(prev => {
      const existing = prev[quizKey];
      const best = existing ? Math.max(existing.bestScore, score) : score;
      const next = {
        ...prev,
        [quizKey]: {
          bestScore: best,
          totalQuestions: total,
          lastAttemptDate: new Date().toISOString(),
          attempts: (existing?.attempts || 0) + 1,
        }
      };
      localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(next));
      return next;
    });
  };

  const saveExamAttempt = (attempt: ExamAttempt) => {
    setExamHistory(prev => {
      const next = [attempt, ...prev].slice(0, 50); // keep last 50
      localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(next));
      return next;
    });
  };

  const clearExamHistory = () => {
    setExamHistory([]);
    localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
  };

  return (
    <AppContext.Provider
      value={{
        currentWeek,
        setCurrentWeek,
        currentMode,
        setCurrentMode,
        theme,
        toggleTheme,
        pdfViewerOpen,
        setPdfViewerOpen,
        pdfPage,
        setPdfPage,
        activePdfWeek,
        setActivePdfWeek,
        jumpToPdf,
        pdfSplitPercent,
        setPdfSplitPercent: (pct) => {
          setPdfSplitPercent(pct);
          localStorage.setItem(STORAGE_KEYS.PDF_SPLIT, String(pct));
        },
        completedSections,
        toggleSectionCompleted,
        flashcardMastery,
        markFlashcard,
        resetFlashcardMastery,
        quizScores,
        recordQuizScore,
        examHistory,
        saveExamAttempt,
        clearExamHistory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
