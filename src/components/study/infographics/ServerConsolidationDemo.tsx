import React, { useState } from 'react';
import { Server, Layers } from 'lucide-react';

export const ServerConsolidationDemo: React.FC = React.memo(() => {
  const [architecture, setArchitecture] = useState<'traditional' | 'virtualized'>('traditional');

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Virtualization Breakthrough</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Traditional Physical Sprawl vs. Virtualized Consolidation</h4>
          <p className="text-xs text-slate-500">Transforming 4 underutilized physical servers into 4 VMs on a single host.</p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setArchitecture('traditional')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              architecture === 'traditional' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Traditional (1 App per Box)
          </button>
          <button
            onClick={() => setArchitecture('virtualized')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              architecture === 'virtualized' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Virtualized Host (Multi-VM)
          </button>
        </div>
      </div>

      {architecture === 'traditional' ? (
        <div className="my-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Server 1: Web App', cpu: '12%', color: 'bg-amber-500' },
              { name: 'Server 2: Payroll', cpu: '8%', color: 'bg-orange-500' },
              { name: 'Server 3: Database', cpu: '18%', color: 'bg-red-500' },
              { name: 'Server 4: Email', cpu: '10%', color: 'bg-yellow-500' }
            ].map((srv, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-center shadow-xs">
                <Server className="h-7 w-7 mx-auto text-amber-600 mb-2" />
                <p className="text-xs font-bold text-slate-900">{srv.name}</p>
                <div className="mt-3 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className={`h-full ${srv.color}`} style={{ width: srv.cpu }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-600">
                  <span>CPU Usage:</span>
                  <span className="font-bold text-slate-900">{srv.cpu}</span>
                </div>
                <span className="mt-2 block rounded bg-rose-50 text-[9px] font-bold text-rose-700 border border-rose-200 py-0.5">
                  85% Capacity Waste
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Physical Hardware</span>
              <span className="text-base font-bold text-rose-700 font-mono">4 Servers (4U Rack)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Average CPU Utilization</span>
              <span className="text-base font-bold text-rose-700 font-mono">~12% (Severe Waste)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Power & Cooling</span>
              <span className="text-base font-bold text-rose-700 font-mono">4x Power Draw</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-6 w-6 text-emerald-600" />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Single High-Density Physical Host</h5>
                  <p className="text-xs text-emerald-800">Running Type-1 Bare-Metal Hypervisor (VMware ESXi / KVM)</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
                Total CPU Utilization: 74%
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'VM 1: Web App', ram: '4 GB vRAM', vcpu: '2 vCPU', color: 'border-blue-200 bg-blue-50/80 text-blue-900' },
                { name: 'VM 2: Payroll', ram: '2 GB vRAM', vcpu: '1 vCPU', color: 'border-indigo-200 bg-indigo-50/80 text-indigo-900' },
                { name: 'VM 3: Database', ram: '8 GB vRAM', vcpu: '4 vCPU', color: 'border-emerald-200 bg-emerald-50/80 text-emerald-900' },
                { name: 'VM 4: Email', ram: '4 GB vRAM', vcpu: '2 vCPU', color: 'border-purple-200 bg-purple-50/80 text-purple-900' }
              ].map((vm, idx) => (
                <div key={idx} className={`rounded-xl border p-3 text-center shadow-xs ${vm.color}`}>
                  <Layers className="h-5 w-5 mx-auto text-slate-800 mb-1.5" />
                  <p className="text-xs font-bold text-slate-900">{vm.name}</p>
                  <p className="text-[10px] text-slate-600 font-mono mt-1">{vm.vcpu} • {vm.ram}</p>
                  <span className="mt-2 block rounded bg-white text-[9px] font-bold text-emerald-800 border border-emerald-200 py-0.5">
                    Isolated Guest OS
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Physical Hardware</span>
              <span className="text-base font-bold text-emerald-700 font-mono">1 Server (1U Rack)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Average CPU Utilization</span>
              <span className="text-base font-bold text-emerald-700 font-mono">70 - 80% (Optimized)</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
              <span className="text-slate-500 block text-[10px]">Power & Cooling</span>
              <span className="text-base font-bold text-emerald-700 font-mono">75% Energy Savings</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
