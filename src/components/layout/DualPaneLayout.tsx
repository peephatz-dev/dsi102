import React, { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { PDFViewerPane } from '../pdf/PDFViewerPane';

export const DualPaneLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pdfViewerOpen, pdfSplitPercent } = useApp();

  return (
    <div className="flex flex-1 overflow-hidden relative bg-white pb-14 md:pb-0">
      {/* Left Main Content Pane */}
      <main
        className="flex-1 overflow-y-auto bg-white transition-all duration-200 w-full"
        style={pdfViewerOpen ? { width: undefined } : { width: '100%' }}
      >
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Right Synchronized PDF Viewer Pane (Modal Sheet on mobile, side pane on desktop) */}
      <PDFViewerPane />
    </div>
  );
};
