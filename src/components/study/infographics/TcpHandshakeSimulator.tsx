import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Zap, Server, Laptop, Activity } from 'lucide-react';

export const TcpHandshakeSimulator: React.FC = React.memo(() => {
  const [protocol, setProtocol] = useState<'tcp' | 'udp'>('tcp');
  const [handshakeStep, setHandshakeStep] = useState<number>(0);
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; name: string; status: 'pending' | 'in-transit' | 'delivered' | 'lost' | 'retransmitted' }>>([
    { id: 1, name: 'Segment 1 (Bytes 1-1000)', status: 'pending' },
    { id: 2, name: 'Segment 2 (Bytes 1001-2000)', status: 'pending' },
    { id: 3, name: 'Segment 3 (Bytes 2001-3000)', status: 'pending' },
  ]);
  const [simulateLoss, setSimulateLoss] = useState<boolean>(false);
  const [logMessages, setLogMessages] = useState<string[]>([
    'Protocol: TCP selected. Ready to initiate 3-Way Handshake.'
  ]);

  const addLog = (msg: string) => {
    setLogMessages(prev => [msg, ...prev.slice(0, 5)]);
  };

  const handleNextHandshakeStep = () => {
    if (handshakeStep === 0) {
      setHandshakeStep(1);
      addLog('Client ➔ Server: SYN (seq=100) "I want to connect with you!"');
    } else if (handshakeStep === 1) {
      setHandshakeStep(2);
      addLog('Server ➔ Client: SYN-ACK (seq=300, ack=101) "Received your SYN, I am ready too!"');
    } else if (handshakeStep === 2) {
      setHandshakeStep(3);
      addLog('Client ➔ Server: ACK (seq=101, ack=301) "Handshake complete! Connection ESTABLISHED."');
    }
  };

  const handleSendData = () => {
    if (protocol === 'tcp' && handshakeStep < 3) {
      addLog('⚠️ Cannot send data yet! TCP requires a completed 3-Way Handshake first.');
      return;
    }

    // Reset and transmit
    setDataPackets([
      { id: 1, name: protocol === 'tcp' ? 'Segment 1' : 'Datagram 1', status: 'in-transit' },
      { id: 2, name: protocol === 'tcp' ? 'Segment 2' : 'Datagram 2', status: 'in-transit' },
      { id: 3, name: protocol === 'tcp' ? 'Segment 3' : 'Datagram 3', status: 'in-transit' },
    ]);

    setTimeout(() => {
      if (simulateLoss) {
        if (protocol === 'tcp') {
          setDataPackets([
            { id: 1, name: 'Segment 1', status: 'delivered' },
            { id: 2, name: 'Segment 2 (LOST ✕)', status: 'lost' },
            { id: 3, name: 'Segment 3', status: 'delivered' },
          ]);
          addLog('❌ Segment 2 dropped on link! TCP Timer expired. Retransmitting Segment 2...');

          // TCP Retransmission
          setTimeout(() => {
            setDataPackets(prev => prev.map(p => p.id === 2 ? { ...p, name: 'Segment 2 (Retransmitted ✓)', status: 'retransmitted' } : p));
            addLog('✅ Segment 2 successfully retransmitted and acknowledged (ACK received)!');
          }, 1500);
        } else {
          // UDP simply loses the datagram
          setDataPackets([
            { id: 1, name: 'Datagram 1', status: 'delivered' },
            { id: 2, name: 'Datagram 2 (DROPPED)', status: 'lost' },
            { id: 3, name: 'Datagram 3', status: 'delivered' },
          ]);
          addLog('⚠️ Datagram 2 was lost. UDP does NOT retransmit! Stream keeps moving (timeliness over accuracy).');
        }
      } else {
        setDataPackets(prev => prev.map(p => ({ ...p, status: 'delivered' })));
        addLog(`✅ All ${protocol.toUpperCase()} packets delivered successfully!`);
      }
    }, 1200);
  };

  const handleReset = () => {
    setHandshakeStep(0);
    setDataPackets([
      { id: 1, name: 'Segment 1', status: 'pending' },
      { id: 2, name: 'Segment 2', status: 'pending' },
      { id: 3, name: 'Segment 3', status: 'pending' },
    ]);
    setLogMessages(['Reset completed. Ready.']);
  };

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-3">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Transport Layer Simulation</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">
            TCP 3-Way Handshake vs UDP Datagram Stream
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Compare Connection-Oriented reliability with Retransmission (TCP) vs Connectionless speed (UDP).
          </p>
        </div>

        {/* Protocol Switcher */}
        <div className="flex rounded-xl bg-[var(--surface-muted)] p-1 border border-[var(--border-strong)]">
          <Button variant="ghost"
            onClick={() => { setProtocol('tcp'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              protocol === 'tcp' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)]'
            }`}
          >
            TCP (Reliable)
          </Button>
          <Button variant="ghost"
            onClick={() => { setProtocol('udp'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              protocol === 'udp' ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none' : 'text-[var(--foreground)]'
            }`}
          >
            UDP (Connectionless)
          </Button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--accent)] p-4 sm:p-6 text-[var(--accent-foreground)] space-y-5">
        {/* Endpoints */}
        <div className="flex items-center justify-between px-4 sm:px-10">
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-[var(--accent)] border border-[var(--border-strong)] shadow-none">
              <Laptop className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <span className="font-medium text-xs mt-2">Client (Sender)</span>
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">192.168.1.10:54321</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-[var(--accent)] border border-[var(--border-strong)] shadow-none">
              <Server className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <span className="font-medium text-xs mt-2">Server (Web/App)</span>
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">93.184.216.34:443</span>
          </div>
        </div>

        {/* Handshake Visualizer for TCP */}
        {protocol === 'tcp' && (
          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--accent)] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--accent)] font-medium">1. TCP 3-Way Handshake Connection Setup:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                handshakeStep === 3 ? 'bg-[var(--accent)] text-[var(--success)] border border-[var(--border-strong)]' : 'bg-[var(--accent)] text-[var(--text-secondary)]'
              }`}>
                {handshakeStep === 3 ? 'ESTABLISHED ✓' : `Step ${handshakeStep} of 3`}
              </span>
            </div>

            {/* Handshake Sequence Graphic */}
            <div className="space-y-2 text-xs font-mono">
              {/* Step 1: SYN */}
              <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                handshakeStep >= 1 ? 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--accent)]' : 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--text-secondary)]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center text-[10px] font-medium">1</span>
                  <span>Client ➔ Server: <strong>SYN</strong> (seq=100)</span>
                </div>
                {handshakeStep >= 1 && <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />}
              </div>

              {/* Step 2: SYN-ACK */}
              <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                handshakeStep >= 2 ? 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--accent)]' : 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--text-secondary)]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center text-[10px] font-medium">2</span>
                  <span>Server ➔ Client: <strong>SYN-ACK</strong> (seq=300, ack=101)</span>
                </div>
                {handshakeStep >= 2 && <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />}
              </div>

              {/* Step 3: ACK */}
              <div className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                handshakeStep >= 3 ? 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--success)]' : 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--text-secondary)]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center text-[10px] font-medium">3</span>
                  <span>Client ➔ Server: <strong>ACK</strong> (seq=101, ack=301)</span>
                </div>
                {handshakeStep >= 3 && <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />}
              </div>
            </div>

            {handshakeStep < 3 && (
              <Button variant="ghost"
                onClick={handleNextHandshakeStep}
                className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] font-medium rounded-xl text-xs transition-all shadow-none"
              >
                Perform Next Handshake Step ({handshakeStep + 1}/3)
              </Button>
            )}
          </div>
        )}

        {/* Data Transfer Section */}
        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--accent)] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[var(--accent)] font-medium">2. Data Payload Transfer Simulation:</span>
            <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={simulateLoss}
                onChange={(e) => setSimulateLoss(e.target.checked)}
                className="rounded border-[var(--border-strong)] bg-[var(--accent)] text-[var(--accent)] focus:ring-[var(--border-strong)]"
              />
              <span>Simulate Packet Loss / Congestion</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {dataPackets.map(p => {
              let bg = 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--text-secondary)]';
              if (p.status === 'in-transit') bg = 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--accent)] animate-pulse';
              if (p.status === 'delivered') bg = 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--success)]';
              if (p.status === 'lost') bg = 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--danger)]';
              if (p.status === 'retransmitted') bg = 'bg-[var(--accent)] border-[var(--border-strong)] text-[var(--accent)] font-medium';

              return (
                <div key={p.id} className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${bg}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[10px] uppercase tracking-wider">{p.status}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">
                    {protocol === 'tcp' ? 'ACK expected' : 'Fire & forget'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button variant="ghost"
              onClick={handleSendData}
              className="flex-1 py-2 bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--foreground)] font-medium rounded-xl text-xs transition-all shadow-none"
            >
              Transmit {protocol.toUpperCase()} Data
            </Button>
            <Button variant="ghost"
              onClick={handleReset}
              className="px-3 py-2 bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--text-secondary)] rounded-xl text-xs font-mono border border-[var(--border-strong)]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Live Packet Log Console */}
        <div className="p-3 rounded-xl bg-[var(--accent)] border border-[var(--border-strong)] font-mono text-[11px] text-[var(--text-secondary)] space-y-1">
          <span className="text-[var(--text-secondary)] font-medium uppercase text-[9px] block">Live Protocol Event Log:</span>
          {logMessages.map((log, i) => (
            <div key={i} className={i === 0 ? 'text-[var(--accent)] font-medium' : 'opacity-60'}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid (Slide 42 & 43) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="p-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] space-y-1.5">
          <span className="font-medium text-[var(--accent)] block">TCP (Transmission Control Protocol)</span>
          <ul className="list-disc list-inside text-[var(--foreground)] space-y-0.5 text-[11px]">
            <li><strong>Connection-oriented:</strong> 3-Way Handshake before sending data</li>
            <li><strong>Guaranteed Delivery:</strong> ACKs & automatic retransmission</li>
            <li><strong>Ordered Stream:</strong> Packets reassembled via Sequence numbers</li>
            <li><strong>Best For:</strong> Web pages (HTTP/HTTPS), Email (SMTP), File Transfer (FTP)</li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] space-y-1.5">
          <span className="font-medium text-[var(--warning)] block">UDP (User Datagram Protocol)</span>
          <ul className="list-disc list-inside text-[var(--foreground)] space-y-0.5 text-[11px]">
            <li><strong>Connectionless:</strong> No handshake setup delay</li>
            <li><strong>No Retransmission:</strong> Lost packets are dropped, no waiting</li>
            <li><strong>Low Overhead:</strong> Minimal header size (8 bytes vs 20 bytes)</li>
            <li><strong>Best For:</strong> Real-time Voice/Video calls, DNS Lookups, Online Gaming</li>
          </ul>
        </div>
      </div>
    </div>
  );
});
