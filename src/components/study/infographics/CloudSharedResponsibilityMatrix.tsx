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
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Shared Responsibility Model</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">The Cloud Responsibility Gradient (IT Stack Layers)</h4>
          <p className="text-xs text-slate-500">See who is responsible for each layer across On-Premises, IaaS, PaaS, and SaaS.</p>
        </div>

        {/* Highlight Filter */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            onClick={() => setHighlightedModel('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              highlightedModel === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Models
          </button>
          <button
            onClick={() => setHighlightedModel('iaas')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              highlightedModel === 'iaas' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Focus IaaS
          </button>
          <button
            onClick={() => setHighlightedModel('paas')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              highlightedModel === 'paas' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Focus PaaS
          </button>
          <button
            onClick={() => setHighlightedModel('saas')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              highlightedModel === 'saas' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Focus SaaS
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="my-3 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-blue-600" />
          <span className="text-slate-700 font-semibold">You Manage (Customer Responsibility)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-600" />
          <span className="text-slate-700 font-semibold">Cloud Provider Manages (Vendor Managed)</span>
        </div>
      </div>

      {/* Table Matrix */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 font-mono text-slate-700">
              <th className="p-3">IT Stack Layer (9 Layers)</th>
              <th className="p-3 text-center">On-Premises</th>
              <th className={`p-3 text-center ${highlightedModel === 'iaas' ? 'bg-blue-50/80 font-bold text-blue-900' : ''}`}>
                IaaS (AWS EC2)
              </th>
              <th className={`p-3 text-center ${highlightedModel === 'paas' ? 'bg-blue-50/80 font-bold text-blue-900' : ''}`}>
                PaaS (Heroku / Vercel)
              </th>
              <th className={`p-3 text-center ${highlightedModel === 'saas' ? 'bg-blue-50/80 font-bold text-blue-900' : ''}`}>
                SaaS (Google Docs)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stackLayers.map((layer, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-slate-900 block">{layer.name}</span>
                  <span className="text-[10px] text-slate-500">{layer.thai}</span>
                </td>

                {/* On-Prem */}
                <td className="p-3 text-center">
                  <span className="inline-block rounded px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    You
                  </span>
                </td>

                {/* IaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'iaas' ? 'bg-blue-50/40' : ''}`}>
                  <span className={`inline-block rounded px-2.5 py-1 text-[11px] font-semibold ${
                    layer.iaas === 'customer'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {layer.iaas === 'customer' ? 'You' : 'Provider'}
                  </span>
                </td>

                {/* PaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'paas' ? 'bg-blue-50/40' : ''}`}>
                  <span className={`inline-block rounded px-2.5 py-1 text-[11px] font-semibold ${
                    layer.paas === 'customer'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {layer.paas === 'customer' ? 'You' : 'Provider'}
                  </span>
                </td>

                {/* SaaS */}
                <td className={`p-3 text-center ${highlightedModel === 'saas' ? 'bg-blue-50/40' : ''}`}>
                  <span className="inline-block rounded px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Provider
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950">
        <span className="font-bold text-amber-900">Crucial Exam Takeaway:</span>
        <p className="mt-1 text-slate-800 leading-relaxed">
          The defining boundary between <strong>IaaS</strong> and <strong>PaaS</strong> is the <strong>Operating System & Runtime</strong>! In IaaS, you must patch and configure the OS. In PaaS, the provider handles the OS so you only worry about code.
        </p>
      </div>
    </div>
  );
});
