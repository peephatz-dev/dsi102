import { Button } from '../../arc/button/button';
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
    color: ' ',
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
    color: ' ',
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
    color: ' ',
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
    color: ' ',
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
    color: ' ',
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
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">System Anatomy</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">The 5 Building Blocks of Every Digital Service</h4>
          <p className="text-xs text-[var(--text-secondary)]">A digital service is never "just an app"—it is the synergy of all 5 blocks.</p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] text-xs">
          <span className="px-2 text-[var(--text-secondary)] font-medium">Scenario:</span>
          <Button variant="ghost"
            onClick={() => setActiveScenario('grab')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeScenario === 'grab' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            🚗 Grab / Uber
          </Button>
          <Button variant="ghost"
            onClick={() => setActiveScenario('banking')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeScenario === 'banking' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-none' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            💳 Mobile Banking
          </Button>
        </div>
      </div>

      {/* 5 Blocks Interactive Grid */}
      <div className="my-5 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {blocks.map((block) => {
          const Icon = block.icon;
          const isSelected = selectedBlock === block.id;
          const isFailed = simulatedFailure === block.id;

          return (
            <Button variant="ghost"
              key={block.id}
              onClick={() => {
                setSelectedBlock(block.id);
                setSimulatedFailure(null);
              }}
              className={`relative flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                isFailed
                  ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] shadow-none ring-2 ring-[var(--border-strong)]'
                  : isSelected
                  ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] shadow-none ring-1 ring-[var(--border-strong)]'
                  : 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)]'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)] ${block.color} text-[var(--accent-foreground)] shadow-none`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-medium text-[var(--foreground)]">{block.name}</span>
              <span className="text-[10px] text-[var(--text-secondary)]">{block.thaiName}</span>
            </Button>
          );
        })}
      </div>

      {/* Block Details Display */}
      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-[var(--foreground)]">Block: {current.name}</span>
            <span className="rounded-md bg-[var(--surface)] border border-[var(--border-strong)] px-2.5 py-0.5 text-xs text-[var(--accent)] font-medium shadow-none">
              {current.thaiName}
            </span>
          </div>
          <Button variant="ghost"
            onClick={() => setSimulatedFailure(simulatedFailure === current.id ? null : current.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              simulatedFailure === current.id
                ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none'
                : 'bg-[var(--surface-muted)] text-[var(--danger)] border border-[var(--border-strong)] hover:bg-[var(--surface-muted)]'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{simulatedFailure === current.id ? 'Restore Block' : 'Simulate Single-Point Failure'}</span>
          </Button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[var(--foreground)]">{current.description}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-3.5 shadow-none">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Role in {activeScenario === 'grab' ? 'Grab / Uber' : 'Mobile Banking'}</span>
            </div>
            <p className="mt-1.5 text-xs text-[var(--foreground)] leading-relaxed">
              {activeScenario === 'grab' ? current.grabRole : current.bankingRole}
            </p>
          </div>

          <div className={`rounded-lg border p-3.5 transition-colors shadow-none ${
            simulatedFailure === current.id
              ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--danger)]'
              : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-secondary)]'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--danger)]">
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
