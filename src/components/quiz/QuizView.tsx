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
  ExternalLink
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
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Reset state when active week changes
  useEffect(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setActiveQuestionIdx(0);
  }, [currentWeek]);

  const handleSelectOption = useCallback((questionId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  }, [submitted]);

  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined && q.options[selected]?.isCorrect) {
        score++;
      }
    });
    return score;
  }, [questions, selectedAnswers]);

  const handleSubmitQuiz = useCallback(() => {
    setSubmitted(true);
    const score = calculateScore();
    recordQuizScore(activeWeekId, score, questions.length);

    if (score >= questions.length * 0.7) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [activeWeekId, calculateScore, questions.length, recordQuizScore]);

  const handleRetake = useCallback(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setActiveQuestionIdx(0);
  }, []);

  const weekInfo = WEEKS_INFO[activeWeekId];
  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQ = questions[activeQuestionIdx];
  const bestScoreInfo = quizScores[activeWeekId];

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 space-y-6 bg-white min-h-full">
      {/* Quiz Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              Practice Quiz Mode
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700">
              Week {weekInfo.weekNumber}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">{weekInfo.title}</h3>
          <p className="text-xs text-slate-500">{questions.length} Academic Exam Questions with PDF Slide References</p>
        </div>

        {/* Best score badge */}
        {bestScoreInfo && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-mono text-emerald-800 shadow-xs">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Best: {bestScoreInfo.bestScore} / {bestScoreInfo.totalQuestions} ({bestScoreInfo.attempts} attempts)</span>
          </div>
        )}
      </div>

      {/* Week Selector Chips if in All mode */}
      {currentWeek === 'all' && (
        <div className="flex flex-wrap gap-2">
          {(['week1', 'week2', 'week3', 'week4'] as WeekId[]).map(wId => (
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

      {/* Quiz Progress & Question Selector Bar */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-600 font-mono mb-3">
          <span>Question Navigation: {answeredCount} of {questions.length} Answered</span>
          <span className="font-bold text-blue-700">{submitted ? 'Reviewing Solutions' : 'In Progress'}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = activeQuestionIdx === idx;
            const isCorrect = submitted && q.options[selectedAnswers[q.id]]?.isCorrect;
            const isWrong = submitted && isAnswered && !isCorrect;

            let btnClass = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';

            if (submitted) {
              if (isCorrect) btnClass = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-bold';
              else if (isWrong) btnClass = 'border-rose-400 bg-rose-50 text-rose-800 font-bold';
              else btnClass = 'border-slate-200 bg-slate-100 text-slate-400';
            } else if (isCurrent) {
              btnClass = 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs ring-1 ring-blue-500';
            } else if (isAnswered) {
              btnClass = 'border-blue-300 bg-blue-50 text-blue-800 font-medium';
            }

            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`h-9 w-9 rounded-xl border font-mono text-xs transition-all flex items-center justify-center ${btnClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-blue-700">
                Question {activeQuestionIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-500 font-mono">• {currentQ.topic}</span>
            </div>

            {/* Direct PDF Slide Verification Link */}
            <button
              onClick={() => jumpToPdf(currentQ.weekId, currentQ.pdfPage)}
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-mono font-semibold text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
              title={`View slide page ${currentQ.pdfPage} in PDF split view`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>See PDF Page {currentQ.pdfPage}</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Question Text */}
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              <FormattedText content={currentQ.question} className="text-slate-900 font-bold" />
            </div>
            {currentQ.thaiContext && (
              <p className="mt-2 text-xs text-slate-500 italic">
                บริบทภาษาไทย: {currentQ.thaiContext.replace(/<!--[\s\S]*?-->/g, '').trim()}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const showResult = submitted;

              let cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white';

              if (showResult) {
                if (opt.isCorrect) {
                  cardStyle = 'border-emerald-300 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-400';
                } else if (isSelected && !opt.isCorrect) {
                  cardStyle = 'border-rose-300 bg-rose-50/80 text-rose-950 ring-1 ring-rose-400';
                } else {
                  cardStyle = 'border-slate-200/60 bg-slate-50/40 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                cardStyle = 'border-blue-600 bg-blue-50/80 text-slate-900 ring-1 ring-blue-500';
              }

              const letters = ['A', 'B', 'C', 'D'];

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all shadow-xs ${cardStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {letters[optIdx]}
                    </span>
                    <div className="flex-1 text-xs leading-relaxed font-medium">
                      <FormattedText content={opt.text} />
                    </div>

                    {showResult && opt.isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    )}
                    {showResult && isSelected && !opt.isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                  </div>

                  {/* Immediate Explanation Display */}
                  {showResult && (opt.isCorrect || isSelected) && (
                    <div className={`mt-3 border-t pt-2.5 text-xs leading-relaxed ${
                      opt.isCorrect ? 'border-emerald-200 text-emerald-950' : 'border-rose-200 text-rose-950'
                    }`}>
                      <span className="font-bold">{opt.isCorrect ? '✓ Why this is correct: ' : '✗ Why this is incorrect: '}</span>
                      <FormattedText content={opt.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={activeQuestionIdx === 0}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs"
            >
              Previous Question
            </button>

            {!submitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={answeredCount === 0}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-all"
              >
                Submit Quiz ({answeredCount}/{questions.length})
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Quiz</span>
              </button>
            )}

            <button
              onClick={() => setActiveQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={activeQuestionIdx === questions.length - 1}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 shadow-xs"
            >
              Next Question
            </button>
          </div>
        </div>
      )}

      {/* Post-Submission Summary Banner */}
      {submitted && (
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50/50 p-6 text-center space-y-3 shadow-sm">
          <Award className="h-12 w-12 mx-auto text-emerald-600" />
          <h4 className="text-xl font-black text-slate-900">Quiz Completed!</h4>
          <p className="text-3xl font-mono font-black text-emerald-700">
            {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
          </p>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Review each question above. Click the "See PDF Page X" button on any question to view the exact lecture slide supporting the answer.
          </p>
        </div>
      )}
    </div>
  );
});
