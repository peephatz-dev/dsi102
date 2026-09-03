import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, HardDrive, Database, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

interface BlockInfo {
  id: string;
  name: string;
  thaiName: string;
  icon: any;
  color: string;
  description: string;
  grabRole: string;
  bankingRole: string;
  failureSymptom: string;
}

const blocks: BlockInfo[] = [
  {
    id: 'people',
    name: 'People',
    thaiName: 'บุคลากรและผู้ใช้',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    description: 'End-users, riders, drivers, support agents, engineers, and regulators.',
    grabRole: 'Passengers booking trips, drivers accepting fares, and customer support resolving disputes.',
    bankingRole: 'Customers making transfers, bank tellers, compliance officers auditing fraud.',
    failureSymptom: 'Without drivers, customers wait forever; without training, users reject the application.'
  },
  {
    id: 'software',
    name: 'Software',
    thaiName: 'ซอฟต์แวร์และแอปพลิเคชัน',
    icon: Code,
    color: 'from-blue-600 to-indigo-600',
    description: 'Frontend iOS/Android apps, microservices, pricing algorithms, OS, and APIs.',
    grabRole: 'Real-time fare calculation engine, driver matching algorithm, mapping UI.',
    bankingRole: 'Core banking transaction engine, mobile authentication, encryption cipher suites.',
    failureSymptom: 'App crashes on launch, payment gateway times out, calculations yield errors.'
  },
  {
    id: 'hardware',
    name: 'Hardware',
    thaiName: 'ฮาร์ดแวร์และอุปกรณ์',
    icon: HardDrive,
    color: 'from-amber-500 to-orange-500',
    description: 'Smartphones, cloud server racks, GPS chips, touchscreens, and storage arrays.',
    grabRole: 'Driver and passenger smartphones, GPS receivers, cloud virtual server clusters.',
    bankingRole: 'Physical ATMs, HSM encryption hardware, data center blade servers.',
    failureSymptom: 'Overheating CPU throttles performance, dead phone battery cuts off driver connection.'
  },
  {
    id: 'data',
    name: 'Data',
    thaiName: 'ข้อมูลและฐานข้อมูล',
    icon: Database,
    color: 'from-emerald-600 to-teal-600',
    description: 'Coordinates, credit card tokens, historical ride logs, user profiles, and road maps.',
    grabRole: 'Real-time latitude/longitude coordinates, traffic congestion feeds, payment history.',
    bankingRole: 'Account balances, transaction ledgers, ledger audit logs, KYC identities.',
    failureSymptom: 'Corrupted database shows $0 balance, outdated maps send cars onto dead-end roads.'
  },
  {
    id: 'network',
    name: 'Network',
    thaiName: 'เครือข่ายและการสื่อสาร',
    icon: Wifi,
    color: 'from-cyan-600 to-sky-600',
    description: '4G/5G cellular towers, Wi-Fi access points, fiber optics, TCP/IP, and DNS.',
    grabRole: 'Cellular signals linking mobile apps in moving cars to central cloud servers.',
    bankingRole: 'Encrypted SWIFT interbank networks, TLS encrypted internet channels.',
    failureSymptom: 'Dropped cellular connection leaves driver unable to complete trip or calculate final bill.'
  }
];

export const BuildingBlocksExplorer: React.FC = React.memo(() => {
  const [selectedBlock, setSelectedBlock] = useState<string>('people');
  const [activeScenario, setActiveScenario] = useState<'grab' | 'banking'>('grab');
  const [simulatedFailure, setSimulatedFailure] = useState<string | null>(null);

  const current = blocks.find(b => b.id === selectedBlock) || blocks[0];

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">System Anatomy</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">The 5 Building Blocks of Every Digital Service</h4>
          <p className="text-xs text-slate-500">A digital service is never "just an app"—it is the synergy of all 5 blocks.</p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
          <span className="px-2 text-slate-500 font-medium">Scenario:</span>
          <button
            onClick={() => setActiveScenario('grab')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeScenario === 'grab' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚗 Grab / Uber
          </button>
          <button
            onClick={() => setActiveScenario('banking')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeScenario === 'banking' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💳 Mobile Banking
          </button>
        </div>
      </div>

      {/* 5 Blocks Interactive Grid */}
      <div className="my-5 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {blocks.map((block) => {
          const Icon = block.icon;
          const isSelected = selectedBlock === block.id;
          const isFailed = simulatedFailure === block.id;

          return (
            <button
              key={block.id}
              onClick={() => {
                setSelectedBlock(block.id);
                setSimulatedFailure(null);
              }}
              className={`relative flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                isFailed
                  ? 'border-red-500 bg-red-50/80 shadow-xs ring-2 ring-red-400'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50/60 shadow-xs ring-1 ring-blue-400'
                  : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${block.color} text-white shadow-xs`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-slate-900">{block.name}</span>
              <span className="text-[10px] text-slate-500">{block.thaiName}</span>
            </button>
          );
        })}
      </div>

      {/* Block Details Display */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-slate-900">Block: {current.name}</span>
            <span className="rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-xs text-blue-700 font-semibold shadow-xs">
              {current.thaiName}
            </span>
          </div>
          <button
            onClick={() => setSimulatedFailure(simulatedFailure === current.id ? null : current.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              simulatedFailure === current.id
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{simulatedFailure === current.id ? 'Restore Block' : 'Simulate Single-Point Failure'}</span>
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-700">{current.description}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Role in {activeScenario === 'grab' ? 'Grab / Uber' : 'Mobile Banking'}</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
              {activeScenario === 'grab' ? current.grabRole : current.bankingRole}
            </p>
          </div>

          <div className={`rounded-lg border p-3.5 transition-colors shadow-xs ${
            simulatedFailure === current.id
              ? 'border-red-300 bg-red-50 text-red-900'
              : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>What Happens If This Block Fails?</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed">
              {current.failureSymptom}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
