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
const NetworkTopologySimulator = lazy(() => import('./NetworkTopologySimulator').then(m => ({ default: m.NetworkTopologySimulator })));
const HubSwitchRouterSimulator = lazy(() => import('./HubSwitchRouterSimulator').then(m => ({ default: m.HubSwitchRouterSimulator })));
const CableWiringVisualizer = lazy(() => import('./CableWiringVisualizer').then(m => ({ default: m.CableWiringVisualizer })));
const PacketEncapsulationFlow = lazy(() => import('./PacketEncapsulationFlow').then(m => ({ default: m.PacketEncapsulationFlow })));
const TcpHandshakeSimulator = lazy(() => import('./TcpHandshakeSimulator').then(m => ({ default: m.TcpHandshakeSimulator })));
const SubnetCidrCalculator = lazy(() => import('./SubnetCidrCalculator').then(m => ({ default: m.SubnetCidrCalculator })));

const InfographicSkeleton: React.FC = () => (
  <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-6 animate-pulse">
    <div className="h-4 w-40 bg-[var(--surface-muted)] rounded mb-3" />
    <div className="h-6 w-72 bg-[var(--surface-muted)] rounded mb-4" />
    <div className="h-48 w-full bg-[var(--surface-muted)] rounded-xl" />
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
    case 'infographic-w5-topology':
      return <NetworkTopologySimulator />;
    case 'infographic-w5-devices':
      return <HubSwitchRouterSimulator />;
    case 'infographic-w5-cabling':
      return <CableWiringVisualizer />;
    case 'infographic-w6-encapsulation':
      return <PacketEncapsulationFlow />;
    case 'infographic-w6-tcp-udp':
      return <TcpHandshakeSimulator />;
    case 'infographic-w6-subnetting':
      return <SubnetCidrCalculator />;
    default:
      return null;
  }
}
