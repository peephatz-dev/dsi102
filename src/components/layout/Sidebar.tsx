import React from 'react';
import { useApp } from '../../context/AppContext';
import { WeekId, StudyMode } from '../../types/course';
import { ALL_WEEKS_LIST } from '../../data/weeksInfo';
import { getAllFlashcards, ALL_MODULES } from '../../data/allContent';
import {
  BookOpen,
  Layers,
  HelpCircle,
  Award,
  Compass,
  X,
  Search
} from 'lucide-react';

export const Sidebar: React.FC = React.memo(() => {
  const {
    currentWeek,
    setCurrentWeek,
    currentMode,
    setCurrentMode,
    completedSections,
    flashcardMastery,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const studyModes: { id: StudyMode; label: string; thaiLabel: string; icon: any; badge?: string }[] = [
    {
      id: 'study',
      label: 'Deep Study',
      thaiLabel: 'เรียนเนื้อหาอย่างละเอียด',
      icon: BookOpen,
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      thaiLabel: 'จำสอบ (Card Flip)',
      icon: Layers,
    },
    {
      id: 'quiz',
      label: 'Practice Quiz',
      thaiLabel: 'ทำสอบรายสัปดาห์',
      icon: HelpCircle,
    },
    {
      id: 'exam',
      label: 'Mock Exam Simulator',
      thaiLabel: 'ข้อสอบรวมทุก Week',
      icon: Award,
      badge: 'Timed'
    }
  ];

  // Calculate Overall Progress
  let totalSections = 0;
  Object.values(ALL_MODULES).forEach(mods => {
    mods.forEach(m => totalSections += m.subsections.length);
  });
  const completedCount = Object.values(completedSections).filter(Boolean).length;
  const studyProgress = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const totalCards = getAllFlashcards().length;
  const masteredCards = Object.values(flashcardMastery).filter(s => s === 'known').length;
  const cardProgress = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  const handleSelectWeek = (wId: WeekId | 'all') => {
    setCurrentWeek(wId);
    setMobileMenuOpen(false);
  };

  const handleSelectMode = (mId: StudyMode) => {
    setCurrentMode(mId);
    setMobileMenuOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 overflow-y-auto select-none">
      <div className="space-y-6">
        {/* Mobile Search Input */}
        <div className="md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, slides..."
              className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Week Selector Section */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase px-2">
            COURSE WEEKS
          </span>

          <div className="mt-2 space-y-1">
            {/* Global All Weeks */}
            <button
              onClick={() => handleSelectWeek('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentWeek === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span>All Weeks (Global)</span>
              </div>
              <span className="text-[10px] font-mono opacity-80">355p</span>
            </button>

            {/* Individual Weeks */}
            {ALL_WEEKS_LIST.map((w) => {
              const isActive = currentWeek === w.id;

              return (
                <button
                  key={w.id}
                  onClick={() => handleSelectWeek(w.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-blue-700 border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2 text-left">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: w.accentColor }}
                    />
                    <div>
                      <span className="block font-bold">Week {w.weekNumber}</span>
                      <span className="text-[10px] text-slate-500 block truncate w-32">{w.badge}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{w.totalPages}p</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Mode Switcher */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase px-2">
            PREPARATION MODES
          </span>

          <div className="mt-2 space-y-1">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <Icon className="h-4 w-4 shrink-0" />
                    <div>
                      <span className="block font-bold">{mode.label}</span>
                      <span className="text-[10px] opacity-80 block">{mode.thaiLabel}</span>
                    </div>
                  </div>

                  {mode.badge && (
                    <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-rose-700 border border-rose-200">
                      {mode.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Trackers Box */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px] font-medium">Study Notes Read</span>
            <span className="font-mono font-bold text-blue-600">{studyProgress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${studyProgress}%` }} />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500 text-[11px] font-medium">Flashcards Mastered</span>
            <span className="font-mono font-bold text-emerald-600">{cardProgress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${cardProgress}%` }} />
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center font-mono">
          DSI102 • Bilingual Exam Platform
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-slate-200 bg-slate-50/70 flex-col justify-between overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer with Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[80vw] h-full bg-slate-50 border-r border-slate-200 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-3.5 border-b border-slate-200 bg-white">
              <span className="text-xs font-black tracking-wider text-slate-900 font-mono">NAVIGATION</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
});
