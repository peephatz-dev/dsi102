import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const CpuSchedulingSimulator: React.FC = React.memo(() => {
  const [activeAlgorithm, setActiveAlgorithm] = useState<'fcfs' | 'rr' | 'priority'>('fcfs');
  const [fcfsScenario, setFcfsScenario] = useState<'convoy' | 'optimal'>('convoy');
  const [timeQuantum, setTimeQuantum] = useState<number>(4);

  const convoyWaitP1 = 0;
  const convoyWaitP2 = 24;
  const convoyWaitP3 = 27;
  const convoyAvgWait = ((convoyWaitP1 + convoyWaitP2 + convoyWaitP3) / 3).toFixed(1); // 17.0 ms

  const optimalWaitP2 = 0;
  const optimalWaitP3 = 3;
  const optimalWaitP1 = 6;
  const optimalAvgWait = ((optimalWaitP2 + optimalWaitP3 + optimalWaitP1) / 3).toFixed(1); // 3.0 ms

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Operating System Scheduling</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">CPU Scheduling Simulator & Convoy Effect Visualizer</h4>
          <p className="text-xs text-slate-500">See how scheduling decisions impact Average Waiting Time and system latency.</p>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setActiveAlgorithm('fcfs')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeAlgorithm === 'fcfs' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FCFS (Convoy Effect)
          </button>
          <button
            onClick={() => setActiveAlgorithm('rr')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeAlgorithm === 'rr' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Round Robin (Time Quantum)
          </button>
          <button
            onClick={() => setActiveAlgorithm('priority')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeAlgorithm === 'priority' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Priority & Aging
          </button>
        </div>
      </div>

      {/* FCFS View */}
      {activeAlgorithm === 'fcfs' && (
        <div className="my-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-700">Compare Execution Sequences in FCFS:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFcfsScenario('convoy')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  fcfsScenario === 'convoy'
                    ? 'bg-rose-50 text-rose-700 border border-rose-300'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                ⚠️ P1 First (Convoy Effect)
              </button>
              <button
                onClick={() => setFcfsScenario('optimal')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  fcfsScenario === 'optimal'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                ✅ Short Jobs First (Optimal)
              </button>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
              <span>Gantt Chart (Timeline ms):</span>
              <span>Total Burst: 30 ms</span>
            </div>

            {fcfsScenario === 'convoy' ? (
              <div>
                <div className="flex h-10 w-full rounded-lg overflow-hidden font-mono text-xs font-bold text-white text-center shadow-xs">
                  <div className="flex items-center justify-center bg-rose-600" style={{ width: '80%' }}>
                    P1 (24 ms)
                  </div>
                  <div className="flex items-center justify-center bg-blue-600 border-l border-white/20" style={{ width: '10%' }}>
                    P2 (3)
                  </div>
                  <div className="flex items-center justify-center bg-emerald-600 border-l border-white/20" style={{ width: '10%' }}>
                    P3 (3)
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>0</span>
                  <span className="ml-[78%]">24</span>
                  <span className="ml-[8%]">27</span>
                  <span>30 ms</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex h-10 w-full rounded-lg overflow-hidden font-mono text-xs font-bold text-white text-center shadow-xs">
                  <div className="flex items-center justify-center bg-blue-600" style={{ width: '10%' }}>
                    P2 (3)
                  </div>
                  <div className="flex items-center justify-center bg-emerald-600 border-l border-white/20" style={{ width: '10%' }}>
                    P3 (3)
                  </div>
                  <div className="flex items-center justify-center bg-rose-600 border-l border-white/20" style={{ width: '80%' }}>
                    P1 (24 ms)
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>0</span>
                  <span className="ml-[8%]">3</span>
                  <span className="ml-[8%]">6</span>
                  <span>30 ms</span>
                </div>
              </div>
            )}
          </div>

          {/* Mathematical Results Comparison */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-mono text-xs">
              <span className="text-slate-500 block font-sans font-bold">Individual Waiting Times:</span>
              {fcfsScenario === 'convoy' ? (
                <div className="mt-2 space-y-1">
                  <p className="text-slate-800">P1 Waiting: <span className="text-emerald-600 font-bold">0 ms</span></p>
                  <p className="text-slate-800">P2 Waiting: <span className="text-rose-600 font-bold">24 ms</span> (stuck behind P1)</p>
                  <p className="text-slate-800">P3 Waiting: <span className="text-rose-600 font-bold">27 ms</span> (stuck behind P1 & P2)</p>
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  <p className="text-slate-800">P2 Waiting: <span className="text-emerald-600 font-bold">0 ms</span></p>
                  <p className="text-slate-800">P3 Waiting: <span className="text-emerald-600 font-bold">3 ms</span></p>
                  <p className="text-slate-800">P1 Waiting: <span className="text-blue-600 font-bold">6 ms</span></p>
                </div>
              )}
            </div>

            <div className={`rounded-xl border p-4 flex flex-col justify-between ${
              fcfsScenario === 'convoy' ? 'border-rose-200 bg-rose-50/70' : 'border-emerald-200 bg-emerald-50/70'
            }`}>
              <div>
                <span className="text-xs font-semibold text-slate-600 uppercase">AVERAGE WAITING TIME (AWT):</span>
                <p className={`text-2xl font-mono font-black mt-1 ${fcfsScenario === 'convoy' ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {fcfsScenario === 'convoy' ? `${convoyAvgWait} ms` : `${optimalAvgWait} ms`}
                </p>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                {fcfsScenario === 'convoy'
                  ? 'Severe Convoy Effect! Running the 24ms job first makes the average wait time 5.6x longer than necessary.'
                  : 'Shorter jobs run first, shrinking average waiting time down from 17 ms to just 3 ms!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Round Robin View */}
      {activeAlgorithm === 'rr' && (
        <div className="my-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between text-xs text-slate-800">
              <span className="font-semibold">Adjust Time Quantum ($q$):</span>
              <span className="font-mono font-bold text-blue-700">{timeQuantum} ms per slice</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 ms (Context Switch Thrashing)</span>
              <span>4-8 ms (Sweet Spot)</span>
              <span>20 ms (Degrades to FCFS)</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-purple-200 bg-purple-50/70 p-3.5">
              <p className="font-bold text-purple-900">What If Quantum Is Too Small (q = 1 ms)?</p>
              <p className="mt-1 text-slate-700 leading-relaxed">
                Frequent preemption forces the CPU to constantly switch contexts (saving PCB, loading next PCB). Over 25-40% of total compute time is wasted on pure administrative overhead.
              </p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3.5">
              <p className="font-bold text-blue-900">What If Quantum Is Too Large (q &gt; 25 ms)?</p>
              <p className="mt-1 text-slate-700 leading-relaxed">
                Processes finish their full bursts before their quantum expires. The algorithm degrades into non-preemptive First-Come, First-Served (FCFS), re-introducing the Convoy Effect!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Priority & Aging View */}
      {activeAlgorithm === 'priority' && (
        <div className="my-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>Starvation & The Aging Solution</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-700">
            In standard Priority Scheduling, low-priority background processes may experience <strong>Starvation (Indefinite Blocking)</strong> if higher-priority processes keep arriving in the Ready Queue.
          </p>
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3.5 text-xs">
            <span className="font-bold text-amber-900">The Aging Mechanism:</span>
            <p className="mt-1 text-slate-800 leading-relaxed">
              Gradually increase the priority of processes that wait in the Ready Queue over time (e.g. increase priority by 1 every 15 minutes). Eventually, any starved job ascends to top priority and executes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
