import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DualPaneLayout } from './components/layout/DualPaneLayout';
import { StudyView } from './components/study/StudyView';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { QuizView } from './components/quiz/QuizView';
import { ExamSimulator } from './components/exam/ExamSimulator';

const MainAppContent: React.FC = () => {
  const { currentMode } = useApp();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100 antialiased font-sans">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <DualPaneLayout>
          {currentMode === 'study' && <StudyView />}
          {currentMode === 'flashcards' && <FlashcardDeck />}
          {currentMode === 'quiz' && <QuizView />}
          {currentMode === 'exam' && <ExamSimulator />}
        </DualPaneLayout>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
