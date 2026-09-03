import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WEEKS_INFO } from '../../data/weeksInfo';
import { WeekId } from '../../types/course';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
  FileText
} from 'lucide-react';

export const PDFViewerPane: React.FC = React.memo(() => {
  const {
    activePdfWeek,
    setActivePdfWeek,
    pdfPage,
    setPdfPage,
    pdfViewerOpen,
    setPdfViewerOpen,
    pdfSplitPercent,
    setPdfSplitPercent,
  } = useApp();

  const [inputPage, setInputPage] = useState<string>(String(pdfPage));
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const weekInfo = WEEKS_INFO[activePdfWeek];
  const maxPages = weekInfo ? weekInfo.totalPages : 50;

  useEffect(() => {
    setInputPage(String(pdfPage));
  }, [pdfPage, activePdfWeek]);

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(inputPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
      setPdfPage(pageNum);
    } else {
      setInputPage(String(pdfPage));
    }
  };

  const nextPage = () => {
    if (pdfPage < maxPages) setPdfPage(pdfPage + 1);
  };

  const prevPage = () => {
    if (pdfPage > 1) setPdfPage(pdfPage - 1);
  };

  // Prevent mounting iframe completely if viewer is not open (anti-freeze optimization)
  if (!pdfViewerOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setPdfViewerOpen(true)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-105 border border-blue-400"
        >
          <FileText className="h-4 w-4" />
          <span>Open Slide PDF (Page {pdfPage})</span>
        </button>
      </div>
    );
  }

  const pdfUrl = `${weekInfo.pdfFilePath}#page=${pdfPage}&view=FitH`;

  return (
    <div
      className={`flex flex-col border-l border-slate-200 bg-white transition-all duration-200 relative ${
        isExpanded ? 'fixed inset-0 z-50 w-full h-full' : 'h-full'
      }`}
      style={!isExpanded ? { width: `${pdfSplitPercent}%` } : undefined}
    >
      {/* PDF Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
        {/* Left: Week selector & Slide title */}
        <div className="flex items-center gap-2">
          <select
            value={activePdfWeek}
            onChange={(e) => {
              setActivePdfWeek(e.target.value as WeekId);
              setPdfPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 font-bold text-slate-800 focus:border-blue-600 focus:outline-none shadow-xs"
          >
            <option value="week1">Week 1 Slides (48p)</option>
            <option value="week2">Week 2 Slides (54p)</option>
            <option value="week3">Week 3 Slides (78p)</option>
            <option value="week4">Week 4 Slides (48p)</option>
          </select>
          <span className="hidden sm:inline text-slate-500 font-mono text-[11px]">
            {weekInfo.pdfFileName.slice(0, 20)}...
          </span>
        </div>

        {/* Center: Page Controls */}
        <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
          <button
            onClick={prevPage}
            disabled={pdfPage <= 1}
            className="rounded p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <form onSubmit={handlePageSubmit} className="flex items-center gap-1">
            <span className="text-[11px] text-slate-500 font-mono">Page</span>
            <input
              type="text"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={handlePageSubmit}
              className="w-10 rounded border border-slate-200 bg-slate-50 py-0.5 text-center font-mono text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 font-mono">/ {maxPages}</span>
          </form>

          <button
            onClick={nextPage}
            disabled={pdfPage >= maxPages}
            className="rounded p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 text-slate-600">
          {!isExpanded && (
            <div className="hidden sm:flex items-center gap-1 border-r border-slate-200 pr-1">
              <button
                onClick={() => setPdfSplitPercent(35)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${pdfSplitPercent === 35 ? 'bg-blue-600 text-white' : 'hover:text-slate-900'}`}
                title="35% width"
              >
                35%
              </button>
              <button
                onClick={() => setPdfSplitPercent(45)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${pdfSplitPercent === 45 ? 'bg-blue-600 text-white' : 'hover:text-slate-900'}`}
                title="45% width"
              >
                45%
              </button>
              <button
                onClick={() => setPdfSplitPercent(60)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${pdfSplitPercent === 60 ? 'bg-blue-600 text-white' : 'hover:text-slate-900'}`}
                title="60% width"
              >
                60%
              </button>
            </div>
          )}

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1 hover:text-blue-600 transition-colors"
            title="Open in new browser tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded p-1 hover:text-slate-900 transition-colors"
            title={isExpanded ? 'Restore Split View' : 'Maximize PDF'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setPdfViewerOpen(false)}
            className="rounded p-1 hover:text-rose-600 transition-colors"
            title="Close Split View"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Embedded PDF iframe */}
      <div className="flex-1 w-full h-full bg-slate-100 relative">
        <iframe
          key={`${activePdfWeek}-${pdfPage}`}
          src={pdfUrl}
          className="w-full h-full border-none"
          title={`Lecture Slides for ${weekInfo.title} Page ${pdfPage}`}
          loading="lazy"
        />
      </div>

      {/* Synced Page Indicator Pill */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 border border-slate-300 px-3 py-1 font-mono text-[11px] font-medium text-slate-800 shadow-md backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Synced: Page {pdfPage}</span>
        </span>
      </div>
    </div>
  );
});
