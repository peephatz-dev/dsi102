import React, { useState } from 'react';
import { Binary, Sparkles } from 'lucide-react';

export const BinaryConverter: React.FC = React.memo(() => {
  const [inputText, setInputText] = useState<string>('DSI102');

  const getCharData = (text: string) => {
    return text.replace(/[^\x00-\x7F]/g, '').slice(0, 8).split('').map((char) => {
      const code = char.charCodeAt(0);
      const binary = code.toString(2).padStart(8, '0');
      const hex = code.toString(16).toUpperCase().padStart(2, '0');
      return { char, code, binary, hex };
    });
  };

  const charList = getCharData(inputText);
  const hasNonAscii = /[^\x00-\x7F]/.test(inputText);

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] pb-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-[var(--accent)] uppercase">Data Representation</span>
          <h4 className="text-base font-medium text-[var(--foreground)] mt-0.5">Live Binary Abstraction Sandbox: Text → ASCII → Bits (0 & 1)</h4>
          <p className="text-xs text-[var(--text-secondary)]">พิมพ์ตัวอักษร ASCII เช่น A, B หรือ 0 เพื่อดูรหัสและบิตในหนึ่ง byte (8 bits).</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ASCII เช่น ABC" aria-label="ข้อความ ASCII"
            className="w-32 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-mono font-medium text-[var(--foreground)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)] focus:outline-none"
          />
        </div>
      </div>

      {hasNonAscii && <p role="status" className="text-[var(--warning)]">ภาพนี้แสดงเฉพาะ ASCII ช่วง 0–127 ภาษาไทยใช้การเข้ารหัสอื่น เช่น UTF-8 จึงไม่นำมาแสดงเป็น ASCII 8 บิต</p>}
      {/* Characters to Bits Display */}
      <div className="my-4 space-y-2.5">
        {charList.length === 0 ? (
          <p className="py-6 text-center text-xs text-[var(--text-secondary)] font-mono">Type something above to inspect its binary structure...</p>
        ) : (
          charList.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 shadow-none"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] font-mono text-lg font-medium text-[var(--accent)]">
                  {item.char}
                </div>
                <div>
                  <span className="text-xs font-medium text-[var(--foreground)]">Character: '{item.char}'</span>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-mono">
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
                    className={`flex h-8 w-7 items-center justify-center rounded-md font-mono text-xs font-medium transition-all ${
                      bit === '1'
                        ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-none'
                        : 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'
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

      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3 text-xs text-[var(--accent)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--accent)] shrink-0" />
          <span>Notice: 1 Byte = 8 Bits. Capital 'A' is 65 (<code className="font-mono bg-[var(--surface)] px-1 py-0.5 rounded text-[var(--accent)] border border-[var(--border-strong)]">01000001</code>), 'B' is 66 (<code className="font-mono bg-[var(--surface)] px-1 py-0.5 rounded text-[var(--accent)] border border-[var(--border-strong)]">01000010</code>).</span>
        </div>
      </div>
    </div>
  );
});
