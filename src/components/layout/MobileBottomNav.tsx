import React from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMode } from '../../types/course';
import {
  BookOpen,
  Layers,
  HelpCircle,
  Award
} from 'lucide-react';

export const MobileBottomNav: React.FC = React.memo(() => {
  const { currentMode, setCurrentMode } = useApp();

  const tabs: { id: StudyMode; label: string; icon: any }[] = [
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'exam', label: 'Exam', icon: Award }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex h-14 border-t border-slate-200 bg-white/95 px-2 backdrop-blur-md shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex w-full items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentMode === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentMode(tab.id)}
              className={`flex flex-1 flex-col items-center justify-center py-1 transition-colors ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});
