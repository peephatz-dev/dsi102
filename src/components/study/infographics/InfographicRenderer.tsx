import React, { Suspense, lazy } from 'react';

// Lazy-load heavy interactive infographics to prevent initial page freeze
const HierarchyFlow = lazy(() => import('./HierarchyFlow').then(m => ({ default: m.HierarchyFlow })));
const BuildingBlocksExplorer = lazy(() => import('./BuildingBlocksExplorer').then(m => ({ default: m.BuildingBlocksExplorer })));
const AnalogDigitalWave = lazy(() => import('./AnalogDigitalWave').then(m => ({ default: m.AnalogDigitalWave })));
const BinaryConverter = lazy(() => import('./BinaryConverter').then(m => ({ default: m.BinaryConverter })));
const PlatformStackVisualizer = lazy(() => import('./PlatformStackVisualizer').then(m => ({ default: m.PlatformStackVisualizer })));
const MemoryHierarchyPyramid = lazy(() => import('./MemoryHierarchyPyramid').then(m => ({ default: m.MemoryHierarchyPyramid })));
const CpuSchedulingSimulator = lazy(() => import('./CpuSchedulingSimulator').then(m => ({ default: m.CpuSchedulingSimulator })));
const PagingTlbSimulator = lazy(() => import('./PagingTlbSimulator').then(m => ({ default: m.PagingTlbSimulator })));
const ServerConsolidationDemo = lazy(() => import('./ServerConsolidationDemo').then(m => ({ default: m.ServerConsolidationDemo })));
const CloudSharedResponsibilityMatrix = lazy(() => import('./CloudSharedResponsibilityMatrix').then(m => ({ default: m.CloudSharedResponsibilityMatrix })));

const InfographicSkeleton: React.FC = () => (
  <div className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 animate-pulse">
    <div className="h-4 w-40 bg-slate-200 rounded mb-3" />
    <div className="h-6 w-72 bg-slate-200 rounded mb-4" />
    <div className="h-48 w-full bg-slate-200/70 rounded-xl" />
  </div>
);

export const InfographicRenderer: React.FC<{ id: string }> = React.memo(({ id }) => {
  return (
    <Suspense fallback={<InfographicSkeleton />}>
      {renderInfographic(id)}
    </Suspense>
  );
});

function renderInfographic(id: string) {
  switch (id) {
    case 'infographic-w1-hierarchy':
      return <HierarchyFlow />;
    case 'infographic-w1-building-blocks':
      return <BuildingBlocksExplorer />;
    case 'infographic-w1-analog-digital':
      return <AnalogDigitalWave />;
    case 'infographic-w1-binary':
      return <BinaryConverter />;
    case 'infographic-w1-cloud-models':
      return <CloudSharedResponsibilityMatrix />;
    case 'infographic-w2-stack':
      return <PlatformStackVisualizer />;
    case 'infographic-w2-memory-pyramid':
      return <MemoryHierarchyPyramid />;
    case 'infographic-w3-scheduling':
      return <CpuSchedulingSimulator />;
    case 'infographic-w3-paging':
      return <PagingTlbSimulator />;
    case 'infographic-w4-server-consolidation':
      return <ServerConsolidationDemo />;
    case 'infographic-w4-shared-responsibility':
      return <CloudSharedResponsibilityMatrix />;
    default:
      return null;
  }
}
