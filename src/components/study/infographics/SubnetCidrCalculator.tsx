import { Button } from '../../arc/button/button';
import React, { useState, useMemo } from 'react';
import { Calculator, Network, Binary, CheckCircle2, Sliders, Info, Hash } from 'lucide-react';

export const SubnetCidrCalculator: React.FC = React.memo(() => {
  const [ipInput, setIpInput] = useState<string>('192.168.10.25');
  const [cidrPrefix, setCidrPrefix] = useState<number>(24);

  // Parse IP Octets
  const octets = useMemo(() => {
    const parts = ipInput.split('.').map(p => {
      const num = parseInt(p, 10);
      return isNaN(num) ? 0 : Math.min(255, Math.max(0, num));
    });
    while (parts.length < 4) parts.push(0);
    return parts.slice(0, 4);
  }, [ipInput]);

  // Calculate Subnet Mask octets
  const maskOctets = useMemo(() => {
    const maskBits = ''.padStart(cidrPrefix, '1').padEnd(32, '0');
    return [
      parseInt(maskBits.slice(0, 8), 2),
      parseInt(maskBits.slice(8, 16), 2),
      parseInt(maskBits.slice(16, 24), 2),
      parseInt(maskBits.slice(24, 32), 2),
    ];
  }, [cidrPrefix]);

  // Calculate Network Address
  const networkOctets = useMemo(() => {
    return octets.map((oct, i) => oct & maskOctets[i]);
  }, [octets, maskOctets]);

  // Calculate Broadcast Address
  const broadcastOctets = useMemo(() => {
    return octets.map((oct, i) => oct | (~maskOctets[i] & 255));
  }, [octets, maskOctets]);

  // Total and usable hosts
  const hostBits = 32 - cidrPrefix;
  const totalAddresses = Math.pow(2, hostBits);
  const usableHosts = cidrPrefix >= 31 ? 0 : totalAddresses - 2;

  // First and Last usable IP
  const firstUsable = `${networkOctets[0]}.${networkOctets[1]}.${networkOctets[2]}.${networkOctets[3] + 1}`;
  const lastUsable = `${broadcastOctets[0]}.${broadcastOctets[1]}.${broadcastOctets[2]}.${broadcastOctets[3] - 1}`;

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-3">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Interactive IPv4 & Subnet Engine</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">
            CIDR Prefix, Subnet Mask & Host Range Calculator
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Slide the prefix to see how network bits divide from host bits in real-time.
          </p>
        </div>

        {/* Common Preset Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: '/24 (LAN)', val: 24 },
            { label: '/26 (Subnet)', val: 26 },
            { label: '/16 (Campus)', val: 16 },
            { label: '/30 (P2P)', val: 30 },
          ].map(preset => (
            <Button variant="ghost"
              key={preset.val}
              onClick={() => setCidrPrefix(preset.val)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                cidrPrefix === preset.val
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none'
                  : 'bg-[var(--surface-muted)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input & Slider Bar */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono font-medium text-[var(--text-secondary)] shrink-0">IP Address:</span>
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              className="bg-[var(--surface)] border border-[var(--border-strong)] rounded-xl px-3 py-1.5 text-xs font-mono font-medium text-[var(--foreground)] shadow-none focus:ring-2 focus:ring-[var(--border-strong)] focus:outline-hidden w-full sm:w-44"
              placeholder="192.168.10.25"
            />
          </div>

          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[var(--text-secondary)] shrink-0">Prefix: /{cidrPrefix}</span>
            <input
              type="range"
              min="8"
              max="30"
              value={cidrPrefix}
              onChange={(e) => setCidrPrefix(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <span className="text-xs font-mono text-[var(--text-secondary)]">/30</span>
          </div>
        </div>

        {/* 32-Bit Binary Visual Representation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--accent)] font-medium">Network Bits ({cidrPrefix} bits)</span>
            <span className="text-[var(--success)] font-medium">Host Bits ({hostBits} bits)</span>
          </div>

          {/* Continuous 32-bit bar */}
          <div className="h-6 rounded-lg overflow-hidden flex border border-[var(--border-strong)] p-0.5 bg-[var(--surface)] shadow-inner">
            <div
              className="h-full bg-[var(--accent)] rounded-l-md transition-all duration-300 flex items-center justify-center text-[10px] text-[var(--accent-foreground)] font-mono font-medium overflow-hidden"
              style={{ width: `${(cidrPrefix / 32) * 100}%` }}
            >
              {cidrPrefix >= 10 && `Network: ${cidrPrefix}`}
            </div>
            <div
              className="h-full bg-[var(--accent)] rounded-r-md transition-all duration-300 flex items-center justify-center text-[10px] text-[var(--accent-foreground)] font-mono font-medium overflow-hidden"
              style={{ width: `${(hostBits / 32) * 100}%` }}
            >
              {hostBits >= 8 && `Host: ${hostBits}`}
            </div>
          </div>

          {/* 4 Octets Bit Breakdown */}
          <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1 text-center font-mono text-[10px]">
            {octets.map((oct, i) => {
              const bin = oct.toString(2).padStart(8, '0');
              const maskBin = maskOctets[i].toString(2).padStart(8, '0');
              return (
                <div key={i} className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border-strong)] space-y-0.5 shadow-none">
                  <span className="text-[var(--text-secondary)] block">Octet {i + 1}</span>
                  <span className="font-medium text-xs text-[var(--foreground)] block">{oct}</span>
                  <span className="text-[9px] text-[var(--accent)] block tracking-wider">{bin}</span>
                  <span className="text-[9px] text-[var(--text-secondary)] block">Mask: {maskOctets[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calculated Parameters Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] space-y-1 shadow-none">
          <span className="text-[10px] text-[var(--text-secondary)] font-mono block">Subnet Mask (Decimal):</span>
          <span className="font-mono font-medium text-sm text-[var(--foreground)] block">{maskOctets.join('.')}</span>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono">CIDR: /{cidrPrefix}</span>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] space-y-1 shadow-none">
          <span className="text-[10px] text-[var(--text-secondary)] font-mono block">Network Address (ID):</span>
          <span className="font-mono font-medium text-sm text-[var(--accent)] block">{networkOctets.join('.')}</span>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono">All host bits set to 0</span>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] space-y-1 shadow-none">
          <span className="text-[10px] text-[var(--text-secondary)] font-mono block">Broadcast Address:</span>
          <span className="font-mono font-medium text-sm text-[var(--warning)] block">{broadcastOctets.join('.')}</span>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono">All host bits set to 1</span>
        </div>

        <div className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] space-y-1 shadow-none">
          <span className="text-[10px] text-[var(--text-secondary)] font-mono block">Usable Host Pool:</span>
          <span className="font-mono font-medium text-sm text-[var(--success)] block">
            {usableHosts.toLocaleString()} Hosts
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] font-mono">Formula: 2^{hostBits} − 2</span>
        </div>
      </div>

      {/* Usable Range Box */}
      <div className="p-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] text-xs font-mono flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-medium text-[var(--accent)] block">Usable Client IP Range:</span>
          <span className="text-[var(--foreground)]">{firstUsable} ➔ {lastUsable}</span>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-[var(--accent)]">
            (Excludes {networkOctets.join('.')} as Network ID & {broadcastOctets.join('.')} as Broadcast)
          </span>
        </div>
      </div>

      {/* Historical Classful Addressing Cheat Sheet (Slide 35) */}
      <div className="overflow-x-auto pt-1">
        <span className="text-[11px] font-mono text-[var(--text-secondary)] block mb-1 font-medium">Historical Classful Context (Slide 35):</span>
        <table className="w-full text-left font-mono text-[10px] border border-[var(--border-strong)] rounded-lg overflow-hidden">
          <thead className="bg-[var(--surface-muted)] text-[var(--foreground)]">
            <tr>
              <th className="p-1.5 border-b">Class</th>
              <th className="p-1.5 border-b">Leading Bits</th>
              <th className="p-1.5 border-b">Default Prefix</th>
              <th className="p-1.5 border-b">IPv4 Address Range</th>
              <th className="p-1.5 border-b">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-strong)] text-[var(--foreground)] bg-[var(--surface)]">
            <tr>
              <td className="p-1.5 font-medium">Class A</td>
              <td className="p-1.5">0</td>
              <td className="p-1.5">/8 (255.0.0.0)</td>
              <td className="p-1.5">0.0.0.0 – 127.255.255.255</td>
              <td className="p-1.5">Huge organizations (16M hosts)</td>
            </tr>
            <tr>
              <td className="p-1.5 font-medium">Class B</td>
              <td className="p-1.5">10</td>
              <td className="p-1.5">/16 (255.255.0.0)</td>
              <td className="p-1.5">128.0.0.0 – 191.255.255.255</td>
              <td className="p-1.5">Medium networks (65K hosts)</td>
            </tr>
            <tr className="bg-[var(--surface-muted)] font-medium text-[var(--accent)]">
              <td className="p-1.5 font-medium">Class C</td>
              <td className="p-1.5">110</td>
              <td className="p-1.5">/24 (255.255.255.0)</td>
              <td className="p-1.5">192.0.0.0 – 223.255.255.255</td>
              <td className="p-1.5">Small LANs (254 hosts)</td>
            </tr>
            <tr>
              <td className="p-1.5 font-medium">Class D</td>
              <td className="p-1.5">1110</td>
              <td className="p-1.5">N/A</td>
              <td className="p-1.5">224.0.0.0 – 239.255.255.255</td>
              <td className="p-1.5">Multicast streaming</td>
            </tr>
            <tr>
              <td className="p-1.5 font-medium">Class E</td>
              <td className="p-1.5">1111</td>
              <td className="p-1.5">N/A</td>
              <td className="p-1.5">240.0.0.0 – 255.255.255.255</td>
              <td className="p-1.5">Experimental / Reserved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});
