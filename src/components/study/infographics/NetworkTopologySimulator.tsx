import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Network, Activity, ShieldAlert, CheckCircle, RefreshCw, Zap, Server, Laptop } from 'lucide-react';

type TopologyType = 'bus' | 'star' | 'ring' | 'mesh' | 'tree';

interface NodeItem {
  id: string;
  name: string;
  x: number;
  y: number;
  isHub?: boolean;
}

export const NetworkTopologySimulator: React.FC = React.memo(() => {
  const [topology, setTopology] = useState<TopologyType>('star');
  const [brokenElement, setBrokenElement] = useState<string | null>(null);
  const [packetProgress, setPacketProgress] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [transmissionStatus, setTransmissionStatus] = useState<string>('Ready to test packet delivery.');

  const topologiesConfig: Record<TopologyType, {
    title: string;
    thaiTitle: string;
    faultTolerance: 'Low' | 'Moderate' | 'High';
    complexity: 'Low' | 'Low–Moderate' | 'Moderate' | 'High';
    description: string;
    nodes: NodeItem[];
    links: [string, string][];
  }> = {
    bus: {
      title: 'Bus Topology',
      thaiTitle: 'โครงสร้างแบบบัส (Shared Backbone)',
      faultTolerance: 'Low',
      complexity: 'Low',
      description: 'Devices share a single central trunk backbone cable. If the backbone breaks, all communications fail immediately.',
      nodes: [
        { id: 'b_t1', name: 'Terminator L', x: 40, y: 110 },
        { id: 'b1', name: 'PC 1', x: 120, y: 50 },
        { id: 'b2', name: 'PC 2', x: 220, y: 170 },
        { id: 'b3', name: 'PC 3', x: 320, y: 50 },
        { id: 'b4', name: 'PC 4', x: 420, y: 170 },
        { id: 'b_t2', name: 'Terminator R', x: 500, y: 110 },
      ],
      links: [
        ['b_t1', 'b1'], ['b1', 'b2'], ['b2', 'b3'], ['b3', 'b4'], ['b4', 'b_t2']
      ]
    },
    star: {
      title: 'Star Topology',
      thaiTitle: 'โครงสร้างแบบดาว (Central Switch)',
      faultTolerance: 'Moderate',
      complexity: 'Low–Moderate',
      description: 'All nodes connect to a central switch. If one client cable breaks, only that client fails. If the switch fails, the entire network is down.',
      nodes: [
        { id: 's_hub', name: 'Central Switch', x: 270, y: 110, isHub: true },
        { id: 's1', name: 'PC 1 (Sender)', x: 100, y: 50 },
        { id: 's2', name: 'PC 2', x: 440, y: 50 },
        { id: 's3', name: 'PC 3 (Target)', x: 440, y: 170 },
        { id: 's4', name: 'PC 4', x: 100, y: 170 },
      ],
      links: [
        ['s1', 's_hub'], ['s2', 's_hub'], ['s3', 's_hub'], ['s4', 's_hub']
      ]
    },
    ring: {
      title: 'Ring Topology',
      thaiTitle: 'โครงสร้างแบบวงแหวน (Closed Loop)',
      faultTolerance: 'Moderate',
      complexity: 'Moderate',
      description: 'Each device connects to exactly two neighbors forming a loop. A single cable break halts token circulation unless dual counter-rotating rings are used.',
      nodes: [
        { id: 'r1', name: 'Node 1 (Sender)', x: 270, y: 40 },
        { id: 'r2', name: 'Node 2', x: 430, y: 80 },
        { id: 'r3', name: 'Node 3 (Target)', x: 400, y: 180 },
        { id: 'r4', name: 'Node 4', x: 140, y: 180 },
        { id: 'r5', name: 'Node 5', x: 110, y: 80 },
      ],
      links: [
        ['r1', 'r2'], ['r2', 'r3'], ['r3', 'r4'], ['r4', 'r5'], ['r5', 'r1']
      ]
    },
    mesh: {
      title: 'Mesh Topology',
      thaiTitle: 'โครงสร้างแบบเมช (Full Redundancy)',
      faultTolerance: 'High',
      complexity: 'High',
      description: 'Multiple redundant links interconnect nodes directly. If any link is severed, packets automatically reroute along alternative paths without disruption.',
      nodes: [
        { id: 'm1', name: 'Node A (Sender)', x: 130, y: 50 },
        { id: 'm2', name: 'Node B', x: 410, y: 50 },
        { id: 'm3', name: 'Node C (Target)', x: 410, y: 170 },
        { id: 'm4', name: 'Node D', x: 130, y: 170 },
      ],
      links: [
        ['m1', 'm2'], ['m2', 'm3'], ['m3', 'm4'], ['m4', 'm1'],
        ['m1', 'm3'], ['m2', 'm4']
      ]
    },
    tree: {
      title: 'Tree Topology',
      thaiTitle: 'โครงสร้างแบบต้นไม้ (Hierarchical Star)',
      faultTolerance: 'Moderate',
      complexity: 'Moderate',
      description: 'A hierarchy of switches where secondary switches connect to a root core switch. If the root switch fails, communication across subtrees is severed.',
      nodes: [
        { id: 't_root', name: 'Core Switch', x: 270, y: 40, isHub: true },
        { id: 't_sw1', name: 'Floor 1 Switch', x: 160, y: 110, isHub: true },
        { id: 't_sw2', name: 'Floor 2 Switch', x: 380, y: 110, isHub: true },
        { id: 't_pc1', name: 'PC 1A', x: 100, y: 180 },
        { id: 't_pc2', name: 'PC 1B', x: 210, y: 180 },
        { id: 't_pc3', name: 'PC 2A', x: 330, y: 180 },
        { id: 't_pc4', name: 'PC 2B', x: 440, y: 180 },
      ],
      links: [
        ['t_root', 't_sw1'], ['t_root', 't_sw2'],
        ['t_sw1', 't_pc1'], ['t_sw1', 't_pc2'],
        ['t_sw2', 't_pc3'], ['t_sw2', 't_pc4']
      ]
    }
  };

  const current = topologiesConfig[topology];

  const handleSendPacket = () => {
    if (isSending) return;
    setIsSending(true);
    setPacketProgress(0);

    // Simulate packet journey
    const interval = setInterval(() => {
      setPacketProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);

          // Evaluate delivery based on broken elements
          if (brokenElement) {
            if (topology === 'bus') {
              setTransmissionStatus('❌ Delivery Failed! Bus backbone broken: signal reflected or lost.');
            } else if (topology === 'star' && brokenElement === 's_hub') {
              setTransmissionStatus('❌ Delivery Failed! Central Switch is down — network collapsed.');
            } else if (topology === 'star' && (brokenElement === 's1' || brokenElement === 's3')) {
              setTransmissionStatus('❌ Delivery Failed! The sender or receiver link is severed.');
            } else if (topology === 'ring') {
              setTransmissionStatus('❌ Delivery Failed! Ring circuit broken — token cannot complete traversal.');
            } else if (topology === 'mesh') {
              setTransmissionStatus('✅ Delivery Succeeded! Mesh topology successfully rerouted around broken link!');
            } else if (topology === 'tree' && brokenElement === 't_root') {
              setTransmissionStatus('❌ Delivery Failed! Core root switch failed — subtrees cannot communicate.');
            } else {
              setTransmissionStatus('✅ Delivered! Secondary component down, but target route remained intact.');
            }
          } else {
            setTransmissionStatus('✅ Packet Delivered Successfully! All nodes acknowledged receipt.');
          }
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const toggleBreak = (id: string) => {
    if (brokenElement === id) {
      setBrokenElement(null);
      setTransmissionStatus('Component restored. Ready to send packet.');
    } else {
      setBrokenElement(id);
      setTransmissionStatus(`Simulated fault on: ${id}. Click "Send Packet" to test impact.`);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 sm:p-6 shadow-none space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-strong)] pb-3">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Interactive Network Topology Simulator</span>
          <h4 className="text-base sm:text-lg font-medium text-[var(--foreground)] mt-0.5">{current.title} — {current.thaiTitle}</h4>
          <p className="text-xs text-[var(--text-secondary)]">Click any node or link to simulate a failure, then send a packet to test fault tolerance.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-1.5">
          {(['star', 'bus', 'ring', 'mesh', 'tree'] as TopologyType[]).map(t => (
            <Button variant="ghost"
              key={t}
              onClick={() => {
                setTopology(t);
                setBrokenElement(null);
                setPacketProgress(0);
                setTransmissionStatus('Topology switched. Ready to test.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                topology === t
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none'
                  : 'bg-[var(--surface-muted)] border border-[var(--border-strong)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* SVG Visualization Canvas */}
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--accent)] p-4 overflow-hidden">
        {/* SVG Links & Nodes */}
        <svg viewBox="0 0 540 220" className="w-full h-48 sm:h-56">
          {/* Links */}
          {current.links.map(([fromId, toId], idx) => {
            const fromNode = current.nodes.find(n => n.id === fromId);
            const toNode = current.nodes.find(n => n.id === toId);
            if (!fromNode || !toNode) return null;

            const isLinkBroken = brokenElement === `${fromId}-${toId}` || brokenElement === fromId || brokenElement === toId;

            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isLinkBroken ? 'var(--danger)' : 'var(--accent)'}
                  strokeWidth={isLinkBroken ? 2 : 2.5}
                  strokeDasharray={isLinkBroken ? '4 4' : 'none'}
                  className="transition-all duration-300"
                />
                {/* Packet animation dot */}
                {isSending && !isLinkBroken && (
                  <circle
                    cx={fromNode.x + (toNode.x - fromNode.x) * (packetProgress / 100)}
                    cy={fromNode.y + (toNode.y - fromNode.y) * (packetProgress / 100)}
                    r="4.5"
                    fill="var(--accent)"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {current.nodes.map(node => {
            const isBroken = brokenElement === node.id;
            return (
              <g
                key={node.id}
                onClick={() => toggleBreak(node.id)}
                className="cursor-pointer group"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isHub ? 16 : 13}
                  fill={isBroken ? 'var(--danger)' : node.isHub ? 'var(--accent)' : 'var(--surface-muted)'}
                  stroke={isBroken ? 'var(--danger)' : node.isHub ? 'var(--accent)' : 'var(--border-strong)'}
                  strokeWidth={2}
                  className="transition-all duration-300 group-hover:scale-110"
                />
                <text
                  x={node.x}
                  y={node.y + (node.y > 110 ? 25 : -20)}
                  textAnchor="middle"
                  fill={isBroken ? 'var(--danger)' : 'var(--text-secondary)'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.name} {isBroken ? '(FAULT ✕)' : ''}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Action button overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Button variant="ghost"
            onClick={handleSendPacket}
            disabled={isSending}
            className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--surface-muted)] text-[var(--foreground)] font-medium px-4 py-2 text-xs shadow-none disabled:opacity-50 transition-all"
          >
            <Zap className="h-3.5 w-3.5 fill-[var(--border-strong)]" />
            <span>{isSending ? 'Transmitting...' : 'Send Test Packet'}</span>
          </Button>

          {brokenElement && (
            <Button variant="ghost"
              onClick={() => setBrokenElement(null)}
              className="flex items-center gap-1 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent)] text-[var(--accent-foreground)] font-mono text-xs px-3 py-2 border border-[var(--border-strong)]"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Faults</span>
            </Button>
          )}
        </div>
      </div>

      {/* Real-time Status Alert */}
      <div className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${
        transmissionStatus.includes('✅')
          ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--success)]'
          : transmissionStatus.includes('❌')
          ? 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--danger)]'
          : 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--foreground)]'
      }`}>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 shrink-0 text-[var(--accent)]" />
          <span>{transmissionStatus}</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0">Click any node in the diagram to simulate failure</span>
      </div>

      {/* Metrics & Comparison Table */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs space-y-1">
          <span className="text-[var(--text-secondary)] font-mono">Fault Tolerance:</span>
          <div className="font-medium text-[var(--foreground)] flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${
              current.faultTolerance === 'High' ? 'bg-[var(--accent)]' : current.faultTolerance === 'Moderate' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
            }`} />
            <span>{current.faultTolerance}</span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs space-y-1">
          <span className="text-[var(--text-secondary)] font-mono">Installation Complexity:</span>
          <div className="font-medium text-[var(--foreground)]">{current.complexity}</div>
        </div>

        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs space-y-1">
          <span className="text-[var(--text-secondary)] font-mono">Key Takeaway:</span>
          <div className="text-[var(--foreground)] text-[11px] leading-tight font-medium">{current.description}</div>
        </div>
      </div>
    </div>
  );
});
