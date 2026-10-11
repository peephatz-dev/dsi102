import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Zap, Database } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  thaiName: string;
  tech: string;
  latency: string;
  cycles: string;
  capacity: string;
  cost: string;
  volatile: boolean;
  color: string;
  pyramidWidth: string;
  description: string;
}

const tiers: Tier[] = [
  {
    id: 'registers',
    name: 'CPU Registers',
    thaiName: 'รีจิสเตอร์ในซีพียู',
    tech: 'Internal flip-flop circuits directly in ALU/Core',
    latency: '< 0.5 ns',
    cycles: '0 - 1 cycle',
    capacity: 'Hundreds of Bytes (e.g. 64 registers × 64-bit)',
    cost: 'Astronomical per GB (silicon die real estate)',
    volatile: true,
    color: ' ',
    pyramidWidth: 'w-48',
    description: 'Immediate workspace for arithmetic and logical instructions. Zero bus delay.'
  },
  {
    id: 'cache',
    name: 'L1 / L2 / L3 Cache',
    thaiName: 'แคชซีพียู (SRAM)',
    tech: 'Static RAM (SRAM, 6 transistors/bit, no refresh)',
    latency: '1 - 10 ns',
    cycles: '4 - 30 cycles',
    capacity: 'Megabytes (e.g. 32 MB L3 cache)',
    cost: 'Very High (~$1,000 / GB equivalent)',
    volatile: true,
    color: ' ',
    pyramidWidth: 'w-64',
    description: 'Bridges the speed gap between high-speed CPU core and slower main memory.'
  },
  {
    id: 'ram',
    name: 'Main Memory (RAM)',
    thaiName: 'หน่วยความจำหลัก (DRAM)',
    tech: 'Dynamic RAM (DRAM, 1 transistor + 1 capacitor, needs refresh)',
    latency: '50 - 100 ns',
    cycles: '100 - 200 cycles',
    capacity: '16 GB - 128 GB',
    cost: 'Moderate (~$3 / GB)',
    volatile: true,
    color: ' ',
    pyramidWidth: 'w-80',
    description: 'Holds currently executing OS kernel, application binaries, and runtime variables.'
  },
  {
    id: 'ssd',
    name: 'Solid-State Storage (NVMe / SSD)',
    thaiName: 'หน่วยจัดเก็บถาวร (SSD / Flash)',
    tech: 'NAND Flash memory (PCIe Gen 4/5 bus)',
    latency: '10 - 100 µs (microseconds)',
    cycles: '10,000 - 100,000 cycles',
    capacity: '512 GB - 4 TB',
    cost: 'Low (~$0.08 / GB)',
    volatile: false,
    color: ' ',
    pyramidWidth: 'w-96',
    description: 'Non-volatile persistent storage. Keeps applications and file systems across reboots.'
  },
  {
    id: 'hdd',
    name: 'Magnetic HDD & Cold Cloud Tape',
    thaiName: 'ฮาร์ดดิสก์จานแม่เหล็ก & เทปคลาวด์',
    tech: 'Mechanical spinning platters / Magnetic tape',
    latency: '5 - 15 ms (milliseconds)',
    cycles: 'Millions of cycles',
    capacity: '10 TB - Exabytes',
    cost: 'Lowest (~$0.015 / GB)',
    volatile: false,
    color: ' ',
    pyramidWidth: 'w-full max-w-md',
    description: 'Massive archive capacity for backups and big data lakes. High mechanical latency.'
  }
];

export const MemoryHierarchyPyramid: React.FC = React.memo(() => {
  const [selectedTier, setSelectedTier] = useState<string>('cache');

  const current = tiers.find(t => t.id === selectedTier) || tiers[1];

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Hardware Organization</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">The Memory & Storage Hierarchy Pyramid</h4>
          <p className="text-xs text-[var(--text-secondary)]">Trade-offs between Speed, Capacity, Cost per bit, and Volatility.</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-[var(--warning)] font-medium">
            <Zap className="h-3 w-3 text-[var(--warning)]" />
            <span>Fastest & Expensive</span>
          </span>
          <span className="text-[var(--text-secondary)]">vs</span>
          <span className="flex items-center gap-1 text-[var(--text-secondary)] font-medium">
            <Database className="h-3 w-3 text-[var(--text-secondary)]" />
            <span>Largest & Cheap</span>
          </span>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Pyramid */}
        <div className="lg:col-span-6 flex flex-col items-center gap-2">
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.id;

            return (
              <Button variant="ghost"
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all ${tier.pyramidWidth} ${
                  isSelected
                    ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] shadow-none ring-1 ring-[var(--border-strong)] scale-102'
                    : 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex items-center gap-2 text-left">
                  <div className={`h-2.5 w-2.5 rounded-full bg-[var(--surface-muted)] ${tier.color}`} />
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)] leading-tight">{tier.name}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{tier.thaiName}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] font-medium">{tier.latency}</span>
                  {tier.volatile ? (
                    <span className="block text-[9px] font-medium text-[var(--danger)]">Volatile</span>
                  ) : (
                    <span className="block text-[9px] font-medium text-[var(--success)]">Non-Volatile</span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Selected Tier Metrics Card */}
        <div className="lg:col-span-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-5 shadow-none">
          <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-3">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] font-medium">TIER METRICS</span>
              <h5 className="text-base font-medium text-[var(--foreground)]">{current.name}</h5>
              <p className="text-xs text-[var(--text-secondary)]">{current.thaiName}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              current.volatile
                ? 'bg-[var(--surface-muted)] text-[var(--danger)] border border-[var(--border-strong)]'
                : 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border-strong)]'
            }`}>
              {current.volatile ? '⚡ Volatile (Power off = Lost)' : '🔒 Non-Volatile (Persistent)'}
            </span>
          </div>

          <p className="mt-3 text-xs text-[var(--foreground)] leading-relaxed">{current.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg bg-[var(--surface)] p-2.5 border border-[var(--border-strong)] shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block font-sans">Access Latency</span>
              <span className="text-[var(--foreground)] font-medium">{current.latency}</span>
              <span className="text-[10px] text-[var(--accent)] block mt-0.5">~{current.cycles}</span>
            </div>

            <div className="rounded-lg bg-[var(--surface)] p-2.5 border border-[var(--border-strong)] shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block font-sans">Typical Capacity</span>
              <span className="text-[var(--foreground)] font-medium">{current.capacity}</span>
            </div>

            <div className="rounded-lg bg-[var(--surface)] p-2.5 border border-[var(--border-strong)] shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block font-sans">Cost Metric</span>
              <span className="text-[var(--warning)] font-medium">{current.cost}</span>
            </div>

            <div className="rounded-lg bg-[var(--surface)] p-2.5 border border-[var(--border-strong)] shadow-none">
              <span className="text-[10px] text-[var(--text-secondary)] block font-sans">Physical Circuit</span>
              <span className="text-[var(--foreground)] font-medium text-[11px] truncate block">{current.tech}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
