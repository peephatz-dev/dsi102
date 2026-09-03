import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_FLASHCARDS, getAllFlashcards } from '../../data/allContent';
import { Flashcard } from '../../types/course';
import { WEEKS_INFO } from '../../data/weeksInfo';
import { FormattedText } from '../../utils/formatContent';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';

export const FlashcardDeck: React.FC = React.memo(() => {
  const {
    currentWeek,
    flashcardMastery,
    markFlashcard,
    resetFlashcardMastery,
    jumpToPdf
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'need_review' | 'known'>('all');
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Load and filter cards based on week and mastery
  useEffect(() => {
    let cards: Flashcard[] = currentWeek === 'all'
      ? getAllFlashcards()
      : ALL_FLASHCARDS[currentWeek] || [];

    if (filterMode === 'need_review') {
      cards = cards.filter(c => flashcardMastery[c.id] === 'review');
    } else if (filterMode === 'known') {
      cards = cards.filter(c => flashcardMastery[c.id] === 'known');
    }

    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [currentWeek, filterMode, flashcardMastery]);

  const currentCard = deck[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleShuffle = useCallback(() => {
    setDeck(prev => [...prev].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const handleMark = useCallback((status: 'known' | 'review') => {
    if (!currentCard) return;
    markFlashcard(currentCard.id, status);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentCard, currentIndex, deck.length, markFlashcard]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'KeyK') {
        handleMark('known');
      } else if (e.code === 'KeyR') {
        handleMark('review');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleMark]);

  // Overall statistics
  const totalInCurrentPool = useMemo(() => {
    return (currentWeek === 'all' ? getAllFlashcards() : ALL_FLASHCARDS[currentWeek] || []).length;
  }, [currentWeek]);

  const knownCount = useMemo(() => {
    return Object.keys(flashcardMastery).filter(id => {
      if (currentWeek !== 'all' && !id.startsWith(`${currentWeek}-`)) return false;
      return flashcardMastery[id] === 'known';
    }).length;
  }, [currentWeek, flashcardMastery]);

  const reviewCount = useMemo(() => {
    return Object.keys(flashcardMastery).filter(id => {
      if (currentWeek !== 'all' && !id.startsWith(`${currentWeek}-`)) return false;
      return flashcardMastery[id] === 'review';
    }).length;
  }, [currentWeek, flashcardMastery]);

  const progressPercent = totalInCurrentPool > 0
    ? Math.round((knownCount / totalInCurrentPool) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-3xl px-3 sm:px-5 py-5 sm:py-8 space-y-5 sm:space-y-6 bg-white min-h-full">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              Flashcard Memorization Mode
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              {currentWeek.toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">Key Concept Flashcards</h3>
        </div>

        {/* Deck Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalInCurrentPool})
            </button>
            <button
              onClick={() => setFilterMode('need_review')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'need_review' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Review ({reviewCount})
            </button>
            <button
              onClick={() => setFilterMode('known')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'known' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mastered ({knownCount})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShuffle}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-xs"
              title="Shuffle Deck"
            >
              <Shuffle className="h-4 w-4" />
            </button>

            <button
              onClick={() => resetFlashcardMastery(currentWeek === 'all' ? undefined : currentWeek)}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-rose-600 hover:border-slate-300 transition-colors shadow-xs"
              title="Reset Deck Progress"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
          <span>Mastery Progress: {knownCount} / {totalInCurrentPool} cards mastered</span>
          <span className="font-bold text-emerald-700">{progressPercent}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard 3D Card Area */}
      {deck.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center shadow-xs">
          <HelpCircle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
          <h4 className="text-base font-bold text-slate-900">No cards match this filter!</h4>
          <p className="text-xs text-slate-500 mt-1">Switch filter back to "All" or explore other weeks.</p>
          <button
            onClick={() => setFilterMode('all')}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Show All Cards
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>CARD {currentIndex + 1} OF {deck.length}</span>
            <span className="text-[11px]">Press Spacebar to flip, &larr; / &rarr; to navigate</span>
          </div>

          {/* Interactive Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative min-h-[19rem] sm:min-h-[22rem] w-full cursor-pointer select-none rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 p-4 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 flex flex-col justify-between"
          >
            {/* Top Bar on Card */}
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-slate-200 bg-white px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono font-semibold text-blue-700 shadow-xs">
                {currentCard.category}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {flashcardMastery[currentCard.id] === 'known' && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3" /> Mastered
                  </span>
                )}
                {flashcardMastery[currentCard.id] === 'review' && (
                  <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-rose-700 border border-rose-200">
                    <XCircle className="h-3 w-3" /> Review
                  </span>
                )}
                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400">
                  {isFlipped ? 'BACK' : 'FRONT'}
                </span>
              </div>
            </div>

            {/* Card Content Center */}
            <div className="my-auto py-4 sm:py-6">
              {!isFlipped ? (
                <div className="text-center">
                  <h4 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                    {currentCard.front}
                  </h4>
                  <p className="mt-3 sm:mt-4 text-xs text-blue-700 font-semibold flex items-center justify-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Tap to flip and reveal answer</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-xl mx-auto">
                  {/* Clean formatted back with zero raw markdown symbols */}
                  <div className="text-sm leading-relaxed text-slate-800 font-medium">
                    <FormattedText content={currentCard.back} />
                  </div>

                  {currentCard.thaiExplanation && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs text-amber-950 shadow-xs">
                      <span className="font-bold text-amber-900 block mb-1">คำอธิบายภาษาไทย:</span>
                      <p className="leading-relaxed">{currentCard.thaiExplanation}</p>
                    </div>
                  )}

                  {currentCard.examTip && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-2.5 text-xs text-blue-950 flex items-center gap-2 shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span><strong>Exam Tip:</strong> {currentCard.examTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bar on Card */}
            <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToPdf(currentCard.weekId, currentCard.pdfPage);
                }}
                className="flex items-center gap-1.5 text-slate-600 hover:text-blue-700 font-mono transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span>Reference: Slide Page {currentCard.pdfPage}</span>
              </button>

              <span className="text-[11px] text-slate-500 font-mono">
                Week {WEEKS_INFO[currentCard.weekId].weekNumber}
              </span>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleMark('review')}
                className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all shadow-xs"
              >
                <XCircle className="h-4 w-4" />
                <span>Review</span>
              </button>

              <button
                onClick={() => handleMark('known')}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Known</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex >= deck.length - 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
