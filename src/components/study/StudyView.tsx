import React, { useState, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_MODULES } from '../../data/allContent';
import { WEEKS_INFO } from '../../data/weeksInfo';
import { WeekId, StudyModule, StudySubsection } from '../../types/course';
import { InfographicRenderer } from './infographics/InfographicRenderer';
import { FormattedText } from '../../utils/formatContent';
import {
  CheckCircle2,
  Circle,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';

const SubsectionCard: React.FC<{
  sub: StudySubsection;
  weekId: WeekId;
  isDone: boolean;
  onToggleDone: (id: string) => void;
  onJumpToPdf: (w: WeekId, p: number) => void;
}> = React.memo(({ sub, weekId, isDone, onToggleDone, onJumpToPdf }) => {
  return (
    <div className="pt-5 first:pt-0 space-y-4">
      {/* Subsection Title & Actions */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <button
            onClick={() => onToggleDone(sub.id)}
            className="mt-0.5 text-slate-300 hover:text-emerald-600 transition-colors"
            title={isDone ? 'Mark as incomplete' : 'Mark as read'}
          >
            {isDone ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <Circle className="h-5 w-5 text-slate-300" />
            )}
          </button>
          <div>
            <h5 className={`text-base font-bold tracking-tight transition-colors ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
              {sub.title}
            </h5>
            {sub.thaiTitle && (
              <p className="text-xs text-slate-500 mt-0.5">{sub.thaiTitle}</p>
            )}
          </div>
        </div>

        {sub.pdfPage && (
          <button
            onClick={() => onJumpToPdf(weekId, sub.pdfPage!)}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/80 px-2.5 py-1 text-xs font-mono font-semibold text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
            title={`View slide page ${sub.pdfPage} in PDF split view`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Slide Page {sub.pdfPage}</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Clean Formatted Content (Zero raw markdown asterisks) */}
      <FormattedText content={sub.content} />

      {/* Bullet points if any */}
      {sub.bulletPoints && sub.bulletPoints.length > 0 && (
        <ul className="space-y-1.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-700">
          {sub.bulletPoints.map((bp, bidx) => (
            <li key={bidx} className="flex items-start gap-2">
              <span className="text-blue-600 font-bold leading-none mt-1">•</span>
              <span className="leading-relaxed">
                <FormattedText content={bp} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Thai Commentary Callout Box */}
      {sub.thaiCommentary && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
            <Lightbulb className="h-4 w-4 text-amber-700" />
            <span>คำอธิบายภาษาไทย (Thai Commentary):</span>
          </div>
          <p className="leading-relaxed text-slate-800">
            {sub.thaiCommentary.replace(/<!--[\s\S]*?-->/g, '').trim()}
          </p>
        </div>
      )}

      {/* Formula Box if any */}
      {sub.formula && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-3.5 text-center font-mono text-xs font-semibold text-slate-900 overflow-x-auto">
          <span className="text-[10px] text-slate-500 block uppercase mb-1 font-sans font-bold">Key Model / Formula:</span>
          <code>{sub.formula}</code>
        </div>
      )}

      {/* Memory Tip if any */}
      {sub.memoryTip && (
        <div className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-3 text-xs text-blue-950 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold text-blue-900">Memory Tip: </span>
            <span className="text-slate-800">{sub.memoryTip}</span>
          </div>
        </div>
      )}

      {/* Embedded Interactive Infographic (Lazy Loaded) */}
      {sub.infographicId && (
        <div className="pt-2">
          <InfographicRenderer id={sub.infographicId} />
        </div>
      )}
    </div>
  );
});

export const StudyView: React.FC = () => {
  const {
    currentWeek,
    setCurrentWeek,
    jumpToPdf,
    completedSections,
    toggleSectionCompleted,
  } = useApp();

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'w1-m1': true,
    'w2-m1': true,
    'w3-m1': true,
    'w4-m1': true,
  });

  const toggleModule = useCallback((modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  }, []);

  const activeWeeks: WeekId[] = useMemo(() => {
    return currentWeek === 'all'
      ? ['week1', 'week2', 'week3', 'week4']
      : [currentWeek];
  }, [currentWeek]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 space-y-8 bg-white min-h-full">
      {/* Course Overview Banner if 'all' */}
      {currentWeek === 'all' && (
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 p-6 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">
              Comprehensive Course Map
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">DSI102: Complete Study Modules (Weeks 1 - 4)</h2>
          <p className="mt-1 text-xs text-slate-600">
            Full lecture notes, bilingual Thai commentaries, interactive infographics, and direct slide references.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(['week1', 'week2', 'week3', 'week4'] as WeekId[]).map(wId => {
              const info = WEEKS_INFO[wId];
              return (
                <button
                  key={wId}
                  onClick={() => setCurrentWeek(wId)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-700 transition-all shadow-xs"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: info.accentColor }} />
                  <span>Week {info.weekNumber}: {info.badge}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Week Loop */}
      {activeWeeks.map(wId => {
        const weekInfo = WEEKS_INFO[wId];
        const modules = ALL_MODULES[wId] || [];

        return (
          <div key={wId} className="space-y-6">
            {/* Week Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-md px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs"
                    style={{ backgroundColor: weekInfo.accentColor }}
                  >
                    Week {weekInfo.weekNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{weekInfo.totalPages} Lecture Slides</span>
                </div>
                <h3 className="mt-1 text-xl font-black text-slate-900">{weekInfo.title}</h3>
                <p className="text-xs text-slate-500">{weekInfo.thaiTitle}</p>
              </div>

              <button
                onClick={() => jumpToPdf(wId, 1)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-700 transition-all shadow-xs"
              >
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span>View Week {weekInfo.weekNumber} Slides</span>
              </button>
            </div>

            {/* Modules List */}
            {modules.map(module => {
              const isExpanded = expandedModules[module.id] ?? true;

              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                >
                  {/* Module Header Bar */}
                  <div
                    onClick={() => toggleModule(module.id)}
                    className="flex cursor-pointer items-center justify-between gap-3 p-4 bg-slate-50/80 hover:bg-slate-100/70 border-b border-slate-200/80 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-blue-700 shadow-xs">
                        M{module.moduleNumber}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{module.title}</h4>
                        <p className="text-xs text-slate-500">{module.thaiTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          jumpToPdf(wId, module.pdfPageStart);
                        }}
                        className="hidden sm:flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-mono text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <FileText className="h-3 w-3" />
                        <span>Slides P.{module.pdfPageStart}-{module.pdfPageEnd}</span>
                      </button>

                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Module Subsections */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-100 p-6 space-y-6">
                      {module.subsections.map(sub => (
                        <SubsectionCard
                          key={sub.id}
                          sub={sub}
                          weekId={wId}
                          isDone={!!completedSections[sub.id]}
                          onToggleDone={toggleSectionCompleted}
                          onJumpToPdf={jumpToPdf}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
