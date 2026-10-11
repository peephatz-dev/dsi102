import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, ArrowRight, Server, Laptop, Router, Radio, Zap } from 'lucide-react';

type DeviceMode = 'hub' | 'switch' | 'router';

export const HubSwitchRouterSimulator: React.FC = React.memo(() => {
  const [device, setDevice] = useState<DeviceMode>('switch');
  const [targetPort, setTargetPort] = useState<number>(3); // Port 1..4
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [activeSignals, setActiveSignals] = useState<number[]>([]);
  const [collision, setCollision] = useState<boolean>(false);

  // Switch MAC Address Table
  const [macTable, setMacTable] = useState<Array<{ mac: string; port: number }>>([
    { mac: '00:1A:2B:3C:4D:01', port: 1 },
    { mac: '00:1A:2B:3C:4D:02', port: 2 },
    { mac: '00:1A:2B:3C:4D:03', port: 3 },
    { mac: '00:1A:2B:3C:4D:04', port: 4 },
  ]);

  // Router Routing Table
  const routingTable = [
    { destination: '192.168.1.0/24', nextHop: 'Direct (LAN)', interface: 'Port 1-2' },
    { destination: '10.20.0.0/16', nextHop: '10.0.0.1 (Gateway)', interface: 'Port 3 (G0/1)' },
    { destination: '0.0.0.0/0 (Default)', nextHop: 'ISP Gateway', interface: 'Port 4 (WAN)' },
  ];

  const handleSendFrame = (simulateCollision = false) => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setCollision(false);

    if (device === 'hub') {
      // Hub repeats signal to ALL ports 2, 3, 4 (except sender port 1)
      if (simulateCollision) {
        setActiveSignals([1, 2, 3, 4]);
        setCollision(true);
      } else {
        setActiveSignals([2, 3, 4]);
      }
    } else if (device === 'switch') {
      // Switch selectively forwards ONLY to targetPort
      setActiveSignals([targetPort]);
    } else if (device === 'router') {
      // Router inspects IP and forwards to route
      setActiveSignals([targetPort]);
    }

    setTimeout(() => {
      setIsTransmitting(false);
      setActiveSignals([]);
    }, 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-strong)] pb-3">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Interactive Device Comparator</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">
            Hub (Layer 1) vs Switch (Layer 2) vs Router (Layer 3)
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Compare how different network hardware devices handle addressing, collision domains, and packet forwarding.
          </p>
        </div>

        {/* Device Mode Switcher */}
        <div className="flex w-full flex-wrap rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)] sm:w-auto">
          <Button variant="ghost"
            onClick={() => { setDevice('hub'); setCollision(false); }}
            className={`min-w-[115px] flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all sm:flex-none sm:px-3 ${
              device === 'hub' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Hub (L1 Physical)
          </Button>
          <Button variant="ghost"
            onClick={() => { setDevice('switch'); setCollision(false); }}
            className={`min-w-[115px] flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all sm:flex-none sm:px-3 ${
              device === 'switch' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Switch (L2 Data Link)
          </Button>
          <Button variant="ghost"
            onClick={() => { setDevice('router'); setCollision(false); }}
            className={`min-w-[115px] flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all sm:flex-none sm:px-3 ${
              device === 'router' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Router (L3 Network)
          </Button>
        </div>
      </div>

      {/* Interactive Simulation Diagram */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--accent)] p-4 sm:p-6 text-[var(--accent-foreground)] relative overflow-hidden">
        {collision && (
          <div className="absolute inset-0 bg-[var(--accent)] backdrop-blur-xs flex items-center justify-center z-10 animate-fade-in">
            <div className="bg-[var(--accent)] border border-[var(--border-strong)] rounded-2xl p-4 text-center max-w-sm space-y-2 shadow-none">
              <AlertTriangle className="h-8 w-8 text-[var(--danger)] mx-auto animate-bounce" />
              <h5 className="font-medium text-sm text-[var(--accent-foreground)]">💥 Packet Collision in Hub!</h5>
              <p className="text-xs text-[var(--danger)]">
                Hubs share a <strong>single collision domain</strong> across all ports. Simultaneous transmission corrupted the signals. Devices must back off and retry.
              </p>
              <Button variant="ghost"
                onClick={() => setCollision(false)}
                className="mt-2 px-3 py-1 bg-[var(--accent)] hover:bg-[var(--accent)] rounded-lg text-xs font-medium text-[var(--accent-foreground)]"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Device Centerpiece */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Sender PC 1 */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-[var(--accent)] border border-[var(--border-strong)] w-36 text-center">
            <Laptop className="h-8 w-8 text-[var(--accent)] mb-1" />
            <span className="text-xs font-medium font-mono">Port 1: PC 1 (Sender)</span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">MAC: ...4D:01</span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">IP: 192.168.1.10</span>
          </div>

          {/* Forwarding Line In */}
          <div className="relative flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${isTransmitting ? 'bg-[var(--surface-muted)] animate-pulse' : 'bg-[var(--accent)]'} transition-all`} />
            <span className="absolute -top-5 text-[10px] font-mono text-[var(--accent)] bg-[var(--accent)] px-1.5 py-0.5 rounded border border-[var(--border-strong)]">
              Frame / Signal In
            </span>
          </div>

          {/* Central Active Device */}
          <div className={`p-4 rounded-2xl border-2 text-center w-48 shadow-none transition-all ${
            device === 'hub'
              ? 'bg-[var(--accent)] border-[var(--border-strong)]'
              : device === 'switch'
              ? 'bg-[var(--accent)] border-[var(--border-strong)]'
              : 'bg-[var(--accent)] border-[var(--border-strong)]'
          }`}>
            <Server className={`h-9 w-9 mx-auto mb-1 ${
              device === 'hub' ? 'text-[var(--warning)]' : device === 'switch' ? 'text-[var(--accent)]' : 'text-[var(--success)]'
            }`} />
            <h5 className="font-medium text-sm capitalize">{device}</h5>
            <span className="text-[11px] font-mono opacity-80 block">
              {device === 'hub' ? 'Layer 1 (Repeater)' : device === 'switch' ? 'Layer 2 (Bridge/MAC)' : 'Layer 3 (IP Routing)'}
            </span>
          </div>

          {/* Forwarding Lines Out */}
          <div className="flex flex-col gap-3 flex-1">
            {[2, 3, 4].map(pNum => {
              const isPortActive = activeSignals.includes(pNum);
              return (
                <div key={pNum} className="flex items-center gap-2">
                  <div className={`h-1 flex-1 ${isPortActive ? 'bg-[var(--surface-muted)] animate-pulse' : 'bg-[var(--accent)]'}`} />
                  <div className={`p-2 rounded-lg border text-left text-[11px] font-mono w-36 transition-all ${
                    isPortActive
                      ? 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--success)] font-medium'
                      : 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--text-secondary)]'
                  }`}>
                    <span>Port {pNum}: {pNum === 2 ? 'Printer' : pNum === 3 ? 'Server' : 'WAN Router'}</span>
                    {isPortActive && <span className="block text-[9px] text-[var(--success)]">✓ Receiving</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-strong)]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-secondary)]">Target Destination:</span>
            <select
              value={targetPort}
              onChange={(e) => setTargetPort(Number(e.target.value))}
              disabled={isTransmitting || device === 'hub'}
              className="bg-[var(--accent)] border border-[var(--border-strong)] text-[var(--accent-foreground)] rounded-lg px-2.5 py-1 text-xs font-mono disabled:opacity-50"
            >
              <option value={2}>Port 2 (Printer - 192.168.1.20)</option>
              <option value={3}>Port 3 (Server - 10.20.0.5)</option>
              <option value={4}>Port 4 (External WAN - 8.8.8.8)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {device === 'hub' && (
              <Button variant="ghost"
                onClick={() => handleSendFrame(true)}
                disabled={isTransmitting}
                className="px-3 py-1.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-medium transition-all shadow-none"
              >
                Simulate 2 Transmitters (Collision)
              </Button>
            )}

            <Button variant="ghost"
              onClick={() => handleSendFrame(false)}
              disabled={isTransmitting}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-medium text-[var(--accent-foreground)] transition-all shadow-none ${
                device === 'hub' ? 'bg-[var(--accent)] hover:bg-[var(--accent)]' : device === 'switch' ? 'bg-[var(--accent)] hover:bg-[var(--accent)]' : 'bg-[var(--accent)] hover:bg-[var(--accent)]'
              }`}
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span>{isTransmitting ? 'Forwarding...' : 'Transmit Frame'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Internal Intelligence Table View */}
      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-[var(--foreground)] flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-[var(--accent)]" />
            <span>
              {device === 'hub' && 'Hub Forwarding Mechanism: Dumb Physical Broadcast'}
              {device === 'switch' && 'Switch Intelligence: MAC Address Table (CAM Table)'}
              {device === 'router' && 'Router Intelligence: IP Routing Table (Prefix Match)'}
            </span>
          </h5>
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
            {device === 'hub' ? 'Collision Domains: 1 (Shared)' : device === 'switch' ? 'Collision Domains: 1 per port (Isolated)' : 'Broadcast Domains: Separated'}
          </span>
        </div>

        {device === 'hub' && (
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The Hub does <strong>NOT</strong> have memory or an address table. It repeats electrical bits entering one port out to <strong>all other ports</strong>. No security, no privacy, and high chance of collisions if two devices transmit at once.
          </p>
        )}

        {device === 'switch' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] border border-[var(--border-strong)] bg-[var(--surface)] rounded-lg">
              <thead className="bg-[var(--surface-muted)] text-[var(--foreground)]">
                <tr>
                  <th className="p-2 border-b">Destination MAC Address</th>
                  <th className="p-2 border-b">Outgoing Port</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {macTable.map(entry => (
                  <tr key={entry.port} className={entry.port === targetPort ? 'bg-[var(--surface-muted)] font-medium text-[var(--accent)]' : 'text-[var(--foreground)]'}>
                    <td className="p-2 border-b">{entry.mac}</td>
                    <td className="p-2 border-b">Port {entry.port}</td>
                    <td className="p-2 border-b">{entry.port === targetPort ? 'Forward frame exclusively here ✓' : 'Filter / Drop'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {device === 'router' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] border border-[var(--border-strong)] bg-[var(--surface)] rounded-lg">
              <thead className="bg-[var(--surface-muted)] text-[var(--foreground)]">
                <tr>
                  <th className="p-2 border-b">Destination Network</th>
                  <th className="p-2 border-b">Next Hop Gateway</th>
                  <th className="p-2 border-b">Egress Interface</th>
                </tr>
              </thead>
              <tbody>
                {routingTable.map((route, idx) => (
                  <tr key={idx} className="text-[var(--foreground)]">
                    <td className="p-2 border-b font-medium">{route.destination}</td>
                    <td className="p-2 border-b">{route.nextHop}</td>
                    <td className="p-2 border-b text-[var(--success)] font-medium">{route.interface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});
