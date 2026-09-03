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
    color: 'bg-rose-50/70 hover:bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
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
    color: 'bg-blue-50/70 hover:bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
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
    color: 'bg-purple-50/70 hover:bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
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
    color: 'bg-teal-50/70 hover:bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
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
    color: 'bg-emerald-50/70 hover:bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
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
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Hierarchical Abstraction</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">The 5-Layer Platform Stack</h4>
          <p className="text-xs text-slate-500">Requests propagate DOWNWARD; Execution results return UPWARD.</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerAnimation('down')}
            disabled={animatingDirection !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 shadow-xs"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span>Simulate Request (↓ Down)</span>
          </button>
          <button
            onClick={() => triggerAnimation('up')}
            disabled={animatingDirection !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all disabled:opacity-50 shadow-xs"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Simulate Result (↑ Up)</span>
          </button>
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
                    ? 'border-blue-600 bg-blue-100 shadow-md ring-2 ring-blue-500'
                    : isSelected
                    ? `${layer.borderColor} ${layer.color} shadow-xs ring-1 ring-blue-400`
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${layer.textColor}`}>{layer.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium">({layer.thaiName})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{layer.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                  {idx === 0 && <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 font-bold text-slate-600">Top</span>}
                  {idx === 4 && <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 font-bold text-slate-600">Bottom</span>}
                  {isSelected && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-slate-50/80 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className={`text-xs font-mono font-bold ${current.textColor}`}>LAYER DETAILS</span>
                <h5 className="text-base font-bold text-slate-900">{current.name} — {current.thaiName}</h5>
              </div>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow-xs">
                {current.subtitle}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-700">{current.detail}</p>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
                  <ArrowDown className="h-3.5 w-3.5 text-blue-600" />
                  <span>Request Flow Role (ส่งลงล่าง):</span>
                </div>
                <p className="mt-1 text-xs text-slate-700">{current.requestRole}</p>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Result Flow Role (ส่งย้อนขึ้นบน):</span>
                </div>
                <p className="mt-1 text-xs text-slate-700">{current.resultRole}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Example in Reality:</span>
            <p className="text-xs text-slate-800 mt-1 font-mono font-medium">{current.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
