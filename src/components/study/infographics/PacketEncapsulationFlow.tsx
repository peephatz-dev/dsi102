import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, CheckCircle2, FileText, ChevronRight, ChevronLeft, RefreshCw, Cpu, Globe } from 'lucide-react';

interface LayerPdu {
  layerName: string;
  tcpIpLayer: string;
  pduName: string;
  headerAdded: string;
  fields: Array<{ name: string; value: string; color: string }>;
  description: string;
  thaiDesc: string;
}

export const PacketEncapsulationFlow: React.FC = React.memo(() => {
  const [direction, setDirection] = useState<'encapsulate' | 'decapsulate'>('encapsulate');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: LayerPdu[] = [
    {
      layerName: 'Application Layer (L7)',
      tcpIpLayer: 'Application',
      pduName: 'Data / Message',
      headerAdded: 'Payload (HTTP Request)',
      fields: [
        { name: 'Method', value: 'GET /index.html HTTP/1.1', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Host', value: 'www.example.com', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
      ],
      description: 'The browser or app generates the raw user-facing application request data.',
      thaiDesc: 'เบราว์เซอร์สร้างข้อความ Request เช่น คำขอเปิดหน้าเว็บ HTTP GET'
    },
    {
      layerName: 'Transport Layer (L4)',
      tcpIpLayer: 'Transport',
      pduName: 'Segment (TCP) / Datagram (UDP)',
      headerAdded: 'TCP Header',
      fields: [
        { name: 'Src Port', value: '54321', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Dst Port', value: '443 (HTTPS)', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Seq #', value: '1001', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Flags', value: 'SYN / ACK', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
      ],
      description: 'Adds port numbers to address the specific application process, sequence numbers, and reliability controls.',
      thaiDesc: 'ห่อหุ้ม TCP Header ระบุ Port ต้นทาง-ปลายทาง และลำดับ Sequence Number'
    },
    {
      layerName: 'Network / Internet Layer (L3)',
      tcpIpLayer: 'Internet',
      pduName: 'Packet (IP Datagram)',
      headerAdded: 'IPv4 / IPv6 Header',
      fields: [
        { name: 'Source IP', value: '192.168.1.10', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Destination IP', value: '93.184.216.34', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'TTL', value: '64 hops', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
        { name: 'Protocol', value: '6 (TCP)', color: 'bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--border-strong)]' },
      ],
      description: 'Adds logical IP addresses and TTL. Enables routers to inspect and navigate the packet across different networks.',
      thaiDesc: 'ห่อหุ้ม IP Header ระบุที่อยู่ IP ต้นทาง-ปลายทาง เพื่อให้ Router ส่งข้ามเครือข่ายได้'
    },
    {
      layerName: 'Data Link Layer (L2)',
      tcpIpLayer: 'Network Access',
      pduName: 'Frame (Ethernet / Wi-Fi)',
      headerAdded: 'Ethernet Header + FCS Trailer',
      fields: [
        { name: 'Src MAC', value: '00:1A:2B:3C:4D:01', color: 'bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border-strong)]' },
        { name: 'Dst MAC', value: 'E4:C7:22:9A:F0:11 (Next Hop)', color: 'bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border-strong)]' },
        { name: 'EtherType', value: '0x0800 (IPv4)', color: 'bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border-strong)]' },
        { name: 'FCS Trailer', value: 'CRC32 Checksum', color: 'bg-[var(--surface-muted)] text-[var(--danger)] border-[var(--border-strong)]' },
      ],
      description: 'Wraps the packet into a frame for local physical hop delivery with MAC addresses and an error-checking FCS trailer.',
      thaiDesc: 'ห่อหุ้มหัว Frame (MAC Address) และส่วนท้าย FCS Trailer (CRC ตรวจสอบความถูกต้อง)'
    },
    {
      layerName: 'Physical Layer (L1)',
      tcpIpLayer: 'Network Access',
      pduName: 'Bits / Signal Pulses',
      headerAdded: 'Physical Encoding (0s and 1s)',
      fields: [
        { name: 'Bitstream', value: '01001000 01100101 01101100 01101100 01101111...', color: 'bg-[var(--surface-muted)] text-[var(--warning)] border-[var(--border-strong)]' },
        { name: 'Medium', value: 'Voltages (Copper) / Photons (Fiber) / Radio waves (Wi-Fi)', color: 'bg-[var(--surface-muted)] text-[var(--warning)] border-[var(--border-strong)]' }
      ],
      description: 'Converts raw framed data into physical electrical voltages, optical light pulses, or radio waves onto the transmission medium.',
      thaiDesc: 'แปลงข้อมูลเฟรมเป็นสัญญาณบิต 0 และ 1 (กระแสไฟฟ้า, แสงไฟเบอร์, หรือคลื่นวิทยุ)'
    }
  ];

  const activePdu = steps[currentStep];

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-3">
        <div>
          <span className="text-xs font-medium tracking-wider text-pink-600 uppercase">Interactive Protocol Data Unit (PDU) Engine</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">
            Encapsulation (Sender) & Decapsulation (Receiver)
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Watch headers wrap around application payload layer-by-layer, changing from Data → Segment → Packet → Frame → Bits.
          </p>
        </div>

        {/* Direction Switcher */}
        <div className="flex rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)]">
          <Button variant="ghost"
            onClick={() => { setDirection('encapsulate'); setCurrentStep(0); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              direction === 'encapsulate' ? 'bg-pink-600 text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)]'
            }`}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span>Encapsulation (Sender Tx)</span>
          </Button>
          <Button variant="ghost"
            onClick={() => { setDirection('decapsulate'); setCurrentStep(4); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              direction === 'decapsulate' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)]'
            }`}
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Decapsulation (Receiver Rx)</span>
          </Button>
        </div>
      </div>

      {/* Interactive Step Timeline Bar */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((st, idx) => {
          const isActive = currentStep === idx;
          const isCompleted = direction === 'encapsulate' ? idx <= currentStep : idx >= currentStep;
          return (
            <Button variant="ghost"
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`p-2 rounded-xl text-left border transition-all text-xs ${
                isActive
                  ? 'border-pink-500 bg-pink-50 text-pink-950 font-medium ring-2 ring-pink-300'
                  : isCompleted
                  ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--foreground)]'
                  : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-secondary)] opacity-60'
              }`}
            >
              <span className="text-[10px] font-mono text-[var(--text-secondary)] block">Step {idx + 1}</span>
              <span className="font-medium block truncate">{st.pduName.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>

      {/* Visual Encapsulated Package Canvas */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--accent)] p-5 sm:p-7 text-[var(--accent-foreground)] space-y-4 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 font-medium">
              {activePdu.layerName}
            </span>
            <span className="text-[var(--text-secondary)]">TCP/IP: {activePdu.tcpIpLayer}</span>
          </div>
          <span className="text-[var(--accent)] font-medium">PDU Name: {activePdu.pduName}</span>
        </div>

        {/* Dynamic Nested Visual Packet */}
        <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--accent)] p-4 sm:p-5 space-y-3">
          <div className="text-[11px] font-mono text-[var(--text-secondary)]">Layer {5 - currentStep} Envelope Representation:</div>

          <div className="flex flex-wrap items-stretch gap-1.5 justify-center">
            {/* Ethernet Header (if step >= 3) */}
            {currentStep >= 3 && (
              <div className="bg-[var(--accent)] border-2 border-[var(--border-strong)] p-2.5 rounded-xl text-center min-w-28 animate-scale-in">
                <span className="text-[10px] text-[var(--text-secondary)] font-mono block">Data Link</span>
                <span className="text-xs font-medium text-[var(--text-secondary)] block">Ethernet Header</span>
                <span className="text-[9px] text-[var(--text-secondary)] font-mono">MAC Addrs</span>
              </div>
            )}

            {/* IP Header (if step >= 2) */}
            {currentStep >= 2 && (
              <div className="bg-[var(--accent)] border-2 border-[var(--border-strong)] p-2.5 rounded-xl text-center min-w-28 animate-scale-in">
                <span className="text-[10px] text-[var(--accent)] font-mono block">Network</span>
                <span className="text-xs font-medium text-[var(--accent)] block">IP Header</span>
                <span className="text-[9px] text-[var(--accent)] font-mono">IP Addrs + TTL</span>
              </div>
            )}

            {/* TCP Header (if step >= 1) */}
            {currentStep >= 1 && (
              <div className="bg-[var(--accent)] border-2 border-[var(--border-strong)] p-2.5 rounded-xl text-center min-w-28 animate-scale-in">
                <span className="text-[10px] text-[var(--accent)] font-mono block">Transport</span>
                <span className="text-xs font-medium text-[var(--accent)] block">TCP Header</span>
                <span className="text-[9px] text-[var(--accent)] font-mono">Ports: 54321 → 443</span>
              </div>
            )}

            {/* Application Data Payload */}
            <div className="bg-[var(--accent)] border-2 border-[var(--border-strong)] p-2.5 rounded-xl text-center flex-1 min-w-44 animate-scale-in">
              <span className="text-[10px] text-[var(--accent)] font-mono block">Application</span>
              <span className="text-xs font-medium text-[var(--accent)] block">User Data Payload</span>
              <span className="text-[9px] text-[var(--accent)] font-mono">GET /index.html HTTP/1.1</span>
            </div>

            {/* FCS Trailer (if step >= 3) */}
            {currentStep >= 3 && (
              <div className="bg-[var(--accent)] border-2 border-[var(--border-strong)] p-2.5 rounded-xl text-center min-w-24 animate-scale-in">
                <span className="text-[10px] text-[var(--danger)] font-mono block">Trailer</span>
                <span className="text-xs font-medium text-[var(--danger)] block">FCS (CRC)</span>
                <span className="text-[9px] text-[var(--danger)] font-mono">Error Check</span>
              </div>
            )}
          </div>

          {/* Physical Bits stream if step 4 */}
          {currentStep === 4 && (
            <div className="mt-3 p-3 rounded-xl bg-[var(--accent)] border border-[var(--border-strong)] text-center font-mono text-xs text-[var(--warning)] space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[var(--warning)] block font-medium">Physical Medium Bitstream:</span>
              <p className="tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
                01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100
              </p>
            </div>
          )}
        </div>

        {/* Layer Header Fields Inspector */}
        <div className="space-y-2">
          <span className="text-xs text-[var(--text-secondary)] font-mono block">
            Inspecting Fields added at this layer:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {activePdu.fields.map((f, i) => (
              <div key={i} className={`p-2.5 rounded-xl border text-xs font-mono space-y-0.5 ${f.color}`}>
                <span className="text-[10px] block opacity-75">{f.name}</span>
                <span className="font-medium block truncate">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-strong)]">
          <Button variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)] text-xs px-3.5 py-1.5 font-medium disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Layer</span>
          </Button>

          <span className="text-xs font-mono text-[var(--text-secondary)]">
            Layer {currentStep + 1} of 5
          </span>

          <Button variant="ghost"
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-1 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs px-4 py-1.5 font-medium text-[var(--accent-foreground)] disabled:opacity-40"
          >
            <span>Next Layer</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] text-xs space-y-1">
        <div className="font-medium text-[var(--foreground)]">{activePdu.description}</div>
        <div className="text-[var(--text-secondary)] font-medium">{activePdu.thaiDesc}</div>
      </div>
    </div>
  );
});
