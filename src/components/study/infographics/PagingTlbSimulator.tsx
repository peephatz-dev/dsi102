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
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Memory Management</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Interactive Paging & TLB Address Translation</h4>
          <p className="text-xs text-slate-500">
            Logical Address (p, d) &rarr; [Page Table / TLB] &rarr; (f, d) Physical RAM Address.
          </p>
        </div>

        {/* TLB Scenario Toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setTlbStatus('hit')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              tlbStatus === 'hit' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>TLB Hit (Fast: 120 ns)</span>
          </button>
          <button
            onClick={() => setTlbStatus('miss')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              tlbStatus === 'miss' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>TLB Miss (Slow: 220 ns)</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Diagram */}
      <div className="my-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Step 1: Logical Address */}
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <span className="text-[10px] font-mono text-blue-700 block font-bold">1. CPU LOGICAL ADDRESS</span>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-lg border border-blue-200 bg-blue-50/80 p-2 text-center">
              <span className="text-[10px] text-blue-800 block font-medium">Page # (p)</span>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(Number(e.target.value))}
                className="mt-1 w-full rounded bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 text-center py-1 focus:outline-none shadow-xs"
              >
                <option value={0}>Page 0</option>
                <option value={1}>Page 1</option>
                <option value={2}>Page 2</option>
                <option value={3}>Page 3</option>
              </select>
            </div>
            <div className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-center shadow-xs">
              <span className="text-[10px] text-slate-500 block font-medium">Offset (d)</span>
              <input
                type="number"
                min="0"
                max="4095"
                value={offsetValue}
                onChange={(e) => setOffsetValue(Number(e.target.value))}
                className="mt-1 w-full rounded bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800 text-center py-1 focus:outline-none"
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500 block mt-2">Notice: Offset ({offsetValue}) never changes during translation!</span>
        </div>

        {/* Step 2: Translation Unit (TLB & Page Table) */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span className="text-[10px] font-mono text-slate-700 font-bold">2. MMU HARDWARE TRANSLATION</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              tlbStatus === 'hit' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {tlbStatus === 'hit' ? '⚡ TLB Hit (Bypass RAM read)' : '🐢 TLB Miss (Must read Page Table in RAM)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className={`rounded-lg border p-3 ${
              tlbStatus === 'hit' ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">TLB Cache (Fast)</span>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">20 ns</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                {tlbStatus === 'hit'
                  ? `Found mapping: Page ${selectedPage} → Frame ${frame} immediately in hardware cache!`
                  : `Page ${selectedPage} is NOT in TLB cache.`}
              </p>
            </div>

            <div className={`rounded-lg border p-3 ${
              tlbStatus === 'miss' ? 'border-rose-300 bg-rose-50 text-rose-950' : 'border-slate-200 bg-white opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Page Table (in RAM)</span>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">+100 ns</span>
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
        <div className="lg:col-span-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <span className="text-[10px] font-mono text-emerald-800 block font-bold">3. PHYSICAL RAM ADDRESS</span>
          <div className="mt-3 flex gap-2 font-mono">
            <div className="flex-1 rounded-lg border border-emerald-300 bg-white p-2 text-center shadow-xs">
              <span className="text-[10px] text-emerald-800 block">Frame # (f)</span>
              <span className="text-base font-bold text-slate-900 block mt-0.5">Frame {frame}</span>
            </div>
            <div className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-center shadow-xs">
              <span className="text-[10px] text-slate-500 block">Offset (d)</span>
              <span className="text-base font-bold text-slate-800 block mt-0.5">{offsetValue}</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-600 block mt-2 text-center">
            Total Access Latency: <strong className="text-slate-900">{totalTime} ns</strong>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-950">
        <span className="font-bold text-blue-900">Exam Formula (Effective Memory Access Time - EMAT):</span>
        <div className="mt-1 font-mono text-[11px] text-slate-800">
          EMAT = Hit_Ratio &times; (t_TLB + t_RAM) + (1 - Hit_Ratio) &times; (t_TLB + 2 &times; t_RAM)
        </div>
      </div>
    </div>
  );
});
