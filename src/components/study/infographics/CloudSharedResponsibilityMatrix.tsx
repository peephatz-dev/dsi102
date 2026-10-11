import { Button } from '../../arc/button/button';
import React, { useState } from 'react';

interface LayerStatus {
  name: string;
  thai: string;
  onPrem: 'customer' | 'provider';
  iaas: 'customer' | 'provider';
  paas: 'customer' | 'provider';
  saas: 'customer' | 'provider';
}

const stackLayers: LayerStatus[] = [
  { name: 'Applications', thai: 'แอปพลิเคชัน', onPrem: 'customer', iaas: 'customer', paas: 'customer', saas: 'provider' },
  { name: 'Data', thai: 'ข้อมูลและฐานข้อมูล', onPrem: 'customer', iaas: 'customer', paas: 'customer', saas: 'provider' },
  { name: 'Runtime', thai: 'สภาพแวดล้อมการรัน (Node/Python/JVM)', onPrem: 'customer', iaas: 'customer', paas: 'provider', saas: 'provider' },
  { name: 'Middleware', thai: 'มิดเดิลแวร์ (Message Queues, Web Servers)', onPrem: 'customer', iaas: 'customer', paas: 'provider', saas: 'provider' },
  { name: 'Operating System', thai: 'ระบบปฏิบัติการ (Windows/Linux OS)', onPrem: 'customer', iaas: 'customer', paas: 'provider', saas: 'provider' },
  { name: 'Virtualization', thai: 'การจำลองเสมือน (Hypervisor/VMs)', onPrem: 'customer', iaas: 'provider', paas: 'provider', saas: 'provider' },
  { name: 'Servers', thai: 'เครื่องเซิร์ฟเวอร์กายภาพ', onPrem: 'customer', iaas: 'provider', paas: 'provider', saas: 'provider' },
  { name: 'Storage', thai: 'ฮาร์ดดิสก์และ SAN Storage', onPrem: 'customer', iaas: 'provider', paas: 'provider', saas: 'provider' },
  { name: 'Networking', thai: 'เราเตอร์ ไฟร์วอลล์ สวิตช์สายแลน', onPrem: 'customer', iaas: 'provider', paas: 'provider', saas: 'provider' },
];

export const CloudSharedResponsibilityMatrix: React.FC = React.memo(() => {
  const [highlightedModel, setHighlightedModel] = useState<'all' | 'iaas' | 'paas' | 'saas'>('all');

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Shared Responsibility Model</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">The Cloud Responsibility Gradient (IT Stack Layers)</h4>
          <p className="text-xs text-[var(--text-secondary)]">See who is responsible for each layer across On-Premises, IaaS, PaaS, and SaaS.</p>
        </div>

        {/* Highlight Filter */}
        <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] text-xs">
          <Button variant="ghost"
            onClick={() => setHighlightedModel('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              highlightedModel === 'all' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            All Models
          </Button>
          <Button variant="ghost"
            onClick={() => setHighlightedModel('iaas')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              highlightedModel === 'iaas' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Focus IaaS
          </Button>
          <Button variant="ghost"
            onClick={() => setHighlightedModel('paas')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              highlightedModel === 'paas' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Focus PaaS
          </Button>
          <Button variant="ghost"
            onClick={() => setHighlightedModel('saas')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              highlightedModel === 'saas' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Focus SaaS
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="my-3 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-[var(--accent)]" />
          <span className="text-[var(--foreground)] font-medium">You Manage (Customer Responsibility)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-[var(--accent)]" />
          <span className="text-[var(--foreground)] font-medium">Cloud Provider Manages (Vendor Managed)</span>
        </div>
      </div>

      {/* Table Matrix */}
      <div className="overflow-x-auto rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-strong)] bg-[var(--surface-muted)] font-mono text-[var(--foreground)]">
              <th className="p-3">IT Stack Layer (9 Layers)</th>
              <th className="p-3 text-center">On-Premises</th>
              <th className={`p-3 text-center ${highlightedModel === 'iaas' ? 'bg-[var(--surface-muted)] font-medium text-[var(--accent)]' : ''}`}>
                IaaS (AWS EC2)
              </th>
              <th className={`p-3 text-center ${highlightedModel === 'paas' ? 'bg-[var(--surface-muted)] font-medium text-[var(--accent)]' : ''}`}>
                PaaS (Heroku / Vercel)
              </th>
              <th className={`p-3 text-center ${highlightedModel === 'saas' ? 'bg-[var(--surface-muted)] font-medium text-[var(--accent)]' : ''}`}>
                SaaS (Google Docs)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-strong)]">
            {stackLayers.map((layer, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-muted)] transition-colors">
                <td className="p-3">
                  <span className="font-medium text-[var(--foreground)] block">{layer.name}</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">{layer.thai}</span>
                </td>

                {/* On-Prem */}
                <td className="p-3 text-center">
                  <span className="inline-block rounded px-2.5 py-1 text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border-strong)]">
                    You
                  </span>
                </td>

                {/* IaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'iaas' ? 'bg-[var(--surface-muted)]' : ''}`}>
                  <span className={`inline-block rounded px-2.5 py-1 text-[11px] font-medium ${
                    layer.iaas === 'customer'
                      ? 'bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border-strong)]'
                      : 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border-strong)]'
                  }`}>
                    {layer.iaas === 'customer' ? 'You' : 'Provider'}
                  </span>
                </td>

                {/* PaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'paas' ? 'bg-[var(--surface-muted)]' : ''}`}>
                  <span className={`inline-block rounded px-2.5 py-1 text-[11px] font-medium ${
                    layer.paas === 'customer'
                      ? 'bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border-strong)]'
                      : 'bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border-strong)]'
                  }`}>
                    {layer.paas === 'customer' ? 'You' : 'Provider'}
                  </span>
                </td>

                {/* SaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'saas' ? 'bg-[var(--surface-muted)]' : ''}`}>
                  <span className="inline-block rounded px-2.5 py-1 text-[11px] font-medium bg-[var(--surface-muted)] text-[var(--success)] border border-[var(--border-strong)]">
                    Provider
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 text-xs text-[var(--warning)]">
        <span className="font-medium text-[var(--warning)]">Crucial Exam Takeaway:</span>
        <p className="mt-1 text-[var(--foreground)] leading-relaxed">
          The defining boundary between <strong>IaaS</strong> and <strong>PaaS</strong> is the <strong>Operating System & Runtime</strong>! In IaaS, you must patch and configure the OS. In PaaS, the provider handles the OS so you only worry about code.
        </p>
      </div>
    </div>
  );
});
