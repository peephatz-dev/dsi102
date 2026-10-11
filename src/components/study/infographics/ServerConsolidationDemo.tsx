import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Server, Layers } from 'lucide-react';

export const ServerConsolidationDemo: React.FC = React.memo(() => {
  const [architecture, setArchitecture] = useState<'traditional' | 'virtualized'>('traditional');

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Virtualization Breakthrough</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">Traditional Physical Sprawl vs. Virtualized Consolidation</h4>
          <p className="text-xs text-[var(--text-secondary)]">Transforming 4 underutilized physical servers into 4 VMs on a single host.</p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] text-xs">
          <Button variant="ghost"
            onClick={() => setArchitecture('traditional')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              architecture === 'traditional' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Traditional (1 App per Box)
          </Button>
          <Button variant="ghost"
            onClick={() => setArchitecture('virtualized')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              architecture === 'virtualized' ? 'bg-[var(--surface)] text-[var(--success)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            Virtualized Host (Multi-VM)
          </Button>
        </div>
      </div>

      {architecture === 'traditional' ? (
        <div className="my-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Server 1: Web App', cpu: '12%', color: 'bg-[var(--accent)]' },
              { name: 'Server 2: Payroll', cpu: '8%', color: 'bg-[var(--accent)]' },
              { name: 'Server 3: Database', cpu: '18%', color: 'bg-[var(--accent)]' },
              { name: 'Server 4: Email', cpu: '10%', color: 'bg-[var(--accent)]' }
            ].map((srv, idx) => (
              <div key={idx} className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 text-center shadow-none">
                <Server className="h-7 w-7 mx-auto text-[var(--warning)] mb-2" />
                <p className="text-xs font-medium text-[var(--foreground)]">{srv.name}</p>
                <div className="mt-3 bg-[var(--surface-muted)] rounded-full h-2 overflow-hidden">
                  <div className={`h-full ${srv.color}`} style={{ width: srv.cpu }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                  <span>CPU Usage:</span>
                  <span className="font-medium text-[var(--foreground)]">{srv.cpu}</span>
                </div>
                <span className="mt-2 block rounded bg-[var(--surface-muted)] text-[9px] font-medium text-[var(--danger)] border border-[var(--border-strong)] py-0.5">
                  85% Capacity Waste
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Physical Hardware</span>
              <span className="text-base font-medium text-[var(--danger)] font-mono">4 Servers (4U Rack)</span>
            </div>
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Average CPU Utilization</span>
              <span className="text-base font-medium text-[var(--danger)] font-mono">~12% (Severe Waste)</span>
            </div>
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Power & Cooling</span>
              <span className="text-base font-medium text-[var(--danger)] font-mono">4x Power Draw</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-5 shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-6 w-6 text-[var(--success)]" />
                <div>
                  <h5 className="text-sm font-medium text-[var(--foreground)]">Single High-Density Physical Host</h5>
                  <p className="text-xs text-[var(--success)]">Running Type-1 Bare-Metal Hypervisor (VMware ESXi / KVM)</p>
                </div>
              </div>
              <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--success)] border border-[var(--border-strong)]">
                Total CPU Utilization: 74%
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'VM 1: Web App', ram: '4 GB vRAM', vcpu: '2 vCPU', color: 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--accent)]' },
                { name: 'VM 2: Payroll', ram: '2 GB vRAM', vcpu: '1 vCPU', color: 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--accent)]' },
                { name: 'VM 3: Database', ram: '8 GB vRAM', vcpu: '4 vCPU', color: 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--success)]' },
                { name: 'VM 4: Email', ram: '4 GB vRAM', vcpu: '2 vCPU', color: 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--accent)]' }
              ].map((vm, idx) => (
                <div key={idx} className={`rounded-xl border p-3 text-center shadow-none ${vm.color}`}>
                  <Layers className="h-5 w-5 mx-auto text-[var(--foreground)] mb-1.5" />
                  <p className="text-xs font-medium text-[var(--foreground)]">{vm.name}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono mt-1">{vm.vcpu} • {vm.ram}</p>
                  <span className="mt-2 block rounded bg-[var(--surface)] text-[9px] font-medium text-[var(--success)] border border-[var(--border-strong)] py-0.5">
                    Isolated Guest OS
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Physical Hardware</span>
              <span className="text-base font-medium text-[var(--success)] font-mono">1 Server (1U Rack)</span>
            </div>
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Average CPU Utilization</span>
              <span className="text-base font-medium text-[var(--success)] font-mono">70 - 80% (Optimized)</span>
            </div>
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none">
              <span className="text-[var(--text-secondary)] block text-[10px]">Power & Cooling</span>
              <span className="text-base font-medium text-[var(--success)] font-mono">75% Energy Savings</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
