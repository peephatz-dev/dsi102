import { Button } from '../../arc/button/button';
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
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Operating System Scheduling</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">CPU Scheduling Simulator & Convoy Effect Visualizer</h4>
          <p className="text-xs text-[var(--text-secondary)]">See how scheduling decisions impact Average Waiting Time and system latency.</p>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] text-xs">
          <Button variant="ghost"
            onClick={() => setActiveAlgorithm('fcfs')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeAlgorithm === 'fcfs' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            FCFS (Convoy Effect)
          </Button>
          <Button variant="ghost"
            onClick={() => setActiveAlgorithm('rr')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeAlgorithm === 'rr' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Round Robin (Time Quantum)
          </Button>
          <Button variant="ghost"
            onClick={() => setActiveAlgorithm('priority')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeAlgorithm === 'priority' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Priority & Aging
          </Button>
        </div>
      </div>

      {/* FCFS View */}
      {activeAlgorithm === 'fcfs' && (
        <div className="my-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[var(--foreground)]">Compare Execution Sequences in FCFS:</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost"
                onClick={() => setFcfsScenario('convoy')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  fcfsScenario === 'convoy'
                    ? 'bg-[var(--surface-muted)] text-[var(--danger)] border border-[var(--border-strong)]'
                    : 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'
                }`}
              >
                ⚠️ P1 First (Convoy Effect)
              </Button>
              <Button variant="ghost"
                onClick={() => setFcfsScenario('optimal')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  fcfsScenario === 'optimal'
                    ? 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border-strong)]'
                    : 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'
                }`}
              >
                ✅ Short Jobs First (Optimal)
              </Button>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-2 font-mono">
              <span>Gantt Chart (Timeline ms):</span>
              <span>Total Burst: 30 ms</span>
            </div>

            {fcfsScenario === 'convoy' ? (
              <div>
                <div className="flex h-10 w-full rounded-lg overflow-hidden font-mono text-xs font-medium text-[var(--accent-foreground)] text-center shadow-none">
                  <div className="flex items-center justify-center bg-[var(--accent)]" style={{ width: '80%' }}>
                    P1 (24 ms)
                  </div>
                  <div className="flex items-center justify-center bg-[var(--accent)] border-l border-white/20" style={{ width: '10%' }}>
                    P2 (3)
                  </div>
                  <div className="flex items-center justify-center bg-[var(--accent)] border-l border-white/20" style={{ width: '10%' }}>
                    P3 (3)
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)] mt-1">
                  <span>0</span>
                  <span className="ml-[78%]">24</span>
                  <span className="ml-[8%]">27</span>
                  <span>30 ms</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex h-10 w-full rounded-lg overflow-hidden font-mono text-xs font-medium text-[var(--accent-foreground)] text-center shadow-none">
                  <div className="flex items-center justify-center bg-[var(--accent)]" style={{ width: '10%' }}>
                    P2 (3)
                  </div>
                  <div className="flex items-center justify-center bg-[var(--accent)] border-l border-white/20" style={{ width: '10%' }}>
                    P3 (3)
                  </div>
                  <div className="flex items-center justify-center bg-[var(--accent)] border-l border-white/20" style={{ width: '80%' }}>
                    P1 (24 ms)
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)] mt-1">
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
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 font-mono text-xs">
              <span className="text-[var(--text-secondary)] block font-sans font-medium">Individual Waiting Times:</span>
              {fcfsScenario === 'convoy' ? (
                <div className="mt-2 space-y-1">
                  <p className="text-[var(--foreground)]">P1 Waiting: <span className="text-[var(--success)] font-medium">0 ms</span></p>
                  <p className="text-[var(--foreground)]">P2 Waiting: <span className="text-[var(--danger)] font-medium">24 ms</span> (stuck behind P1)</p>
                  <p className="text-[var(--foreground)]">P3 Waiting: <span className="text-[var(--danger)] font-medium">27 ms</span> (stuck behind P1 & P2)</p>
                </div>
              ) : (
                <div className="mt-2 space-y-1">
                  <p className="text-[var(--foreground)]">P2 Waiting: <span className="text-[var(--success)] font-medium">0 ms</span></p>
                  <p className="text-[var(--foreground)]">P3 Waiting: <span className="text-[var(--success)] font-medium">3 ms</span></p>
                  <p className="text-[var(--foreground)]">P1 Waiting: <span className="text-[var(--accent)] font-medium">6 ms</span></p>
                </div>
              )}
            </div>

            <div className={`rounded-xl border p-4 flex flex-col justify-between ${
              fcfsScenario === 'convoy' ? 'border-[var(--border-strong)] bg-[var(--surface-muted)]' : 'border-[var(--border-strong)] bg-[var(--surface-muted)]'
            }`}>
              <div>
                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase">AVERAGE WAITING TIME (AWT):</span>
                <p className={`text-2xl font-mono font-black mt-1 ${fcfsScenario === 'convoy' ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                  {fcfsScenario === 'convoy' ? `${convoyAvgWait} ms` : `${optimalAvgWait} ms`}
                </p>
              </div>
              <p className="text-xs text-[var(--foreground)] mt-2 leading-relaxed">
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
          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
            <div className="flex items-center justify-between text-xs text-[var(--foreground)]">
              <span className="font-medium">Adjust Time Quantum ($q$):</span>
              <span className="font-mono font-medium text-[var(--accent)]">{timeQuantum} ms per slice</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--text-secondary)] font-mono">
              <span>1 ms (Context Switch Thrashing)</span>
              <span>4-8 ms (Sweet Spot)</span>
              <span>20 ms (Degrades to FCFS)</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3.5">
              <p className="font-medium text-[var(--accent)]">What If Quantum Is Too Small (q = 1 ms)?</p>
              <p className="mt-1 text-[var(--foreground)] leading-relaxed">
                Frequent preemption forces the CPU to constantly switch contexts (saving PCB, loading next PCB). Over 25-40% of total compute time is wasted on pure administrative overhead.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3.5">
              <p className="font-medium text-[var(--accent)]">What If Quantum Is Too Large (q &gt; 25 ms)?</p>
              <p className="mt-1 text-[var(--foreground)] leading-relaxed">
                Processes finish their full bursts before their quantum expires. The algorithm degrades into non-preemptive First-Come, First-Served (FCFS), re-introducing the Convoy Effect!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Priority & Aging View */}
      {activeAlgorithm === 'priority' && (
        <div className="my-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--warning)]">
            <Sparkles className="h-4 w-4 text-[var(--warning)]" />
            <span>Starvation & The Aging Solution</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--foreground)]">
            In standard Priority Scheduling, low-priority background processes may experience <strong>Starvation (Indefinite Blocking)</strong> if higher-priority processes keep arriving in the Ready Queue.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3.5 text-xs">
            <span className="font-medium text-[var(--warning)]">The Aging Mechanism:</span>
            <p className="mt-1 text-[var(--foreground)] leading-relaxed">
              Gradually increase the priority of processes that wait in the Ready Queue over time (e.g. increase priority by 1 every 15 minutes). Eventually, any starved job ascends to top priority and executes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
