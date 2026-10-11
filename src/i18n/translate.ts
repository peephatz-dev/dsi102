import translations from './translations.json';
import templates from './source-templates.json';
import overrides from './overrides.json';
import authored from './authored-pairs.json';
import type { Language } from './LocaleContext';
const catalogs = translations as Record<Language, Record<string, string>>;
const preferred: Record<Language, Record<string, string>> = { th: { ...authored.th, ...overrides.th }, en: { ...authored.en, ...overrides.en } };
const thai = /[\u0e00-\u0e7f]/;
const cache = { th: new Map<string, string>(), en: new Map<string, string>() };
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patterns = templates.map(source => ({ source, pattern: new RegExp('^' + source.split(/\{\d+\}/).map(escape).join('(.+?)') + '$', 's') }));
function exact(text: string, language: Language) { return preferred[language][text] ?? catalogs[language][text]; }
function fragment(text: string, language: Language): string {
  const match = exact(text, language); if (match !== undefined) return match;
  const trimmed = text.trim(), result = exact(trimmed, language);
  if (result !== undefined) return text.slice(0, text.indexOf(trimmed)) + result + text.slice(text.indexOf(trimmed) + trimmed.length);
  if (trimmed.endsWith('…') && trimmed.length > 12) {
    const prefix = trimmed.slice(0, -1);
    const source = Object.keys(catalogs[language]).find(key => key.startsWith(prefix));
    if (source) return (exact(source, language) || source).slice(0, Math.max(24, prefix.length)) + '…';
  }
  for (const { source, pattern } of patterns) {
    const parts = text.match(pattern), translated = exact(source, language);
    if (parts && translated) return translated.replace(/\{(\d+)\}/g, (_, n) => translate(parts[Number(n) + 1] || '', language));
  }
  if (language === 'en' && thai.test(text)) return text.replace(/[\u0e00-\u0e7f]+(?: +[\u0e00-\u0e7f]+)*/g, value => exact(value, language) ?? value);
  return text;
}
export function translate(text: string, language: Language): string {
  if (!text.trim()) return text;
  const existing = cache[language].get(text); if (existing !== undefined) return existing;
  let result = fragment(text, language);
  if (result === text && /\n|\*\*|`/.test(text)) result = text.split(/(\n|\*\*|`)/).map(part => fragment(part, language)).join('');
  // Limit long-lived caches when users search or explore many simulation inputs.
  if (cache[language].size > 20000) cache[language].clear();
  cache[language].set(text, result); return result;
}
