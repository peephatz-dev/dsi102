import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface LayerItem {
  id: string;
  name: string;
  thaiName: string;
  subtitle: string;
  color: string;
  textColor: string;
  borderColor: string;
  example: string;
  detail: string;
  requestRole: string;
  resultRole: string;
}

const stackLayers: LayerItem[] = [
  {
    id: 'user',
    name: '1. User',
    thaiName: 'ผู้ใช้งาน',
    subtitle: 'Human Intent & Action',
    color: 'bg-[var(--surface-muted)] hover:bg-[var(--surface-muted)]',
    textColor: 'text-[var(--danger)]',
    borderColor: 'border-[var(--border-strong)]',
    example: 'Clicks mouse, taps touch screen, speaks voice command.',
    detail: 'The human actor who initiates an intent to achieve a goal.',
    requestRole: 'Initiates request (e.g. click "Search flight tickets")',
    resultRole: 'Views rendered graphical flight prices on screen'
  },
  {
    id: 'apps',
    name: '2. Applications',
    thaiName: 'แอปพลิเคชัน',
    subtitle: 'User Software & Interface',
    color: 'bg-[var(--surface-muted)] hover:bg-[var(--surface-muted)]',
    textColor: 'text-[var(--accent)]',
    borderColor: 'border-[var(--border-strong)]',
    example: 'Google Chrome, Microsoft Word, Spotify, VS Code.',
    detail: 'Translates human actions into programmatic domain requests and System Calls.',
    requestRole: 'Formats HTTP request, asks OS for network socket and memory buffer',
    resultRole: 'Parses JSON payload, layouts CSS DOM, and draws UI'
  },
  {
    id: 'os',
    name: '3. Operating System (OS)',
    thaiName: 'ระบบปฏิบัติการ',
    subtitle: 'Resource Manager & Arbiter',
    color: 'bg-[var(--surface-muted)] hover:bg-[var(--surface-muted)]',
    textColor: 'text-[var(--accent)]',
    borderColor: 'border-[var(--border-strong)]',
    example: 'Windows 11, macOS Sequoia, Ubuntu Linux, Android 15.',
    detail: 'Coordinates hardware access, schedules CPU time, manages RAM allocations, and enforces security boundaries.',
    requestRole: 'Validates process permissions, allocates kernel buffers, calls NIC driver',
    resultRole: 'Receives hardware interrupt from NIC, wakes up application thread'
  },
  {
    id: 'drivers',
    name: '4. Device Drivers / System Software',
    thaiName: 'ไดรเวอร์และซอฟต์แวร์ระบบ',
    subtitle: 'Hardware Translation Bridge',
    color: 'bg-[var(--surface-muted)] hover:bg-[var(--surface-muted)]',
    textColor: 'text-[var(--accent)]',
    borderColor: 'border-[var(--border-strong)]',
    example: 'NVIDIA GPU driver, Realtek Wi-Fi firmware, NVMe host controller.',
    detail: 'Bridges generic OS kernel commands to vendor-specific physical register commands.',
    requestRole: 'Translates OS packet buffer into electrical transmission register writes',
    resultRole: 'Packages incoming wire bytes into OS-compliant network frames'
  },
  {
    id: 'hardware',
    name: '5. Physical Hardware',
    thaiName: 'ฮาร์ดแวร์กายภาพ',
    subtitle: 'Silicon, Buses & Peripherals',
    color: 'bg-[var(--surface-muted)] hover:bg-[var(--surface-muted)]',
    textColor: 'text-[var(--success)]',
    borderColor: 'border-[var(--border-strong)]',
    example: 'x86-64 / ARM CPU, DDR5 RAM, PCIe Gen 5 Bus, NVMe SSD, Display.',
    detail: 'Physical transistors executing electrical pulses, ALU logic, and bus communications.',
    requestRole: 'Sends modulated radio waves over 5G antenna or pulses light in fiber optic',
    resultRole: 'Captures incoming electrical voltage, decodes bits, signals CPU interrupt'
  }
];

