import { StudyModule, StudySubsection } from '../../types/course';
import { getVisualStory, VisualStory } from './visualCatalog';
export const INTERACTIVE_IDS = new Set(['infographic-w1-hierarchy','infographic-w1-building-blocks','infographic-w1-analog-digital','infographic-w1-binary','infographic-w1-cloud-models','infographic-w2-stack','infographic-w2-memory-pyramid','infographic-w3-scheduling','infographic-w3-paging','infographic-w4-server-consolidation','infographic-w4-shared-responsibility','infographic-w5-topology','infographic-w5-devices','infographic-w5-cabling','infographic-w6-encapsulation','infographic-w6-tcp-udp','infographic-w6-subnetting']);
export type LessonSlide = { id: string; kind: 'overview' | 'mechanism' | 'topic' | 'experiment' | 'security'; title: string; page: number; subsection?: StudySubsection; focus?: number };
export function buildLessonSlides(module: StudyModule): LessonSlide[] {
 const story = getVisualStory(module);
 return [
  {id: `${module.id}-overview`, kind: 'overview', title: 'เริ่มจากภาพรวม', page: module.pdfPageStart},
  ...story.nodes.map((n,i) => ({id:`${module.id}-mechanism-${i}`, kind:'mechanism' as const, title:n.label, page:module.pdfPageStart, focus:i})),
  ...module.subsections.flatMap(s => [
   {id:s.id, kind:'topic' as const, title:s.thaiTitle || s.title, page:s.pdfPage || module.pdfPageStart, subsection:s},
   ...(s.infographicId && INTERACTIVE_IDS.has(s.infographicId) ? [{id:`${s.id}-experiment`,kind:'experiment' as const,title:`ทดลอง: ${s.title}`,page:s.pdfPage || module.pdfPageStart,subsection:s}] : [])
  ]),
  ...(['week7','week8'].includes(module.weekId) ? [{id:`${module.id}-security`,kind:'security' as const,title:'เชื่อมแนวคิดกับสถานการณ์',page:module.pdfPageStart}] : [])
 ];
}

export function getTopicFigure(subsection: StudySubsection): VisualStory | undefined {
 const points = subsection.bulletPoints || [];
 if (points.length < 2) return undefined;
 return {kind:'map',caption:subsection.thaiTitle || subsection.title,nodes:points.slice(0,6).map((point,i)=>{
  const plain=point.replace(/\*\*|`/g,'').trim();
  const marked=point.match(/\*\*(.+?)\*\*/)?.[1];
  const prefix=plain.split(/[:：→]/)[0];
  const label=marked || (prefix.length <= 50 ? prefix : 'ประเด็นที่ '+(i+1));
  return {label,description:plain,page:subsection.pdfPage || 1};
 })};
}
