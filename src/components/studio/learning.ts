import { ALL_MODULES, ALL_QUIZZES, ALL_FLASHCARDS, shuffle } from '../../data/allContent';
import { ALL_WEEKS_LIST } from '../../data/weeksInfo';
import { Flashcard, QuizQuestion, WeekId } from '../../types/course';
export function clean(text: string) { return text.replace(/<!--[\s\S]*?-->/g, '').replace(/\*\*|`|^#+\s/gm, '').replace(/\s+/g, ' ').trim(); }
export function summary(text: string, limit = 280) { const s = clean(text); if (s.length <= limit) return s; const end = s.lastIndexOf(' ', limit); return s.slice(0, end > limit * .6 ? end : limit) + '…'; }
export const TOPIC_QUESTIONS: Record<WeekId, QuizQuestion[]> = Object.fromEntries(ALL_WEEKS_LIST.map(w => {
  const sections = ALL_MODULES[w.id].flatMap(m => m.subsections.map(s => ({ s, m })));
  return [w.id, sections.map(({s,m}, i) => {
    const definition = summary(s.thaiCommentary || s.content, 430);
    const alternatives = sections.filter(x => x.s.id !== s.id && x.s.title !== s.title).map(x => summary(x.s.thaiCommentary || x.s.content, 430));
    const wrong = [...new Set(alternatives)].filter(x => x !== definition).slice(i % Math.max(1, alternatives.length - 3));
    const distractors = [...wrong, ...alternatives].filter((x,j,a) => x !== definition && a.indexOf(x) === j).slice(0,3);
    const options = [ {text: definition, isCorrect: true, explanation: clean(s.thaiCommentary || s.content)}, ...distractors.map(text => ({ text, isCorrect: false, explanation: `แนวคิดนี้อธิบายหัวข้ออื่น สำหรับ ${s.title}: ${clean(s.thaiCommentary || s.content)}` })) ];
    const shift = i % options.length;
    return { id: `topic-${s.id}`, weekId: w.id, question: `ข้อใดอธิบาย ${s.title} ได้ตรงกับบทเรียน?`, options: [...options.slice(shift), ...options.slice(0,shift)], pdfPage: s.pdfPage || m.pdfPageStart, topic: s.title, difficulty: 'easy' as const };
  })];
})) as Record<WeekId, QuizQuestion[]>;
export const QUESTION_BANK: Record<WeekId, QuizQuestion[]> = Object.fromEntries(ALL_WEEKS_LIST.map(w => [w.id, [...ALL_QUIZZES[w.id], ...TOPIC_QUESTIONS[w.id]]])) as Record<WeekId, QuizQuestion[]>;
export const CARD_BANK: Record<WeekId, Flashcard[]> = Object.fromEntries(ALL_WEEKS_LIST.map(w => [w.id, [ ...ALL_FLASHCARDS[w.id], ...ALL_MODULES[w.id].flatMap(m => m.subsections.map(s => ({id: `recall-${s.id}`, weekId: w.id, front: `อธิบาย ${s.title} พร้อมตัวอย่าง`, back: s.thaiCommentary || s.content, category: m.title, pdfPage: s.pdfPage || m.pdfPageStart }))) ]])) as Record<WeekId, Flashcard[]>;
export function examPool(weeks: WeekId[], count: number) { const pools = shuffle(weeks).map(w => shuffle(QUESTION_BANK[w])); const result: QuizQuestion[] = []; while (result.length < count && pools.some(p => p.length)) { for (const p of pools) if (p.length && result.length < count) result.push(p.pop()!); } return shuffle(result); }
