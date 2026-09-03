import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { generateExamQuestions } from '../../data/allContent';
import { QuizQuestion, WeekId, ExamAttempt } from '../../types/course';
import { WEEKS_INFO } from '../../data/weeksInfo';
import { FormattedText } from '../../utils/formatContent';
import confetti from 'canvas-confetti';
import {
  Timer,
  Flag,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  FileText,
  History,
  Zap
} from 'lucide-react';

export const ExamSimulator: React.FC = React.memo(() => {
  const {
    jumpToPdf,
    examHistory,
    saveExamAttempt,
    clearExamHistory
  } = useApp();

  const [examState, setExamState] = useState<'intro' | 'active' | 'review'>('intro');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(25);
  const [instantCheck, setInstantCheck] = useState<boolean>(true); // Default true for instant answer validation
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [startTime, setStartTime] = useState<number>(0);
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);

  const handleSubmitExam = useCallback(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    let score = 0;
    const weekBreakdown: Record<WeekId, { total: number; correct: number }> = {
      week1: { total: 0, correct: 0 },
      week2: { total: 0, correct: 0 },
      week3: { total: 0, correct: 0 },
      week4: { total: 0, correct: 0 },
    };

    examQuestions.forEach(q => {
      if (!weekBreakdown[q.weekId]) {
        weekBreakdown[q.weekId] = { total: 0, correct: 0 };
      }
      weekBreakdown[q.weekId].total++;

      const selected = userAnswers[q.id];
      if (selected !== undefined && q.options[selected]?.isCorrect) {
        score++;
        weekBreakdown[q.weekId].correct++;
      }
    });

    const percentage = Math.round((score / examQuestions.length) * 100);

    const attempt: ExamAttempt = {
      id: 'exam-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      totalQuestions: examQuestions.length,
      score,
      percentage,
      timeSpentSeconds: timeSpent,
      weekBreakdown,
      userAnswers,
    };

    saveExamAttempt(attempt);
    setLastAttempt(attempt);
    setExamState('review');

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  }, [examQuestions, saveExamAttempt, startTime, userAnswers]);

  // Countdown timer effect
  useEffect(() => {
    if (examState !== 'active') return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, handleSubmitExam]);

  const handleStartExam = () => {
    const qList = generateExamQuestions(questionCount);
    setExamQuestions(qList);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setSecondsRemaining(examDurationMinutes * 60);
    setStartTime(Date.now());
    setExamState('active');
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (examState !== 'active') return;
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));

    if (instantCheck) {
      const q = examQuestions.find(item => item.id === qId);
      if (q && q.options[optIdx]?.isCorrect) {
        try {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      }
    }
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. INTRO SCREEN
  if (examState === 'intro') {
    return (
      <div className="mx-auto max-w-3xl px-3 sm:px-5 py-5 sm:py-8 space-y-6 sm:space-y-8 bg-white min-h-full">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 p-4 sm:p-8 shadow-xs text-center space-y-4">
          <Award className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-blue-600" />
          <h2 className="text-xl sm:text-3xl font-black text-slate-900">DSI102 Comprehensive Mock Exam Simulator</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Test your readiness with randomized questions drawn from all 4 weeks. Features countdown timer, question flagging, detailed performance analytics, and slide reference verification.
          </p>

          {/* Configuration */}
          <div className="mt-6 inline-flex flex-wrap justify-center gap-3 text-left">
            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <span className="text-xs font-mono text-slate-500 block mb-2 font-bold">Question Count:</span>
              <div className="flex gap-2">
                {[15, 20, 28].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => {
                      setQuestionCount(cnt);
                      setExamDurationMinutes(Math.round(cnt * 1.2));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      questionCount === cnt
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <span className="text-xs font-mono text-slate-500 block mb-2 font-bold">Time Allocated:</span>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 pt-1">
                <Timer className="h-4 w-4 text-blue-600" />
                <span>{examDurationMinutes} Minutes</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <span className="text-xs font-mono text-slate-500 block mb-2 font-bold">Feedback Mode:</span>
              <button
                onClick={() => setInstantCheck(!instantCheck)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  instantCheck
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>{instantCheck ? '⚡ ตรวจคำตอบทันที' : '📋 ตรวจตอนส่ง'}</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleStartExam}
              className="rounded-2xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:scale-102 transition-all"
            >
              Start Timed Simulation ({questionCount} Questions)
            </button>
          </div>
        </div>

        {/* Historical Scoreboard */}
        {examHistory.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Past Exam Performance History</h4>
              </div>
              <button
                onClick={clearExamHistory}
                className="text-[11px] text-slate-400 hover:text-rose-600 font-mono transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="divide-y divide-slate-200/80 text-xs">
              {examHistory.slice(0, 5).map(attempt => (
                <div key={attempt.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">{attempt.date}</span>
                    <span className="text-slate-500 ml-2">({Math.round(attempt.timeSpentSeconds / 60)} mins)</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-600 font-semibold">{attempt.score}/{attempt.totalQuestions}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      attempt.percentage >= 70
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {attempt.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. ACTIVE EXAM SCREEN
  if (examState === 'active') {
    const currentQ = examQuestions[currentIndex];
    const answeredTotal = Object.keys(userAnswers).length;
    const isWarningTime = secondsRemaining < 5 * 60;

    return (
      <div className="mx-auto max-w-3xl px-3 sm:px-5 py-4 sm:py-6 space-y-5 sm:space-y-6 bg-white min-h-full">
        {/* Sticky Top Bar with Timer & Status */}
        <div className="sticky top-2 z-20 flex flex-wrap items-center justify-between gap-2 sm:gap-3 rounded-2xl border border-slate-200 bg-white/95 px-3 sm:px-4 py-2 sm:py-3 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-mono font-bold text-blue-700">
              Q {currentIndex + 1} OF {examQuestions.length}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ({answeredTotal} Answered)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instant feedback toggle */}
            <button
              onClick={() => setInstantCheck(!instantCheck)}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                instantCheck
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
              title="สลับโหมดตรวจคำตอบทันทีเมื่อคลิก"
            >
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">{instantCheck ? 'ตรวจทันที (ON)' : 'ตรวจตอนจบ (OFF)'}</span>
              <span className="sm:hidden font-mono text-[10px]">{instantCheck ? '⚡ ตรวจทันที' : '📋 สอบจริง'}</span>
            </button>

            <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl font-mono text-xs font-bold ${
              isWarningTime
                ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}>
              <Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                flaggedQuestions[currentQ.id]
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <Flag className="h-3.5 w-3.5" />
              <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
            </button>
          </div>
        </div>

        {/* Question Palette Grid */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4 shadow-xs">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {examQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isCurrent = currentIndex === idx;
              const isCorrect = isAnswered && q.options[userAnswers[q.id]]?.isCorrect;
              const isWrong = isAnswered && !isCorrect;

              let btnClass = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';

              if (instantCheck && isAnswered) {
                if (isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-500 text-white font-bold shadow-xs';
                } else if (isWrong) {
                  btnClass = 'border-rose-500 bg-rose-500 text-white font-bold shadow-xs';
                }
              } else if (isCurrent) {
                btnClass = 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs';
              } else if (isFlagged) {
                btnClass = 'border-amber-400 bg-amber-50 text-amber-900 font-bold';
              } else if (isAnswered) {
                btnClass = 'border-blue-300 bg-blue-50 text-blue-800 font-semibold';
              }

              if (isCurrent) {
                btnClass += ' ring-2 ring-blue-500 ring-offset-1';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg border font-mono text-xs transition-all flex items-center justify-center relative ${btnClass}`}
                >
                  {idx + 1}
                  {isFlagged && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Card */}
        {currentQ && (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500 font-mono">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-blue-700 font-bold">
                Week {WEEKS_INFO[currentQ.weekId].weekNumber} • {currentQ.topic}
              </span>
              <span>Slide Ref: Page {currentQ.pdfPage}</span>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                <FormattedText content={currentQ.question} className="text-slate-900 font-bold" />
              </div>
              {currentQ.thaiContext && (
                <p className="mt-2 text-xs text-slate-500 italic">
                  คำใบ้/บริบท: {currentQ.thaiContext.replace(/<!--[\s\S]*?-->/g, '').trim()}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const isAnswered = userAnswers[currentQ.id] !== undefined;
                const showInstant = instantCheck && isAnswered;

                let cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white cursor-pointer';

                if (showInstant) {
                  if (opt.isCorrect) {
                    cardStyle = isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 font-bold shadow-xs'
                      : 'border-emerald-400 bg-emerald-50/80 text-emerald-950 border-dashed font-semibold';
                  } else if (isSelected && !opt.isCorrect) {
                    cardStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400 font-semibold shadow-xs';
                  } else {
                    cardStyle = 'border-slate-200/60 bg-slate-50/40 text-slate-400 opacity-50 cursor-default';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`rounded-2xl border p-3.5 sm:p-4 transition-all shadow-xs ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                        showInstant && opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : showInstant && isSelected && !opt.isCorrect
                          ? 'bg-rose-600 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {['A', 'B', 'C', 'D'][optIdx]}
                      </span>

                      <div className="flex-1 text-xs leading-relaxed font-medium">
                        <FormattedText content={opt.text} />
                      </div>

                      {showInstant && opt.isCorrect && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shrink-0">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{isSelected ? '✓ ถูกต้อง!' : '✓ คำตอบที่ถูกต้อง'}</span>
                        </span>
                      )}
                      {showInstant && isSelected && !opt.isCorrect && (
                        <span className="flex items-center gap-1 rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[10px] font-bold text-rose-800 shrink-0">
                          <XCircle className="h-3.5 w-3.5 text-rose-600" />
                          <span>✗ ยังไม่ถูก</span>
                        </span>
                      )}
                    </div>

                    {showInstant && (opt.isCorrect || isSelected) && (
                      <div className={`mt-3 border-t pt-2.5 text-xs leading-relaxed ${
                        opt.isCorrect ? 'border-emerald-200 text-emerald-950' : 'border-rose-200 text-rose-950'
                      }`}>
                        <span className="font-bold">
                          {opt.isCorrect ? '✓ คำอธิบายเหตุผล: ' : '✗ ทำไมข้อนี้จึงไม่ถูกต้อง: '}
                        </span>
                        <FormattedText content={opt.explanation} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Nav */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs"
              >
                Previous
              </button>

              <button
                onClick={handleSubmitExam}
                className="rounded-xl bg-rose-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-all"
              >
                Finish & Submit Exam
              </button>

              <button
                onClick={() => setCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                disabled={currentIndex === examQuestions.length - 1}
                className="rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. REVIEW SCREEN
  const attempt = lastAttempt;
  if (!attempt) return null;

  return (
    <div className="mx-auto max-w-3xl px-3 sm:px-5 py-5 sm:py-8 space-y-5 sm:space-y-6 bg-white min-h-full">
      {/* Score Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50/50 via-slate-50 to-white p-4 sm:p-8 shadow-xs text-center space-y-4">
        <Award className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto ${attempt.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`} />
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          {attempt.percentage >= 70 ? 'Congratulations! You Passed!' : 'Exam Completed — Review Needed'}
        </h3>
        <p className="text-3xl sm:text-4xl font-black font-mono text-blue-700">
          {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%)
        </p>
        <p className="text-xs text-slate-500 font-mono">
          Time Spent: {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s • Passing Benchmark: 70%
        </p>

        {/* Per-Week Mastery Breakdown */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
          {(['week1', 'week2', 'week3', 'week4'] as WeekId[]).map(wId => {
            const b = attempt.weekBreakdown[wId];
            const pct = b && b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
            const weekInfo = WEEKS_INFO[wId];

            return (
              <div key={wId} className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                <span className="text-[10px] text-slate-500 font-mono block">Week {weekInfo.weekNumber}:</span>
                <span className="text-xs font-bold text-slate-900 truncate block">{weekInfo.badge}</span>
                <div className="mt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">{b ? `${b.correct}/${b.total}` : '0/0'}</span>
                  <span className={`font-bold ${pct >= 70 ? 'text-emerald-600' : 'text-rose-600'}`}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={handleStartExam}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Another Mock Exam</span>
          </button>
          <button
            onClick={() => setExamState('intro')}
            className="rounded-xl border border-slate-200 bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs"
          >
            Back to Simulator Home
          </button>
        </div>
      </div>

      {/* Question-by-Question Review List */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-slate-900">Full Exam Solution Breakdown</h4>

        {examQuestions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected !== undefined && q.options[selected]?.isCorrect;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 space-y-4 shadow-xs ${
                isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs border-b border-slate-200/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">Q{idx + 1}.</span>
                  <span className="text-slate-600">{q.topic} (Week {WEEKS_INFO[q.weekId].weekNumber})</span>
                </div>
                <button
                  onClick={() => jumpToPdf(q.weekId, q.pdfPage)}
                  className="flex items-center gap-1 text-blue-700 hover:text-blue-800 font-mono font-semibold"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>See PDF Slide Page {q.pdfPage}</span>
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900 leading-relaxed">
                <FormattedText content={q.question} className="text-slate-900 font-bold" />
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isUserPick = selected === optIdx;

                  let optClass = 'border-slate-200 bg-white text-slate-600';
                  if (opt.isCorrect) optClass = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium';
                  else if (isUserPick && !opt.isCorrect) optClass = 'border-rose-300 bg-rose-50 text-rose-950 font-medium';

                  return (
                    <div key={optIdx} className={`rounded-xl border p-3 text-xs flex items-start gap-2.5 shadow-xs ${optClass}`}>
                      <span className="font-mono font-bold">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                      <div className="flex-1">
                        <FormattedText content={opt.text} />
                      </div>
                      {opt.isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                      {isUserPick && !opt.isCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Rationale */}
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-800 leading-relaxed shadow-xs">
                <span className="font-bold text-blue-700 block mb-1">Detailed Solution:</span>
                <FormattedText content={q.options.find(o => o.isCorrect)?.explanation || ''} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
