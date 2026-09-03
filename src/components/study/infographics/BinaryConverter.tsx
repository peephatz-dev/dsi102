import React, { useState } from 'react';
import { Binary, Sparkles } from 'lucide-react';

export const BinaryConverter: React.FC = React.memo(() => {
  const [inputText, setInputText] = useState<string>('DSI102');

  const getCharData = (text: string) => {
    return text.slice(0, 8).split('').map((char) => {
      const code = char.charCodeAt(0);
      const binary = code.toString(2).padStart(8, '0');
      const hex = code.toString(16).toUpperCase().padStart(2, '0');
      return { char, code, binary, hex };
    });
  };

  const charList = getCharData(inputText);

  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Data Representation</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Live Binary Abstraction Sandbox: Text → ASCII → Bits (0 & 1)</h4>
          <p className="text-xs text-slate-500">Type any text to see how characters translate into 8-bit bytes ($2^8 = 256$ states).</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text..."
            className="w-32 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-mono font-bold text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Characters to Bits Display */}
      <div className="my-4 space-y-2.5">
        {charList.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400 font-mono">Type something above to inspect its binary structure...</p>
        ) : (
          charList.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 font-mono text-lg font-bold text-blue-700">
                  {item.char}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">Character: '{item.char}'</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>ASCII: {item.code}</span>
                    <span>•</span>
                    <span>Hex: 0x{item.hex}</span>
                  </div>
                </div>
              </div>

              {/* 8 Bits Blocks */}
              <div className="flex items-center gap-1">
                {item.binary.split('').map((bit, bitIdx) => (
                  <div
                    key={bitIdx}
                    className={`flex h-8 w-7 items-center justify-center rounded-md font-mono text-xs font-bold transition-all ${
                      bit === '1'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                    title={`Bit ${7 - bitIdx} (Value: ${bit === '1' ? Math.pow(2, 7 - bitIdx) : 0})`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-3 text-xs text-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
          <span>Notice: 1 Byte = 8 Bits. Capital 'A' is 65 (<code className="font-mono bg-white px-1 py-0.5 rounded text-blue-700 border border-blue-200">01000001</code>), 'B' is 66 (<code className="font-mono bg-white px-1 py-0.5 rounded text-blue-700 border border-blue-200">01000010</code>).</span>
        </div>
      </div>
    </div>
  );
});
