import { useEffect, useRef, useState } from 'react';
import { ArrowDown, BookOpen, Check, CheckCircle2, ChevronDown, FileText, Highlighter, Lightbulb, List, MessageCircle, AlertCircle, ArrowUpRight, Type, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LocaleContext';
import { translate } from '../../i18n/translate';
import { FormattedText } from '../../utils/formatContent';
import { Button } from '../arc/button/button';
import { WeekId } from '../../types/course';

type ReadingPage = { page:number; id:string; title:string; section:string; kind:string; preview:string; imageOnly:boolean; headingInferred:boolean; figureReading?:boolean; takeaway:string; sourceText:string; explanation:string; example:string; remember:string; confusion:string; concepts:{term:string;definition:string;example:string}[]; fullExplanation:string; relatedModuleId:string|null; relatedTopicId:string|null };
type ReadingEdition = { week:WeekId; pages:ReadingPage[]; sections:{page:number;title:string}[] };
export const sourcePageKey=(week:string,page:number)=>`source-page-${week}-${page}`;
export function SlideReader({week,onExplore}:{week:WeekId;onExplore:()=>void}) {
  const [edition,setEdition]=useState<ReadingEdition|null>(null),[error,setError]=useState(false),[retry,setRetry]=useState(0),[current,setCurrent]=useState(1),[outline,setOutline]=useState(false);
  const [large,setLarge]=useState(()=>{try{return localStorage.getItem('dsi102_large_reading')==='true'}catch{return false}});
  const {completedSections,toggleSectionCompleted,jumpToPdf}=useApp();
  const {language}=useLanguage();
  const root=useRef<HTMLDivElement>(null), marked=useRef(new Set<string>());
  useEffect(()=>{marked.current=new Set(Object.keys(completedSections).filter(id=>completedSections[id]))},[completedSections]);
  useEffect(()=>{const controller=new AbortController();setEdition(null);setError(false);setCurrent(1);fetch(`/reading/${week}.json`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>setEdition(data)).catch(e=>{if(e.name!=='AbortError')setError(true)});return()=>controller.abort()},[week,retry]);
  useEffect(()=>{
    if(!edition)return;const scroller=document.querySelector('.studio-main');let frame=0;
    const update=()=>{frame=0;let n=1;const top=(scroller?.getBoundingClientRect().top||0)+100;root.current?.querySelectorAll<HTMLElement>('[data-source-page]').forEach(node=>{if(node.getBoundingClientRect().top<=top)n=Number(node.dataset.sourcePage)});setCurrent(n)};
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};scroller?.addEventListener('scroll',schedule,{passive:true});schedule();return()=>{scroller?.removeEventListener('scroll',schedule);cancelAnimationFrame(frame)};
  },[edition]);
  useEffect(()=>{if(!edition)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries){const id=(entry.target as HTMLElement).dataset.completedPage;if(entry.isIntersecting&&id&&!marked.current.has(id)){marked.current.add(id);toggleSectionCompleted(id)}}},{root:document.querySelector('.studio-main'),threshold:0});root.current?.querySelectorAll('[data-completed-page]').forEach(node=>observer.observe(node));return()=>observer.disconnect()},[edition,toggleSectionCompleted]);
  const go=(page:number)=>{
    setOutline(false);
    requestAnimationFrame(()=>{const target=document.getElementById(`reading-${week}-${page}`),scroller=document.querySelector('.studio-main');if(target&&scroller)scroller.scrollTo({top:scroller.scrollTop+target.getBoundingClientRect().top-scroller.getBoundingClientRect().top-65,behavior:'instant'});setCurrent(page)});
  };
  const resize=()=>{setLarge(v=>{try{localStorage.setItem('dsi102_large_reading',String(!v))}catch{}return !v})};
  if(error)return <div className="reader-error" role="alert"><AlertCircle/><h2>เปิดบทเรียนไม่สำเร็จ</h2><p>ตรวจสอบการเชื่อมต่อ แล้วลองเปิดอีกครั้ง หรืออ่านจาก PDF ต้นฉบับได้ทันที</p><div className="button-row"><Button onClick={()=>setRetry(n=>n+1)}>ลองอีกครั้ง <RotateCcw size={15}/></Button><Button variant="secondary" onClick={()=>jumpToPdf(week,1)}>เปิด PDF ต้นฉบับ</Button></div></div>;
  if(!edition)return <div className="reader-loading" role="status"><BookOpen size={24}/><p>กำลังจัดหน้าบทเรียนตามสไลด์…</p></div>;
  const done=edition.pages.filter(p=>completedSections[sourcePageKey(week,p.page)]).length;
  return <section ref={root} className={`source-reader ${large?'large-reading':''}`}>
    <div className="source-reading-location"><div><BookOpen size={16}/><span>หน้า {current} / {edition.pages.length}</span><span className="location-heading" data-no-translate>{edition.pages[current-1]?.title}</span></div><small>อ่านแล้ว {done} หน้า</small><progress aria-label="ตำแหน่งการอ่านสไลด์" value={current} max={edition.pages.length}/></div>
    <div className="reading-tools"><p><CheckCircle2 size={15}/>หัวข้อและลำดับตรงกับสไลด์ต้นฉบับ</p><div><button className="reader-tool" onClick={resize} aria-pressed={large}><Type size={17}/>ตัวอักษรใหญ่</button><button className="reader-tool outline-toggle" onClick={()=>setOutline(!outline)} aria-expanded={outline}><List size={17}/>สารบัญ</button></div></div>
    <div className="reader-grid"><div className="reader-pages">{edition.pages.map(page=><article key={page.page} id={`reading-${week}-${page.page}`} data-source-page={page.page} className={`source-article kind-${page.kind}`}>
      {edition.sections.some(s=>s.page===page.page)&&<div className="source-section-label"><span>Week {week.slice(4)}</span><span data-no-translate>{page.section}</span></div>}
      <div className="source-article-heading"><span className="source-page-number">{String(page.page).padStart(2,'0')}</span><div><h2 lang="en" data-no-translate>{page.title}</h2>{language==='th'&&translate(page.title,'th')!==page.title&&<p className="translated-heading">{translate(page.title,'th')}</p>}{page.headingInferred&&<small>ภาพหรือตารางในสไลด์ · ใช้คำอธิบายภาพเป็นชื่อหัวข้อ</small>}</div><button className="source-pdf-link" onClick={()=>jumpToPdf(week,page.page)} aria-label={`เปิด PDF หน้า ${page.page}`}><FileText size={16}/><span>PDF</span></button></div>
      <div className="page-introduction"><div className="study-callout takeaway"><div className="callout-title"><Highlighter size={17}/><h3>เข้าใจในหนึ่งนาที</h3></div><FormattedText content={page.takeaway}/></div><button className="original-preview" onClick={()=>jumpToPdf(week,page.page)} aria-label={`ดูสไลด์ต้นฉบับหน้า ${page.page}`}><img src={page.preview} alt={`สไลด์ต้นฉบับ Week ${week.slice(4)} หน้า ${page.page}`} loading="lazy" width="1100" height="620"/><span>สไลด์หน้า {page.page}<ArrowUpRight size={13}/></span></button></div>
      {page.explanation&&<section className="page-explanation"><h3><BookOpen size={18}/>อธิบายให้เข้าใจ</h3><FormattedText content={page.explanation}/></section>}
      {page.concepts.length>0&&page.kind==='lesson'&&<div className="source-concepts">{page.concepts.map((concept,i)=><div key={i}><h4><mark>{concept.term}</mark></h4><FormattedText content={concept.definition}/></div>)}</div>}
      {page.sourceText&&<section className="slide-reading-text"><h3><FileText size={18}/>{page.imageOnly||page.figureReading?'อ่านภาพนี้อย่างไร':'ประเด็นทั้งหมดในสไลด์นี้'}</h3><SourceText text={page.sourceText}/></section>}
      {page.fullExplanation&&<section className="page-deeper"><h3>ขยายความและเชื่อมเหตุผล</h3><FormattedText content={page.fullExplanation}/></section>}
      {page.explanation&&page.example&&<><aside className="study-callout example"><div className="callout-title"><Lightbulb size={18}/><h3>ลองนึกภาพตาม</h3></div><FormattedText content={page.example}/></aside><div className="reading-pair"><aside className="study-callout memory"><div className="callout-title"><CheckCircle2 size={17}/><h3>จำแก่นนี้ไว้</h3></div><FormattedText content={page.remember}/></aside><aside className="study-callout caution"><div className="callout-title"><MessageCircle size={17}/><h3>จุดที่มักสับสน</h3></div><FormattedText content={page.confusion}/></aside></div></>}
      <footer className="source-article-footer"><span><FileText size={14}/>อ้างอิง PDF หน้า {page.page}</span><button onClick={()=>toggleSectionCompleted(sourcePageKey(week,page.page))} aria-pressed={!!completedSections[sourcePageKey(week,page.page)]}>{completedSections[sourcePageKey(week,page.page)]?<Check size={15}/>:<BookOpen size={15}/>} {completedSections[sourcePageKey(week,page.page)]?'อ่านหน้านี้แล้ว':'ทำเครื่องหมายว่าอ่านแล้ว'}</button></footer><span className="reading-page-end" data-completed-page={sourcePageKey(week,page.page)} aria-hidden="true"/>
    </article>)}<div className="reading-finished"><CheckCircle2 size={28}/><h2>อ่านครบเนื้อหา Week {week.slice(4)} แล้ว</h2><p>ลองทบทวนสิ่งที่เข้าใจด้วยแบบจำลอง หรือเปิดสไลด์กลับไปเทียบจุดที่ยังสงสัย</p><Button onClick={onExplore}>ลองทำให้เห็นภาพ <ArrowUpRight size={16}/></Button></div></div>
    <aside className={`reading-outline ${outline?'is-open':''}`} aria-label="สารบัญตามสไลด์"><div><h3><List size={17}/>ในสัปดาห์นี้</h3><button className="outline-toggle" onClick={()=>setOutline(false)} aria-label="ปิดสารบัญ"><ChevronDown size={20}/></button></div><p>{edition.pages.length} หน้า · อ่านต่อเนื่องได้เลย</p><nav>{edition.pages.map(p=><button key={p.page} onClick={()=>go(p.page)} className={current===p.page?'is-current':''} aria-current={current===p.page?'location':undefined} title={p.title}><span>{completedSections[sourcePageKey(week,p.page)]?<Check size={12}/>:String(p.page).padStart(2,'0')}</span><span data-no-translate>{p.title}</span></button>)}</nav></aside></div>
  </section>;
}
function SourceText({text}:{text:string}) {
 const {language}=useLanguage();
 // Keep every source line, with wrapping reconstructed only for long prose continuations.
 const lines=translate(text,language).split('\n').filter(Boolean);const paragraphs:string[]=[];
 for(const line of lines){const previous=paragraphs[paragraphs.length-1];if(previous&&previous.length>65&&!/[.!?:;]$/.test(previous)&&/^[a-z]/.test(line))paragraphs[paragraphs.length-1]+=' '+line;else paragraphs.push(line)}
 const groups:{compact:boolean;items:string[]}[]=[];
 for(const line of paragraphs){const compact=line.length<=32&&!/[.!?;:]$|→|=|\d+\.\d/.test(line);const last=groups[groups.length-1];if(compact&&last?.compact)last.items.push(line);else groups.push({compact,items:[line]})}
 return <div className="source-lines">{groups.map((group,i)=>group.compact?<div className="source-keywords" key={i}>{group.items.map((line,j)=><span key={j}><HighlightedLine text={translate(line,language)}/></span>)}</div>:<p key={i}><HighlightedLine text={translate(group.items[0],language)}/></p>)}</div>;
}

function HighlightedLine({text}:{text:string}) {
 let count=0;
 return <>{text.split(/(\b(?:CPU|RAM|GPU|DMA|PCB|TLB|TCP|UDP|IPv4|IPv6|MAC|IP|DNS|HTTP|HTTPS|IaaS|PaaS|SaaS|MFA|VPN|RAID|RPO|RTO|Firewall|Switch|Router|Hypervisor)\b)/gi).map((part,i)=>i%2===1&&count++<3?<mark className="term-highlight" key={i}>{part}</mark>:part)}</>;
}
