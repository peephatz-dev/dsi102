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
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Signal Representation</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Analog (Continuous) vs. Digital (Discrete Stepped)</h4>
          <p className="text-xs text-slate-500">See how Sampling & Quantization convert infinite smooth waves into robust binary thresholds.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNoiseLevel(!noiseLevel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              noiseLevel
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>{noiseLevel ? 'Electrical Noise ON' : 'Inject Noise'}</span>
          </button>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-3 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
          <line x1="0" y1={midY} x2={width} y2={midY} stroke="#cbd5e1" strokeDasharray="4" strokeWidth="1" />
          <line x1="0" y1="25" x2={width} y2="25" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="55" x2={width} y2="55" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="85" x2={width} y2="85" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="115" x2={width} y2="115" stroke="#e2e8f0" strokeWidth="1" />

          {/* Analog continuous wave */}
          {(activeSignal === 'both' || activeSignal === 'analog') && (
            <path
              d={analogD}
              fill="none"
              stroke="#d97706"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Digital stepped stairs */}
          {(activeSignal === 'both' || activeSignal === 'digital') && (
            <path
              d={digitalD}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSignal(activeSignal === 'analog' ? 'both' : 'analog')}
              className={`flex items-center gap-1.5 ${activeSignal === 'analog' || activeSignal === 'both' ? 'text-amber-700 font-semibold' : 'text-slate-400'}`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
              <span>Analog Wave (Smooth Continuous)</span>
            </button>
            <button
              onClick={() => setActiveSignal(activeSignal === 'digital' ? 'both' : 'digital')}
              className={`flex items-center gap-1.5 ${activeSignal === 'digital' || activeSignal === 'both' ? 'text-blue-700 font-semibold' : 'text-slate-400'}`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              <span>Digital Signal (Quantized Discrete)</span>
            </button>
          </div>

          <span className="font-mono text-slate-500">
            {samplingRate} Samples across time domain
          </span>
        </div>
      </div>

      {/* Sampling Rate Slider */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-center justify-between text-xs text-slate-700">
          <span className="font-medium">Adjust Sampling Frequency (ความถี่ในการสุ่มตัวอย่าง):</span>
          <span className="font-mono font-bold text-blue-700">{samplingRate} Hz</span>
        </div>
        <input
          type="range"
          min="6"
          max="48"
          step="2"
          value={samplingRate}
          onChange={(e) => setSamplingRate(Number(e.target.value))}
          className="mt-2 w-full accent-blue-600 cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Low (6 Hz - Blocky / Aliasing)</span>
          <span>Balanced (16-24 Hz)</span>
          <span>High Fidelity (48 Hz - Precise)</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3">
          <p className="font-bold text-amber-900">Analog Vulnerability: Cumulative Noise</p>
          <p className="mt-1 text-slate-700 leading-relaxed">
            Toggle "Inject Noise" to see how slight electrical noise directly distorts the continuous analog signal. Each copy or cable length further degrades the original waveform.
          </p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-3">
          <p className="font-bold text-blue-900">Digital Immunity: Threshold Regeneration</p>
          <p className="mt-1 text-slate-700 leading-relaxed">
            Even with noise, digital receivers only check if the voltage is above or below the threshold ($0$ or $1$). The exact signal can be recreated with 100% mathematical fidelity.
          </p>
        </div>
      </div>
    </div>
  );
});
