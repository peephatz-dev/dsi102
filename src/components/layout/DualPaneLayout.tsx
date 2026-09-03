import React, { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { PDFViewerPane } from '../pdf/PDFViewerPane';

export const DualPaneLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pdfViewerOpen, pdfSplitPercent } = useApp();

  return (
    <div className="flex flex-1 overflow-hidden relative bg-white">
      {/* Left Main Content Pane */}
      <main
        className="flex-1 overflow-y-auto bg-white transition-all duration-200"
        style={pdfViewerOpen ? { width: `${100 - pdfSplitPercent}%` } : { width: '100%' }}
      >
        {children}
      </main>

      {/* Right Synchronized PDF Viewer Pane */}
      <PDFViewerPane />
    </div>
  );
};
