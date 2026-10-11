import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, CheckCircle2, BookOpen, Expand, Minimize, ArrowDown } from 'lucide-react';
import { Button } from '../arc/button/button';
import { ALL_MODULES, ALL_KEY_CONCEPTS } from '../../data/allContent';
import { StudyModule, WeekId } from '../../types/course';
import { useApp } from '../../context/AppContext';
import { getVisualStory } from './visualCatalog';
import { buildLessonSlides, getTopicFigure, LessonSlide } from './lessonSlides';
import { TopicProcessLab } from './TopicProcessLab';
import { ProcessLab } from './ProcessLab';
import { LessonFigure } from './LessonFigure';
import { FormattedText } from '../../utils/formatContent';
import { InfographicRenderer } from '../study/infographics/InfographicRenderer';
import { EXPERIMENT_GUIDES } from './experimentGuides';
import { SecurityLab } from './SecurityLab';
const labels={overview:'ภาพรวม',mechanism:'ภาพอธิบาย',topic:'เนื้อหาเต็ม',experiment:'ทดลอง',security:'สถานการณ์'};
export function VisualLearning({weeks}:{weeks:WeekId[]}) {
 const modules=useMemo(()=>weeks.flatMap(w=>ALL_MODULES[w]),[weeks.join(',')]);
 const entries=useMemo(()=>modules.flatMap(module=>buildLessonSlides(module).filter(slide=>slide.kind!=='mechanism').map(slide=>({module,slide}))),[modules]);
 const [position,setPosition]=useState(0),[furthest,setFurthest]=useState(0);
 const container=useRef<HTMLDivElement>(null), maximum=useRef(0);
 const {completedSections,toggleSectionCompleted}=useApp();
 const marked=useRef(new Set<string>());
 useEffect(()=>{marked.current=new Set(Object.keys(completedSections).filter(id=>completedSections[id]))},[completedSections]);
 const week=weeks[0], key='dsi102_reading_'+week;
 useEffect(()=>{setPosition(0);let saved=0;try{saved=Number(localStorage.getItem(key)||0)}catch{}maximum.current=Math.min(saved,entries.length-1);setFurthest(maximum.current)},[key,entries.length]);
 useEffect(()=>{
  if(weeks.length!==1)return;
  const root=document.querySelector('.studio-main');let frame=0;
  const update=()=>{frame=0;const line=(root?.getBoundingClientRect().top||0)+100;let n=0;container.current?.querySelectorAll<HTMLElement>('[data-reading-index]').forEach(node=>{if(node.getBoundingClientRect().top<=line)n=Number(node.dataset.readingIndex)});setPosition(n);if(n>maximum.current){maximum.current=n;setFurthest(n);try{localStorage.setItem(key,String(n))}catch{}}};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  root?.addEventListener('scroll',schedule,{passive:true});schedule();
  return()=>{root?.removeEventListener('scroll',schedule);cancelAnimationFrame(frame)};
 },[key,entries,weeks.length]);
 useEffect(()=>{if(weeks.length!==1)return;const observer=new IntersectionObserver(changes=>{for(const entry of changes){if(!entry.isIntersecting)continue;const id=(entry.target as HTMLElement).dataset.readingTopic;if(id&&!marked.current.has(id)){marked.current.add(id);toggleSectionCompleted(id)}}},{root:document.querySelector('.studio-main'),rootMargin:'-8% 0px 0px 0px',threshold:0});container.current?.querySelectorAll('[data-reading-topic]').forEach(node=>observer.observe(node));return()=>observer.disconnect()},[key,entries,weeks.length,toggleSectionCompleted]);
 if(weeks.length!==1)return <p className="muted">เลือก Week ที่ต้องการ แล้วเลื่อนอ่านบทเรียนทั้งหมดของสัปดาห์นั้นได้ต่อเนื่อง</p>;
 const current=entries[position]||entries[0];
 const topicCount=entries.filter(e=>e.slide.kind==='topic').length;
 const passed=entries.filter(e=>e.slide.kind==='topic'&&completedSections[e.slide.id]).length;
 return <section className="week-stream" ref={container}><div className="reading-location"><div><span>กำลังอ่าน · {current.module.thaiTitle}</span><small>ส่วน {position+1}/{entries.length} · อ่านแล้ว {passed}/{topicCount} หัวข้อ</small></div><progress value={position+1} max={entries.length}/></div><p className="stream-intro">เลื่อนอ่านได้เลย ทุกบทของ Week {week.slice(4)} อยู่ต่อกันด้านล่าง · ความคืบหน้าบันทึกบนเบราว์เซอร์นี้</p>{entries.map(({module,slide},i)=><div className="stream-section" id={`slide-${slide.id}`} data-reading-index={i} key={slide.id}>{slide.kind==='overview'&&<header className="stream-chapter"><small>Week {week.slice(4)} · บท {module.moduleNumber}</small><h2>{module.thaiTitle}</h2><p>{module.title}</p></header>}<SlideContent module={module} slide={slide} index={i} total={entries.length}/>{slide.kind==='topic'&&<span className="reading-topic-end" data-reading-topic={slide.id} aria-hidden="true"/>}</div>)}<footer className="stream-finish"><CheckCircle2 size={20}/><p>ถึงท้าย Week {week.slice(4)} แล้ว · กลับมาทบทวนภาพหรือเปิด PDF เทียบได้ทุกหัวข้อ</p></footer></section>;
}
function SlideContent({module,slide,index,total}:{module:StudyModule;slide:LessonSlide;index:number;total:number}) {
 const story=getVisualStory(module), sub=slide.subsection;
 const {jumpToPdf,completedSections,toggleSectionCompleted}=useApp();
 const guide=sub?.infographicId ? EXPERIMENT_GUIDES[sub.infographicId] : undefined;
 const node=story.nodes[slide.focus||0];
 const terms=node.label.toLowerCase().split(/[^a-z0-9ก-๙]+/).filter(t=>t.length>=3);
 const relatedConcepts=ALL_KEY_CONCEPTS[module.weekId].filter(c=>c.pdfPage>=module.pdfPageStart&&c.pdfPage<=module.pdfPageEnd&&terms.some(t=>(c.term+' '+(c.thaiTerm||'')).toLowerCase().includes(t)));
 const relatedTopic=module.subsections.find(s=>terms.some(t=>(s.title+' '+(s.thaiTitle||'')).toLowerCase().includes(t)));
 return <article className={`lesson-slide slide-${slide.kind}`}><header className="slide-heading"><span>{labels[slide.kind]} · {String(index+1).padStart(2,'0')} / {total}</span><h3>{slide.title}</h3>{sub?.thaiTitle&&sub.thaiTitle!==sub.title&&<p>{sub.title}</p>}</header>
 {slide.kind==='overview'&&<><p className="slide-lead">{module.overview||module.description||story.caption}</p><ProcessLab module={module}/><section className="slide-prose"><h4>บทนี้จะพาเข้าใจอะไรบ้าง</h4><ol className="learning-objectives">{module.subsections.map(s=><li key={s.id}><strong>{s.thaiTitle||s.title}</strong><FormattedText content={s.bulletPoints?.[0]||s.memoryTip||'อ่านคำอธิบายเต็ม พร้อมภาพประกอบและสไลด์อ้างอิงในหน้าถัดไป'}/></li>)}</ol><div className="reading-note"><BookOpen size={18}/><p>เริ่มจากภาพรวม ดูว่าองค์ประกอบใดทำหน้าที่อะไร แล้วอ่านรายละเอียดแต่ละหัวข้อในหน้าถัดไป ภาพจำลองใช้ช่วยอธิบายแนวคิด ไม่ใช่ภาพถ่ายของระบบจริง</p></div></section></>}
 {slide.kind==='mechanism'&&<><p className="slide-lead">{node.description}</p><LessonFigure module={module} initialFocus={slide.focus}/><section className="slide-prose"><h4>เชื่อมจุดนี้กับภาพรวม</h4><p>{story.caption}</p><div className="relationship-reading">{story.nodes.map((n,i)=><article key={n.label} className={i===slide.focus?'active':''}><span>{i+1}</span><div><h5>{n.label}</h5><p>{n.description}</p></div></article>)}</div>{relatedConcepts.length>0&&<div className="mechanism-glossary"><h4>คำสำคัญที่ใช้เข้าใจภาพนี้</h4>{relatedConcepts.map(c=><article key={c.id}><h5>{c.term}{c.thaiTerm?' · '+c.thaiTerm:''}</h5><FormattedText content={c.thaiDefinition||c.definition}/>{c.example&&<div className="reading-note"><strong>ตัวอย่าง</strong><FormattedText content={c.example}/></div>}</article>)}</div>}{relatedTopic&&<div className="mechanism-context"><h4>อ่านประกอบจากหัวข้อ {relatedTopic.title}</h4><FormattedText content={relatedTopic.thaiCommentary||relatedTopic.content}/></div>}<p className="reading-note">{story.kind==='flow'?'อ่านตามลูกศรเพื่อเชื่อมแต่ละขั้นเข้าด้วยกัน ลำดับนี้เป็นภาพอธิบายของบทเรียน รายละเอียดและเงื่อนไขจริงอยู่ในหัวข้อถัดไป':story.kind==='compare'?'ลองเทียบหน้าที่ของแต่ละรายการ การมีชื่อคล้ายกันไม่ได้แปลว่าใช้แทนกันได้ อ่านรายละเอียดและตัวอย่างในหน้าหัวข้อถัดไป':story.kind==='layers'?'แยกหน้าที่ของแต่ละชั้นก่อน แล้วสังเกตว่าชั้นเหล่านั้นพึ่งพาหรือรองรับกันอย่างไร':'แต่ละองค์ประกอบมีบทบาทในระบบเดียวกัน ภาพเชื่อมไว้เพื่อให้เห็นความสัมพันธ์ ไม่ได้หมายความว่าต้องทำงานตามลำดับหมายเลข'}</p></section></>}
 {slide.kind==='topic'&&sub&&<><TopicProcessLab module={module} sub={sub}/><section className="slide-prose"><h4>คำอธิบายเต็ม</h4><FormattedText content={sub.content}/>{sub.thaiCommentary&&sub.thaiCommentary!==sub.content&&<div className="slide-thai-explanation"><h4>อธิบายให้เห็นภาพ</h4><FormattedText content={sub.thaiCommentary}/></div>}{sub.bulletPoints&&<><h4>ประเด็นที่ต้องเชื่อมเข้าด้วยกัน</h4><ul>{sub.bulletPoints.map((p,i)=><li key={i}><FormattedText content={p}/></li>)}</ul></>}{sub.formula&&<div className="slide-formula"><h4>สูตร / รูปแบบที่ใช้ในบทนี้</h4><FormattedText content={sub.formula.includes(String.fromCharCode(36)) ? sub.formula : String.fromCharCode(36,36) + sub.formula + String.fromCharCode(36,36)}/></div>}{sub.memoryTip&&<div className="reading-note"><BookOpen size={18}/><div><h5>ภาพจำสำหรับทบทวน</h5><FormattedText content={sub.memoryTip}/></div></div>}<div className="button-row"><Button variant="secondary" size="sm" onClick={()=>jumpToPdf(module.weekId,slide.page)}><FileText size={16}/>เปิดต้นฉบับหน้า {slide.page}</Button></div></section></>}
 {slide.kind==='experiment'&&sub&&<><p className="slide-lead">ลองเปลี่ยนค่าหรือเลือกองค์ประกอบในภาพ แล้วสังเกตว่าผลลัพธ์เปลี่ยนอย่างไร</p>{guide&&<section className="experiment-guide"><h4>{guide.goal}</h4><ol>{guide.steps.map(step=><li key={step}>{step}</li>)}</ol></section>}<div className="arc-simulation"><InfographicRenderer id={sub.infographicId!}/></div><section className="slide-prose"><h4>สิ่งที่ควรสังเกต</h4>{guide&&<p className="reading-note">{guide.observe}</p>}<h4>เชื่อมผลทดลองกับบทเรียน</h4><FormattedText content={sub.thaiCommentary||sub.content}/><Button variant="secondary" size="sm" onClick={()=>jumpToPdf(module.weekId,slide.page)}>ตรวจรายละเอียดจากสไลด์หน้า {slide.page}</Button></section></>}
 {slide.kind==='security'&&<><p className="slide-lead">นำแนวคิดของบทนี้มาใช้พิจารณาสถานการณ์ กดเลือก controls และอ่านเหตุผลของแต่ละชั้น</p><SecurityLab week={module.weekId}/><section className="slide-prose"><h4>ย้อนเชื่อมกับแนวคิดในบท</h4><FormattedText content={module.subsections[0].thaiCommentary||module.subsections[0].content}/></section></>}
 <footer className="slide-source">บทเรียนเรียบเรียงจากเอกสาร Week {module.weekId.slice(4)} · อ้างอิง PDF หน้า {slide.kind==='mechanism'||slide.kind==='overview'?`${module.pdfPageStart}–${module.pdfPageEnd}`:slide.page} <Button variant="ghost" size="sm" onClick={()=>jumpToPdf(module.weekId,slide.page)}>ดูต้นฉบับ <ArrowDown size={14}/></Button></footer></article>;
}
