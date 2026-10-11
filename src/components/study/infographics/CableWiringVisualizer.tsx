import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Cable, ArrowLeftRight, CheckCircle2, Shuffle, Info, Laptop, Server, Router } from 'lucide-react';

interface WirePin {
  pin: number;
  colorName: string;
  hexColor: string;
  stripeHex?: string;
  pair: string;
}

export const CableWiringVisualizer: React.FC = React.memo(() => {
  const [selectedStandard, setSelectedStandard] = useState<'T568A' | 'T568B'>('T568B');
  const [cableType, setCableType] = useState<'straight' | 'crossover'>('straight');
  const [highlightPairs, setHighlightPairs] = useState<boolean>(true);

  // Wire pins configuration
  const t568aWires: WirePin[] = [
    { pin: 1, colorName: 'White / Green', hexColor: '#22c55e', stripeHex: '#ffffff', pair: 'Green Pair (Pins 1-2)' },
    { pin: 2, colorName: 'Green', hexColor: '#16a34a', pair: 'Green Pair (Pins 1-2)' },
    { pin: 3, colorName: 'White / Orange', hexColor: '#f97316', stripeHex: '#ffffff', pair: 'Orange Pair (Pins 3 & 6)' },
    { pin: 4, colorName: 'Blue', hexColor: '#2563eb', pair: 'Blue Pair (Pins 4-5)' },
    { pin: 5, colorName: 'White / Blue', hexColor: '#3b82f6', stripeHex: '#ffffff', pair: 'Blue Pair (Pins 4-5)' },
    { pin: 6, colorName: 'Orange', hexColor: '#ea580c', pair: 'Orange Pair (Pins 3 & 6)' },
    { pin: 7, colorName: 'White / Brown', hexColor: '#92400e', stripeHex: '#ffffff', pair: 'Brown Pair (Pins 7-8)' },
    { pin: 8, colorName: 'Brown', hexColor: '#78350f', pair: 'Brown Pair (Pins 7-8)' },
  ];

  const t568bWires: WirePin[] = [
    { pin: 1, colorName: 'White / Orange', hexColor: '#f97316', stripeHex: '#ffffff', pair: 'Orange Pair (Pins 1-2)' },
    { pin: 2, colorName: 'Orange', hexColor: '#ea580c', pair: 'Orange Pair (Pins 1-2)' },
    { pin: 3, colorName: 'White / Green', hexColor: '#22c55e', stripeHex: '#ffffff', pair: 'Green Pair (Pins 3 & 6)' },
    { pin: 4, colorName: 'Blue', hexColor: '#2563eb', pair: 'Blue Pair (Pins 4-5)' },
    { pin: 5, colorName: 'White / Blue', hexColor: '#3b82f6', stripeHex: '#ffffff', pair: 'Blue Pair (Pins 4-5)' },
    { pin: 6, colorName: 'Green', hexColor: '#16a34a', pair: 'Green Pair (Pins 3 & 6)' },
    { pin: 7, colorName: 'White / Brown', hexColor: '#92400e', stripeHex: '#ffffff', pair: 'Brown Pair (Pins 7-8)' },
    { pin: 8, colorName: 'Brown', hexColor: '#78350f', pair: 'Brown Pair (Pins 7-8)' },
  ];

  const currentWires = selectedStandard === 'T568A' ? t568aWires : t568bWires;

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--warning)] uppercase">Interactive Cabling Standard</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">
            RJ45 (8P8C) T568A vs T568B Wiring & Cable Types
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Learn the exact 8-pin color pinouts, pair swaps, and when to choose Straight-through vs Crossover cables.
          </p>
        </div>

        {/* T568A vs T568B Selector */}
        <div className="flex gap-1.5 bg-[var(--surface-muted)] p-1 rounded-xl border border-[var(--border-strong)]">
          <Button variant="ghost"
            onClick={() => setSelectedStandard('T568A')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedStandard === 'T568A' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            T568A Standard
          </Button>
          <Button variant="ghost"
            onClick={() => setSelectedStandard('T568B')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedStandard === 'T568B' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            T568B Standard (Common)
          </Button>
        </div>
      </div>

      {/* 8-Pin Visual Connector */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 sm:p-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-strong)] text-xs font-mono text-[var(--foreground)] shadow-none">
          <span>Standard: <strong className={selectedStandard === 'T568A' ? 'text-[var(--success)]' : 'text-[var(--warning)]'}>{selectedStandard}</strong></span>
          <span>•</span>
          <span>Pins 1-2 & 3-6: {selectedStandard === 'T568A' ? 'Green & Orange swapped' : 'Orange & Green swapped'}</span>
        </div>

        {/* RJ45 Connector Body Representation */}
        <div className="mx-auto max-w-full overflow-x-auto rounded-3xl border-4 border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-inner relative sm:max-w-xl sm:p-6">
          <span className="text-[11px] font-mono text-[var(--text-secondary)] block mb-3 font-medium uppercase tracking-wider">
            RJ45 Connector (Clip facing down / Pins 1 to 8 Left to Right)
          </span>

          <div className="grid min-w-[520px] grid-cols-8 gap-1.5 justify-items-center sm:min-w-0 sm:gap-2">
            {currentWires.map(wire => {
              const isSwappedPair = wire.pin === 1 || wire.pin === 2 || wire.pin === 3 || wire.pin === 6;
              return (
                <div key={wire.pin} className="flex flex-col items-center gap-1.5 w-full">
                  <span className="font-mono text-xs font-black text-[var(--foreground)]">{wire.pin}</span>

                  {/* Wire Pin Strip */}
                  <div
                    className={`w-full h-24 sm:h-28 rounded-lg border-2 shadow-none relative overflow-hidden transition-all ${
                      highlightPairs && isSwappedPair ? 'border-[var(--border-strong)] ring-2 ring-[var(--border-strong)] scale-105' : 'border-[var(--border-strong)]'
                    }`}
                    style={{
                      background: wire.stripeHex
                        ? `repeating-linear-gradient(45deg, ${wire.hexColor}, ${wire.hexColor} 8px, ${wire.stripeHex} 8px, ${wire.stripeHex} 16px)`
                        : wire.hexColor
                    }}
                    title={`Pin ${wire.pin}: ${wire.colorName}`}
                  />

                  <span className="text-[10px] font-mono text-[var(--text-secondary)] font-medium leading-tight text-center h-8 flex items-center">
                    {wire.colorName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Pair Swap Insight Banner */}
        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs text-[var(--warning)] flex items-start gap-2.5 text-left max-w-xl mx-auto">
          <Info className="h-4 w-4 text-[var(--warning)] shrink-0 mt-0.5" />
          <div>
            <strong className="font-medium">The Core Difference: </strong>
            In T568A, Pins 1–2 use the <strong>Green pair</strong> and Pins 3 & 6 use the <strong>Orange pair</strong>.
            In T568B, Pins 1–2 use the <strong>Orange pair</strong> and Pins 3 & 6 use the <strong>Green pair</strong>.
            (The Blue pair on 4–5 and Brown pair on 7–8 remain unchanged in both!).
          </div>
        </div>
      </div>

      {/* Straight-Through vs Crossover Cable Comparison */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-sm text-[var(--foreground)] flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-[var(--accent)]" />
            <span>Cable Construction Types: Straight-Through vs Crossover</span>
          </h5>
          <div className="flex gap-1.5">
            <Button variant="ghost"
              onClick={() => setCableType('straight')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                cableType === 'straight' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'bg-[var(--surface-muted)] text-[var(--foreground)]'
              }`}
            >
              Straight-Through
            </Button>
            <Button variant="ghost"
              onClick={() => setCableType('crossover')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                cableType === 'crossover' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'bg-[var(--surface-muted)] text-[var(--foreground)]'
              }`}
            >
              Crossover Cable
            </Button>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-3 ${
          cableType === 'straight' ? 'bg-[var(--surface-muted)] border-[var(--border-strong)]' : 'bg-[var(--surface-muted)] border-[var(--border-strong)]'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono font-medium">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[var(--surface)] rounded-lg border border-[var(--border-strong)]">
                End A: {cableType === 'straight' ? 'T568B' : 'T568A'}
              </span>
              <span className="text-[var(--text-secondary)]">——————————————</span>
              <span className="px-2.5 py-1 bg-[var(--surface)] rounded-lg border border-[var(--border-strong)]">
                End B: T568B
              </span>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${
              cableType === 'straight' ? 'bg-[var(--surface-muted)] text-[var(--accent)]' : 'bg-[var(--surface-muted)] text-[var(--accent)]'
            }`}>
              {cableType === 'straight' ? 'Connects UNLIKE Devices' : 'Connects LIKE Devices'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border-strong)] space-y-1">
              <span className="font-medium text-[var(--foreground)] block">Typical Use Cases:</span>
              <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-0.5">
                {cableType === 'straight' ? (
                  <>
                    <li>Computer to Switch / Hub</li>
                    <li>Switch to Router</li>
                    <li>Server to Patch Panel</li>
                  </>
                ) : (
                  <>
                    <li>Computer directly to Computer (PC–PC)</li>
                    <li>Switch to Switch</li>
                    <li>Router to Router</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border-strong)] space-y-1">
              <span className="font-medium text-[var(--foreground)] block">Modern Hardware Note:</span>
              <p className="text-[var(--text-secondary)] text-[11px]">
                Most modern network interface cards and gigabit switches support <strong>Auto-MDI/MDI-X</strong>, automatically detecting pin connections so a straight-through cable often works even between like devices!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
