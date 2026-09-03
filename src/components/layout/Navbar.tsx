import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  FileText,
  Search,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = React.memo(() => {
  const {
    theme,
    toggleTheme,
    pdfViewerOpen,
    setPdfViewerOpen,
    pdfPage,
    searchQuery,
    setSearchQuery,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useApp();

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 sm:px-4 backdrop-blur-md shadow-xs">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Hamburger button visible only on mobile (<md) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
          <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-sm font-black tracking-tight text-slate-900">DSI102</span>
            <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-blue-700 border border-blue-200/60">
              Exam Prep
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-slate-500">Introduction to Digital Technology</p>
        </div>
      </div>

      {/* Center Search Input (Desktop) */}
      <div className="hidden md:flex items-center w-72 lg:w-80">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, definitions, slides..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/90 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* PDF Viewer Toggle Button */}
        <button
          onClick={() => setPdfViewerOpen(!pdfViewerOpen)}
          className={`flex items-center gap-1 sm:gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all border ${
            pdfViewerOpen
              ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
          }`}
          title="Toggle PDF Viewer"
        >
          <FileText className="h-3.5 w-3.5 text-blue-600" />
          <span className="hidden sm:inline">
            {pdfViewerOpen ? `PDF Open (P.${pdfPage})` : 'Open Slide PDF'}
          </span>
          <span className="sm:hidden font-mono text-[10px]">
            {pdfViewerOpen ? `P.${pdfPage}` : 'PDF'}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 bg-white p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
});
