import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_QUIZZES } from '../../data/allContent';
import { QuizQuestion, WeekId } from '../../types/course';
import { WEEKS_INFO } from '../../data/weeksInfo';
import { FormattedText } from '../../utils/formatContent';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  Award,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap
} from 'lucide-react';

export const QuizView: React.FC = React.memo(() => {
  const {
    currentWeek,
    setCurrentWeek,
    jumpToPdf,
    quizScores,
    recordQuizScore
  } = useApp();

  const activeWeekId: WeekId = currentWeek === 'all' ? 'week1' : currentWeek;
  const questions: QuizQuestion[] = ALL_QUIZZES[activeWeekId] || [];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Reset state when active week changes
  useEffect(() => {
    setSelectedAnswers({});
    setActiveQuestionIdx(0);
  }, [currentWeek]);

  // Handle option selection with INSTANT FEEDBACK
  const handleSelectOption = useCallback((questionId: string, optionIdx: number) => {
    // If already answered this question, do nothing (user can click "Try Again" to retry)
    if (selectedAnswers[questionId] !== undefined) return;

    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));

    // Check if correct
    const question = questions.find(q => q.id === questionId);
    const isCorrect = question?.options[optionIdx]?.isCorrect;

    if (isCorrect) {
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  }, [questions, selectedAnswers]);

  // Retry / Reset specific question
  const handleRetryQuestion = useCallback((questionId: string) => {
    setSelectedAnswers(prev => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  }, []);

  // Calculate scores
  const scoreStats = useMemo(() => {
    let correct = 0;
    let answered = 0;
    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined) {
        answered++;
        if (q.options[selected]?.isCorrect) {
          correct++;
        }
      }
    });
    return { correct, answered, total: questions.length };
  }, [questions, selectedAnswers]);

  // Record score when all are answered
  useEffect(() => {
    if (scoreStats.answered === questions.length && questions.length > 0) {
      recordQuizScore(activeWeekId, scoreStats.correct, questions.length);
    }
  }, [scoreStats.answered, scoreStats.correct, questions.length, activeWeekId, recordQuizScore]);

  const handleRetakeAll = useCallback(() => {
    setSelectedAnswers({});
    setActiveQuestionIdx(0);
  }, []);

  const weekInfo = WEEKS_INFO[activeWeekId];
  const currentQ = questions[activeQuestionIdx];
  const bestScoreInfo = quizScores[activeWeekId];
  const isCurrentAnswered = currentQ && selectedAnswers[currentQ.id] !== undefined;
  const currentAnswerIdx = currentQ ? selectedAnswers[currentQ.id] : undefined;
  const isCurrentCorrect = isCurrentAnswered && currentAnswerIdx !== undefined && currentQ.options[currentAnswerIdx]?.isCorrect;

  return (
    <div className="mx-auto max-w-3xl px-3 sm:px-5 py-5 sm:py-8 space-y-5 sm:space-y-6 bg-white min-h-full">
      {/* Quiz Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <Zap className="h-3 w-3 text-emerald-600" />
              Instant Answer Mode (กดปุ๊บ รู้ผลทันที)
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              Week {weekInfo.weekNumber}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">{weekInfo.title}</h3>
          <p className="text-xs text-slate-500">{questions.length} Academic Questions • เฉลยคำตอบและอธิบายเหตุผลทันทีที่คลิก</p>
        </div>

        {/* Real-time score meter & best score badge */}
        <div className="flex flex-wrap items-center gap-2">
          {scoreStats.answered > 0 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-mono font-bold text-blue-900 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>คะแนน: {scoreStats.correct} / {scoreStats.answered} ถูกต้อง</span>
            </div>
          )}

          {bestScoreInfo && (
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-mono text-emerald-800 shadow-xs">
              <Award className="h-4 w-4 text-emerald-600" />
              <span>สถิติดีสุด: {bestScoreInfo.bestScore} / {bestScoreInfo.totalQuestions}</span>
            </div>
          )}
        </div>
      </div>

      {/* Week Selector Chips if in All mode */}
      {currentWeek === 'all' && (
        <div className="flex flex-wrap gap-2">
          {(['week1', 'week2', 'week3', 'week4', 'week5', 'week6'] as WeekId[]).map(wId => (
            <button
              key={wId}
              onClick={() => setCurrentWeek(wId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeWeekId === wId ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-500'
              }`}
            >
              Week {WEEKS_INFO[wId].weekNumber} Quiz
            </button>
          ))}
        </div>
      )}

      {/* Quiz Progress & Question Selector Bar (Instant Green/Red status per question) */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-600 font-mono mb-2.5">
          <span>ตอบแล้ว: {scoreStats.answered} จาก {questions.length} ข้อ</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> ถูก: {scoreStats.correct}
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-bold">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> ผิด: {scoreStats.answered - scoreStats.correct}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = activeQuestionIdx === idx;
            const isCorrect = isAnswered && q.options[selectedAnswers[q.id]]?.isCorrect;
            const isWrong = isAnswered && !isCorrect;

            let btnClass = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';

            if (isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-500 text-white font-bold shadow-xs';
            } else if (isWrong) {
              btnClass = 'border-rose-500 bg-rose-500 text-white font-bold shadow-xs';
            } else if (isCurrent) {
              btnClass = 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs';
            }

            if (isCurrent) {
              btnClass += ' ring-2 ring-blue-500 ring-offset-2';
            }

            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl border font-mono text-xs transition-all flex items-center justify-center relative ${btnClass}`}
                title={`Question ${idx + 1}: ${isCorrect ? 'Correct ✓' : isWrong ? 'Incorrect ✗' : 'Unanswered'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-50 text-blue-700 px-2.5 py-1 text-xs font-mono font-bold border border-blue-100">
                Question {activeQuestionIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-500 font-mono">• {currentQ.topic}</span>
            </div>

            {/* Direct PDF Slide Verification Link */}
            <button
              onClick={() => jumpToPdf(currentQ.weekId, currentQ.pdfPage)}
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/80 px-2.5 py-1 text-xs font-mono font-semibold text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
              title={`View slide page ${currentQ.pdfPage} in PDF split view`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Slide Page {currentQ.pdfPage}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Question Text */}
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              <FormattedText content={currentQ.question} className="text-slate-900 font-bold" />
            </div>
            {currentQ.thaiContext && (
              <p className="mt-2 text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                บริบท/คำใบ้ภาษาไทย: {currentQ.thaiContext.replace(/<!--[\s\S]*?-->/g, '').trim()}
              </p>
            )}
          </div>

          {/* Options: Click to INSTANTLY reveal if correct */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const hasAnsweredThis = isCurrentAnswered;

              let cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white cursor-pointer';

              if (hasAnsweredThis) {
                if (opt.isCorrect) {
                  // This is the correct choice!
                  cardStyle = isSelected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 font-bold shadow-xs'
                    : 'border-emerald-400 bg-emerald-50/80 text-emerald-950 border-dashed font-semibold';
                } else if (isSelected && !opt.isCorrect) {
                  // User chose this wrong choice!
                  cardStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400 font-semibold shadow-xs';
                } else {
                  // Other wrong choices
                  cardStyle = 'border-slate-200/60 bg-slate-50/40 text-slate-400 opacity-50 cursor-default';
                }
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`rounded-2xl border p-3.5 sm:p-4 transition-all ${cardStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      hasAnsweredThis && opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : hasAnsweredThis && isSelected && !opt.isCorrect
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {letters[optIdx]}
                    </span>

                    <div className="flex-1 text-xs sm:text-sm leading-relaxed font-medium">
                      <FormattedText content={opt.text} />
                    </div>

                    {/* Instant Feedback Badges */}
                    {hasAnsweredThis && opt.isCorrect && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{isSelected ? '✓ ถูกต้อง!' : '✓ คำตอบที่ถูกต้อง'}</span>
                      </span>
                    )}
                    {hasAnsweredThis && isSelected && !opt.isCorrect && (
                      <span className="flex items-center gap-1 rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[11px] font-bold text-rose-800 shrink-0">
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        <span>✗ ยังไม่ถูก</span>
                      </span>
                    )}
                  </div>

                  {/* Immediate Detailed Explanation */}
                  {hasAnsweredThis && (opt.isCorrect || isSelected) && (
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

          {/* Instant Result Banner & Next/Retry Action */}
          {isCurrentAnswered && (
            <div className={`rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border shadow-xs ${
              isCurrentCorrect
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2.5">
                {isCurrentCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-rose-600 shrink-0" />
                )}
                <div>
                  <h5 className="font-black text-sm">
                    {isCurrentCorrect ? 'ถูกต้อง ยอดเยี่ยมมาก! 🎉' : 'ข้อนี้ยังไม่ถูกต้อง!'}
                  </h5>
                  <p className="text-xs opacity-80">
                    {isCurrentCorrect
                      ? `คำตอบถูกต้องตรงกับเอกสารสไลด์บรรยายหน้า ${currentQ.pdfPage}`
                      : 'ลองอ่านคำอธิบายในกรอบสีเขียวเพื่อทำความเข้าใจ หรือกดลองตอบใหม่ได้ครับ'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isCurrentCorrect && (
                  <button
                    onClick={() => handleRetryQuestion(currentQ.id)}
                    className="flex items-center gap-1 rounded-xl border border-rose-300 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all shadow-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>ลองตอบใหม่</span>
                  </button>
                )}

                {activeQuestionIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                    className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-xs"
                  >
                    <span>ข้อถัดไป</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetakeAll}
                    className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>เริ่มทำใหม่ทั้งหมด</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Stepper Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={activeQuestionIdx === 0}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>ก่อนหน้า</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              {activeQuestionIdx + 1} / {questions.length}
            </span>

            <button
              onClick={() => setActiveQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={activeQuestionIdx === questions.length - 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs transition-all"
            >
              <span>ถัดไป</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Completion Banner when all answered */}
      {scoreStats.answered === questions.length && questions.length > 0 && (
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50/50 p-6 text-center space-y-3 shadow-sm">
          <Award className="h-12 w-12 mx-auto text-emerald-600" />
          <h4 className="text-xl font-black text-slate-900">ทำแบบฝึกหัดครบทุกข้อแล้ว!</h4>
          <p className="text-3xl font-mono font-black text-emerald-700">
            {scoreStats.correct} / {questions.length} ข้อ ({Math.round((scoreStats.correct / questions.length) * 100)}%)
          </p>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {scoreStats.correct >= questions.length * 0.7
              ? '🎉 ยอดเยี่ยมมาก! คุณผ่านเกณฑ์ความเข้าใจ 70% ขึ้นไป พร้อมสำหรับข้อสอบ DSI102 แล้ว'
              : 'สามารถทบทวนข้อที่ตอบผิดด้านบน หรือกดดูสไลด์ PDF หน้าที่อ้างอิงเพื่อเสริมความแม่นยำได้ครับ'}
          </p>
          <div className="pt-2">
            <button
              onClick={handleRetakeAll}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>ทำแบบฝึกหัดอีกรอบ (Retake Quiz)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
