import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export const PagingTlbSimulator: React.FC = React.memo(() => {
  const [selectedPage, setSelectedPage] = useState<number>(2);
  const [tlbStatus, setTlbStatus] = useState<'hit' | 'miss'>('hit');
  const [offsetValue, setOffsetValue] = useState<number>(140);

  const pageToFrame: Record<number, number> = {
    0: 5,
    1: 9,
    2: 3,
    3: 7
  };

  const frame = pageToFrame[selectedPage] ?? 3;
  const tlbAccessTime = 20; // ns
  const ramAccessTime = 100; // ns

  const totalTime = tlbStatus === 'hit'
    ? tlbAccessTime + ramAccessTime // 120 ns
    : tlbAccessTime + ramAccessTime + ramAccessTime; // 220 ns

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Memory Management</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">Interactive Paging & TLB Address Translation</h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Logical Address (p, d) &rarr; [Page Table / TLB] &rarr; (f, d) Physical RAM Address.
          </p>
        </div>

        {/* TLB Scenario Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] text-xs">
          <Button variant="ghost"
            onClick={() => setTlbStatus('hit')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-all ${
              tlbStatus === 'hit' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>TLB Hit (Fast: 120 ns)</span>
          </Button>
          <Button variant="ghost"
            onClick={() => setTlbStatus('miss')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-all ${
              tlbStatus === 'miss' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>TLB Miss (Slow: 220 ns)</span>
          </Button>
        </div>
      </div>

      {/* Interactive Controls & Diagram */}
      <div className="my-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Step 1: Logical Address */}
        <div className="lg:col-span-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
          <span className="text-[10px] font-mono text-[var(--accent)] block font-medium">1. CPU LOGICAL ADDRESS</span>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-2 text-center">
              <span className="text-[10px] text-[var(--accent)] block font-medium">Page # (p)</span>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(Number(e.target.value))}
                className="mt-1 w-full rounded bg-[var(--surface)] border border-[var(--border-strong)] text-xs font-mono font-medium text-[var(--foreground)] text-center py-1 focus:outline-none shadow-none"
              >
                <option value={0}>Page 0</option>
                <option value={1}>Page 1</option>
                <option value={2}>Page 2</option>
                <option value={3}>Page 3</option>
              </select>
            </div>
            <div className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-2 text-center shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block font-medium">Offset (d)</span>
              <input
                type="number"
                min="0"
                max="4095"
                value={offsetValue}
                onChange={(e) => setOffsetValue(Number(e.target.value))}
                className="mt-1 w-full rounded bg-[var(--surface-muted)] border border-[var(--border-strong)] text-xs font-mono font-medium text-[var(--foreground)] text-center py-1 focus:outline-none"
              />
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] block mt-2">Notice: Offset ({offsetValue}) never changes during translation!</span>
        </div>

        {/* Step 2: Translation Unit (TLB & Page Table) */}
        <div className="lg:col-span-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 shadow-none">
          <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-2 mb-3">
            <span className="text-[10px] font-mono text-[var(--foreground)] font-medium">2. MMU HARDWARE TRANSLATION</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              tlbStatus === 'hit' ? 'bg-[var(--surface-muted)] text-[var(--success)]' : 'bg-[var(--surface-muted)] text-[var(--danger)]'
            }`}>
              {tlbStatus === 'hit' ? '⚡ TLB Hit (Bypass RAM read)' : '🐢 TLB Miss (Must read Page Table in RAM)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className={`rounded-lg border p-3 ${
              tlbStatus === 'hit' ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--success)]' : 'border-[var(--border-strong)] bg-[var(--surface)] opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--foreground)]">TLB Cache (Fast)</span>
                <span className="text-[10px] font-mono text-[var(--text-secondary)] font-medium">20 ns</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                {tlbStatus === 'hit'
                  ? `Found mapping: Page ${selectedPage} → Frame ${frame} immediately in hardware cache!`
                  : `Page ${selectedPage} is NOT in TLB cache.`}
              </p>
            </div>

            <div className={`rounded-lg border p-3 ${
              tlbStatus === 'miss' ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--danger)]' : 'border-[var(--border-strong)] bg-[var(--surface)] opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--foreground)]">Page Table (in RAM)</span>
                <span className="text-[10px] font-mono text-[var(--text-secondary)] font-medium">+100 ns</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                {tlbStatus === 'miss'
                  ? `Extra DRAM read required: Page ${selectedPage} → Frame ${frame}.`
                  : `Skipped! No need to access Page Table in main memory.`}
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Physical Address */}
        <div className="lg:col-span-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
          <span className="text-[10px] font-mono text-[var(--success)] block font-medium">3. PHYSICAL RAM ADDRESS</span>
          <div className="mt-3 flex gap-2 font-mono">
            <div className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-2 text-center shadow-none">
              <span className="text-[10px] text-[var(--success)] block">Frame # (f)</span>
              <span className="text-base font-medium text-[var(--foreground)] block mt-0.5">Frame {frame}</span>
            </div>
            <div className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-2 text-center shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block">Offset (d)</span>
              <span className="text-base font-medium text-[var(--foreground)] block mt-0.5">{offsetValue}</span>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] block mt-2 text-center">
            Total Access Latency: <strong className="text-[var(--foreground)]">{totalTime} ns</strong>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3.5 text-xs text-[var(--accent)]">
        <span className="font-medium text-[var(--accent)]">Exam Formula (Effective Memory Access Time - EMAT):</span>
        <div className="mt-1 font-mono text-[11px] text-[var(--foreground)]">
          EMAT = Hit_Ratio &times; (t_TLB + t_RAM) + (1 - Hit_Ratio) &times; (t_TLB + 2 &times; t_RAM)
        </div>
      </div>
    </div>
  );
});