export const PlatformStackVisualizer: React.FC = React.memo(() => {
  const [activeLayer, setActiveLayer] = useState<string>('os');
  const [animatingDirection, setAnimatingDirection] = useState<'down' | 'up' | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number>(-1);

  const triggerAnimation = (direction: 'down' | 'up') => {
    setAnimatingDirection(direction);
    const sequence = direction === 'down' ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0];

    sequence.forEach((layerIdx, step) => {
      setTimeout(() => {
        setAnimatingIndex(layerIdx);
        setActiveLayer(stackLayers[layerIdx].id);
        if (step === sequence.length - 1) {
          setTimeout(() => {
            setAnimatingDirection(null);
            setAnimatingIndex(-1);
          }, 600);
        }
      }, step * 400);
    });
  };

  const current = stackLayers.find(l => l.id === activeLayer) || stackLayers[2];

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Hierarchical Abstraction</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">The 5-Layer Platform Stack</h4>
          <p className="text-xs text-[var(--text-secondary)]">Requests propagate DOWNWARD; Execution results return UPWARD.</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost"
            onClick={() => triggerAnimation('down')}
            disabled={animatingDirection !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] transition-all disabled:opacity-50 shadow-none"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span>Simulate Request (↓ Down)</span>
          </Button>
          <Button variant="ghost"
            onClick={() => triggerAnimation('up')}
            disabled={animatingDirection !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] transition-all disabled:opacity-50 shadow-none"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Simulate Result (↑ Up)</span>
          </Button>
        </div>
      </div>

      <div className="my-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* The Stack Column */}
        <div className="lg:col-span-6 space-y-2">
          {stackLayers.map((layer, idx) => {
            const isSelected = activeLayer === layer.id;
            const isCurrentInAnimation = animatingIndex === idx;

            return (
              <div
                key={layer.id}
                onClick={() => {
                  if (!animatingDirection) setActiveLayer(layer.id);
                }}
                className={`relative flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                  isCurrentInAnimation
                    ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] shadow-none ring-2 ring-[var(--border-strong)]'
                    : isSelected
                    ? `${layer.borderColor} ${layer.color} shadow-none ring-1 ring-[var(--border-strong)]`
                    : 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${layer.textColor}`}>{layer.name}</span>
                    <span className="text-[11px] text-[var(--text-secondary)] font-medium">({layer.thaiName})</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{layer.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-secondary)]">
                  {idx === 0 && <span className="rounded bg-[var(--surface)] border border-[var(--border-strong)] px-1.5 py-0.5 font-medium text-[var(--text-secondary)]">Top</span>}
                  {idx === 4 && <span className="rounded bg-[var(--surface)] border border-[var(--border-strong)] px-1.5 py-0.5 font-medium text-[var(--text-secondary)]">Bottom</span>}
                  {isSelected && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-5 flex flex-col justify-between shadow-none">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-3">
              <div>
                <span className={`text-xs font-mono font-medium ${current.textColor}`}>LAYER DETAILS</span>
                <h5 className="text-base font-medium text-[var(--foreground)]">{current.name} — {current.thaiName}</h5>
              </div>
              <span className="rounded-md bg-[var(--surface)] border border-[var(--border-strong)] px-2 py-0.5 text-[11px] font-medium text-[var(--foreground)] shadow-none">
                {current.subtitle}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[var(--foreground)]">{current.detail}</p>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
                  <ArrowDown className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>Request Flow Role (ส่งลงล่าง):</span>
                </div>
                <p className="mt-1 text-xs text-[var(--foreground)]">{current.requestRole}</p>
              </div>

              <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--success)]">
                  <ArrowUp className="h-3.5 w-3.5 text-[var(--success)]" />
                  <span>Result Flow Role (ส่งย้อนขึ้นบน):</span>
                </div>
                <p className="mt-1 text-xs text-[var(--foreground)]">{current.resultRole}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--border-strong)] pt-3">
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">Example in Reality:</span>
            <p className="text-xs text-[var(--foreground)] mt-1 font-mono font-medium">{current.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
