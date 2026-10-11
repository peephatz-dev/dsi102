import { Button } from '../../arc/button/button';
import React, { useState } from 'react';
import { Volume2, Radio, Activity, ShieldCheck, Zap } from 'lucide-react';

export const AnalogDigitalWave: React.FC = React.memo(() => {
  const [samplingRate, setSamplingRate] = useState<number>(16);
  const [noiseLevel, setNoiseLevel] = useState<boolean>(false);
  const [activeSignal, setActiveSignal] = useState<'both' | 'analog' | 'digital'>('both');

  const width = 600;
  const height = 140;
  const midY = height / 2;
  const amplitude = 45;

  const getAnalogY = (x: number) => {
    const raw = Math.sin((x / width) * Math.PI * 4) * amplitude;
    const noise = noiseLevel ? (Math.sin(x * 0.4) * 8 + Math.cos(x * 0.9) * 6) : 0;
    return midY - raw - noise;
  };

  const analogPoints: string[] = [];
  for (let x = 0; x <= width; x += 3) {
    analogPoints.push(`${x},${getAnalogY(x).toFixed(1)}`);
  }
  const analogD = `M ${analogPoints.join(' L ')}`;

  const stepWidth = width / samplingRate;
  const digitalPoints: string[] = [];
  for (let i = 0; i < samplingRate; i++) {
    const startX = i * stepWidth;
    const endX = (i + 1) * stepWidth;
    const sampleY = getAnalogY(startX + stepWidth / 2);
    const discreteLevels = [25, 55, 85, 115];
    const quantizedY = discreteLevels.reduce((prev, curr) =>
      Math.abs(curr - sampleY) < Math.abs(prev - sampleY) ? curr : prev
    );

    if (i === 0) {
      digitalPoints.push(`M ${startX},${quantizedY}`);
    } else {
      digitalPoints.push(`L ${startX},${quantizedY}`);
    }
    digitalPoints.push(`L ${endX},${quantizedY}`);
  }
  const digitalD = digitalPoints.join(' ');

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Signal Representation</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">Analog (Continuous) vs. Digital (Discrete Stepped)</h4>
          <p className="text-xs text-[var(--text-secondary)]">See how Sampling & Quantization convert infinite smooth waves into robust binary thresholds.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost"
            onClick={() => setNoiseLevel(!noiseLevel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              noiseLevel
                ? 'bg-[var(--surface-muted)] text-[var(--warning)] border border-[var(--border-strong)]'
                : 'bg-[var(--surface-muted)] text-[var(--foreground)] hover:text-[var(--foreground)] border border-[var(--border-strong)]'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>{noiseLevel ? 'Electrical Noise ON' : 'Inject Noise'}</span>
          </Button>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="my-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
          <line x1="0" y1={midY} x2={width} y2={midY} stroke="var(--text-secondary)" strokeDasharray="4" strokeWidth="1" />
          <line x1="0" y1="25" x2={width} y2="25" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="55" x2={width} y2="55" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="85" x2={width} y2="85" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="115" x2={width} y2="115" stroke="var(--border)" strokeWidth="1" />

          {/* Analog continuous wave */}
          {(activeSignal === 'both' || activeSignal === 'analog') && (
            <path
              d={analogD}
              fill="none"
              stroke="var(--warning)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Digital stepped stairs */}
          {(activeSignal === 'both' || activeSignal === 'digital') && (
            <path
              d={digitalD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-4">
            <Button variant="ghost"
              onClick={() => setActiveSignal(activeSignal === 'analog' ? 'both' : 'analog')}
              className={`flex items-center gap-1.5 ${activeSignal === 'analog' || activeSignal === 'both' ? 'text-[var(--warning)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              <span>Analog Wave (Smooth Continuous)</span>
            </Button>
            <Button variant="ghost"
              onClick={() => setActiveSignal(activeSignal === 'digital' ? 'both' : 'digital')}
              className={`flex items-center gap-1.5 ${activeSignal === 'digital' || activeSignal === 'both' ? 'text-[var(--accent)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              <span>Digital Signal (Quantized Discrete)</span>
            </Button>
          </div>

          <span className="font-mono text-[var(--text-secondary)]">
            {samplingRate} Samples across time domain
          </span>
        </div>
      </div>

      {/* Sampling Rate Slider */}
      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-4">
        <div className="flex items-center justify-between text-xs text-[var(--foreground)]">
          <span className="font-medium">Adjust Sampling Frequency (ความถี่ในการสุ่มตัวอย่าง):</span>
          <span className="font-mono font-medium text-[var(--accent)]">{samplingRate} Hz</span>
        </div>
        <input
          type="range"
          min="6"
          max="48"
          step="2"
          value={samplingRate}
          onChange={(e) => setSamplingRate(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--accent)] cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-[10px] text-[var(--text-secondary)] font-mono">
          <span>Low (6 Hz - Blocky / Aliasing)</span>
          <span>Balanced (16-24 Hz)</span>
          <span>High Fidelity (48 Hz - Precise)</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3">
          <p className="font-medium text-[var(--warning)]">Analog Vulnerability: Cumulative Noise</p>
          <p className="mt-1 text-[var(--foreground)] leading-relaxed">
            Toggle "Inject Noise" to see how slight electrical noise directly distorts the continuous analog signal. Each copy or cable length further degrades the original waveform.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3">
          <p className="font-medium text-[var(--accent)]">Digital: การอ่านค่าตามระดับและ threshold</p>
          <p className="mt-1 text-[var(--foreground)] leading-relaxed">
            ตัวรับดิจิทัลสามารถอ่านค่าระดับเดิมได้เมื่อ noise ยังไม่ทำให้ข้าม threshold แต่ noise ที่มากพออาจทำให้เกิด bit error และการสุ่มตัวอย่าง/quantization ไม่ได้คืนรายละเอียดของสัญญาณ analog ได้สมบูรณ์ทุกกรณี
          </p>
        </div>
      </div>
    </div>
  );
});
