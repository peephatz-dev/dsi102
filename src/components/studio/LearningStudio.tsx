import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, ArrowUpRight, ArrowRight, Check, CheckCircle2, ChevronLeft, ChevronRight, FileText, GraduationCap, Layers, Menu, Moon, Search, ShieldCheck, Sun, X, Timer, Flag, RotateCcw, Shuffle, ExternalLink } from 'lucide-react';
import { Button } from '../arc/button/button';
import SegmentedControl from '../arc/segmented-control/segmented-control';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../arc/tabs/tabs';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '../../i18n/LocaleContext';
import { translate } from '../../i18n/translate';
import { useApp } from '../../context/AppContext';
import { ALL_MODULES, ALL_KEY_CONCEPTS, shuffle } from '../../data/allContent';
import { ALL_WEEKS_LIST, WEEKS_INFO } from '../../data/weeksInfo';
import sourceManifest from '../../data/sourceManifest.json';
import { ExamAttempt, Flashcard, QuizQuestion, StudySubsection, WeekId } from '../../types/course';
import { FormattedText } from '../../utils/formatContent';
import { VisualLearning } from './VisualLearning';
import { SecurityLab } from './SecurityLab';
import { InfographicRenderer } from '../study/infographics/InfographicRenderer';
const SourceViewer = lazy(() => import('./SourceViewer').then(m => ({ default: m.SourceViewer }))); 
import { CARD_BANK, QUESTION_BANK, TOPIC_QUESTIONS, clean, examPool, summary } from './learning';

type SourcePage = { page: number; title: string; text: string };
type Source = { pages: SourcePage[]; count: number; source: string };
type Sources = Partial<Record<WeekId, Source>>;
type View = 'visual' | 'learn' | 'practice' | 'cards' | 'exam' | 'source';
const WEEK_IDS = ALL_WEEKS_LIST.map(w => w.id);
function useSaved<T>(key: string, initial: T): [T, (value: T | ((old: T) => T)) => void] {
  const [value, setValue] = useState(initial);
  useEffect(() => { try { const item = localStorage.getItem(key); if (item) setValue(JSON.parse(item)); } catch { /* Keep usable defaults for corrupted storage. */ } }, [key]);
  const update = useCallback((next: T | ((old: T) => T)) => setValue(old => { let latest = old; try { const stored = localStorage.getItem(key); if (stored) latest = JSON.parse(stored); } catch { /* Use the session state if reading is unavailable. */ } const result = typeof next === 'function' ? (next as (v:T)=>T)(latest) : next; try { localStorage.setItem(key, JSON.stringify(result)); } catch { /* Storage may be disabled; the session still works. */ } return result; }), [key]);
  return [value, update];
}
function Reference({ week, page, label }: {week: WeekId; page: number; label?: string}) {
  const { jumpToPdf } = useApp();
  return <Button variant="ghost" size="sm" onClick={() => jumpToPdf(week, page)}><FileText size={15}/>{label || `ตรวจ PDF หน้า ${page}`}</Button>;
}

export function LearningStudio() {
  const { language } = useLanguage();
  const {currentWeek, setCurrentWeek, completedSections, theme, toggleTheme, pdfViewerOpen, searchQuery, setSearchQuery} = useApp();
  const [view, setView] = useState<View>('visual');
  const [menu, setMenu] = useState(false);
  const [sources, setSources] = useState<Sources>({});
  const [sourceErrors, setSourceErrors] = useState<WeekId[]>([]);
  const [reload, setReload] = useState(0);
  const content = useRef<HTMLElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let cancelled = false;
    Promise.allSettled(WEEK_IDS.map(async id => { const response = await fetch(`/content/${id}.json`); if (!response.ok) throw new Error(id); const data = await response.json(); return { id, data }; })).then(results => {
      if (cancelled) return;
      const loaded: Sources = {}, failed: WeekId[] = [];
      results.forEach((r,i) => { if (r.status === 'fulfilled') loaded[r.value.id] = r.value.data; else failed.push(WEEK_IDS[i]); });
      setSources(loaded); setSourceErrors(failed);
    }); return () => {cancelled = true;};
  }, [reload]);
  useEffect(() => { content.current?.scrollTo({top: 0}); }, [currentWeek, view]);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); search.current?.focus(); } };
    window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previous = document.activeElement as HTMLElement | null;
    const items = () => Array.from(sidebar.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]') || []).filter(n => n.getClientRects().length > 0);
    items()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(false); return; }
      if (e.key !== 'Tab') return;
      const nodes = items(), first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', trap);
    return () => { window.removeEventListener('keydown', trap); previous?.focus(); };
  }, [menu]);
  const sections = Object.values(ALL_MODULES).flat().flatMap(m => m.subsections);
  const completed = sections.filter(s => completedSections[s.id]).length;
  const progress = Math.round(completed / sections.length * 100);
  const selectWeek = (id: WeekId | 'all') => {setCurrentWeek(id); setView('visual'); setMenu(false); setSearchQuery('');};
  const results = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase(); if (q.length < 2) return [];
    return WEEK_IDS.flatMap(week => [
      ...ALL_MODULES[week].flatMap(m => m.subsections.filter(s => `${s.title} ${s.thaiTitle} ${s.content} ${s.thaiCommentary} ${translate(s.content, language)} ${translate(s.thaiCommentary || '', language)}`.toLocaleLowerCase().includes(q)).map(s => ({id:s.id,week,title:s.title,text:summary(s.thaiCommentary || s.content,180),page:s.pdfPage || m.pdfPageStart,kind:'บทเรียน'}))),
      ...(sources[week]?.pages || []).filter(p => `${p.text} ${translate(p.text, language)}`.toLocaleLowerCase().includes(q)).map(p => ({id:`source-${p.page}`,week,title:p.title,text:summary(p.text,180),page:p.page,kind:'สไลด์ต้นฉบับ'}))
    ]);
  }, [searchQuery,sources,language]);
  return <div className="studio">
    <a className="skip-link" href="#learning-main">ข้ามไปเนื้อหา</a>
    <aside ref={sidebar} className={`studio-sidebar ${menu ? 'is-open' : ''}`} aria-label="เลือกบทเรียน">
      <div className="brand"><GraduationCap size={26}/><div><span>DSI102</span><small>Learning studio</small></div><Button variant="ghost" size="sm" className="mobile-only" aria-label="ปิดเมนู" onClick={() => setMenu(false)}><X size={20}/></Button></div>
      <button className={`nav-home ${currentWeek === 'all' ? 'active' : ''}`} onClick={() => selectWeek('all')}><Layers size={18}/><span>ภาพรวมรายวิชา</span><ArrowUpRight size={16}/></button>
      <div className="sidebar-label">บทเรียนทั้งหมด <span>8 weeks</span></div>
      <nav className="week-navigation">{ALL_WEEKS_LIST.map(w => {
        const subs = ALL_MODULES[w.id].flatMap(m=>m.subsections), done = subs.filter(s=>completedSections[s.id]).length;
        return <button key={w.id} className={`week-link ${currentWeek === w.id ? 'active' : ''}`} onClick={()=>selectWeek(w.id)} aria-current={currentWeek===w.id ? 'page' : undefined}><span className="week-number">{String(w.weekNumber).padStart(2,'0')}</span><span><span>{['Digital fundamentals','Computer platforms','Operating systems','VMs & cloud','Computer networks','Network communication','Security layers','Cyber threats'][w.weekNumber-1]}</span><small>{done}/{subs.length} หัวข้อ</small></span>{done===subs.length ? <CheckCircle2 size={16}/> : <ChevronRight size={14}/>}</button>;
      })}</nav>
      <div className="sidebar-progress"><div><span>ความก้าวหน้าของคุณ</span><span>{progress}%</span></div><progress max={100} value={progress}/><small>{completed} จาก {sections.length} หัวข้อที่อ่านแล้ว</small><p>บันทึกบนเบราว์เซอร์นี้</p></div>
      <div className="sidebar-bottom"><ShieldCheck size={16}/><span>ตรวจเทียบสไลด์ได้ทุกบท</span></div>
    </aside>
    {menu && <button className="nav-scrim" onClick={()=>setMenu(false)} aria-label="ปิดเมนูบทเรียน"/>}
    <div className="studio-workspace">
      <header className="studio-topbar"><div className="breadcrumb"><Button variant="ghost" size="sm" className="mobile-only" aria-label="เปิดเมนูบทเรียน" onClick={()=>setMenu(true)}><Menu size={20}/></Button><span>My workspace</span><ChevronRight size={14}/><span>{currentWeek==='all' ? 'Course overview' : `Week ${WEEKS_INFO[currentWeek].weekNumber}`}</span></div>
        <label className="studio-search"><Search size={17}/><input ref={search} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="ค้นหาทุกบทเรียนและสไลด์…" aria-label="ค้นหาบทเรียนและสไลด์"/>{searchQuery ? <button aria-label="ล้างการค้นหา" onClick={()=>setSearchQuery('')}><X size={16}/></button> : <kbd>⌘ K</kbd>}</label>
        <LanguageSwitch/>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={theme==='light' ? 'เปลี่ยนเป็นธีมมืด' : 'เปลี่ยนเป็นธีมสว่าง'}>{theme==='light' ? <Moon size={18}/> : <Sun size={18}/>}</Button>
      </header>
      <div className={`studio-body ${pdfViewerOpen && view !== 'source' ? 'with-source' : ''}`}>
        <main ref={content} id="learning-main" className="studio-main" tabIndex={-1}>
          {searchQuery.trim().length>=2 ? <div className="page-container"><h1>ผลการค้นหา</h1><p className="muted">พบ {results.length} รายการสำหรับ “{searchQuery}”{Object.keys(sources).length<8 ? ' · ข้อความสไลด์บางส่วนยังโหลดไม่ครบ' : ''}</p><div className="search-results">{results.length ? results.slice(0,100).map(r=><article key={`${r.week}-${r.id}`}><div><small>Week {WEEKS_INFO[r.week].weekNumber} · {r.kind} · หน้า {r.page}</small><h2>{r.title}</h2><p>{r.text}</p></div><div className="button-row"><Button variant="secondary" size="sm" onClick={()=>{selectWeek(r.week);setView(r.kind==='บทเรียน'?'learn':'source');}}>เปิดบทเรียน</Button><Reference week={r.week} page={r.page}/></div></article>) : <div className="empty-state">ไม่พบเนื้อหา ลองคำอื่น เช่น CPU, subnet, phishing หรือคลาวด์</div>}</div>{results.length>100 && <p className="muted">แสดง 100 รายการแรก กรุณาเพิ่มคำค้นเพื่อเจาะจงขึ้น</p>}</div>
          : <div className="page-container">
            {currentWeek==='all' ? <Overview onSelect={selectWeek} onExam={()=>setView('visual')}/> : <WeekHeading week={currentWeek}/>}
            <Tabs value={view} onValueChange={v=>setView(v as View)}>
              <TabsList aria-label="วิธีเรียน"><TabsTrigger value="visual">เรียนด้วยภาพ</TabsTrigger><TabsTrigger value="learn">อ่านบทเรียน</TabsTrigger><TabsTrigger value="source">เปิดสไลด์</TabsTrigger><TabsTrigger value="cards">แฟลชการ์ด</TabsTrigger><TabsTrigger value="practice">ทบทวนเพิ่มเติม</TabsTrigger></TabsList><TabsContent value="visual"><VisualLearning weeks={currentWeek==='all'?WEEK_IDS:[currentWeek]}/></TabsContent>
              <TabsContent value="learn"><Lessons weeks={currentWeek==='all'?WEEK_IDS:[currentWeek]}/></TabsContent>
              <TabsContent value="practice"><Practice key={currentWeek} weeks={currentWeek==='all'?WEEK_IDS:[currentWeek]}/></TabsContent>
              <TabsContent value="cards"><Cards key={currentWeek} weeks={currentWeek==='all'?WEEK_IDS:[currentWeek]}/></TabsContent>
              <TabsContent value="exam" forceMount><div hidden={view!=='exam'}><Exam weeks={currentWeek==='all'?WEEK_IDS:[currentWeek]}/></div></TabsContent>
              <TabsContent value="source"><Suspense fallback={<p role="status">กำลังเปิดสไลด์…</p>}><SourceViewer inline/></Suspense></TabsContent>
            </Tabs>
            <footer className="page-footer"><span>DSI102 · Introduction to digital technology</span><span>เรียนรู้ → ลองทำ → ตรวจหลักฐาน</span></footer>
          </div>}
        </main>
        {pdfViewerOpen && view !== 'source' && <Suspense fallback={<aside className="source-pane"><p role="status">กำลังเปิด PDF…</p></aside>}><SourceViewer/></Suspense>}
      </div>
    </div>
  </div>;
}

function Overview({onSelect,onExam}:{onSelect:(w:WeekId)=>void;onExam:()=>void}) {
  const {completedSections} = useApp();
  const total = Object.values(ALL_MODULES).flat().flatMap(m=>m.subsections).length;
  return <section className="overview">
    <div className="hero-copy"><div><h1>ทำความเข้าใจดิจิทัล<br/><span>ทีละแนวคิด</span></h1><p>พื้นที่เรียนรู้ครบ 8 สัปดาห์ สำรวจภาพ เล่นกับแนวคิด<br className="desktop-only"/> และเปิดสไลด์ทีละหน้าเพื่อเชื่อมภาพกับบทเรียน</p></div><Button onClick={()=>onSelect('week1')}>เริ่มเรียน Week 1 <ArrowRight size={17}/></Button></div>
    <div className="stats-row"><div><span>สัปดาห์เรียน</span><strong>8</strong></div><div><span>สไลด์ต้นฉบับ</span><strong>{Object.values(sourceManifest).reduce((n,w)=>n+w.pages,0)}</strong></div><div><span>หัวข้อเรียน</span><strong>{total}</strong></div><div><span>ภาพอธิบายแนวคิด</span><strong>{Object.values(ALL_MODULES).flat().length}</strong></div></div>
    <div className="section-title"><h2>เส้นทางการเรียนรู้</h2><Button variant="ghost" onClick={onExam}>สำรวจภาพบทเรียน <ArrowUpRight size={16}/></Button></div>
    <div className="course-grid">{ALL_WEEKS_LIST.map(w=>{
      const subs=ALL_MODULES[w.id].flatMap(m=>m.subsections),done=subs.filter(s=>completedSections[s.id]).length;
      return <button className="course-tile" onClick={()=>onSelect(w.id)} key={w.id}><div className="tile-top"><span>Week {String(w.weekNumber).padStart(2,'0')}</span><ArrowUpRight size={18}/></div><h3>{w.title.split(':')[0]}</h3><p>{w.shortDesc}</p><div className="tile-foot"><span>{w.totalPages} สไลด์ · {subs.length} หัวข้อ</span><span>{Math.round(done/subs.length*100)}%</span></div><progress value={done} max={subs.length}/></button>;
    })}</div>
  </section>;
}
function WeekHeading({week}:{week:WeekId}) {
  const info=WEEKS_INFO[week];
  return <section className="week-heading"><div><h1>{info.title}</h1><p>{info.shortDesc}</p><div className="meta-line"><span>Week {info.weekNumber}</span><span>{ALL_MODULES[week].length} บท</span><span>{info.totalPages} สไลด์</span><span>{QUESTION_BANK[week].length} คำถาม</span></div>{info.weekNumber>=7 && <p className="source-note">ใช้ลำดับ Week {info.weekNumber} ตามโฟลเดอร์ของคุณ · ชื่อต้นฉบับระบุ Week {info.weekNumber+1}</p>}</div><Reference week={week} page={1} label="เปิดสไลด์ต้นฉบับ"/></section>;
}
function Lessons({weeks}:{weeks:WeekId[]}) {
  const [detail,setDetail]=useState('summary');
  const {completedSections,toggleSectionCompleted,searchQuery}=useApp();
  const [selected,setSelected]=useState<string | null>(null);
  const modules=weeks.flatMap(w=>ALL_MODULES[w]);
  const active=modules.find(m=>m.id===selected) || modules[0];
  if(!active)return <p>ยังไม่มีบทเรียน</p>;
  return <section className="lessons"><div className="section-title"><div><h2>อ่าน เข้าใจ แล้วลองอธิบาย</h2><p className="muted">ทุกหัวข้อมีจุดทบทวนและหน้าสไลด์อ้างอิง</p></div><SegmentedControl label="ความละเอียดบทเรียน" value={detail} onValueChange={setDetail} options={[{value:'summary',label:'สรุป'},{value:'full',label:'เนื้อหาเต็ม'}]}/></div>
    <div className="lesson-layout"><nav className="topic-list" aria-label="หัวข้อบทเรียน">{modules.map(m=><button key={m.id} className={active.id===m.id?'active':''} onClick={()=>setSelected(m.id)}><span>{weeks.length>1?`W${WEEKS_INFO[m.weekId].weekNumber} · `:''}{m.moduleNumber}</span><span>{m.thaiTitle}<small>{m.subsections.filter(s=>completedSections[s.id]).length}/{m.subsections.length} หัวข้อ</small></span><ChevronRight size={14}/></button>)}</nav>
      <div className="lesson-reader" key={active.id}><div className="lesson-title"><div><h3>{active.title}</h3><p>{active.thaiTitle}</p></div><Reference week={active.weekId} page={active.pdfPageStart}/></div>
      {(active.weekId==='week7'||active.weekId==='week8') && <SecurityLab week={active.weekId}/>}
      {active.subsections.map(sub=><article className="lesson-section" id={sub.id} key={sub.id}><div className="section-title"><h4>{sub.title}</h4><Reference week={active.weekId} page={sub.pdfPage||active.pdfPageStart}/></div>
        {detail==='summary'?<><p className="lead-note">{summary(sub.thaiCommentary||sub.content,420)}</p>{sub.bulletPoints && <ul>{sub.bulletPoints.slice(0,4).map((p,i)=><li key={i}>{clean(p)}</li>)}</ul>} {sub.memoryTip && <p className="memory-tip"><BookOpen size={16}/>{clean(sub.memoryTip)}</p>}</>:<><FormattedText content={sub.content}/>{sub.bulletPoints && <ul>{sub.bulletPoints.map((p,i)=><li key={i}><FormattedText content={p}/></li>)}</ul>}{sub.thaiCommentary && sub.thaiCommentary!==sub.content && <div className="thai-note"><h5>อธิบายภาษาไทย</h5><p>{clean(sub.thaiCommentary)}</p></div>}{sub.formula && <pre className="formula">{sub.formula}</pre>}{sub.infographicId && <InfographicRenderer id={sub.infographicId}/>}<p className="muted">อ่านต้นฉบับครบทุกหน้าในแท็บ “สไลด์ทั้งหมด” และตรวจภาพ/ตารางจาก PDF</p></>}
        <details className="visual-notes"><summary>ลองอธิบายแนวคิดด้วยตัวเอง</summary><Recall key={sub.id} sub={sub} week={active.weekId}/></details>
        <button className={`read-toggle ${completedSections[sub.id]?'done':''}`} onClick={()=>toggleSectionCompleted(sub.id)} aria-pressed={!!completedSections[sub.id]}>{completedSections[sub.id]?<CheckCircle2 size={18}/>:<Check size={18}/>} {completedSections[sub.id]?'อ่านและทบทวนแล้ว':'ทำเครื่องหมายว่าอ่านแล้ว'}</button>
      </article>)}<div className="button-row"><Button variant="secondary" disabled={modules.indexOf(active)===0} onClick={()=>setSelected(modules[modules.indexOf(active)-1].id)}><ChevronLeft size={16}/>บทก่อนหน้า</Button><Button disabled={modules.indexOf(active)===modules.length-1} onClick={()=>setSelected(modules[modules.indexOf(active)+1].id)}>บทถัดไป<ChevronRight size={16}/></Button></div></div>
    </div>
  </section>;
}
function Recall({sub,week}:{sub:StudySubsection;week:WeekId}) {
  const [saved,setSaved]=useSaved<Record<string,{text:string;status:string}>>('dsi102_recall',{});
  const [reveal,setReveal]=useState(false),[mode,setMode]=useState('recall');
  const question=TOPIC_QUESTIONS[week].find(q=>q.id===`topic-${sub.id}`);
  return <div className="recall"><div className="section-title"><h5>หยุดคิดสักนิด</h5><SegmentedControl label={`แบบฝึก ${sub.title}`} value={mode} onValueChange={setMode} options={[{value:'recall',label:'อธิบายเอง'},{value:'choice',label:'เลือกคำตอบ'}]}/></div>
    {mode==='choice' && question?<Question key={question.id} q={question}/>:<><label htmlFor={`answer-${sub.id}`}>อธิบาย {sub.title} ด้วยคำของคุณ พร้อมยกตัวอย่างหนึ่งอย่าง</label><textarea id={`answer-${sub.id}`} rows={3} value={saved[sub.id]?.text||''} onChange={e=>setSaved(old=>({...old,[sub.id]:{text:e.target.value,status:old[sub.id]?.status||''}}))} placeholder="ลองนึกก่อนเปิดแนวคำตอบ…"/><div className="button-row"><Button variant="secondary" size="sm" onClick={()=>setReveal(!reveal)}>{reveal?'ซ่อนแนวคำตอบ':'ดูแนวคำตอบ'}</Button><Reference week={week} page={sub.pdfPage||1}/>{saved[sub.id]?.status && <span className="status">{saved[sub.id].status==='known'?'อธิบายได้แล้ว':'ควรกลับมาทบทวน'}</span>}</div>{reveal && <div className="answer-reveal"><FormattedText content={sub.thaiCommentary||sub.content}/><p className="muted">เทียบแนวคิดและตัวอย่างด้วยตัวเอง แบบฝึกนี้ไม่ตรวจคำตอบอัตโนมัติ</p><div className="button-row"><Button size="sm" onClick={()=>setSaved(old=>({...old,[sub.id]:{text:old[sub.id]?.text||'',status:'known'}}))}>อธิบายได้แล้ว</Button><Button variant="secondary" size="sm" onClick={()=>setSaved(old=>({...old,[sub.id]:{text:old[sub.id]?.text||'',status:'review'}}))}>กลับมาทบทวน</Button></div></div>}</>}
  </div>;
}
function Question({q,onAnswer,instant=true,selected,disabled=false,allowChange=false}:{q:QuizQuestion;onAnswer?:(index:number)=>void;instant?:boolean;selected?:number;disabled?:boolean;allowChange?:boolean}) {
  const [local,setLocal]=useState<number | undefined>();
  const choice=selected===undefined?local:selected;
  const answered=choice!==undefined;
  const select=(i:number)=>{if(disabled||(answered&&!allowChange))return;setLocal(i);onAnswer?.(i);};
  return <div className="question"><h3>{q.question}</h3><div className="choice-list">{q.options.map((o,i)=><button key={i} disabled={disabled||(answered&&!allowChange)} className={`choice ${choice===i?'selected':''} ${instant&&answered?(o.isCorrect?'correct':choice===i?'incorrect':''):''}`} onClick={()=>select(i)}><span>{String.fromCharCode(65+i)}</span><span>{clean(o.text)}</span>{instant&&answered&&o.isCorrect&&<CheckCircle2 size={18}/>}</button>)}</div>{instant&&answered&&<div className={`feedback ${q.options[choice!]?.isCorrect?'success':'error'}`} role="status"><strong>{q.options[choice!]?.isCorrect?'ถูกต้อง':'ยังไม่ถูก ลองดูเหตุผล'}</strong><p>{clean(q.options[choice!]?.explanation || q.options.find(o=>o.isCorrect)?.explanation || '')}</p><Reference week={q.weekId} page={q.pdfPage}/></div>}</div>;
}
function Practice({weeks}:{weeks:WeekId[]}) {
  const {recordQuizScore,quizScores}=useApp();
  const [type,setType]=useState('quiz'),[topic,setTopic]=useState('all'),[index,setIndex]=useState(0),[attempt,setAttempt]=useState(0);
  const [answers,setAnswers]=useState<Record<string,number>>({});
  const [round,setRound]=useState<QuizQuestion[]>([]);
  const recorded=useRef(false);
  const pool=weeks.flatMap(w=>QUESTION_BANK[w]);
  const topics=[...new Set(pool.map(q=>q.topic))];
  const key=`studio-${weeks.join('-')}-${topic}`;
  useEffect(()=>{const qs=topic==='all'?pool:pool.filter(q=>q.topic===topic);setRound(shuffle(qs).slice(0,10));setIndex(0);setAnswers({});recorded.current=false;},[weeks.join(','),topic,attempt]);
  const score=round.filter(q=>q.options[answers[q.id]]?.isCorrect).length,finished=round.length>0 && Object.keys(answers).length===round.length;
  useEffect(()=>{if(finished&&!recorded.current){recorded.current=true;recordQuizScore(key,score,round.length);}},[finished,key,score,round.length,recordQuizScore]);
  return <section className="practice"><div className="section-title"><div><h2>ฝึกก่อนสอบ</h2><p className="muted">เลือกหัวข้อ สุ่มโจทย์ และตรวจเหตุผลกับต้นฉบับ</p></div><SegmentedControl label="ประเภทแบบฝึก" value={type} onValueChange={setType} options={[{value:'quiz',label:'แบบทดสอบ'},{value:'match',label:'จับคู่แนวคิด'}]}/></div>
    {type==='match'?<Matching weeks={weeks}/>:<><div className="practice-toolbar"><label>หัวข้อ <select value={topic} onChange={e=>setTopic(e.target.value)}><option value="all">ทุกหัวข้อในสัปดาห์ที่เลือก</option>{topics.map(t=><option key={t} value={t}>{t}</option>)}</select></label><Button variant="secondary" size="sm" onClick={()=>setAttempt(n=>n+1)}><Shuffle size={15}/>สุ่มชุดใหม่</Button></div>
    {round[index] && <div className="practice-surface" key={`${attempt}-${topic}-${round[index].id}`}><div className="section-title"><span>ข้อ {index+1}/{round.length} · Week {WEEKS_INFO[round[index].weekId].weekNumber}</span><span>{score} ถูก · {Object.keys(answers).length} ตอบแล้ว</span></div><progress value={Object.keys(answers).length} max={round.length}/><Question q={round[index]} selected={answers[round[index].id]} onAnswer={i=>setAnswers(old=>({...old,[round[index].id]:i}))}/><div className="button-row"><Button variant="secondary" disabled={index===0} onClick={()=>setIndex(n=>n-1)}><ChevronLeft size={16}/>ก่อนหน้า</Button><Button disabled={index===round.length-1} onClick={()=>setIndex(n=>n+1)}>ถัดไป<ChevronRight size={16}/></Button></div><div className="question-palette">{round.map((q,i)=><button className={i===index?'active':answers[q.id]!==undefined?'answered':''} key={q.id} aria-label={`ไปข้อ ${i+1}${answers[q.id]!==undefined?' ตอบแล้ว':''}`} onClick={()=>setIndex(i)}>{i+1}</button>)}</div></div>}
    {finished && <div className="result-panel" role="status"><h3>ทำครบแล้ว: {score}/{round.length}</h3><p>บันทึกผลรอบนี้แล้ว · คะแนนสูงสุด {quizScores[key]?.bestScore ?? score}/{round.length}</p><Button onClick={()=>setAttempt(n=>n+1)}>ลองอีกชุด <RotateCcw size={16}/></Button></div>}</>}
  </section>;
}
function Matching({weeks}:{weeks:WeekId[]}) {
  const [cards,setCards]=useState<Flashcard[]>([]),[options,setOptions]=useState<Flashcard[]>([]),[answers,setAnswers]=useState<Record<string,string>>({}),[check,setCheck]=useState(false),[round,setRound]=useState(0);
  useEffect(()=>{const c=shuffle(weeks.flatMap(w=>CARD_BANK[w])).slice(0,4);setCards(c);setOptions(shuffle(c));setAnswers({});setCheck(false);},[weeks.join(','),round]);
  return <div className="matching"><p className="muted">จับคู่คำถามกับแนวคำตอบทั้ง 4 คู่ แล้วตรวจผล</p><ol className="matching-definitions">{options.map((c,i)=><li key={c.id}><strong>{String.fromCharCode(65+i)}</strong><span>{summary(c.back,300)}</span></li>)}</ol>{cards.map(c=><div className="matching-row" key={c.id}><label htmlFor={`match-${c.id}`}>{c.front}</label><select id={`match-${c.id}`} disabled={check} value={answers[c.id]||''} onChange={e=>setAnswers(old=>({...old,[c.id]:e.target.value}))}><option value="">เลือกคำตอบ</option>{options.map((o,i)=><option value={o.id} key={o.id}>{String.fromCharCode(65+i)}</option>)}</select>{check && <span className={answers[c.id]===c.id?'success':'error'}>{answers[c.id]===c.id?'ถูกต้อง':`คำตอบ ${String.fromCharCode(65+options.findIndex(o=>o.id===c.id))}`}</span>}<Reference week={c.weekId} page={c.pdfPage}/></div>)}<div className="button-row"><Button disabled={Object.keys(answers).filter(k=>answers[k]).length<cards.length||check} onClick={()=>setCheck(true)}>ตรวจการจับคู่</Button><Button variant="secondary" onClick={()=>setRound(n=>n+1)}>สุ่มคู่ใหม่</Button></div>{check && <p role="status">ถูก {cards.filter(c=>answers[c.id]===c.id).length}/{cards.length} คู่</p>}</div>;
}
function Cards({weeks}:{weeks:WeekId[]}) {
  const {flashcardMastery,markFlashcard,resetFlashcardMastery}=useApp();
  const [filter,setFilter]=useState('all'),[index,setIndex]=useState(0),[flipped,setFlipped]=useState(false),[order,setOrder]=useState<string[]>([]);
  const pool=weeks.flatMap(w=>CARD_BANK[w]);
  const cards=pool.filter(c=>filter==='all'||filter==='review'&&flashcardMastery[c.id]!=='known'||filter==='known'&&flashcardMastery[c.id]==='known').sort((a,b)=>order.length?order.indexOf(a.id)-order.indexOf(b.id):0);
  const current=cards[Math.min(index,cards.length-1)];
  const known=pool.filter(c=>flashcardMastery[c.id]==='known').length;
  const mark=(status:'known'|'review')=>{if(!current)return;markFlashcard(current.id,status);setFlipped(false);if(filter==='all')setIndex(n=>Math.min(n+1,cards.length-1));};
  return <section><div className="section-title"><div><h2>นึกคำตอบ ก่อนพลิกการ์ด</h2><p className="muted">จำได้แล้ว {known}/{pool.length} ใบ · ครอบคลุมทุกหัวข้อ</p></div><SegmentedControl label="กรองแฟลชการ์ด" value={filter} onValueChange={v=>{setFilter(v);setIndex(0);setFlipped(false);}} options={[{value:'all',label:'ทั้งหมด'},{value:'review',label:'ต้องทบทวน'},{value:'known',label:'จำได้แล้ว'}]}/></div><progress value={known} max={pool.length}/>
    <div className="button-row"><Button variant="ghost" size="sm" onClick={()=>{setOrder(shuffle(pool.map(c=>c.id)));setIndex(0);setFlipped(false);}}><Shuffle size={15}/>สุ่มลำดับ</Button><Button variant="ghost" size="sm" onClick={()=>{pool.forEach(c=>markFlashcard(c.id,'review'));setIndex(0);setFlipped(false);}}>เริ่มทบทวนใหม่</Button></div>
    {current?<><div className="flashcard-meta"><span>{current.category}</span><span>{Math.min(index+1,cards.length)}/{cards.length}</span></div><button className="flashcard" onClick={()=>setFlipped(!flipped)} aria-label={flipped?'พลิกดูคำถาม':'พลิกดูคำตอบ'}><span className="flashcard-label">{flipped?'แนวคำตอบ':'คำถาม'}</span><div>{flipped?<FormattedText content={current.back}/>:<h3>{current.front}</h3>}</div><span className="muted">คลิกหรือกด Enter เพื่อพลิก</span></button>{flipped&&(current.thaiExplanation||current.thaiBack)&&<p className="thai-note">{current.thaiExplanation||current.thaiBack}</p>}<div className="button-row"><Button variant="secondary" disabled={index===0} onClick={()=>{setIndex(n=>n-1);setFlipped(false);}}><ChevronLeft size={16}/>ก่อนหน้า</Button><Button variant="secondary" onClick={()=>mark('review')}>ยังต้องทบทวน</Button><Button onClick={()=>mark('known')}>จำได้แล้ว <Check size={16}/></Button><Button variant="ghost" disabled={index>=cards.length-1} onClick={()=>{setIndex(n=>n+1);setFlipped(false);}}>ถัดไป<ChevronRight size={16}/></Button></div><Reference week={current.weekId} page={current.pdfPage}/></>:<div className="empty-state"><h3>ไม่มีการ์ดในกลุ่มนี้</h3><Button variant="secondary" onClick={()=>setFilter('all')}>ดูการ์ดทั้งหมด</Button></div>}
  </section>;
}
function Exam({weeks}:{weeks:WeekId[]}) {
  const {saveExamAttempt,examHistory}=useApp();
  const [state,setState]=useState<'intro'|'active'|'review'>('intro'),[count,setCount]=useState(24),[minutes,setMinutes]=useState(30),[instant,setInstant]=useState(false);
  const [questions,setQuestions]=useState<QuizQuestion[]>([]),[answers,setAnswers]=useState<Record<string,number>>({}),[flags,setFlags]=useState<Record<string,boolean>>({}),[index,setIndex]=useState(0),[seconds,setSeconds]=useState(0),[last,setLast]=useState<ExamAttempt|null>(null);
  const started=useRef(0),deadline=useRef(0),submitted=useRef(false);
  const available = weeks.reduce((n,w)=>n+QUESTION_BANK[w].length,0);
  const actualCount = Math.min(count,available);
  const submit=useCallback(()=>{
    if(submitted.current||questions.length===0)return;submitted.current=true;
    const breakdown=Object.fromEntries(WEEK_IDS.map(w=>[w,{total:0,correct:0}])) as ExamAttempt['weekBreakdown'];
    let score=0;questions.forEach(q=>{breakdown[q.weekId].total++;if(q.options[answers[q.id]]?.isCorrect){score++;breakdown[q.weekId].correct++;}});
    const attempt:ExamAttempt={id:`studio-exam-${Date.now()}`,date:new Date().toLocaleString('th-TH'),totalQuestions:questions.length,score,percentage:Math.round(score/questions.length*100),timeSpentSeconds:Math.round((Date.now()-started.current)/1000),weekBreakdown:breakdown,userAnswers:answers};
    saveExamAttempt(attempt);setLast(attempt);setState('review');
  },[questions,answers,saveExamAttempt]);
  useEffect(()=>{if(state!=='active')return;const tick=()=>{const left=Math.max(0,Math.ceil((deadline.current-Date.now())/1000));setSeconds(left);if(left===0)submit();};tick();const id=setInterval(tick,1000);return()=>clearInterval(id);},[state,submit]);
  const start=()=>{setQuestions(examPool(weeks,actualCount));setAnswers({});setFlags({});setIndex(0);started.current=Date.now();deadline.current=started.current+minutes*60000;submitted.current=false;setSeconds(minutes*60);setState('active');};
  if(state==='intro')return <section><div className="section-title"><div><h2>สอบจำลอง ตามจังหวะของคุณ</h2><p className="muted">สุ่มอย่างสมดุลจาก {weeks.length} สัปดาห์ที่เลือก พร้อมคะแนนแยก WEEK</p></div><Timer size={24}/></div><div className="exam-settings"><label>จำนวนข้อ<select value={actualCount} onChange={e=>setCount(Number(e.target.value))}>{[...new Set([16,24,40,64].map(n=>Math.min(n,available)))].map(n=><option key={n} value={n}>{n} ข้อ</option>)}</select></label><label>เวลา (นาที)<input type="number" min={1} max={180} value={minutes} onChange={e=>setMinutes(Math.min(180,Math.max(1,Number(e.target.value))))}/></label><label className="checkbox-label"><input type="checkbox" checked={instant} onChange={e=>setInstant(e.target.checked)}/>ตรวจคำตอบทันที (โหมดฝึก)</label></div><p className="muted">การเปลี่ยนแท็บยังเก็บข้อสอบและนับเวลาต่อ แต่การรีเฟรชหน้าจะเริ่มใหม่</p><Button onClick={start}>เริ่มสอบ {actualCount} ข้อ <ArrowRight size={16}/></Button>{examHistory.length>0&&<div className="exam-history"><h3>ผลสอบที่ผ่านมา</h3>{examHistory.slice(0,5).map(a=><div key={a.id}><span>{a.date}</span><span>{a.score}/{a.totalQuestions} · {a.percentage}%</span></div>)}</div>}</section>;
  if(state==='review'&&last)return <section className="exam-review"><h2>ผลการสอบจำลอง</h2><div className="result-score">{last.percentage}<span>%</span></div><p>{last.score}/{last.totalQuestions} ข้อ · ใช้เวลา {Math.floor(last.timeSpentSeconds/60)} นาที {last.timeSpentSeconds%60} วินาที</p><div className="week-breakdown">{WEEK_IDS.filter(w=>last.weekBreakdown[w].total>0).map(w=><div key={w}><span>Week {WEEKS_INFO[w].weekNumber}</span><progress value={last.weekBreakdown[w].correct} max={last.weekBreakdown[w].total}/><span>{last.weekBreakdown[w].correct}/{last.weekBreakdown[w].total}</span></div>)}</div><Button onClick={()=>setState('intro')}>เริ่มข้อสอบรอบใหม่ <RotateCcw size={16}/></Button><h3>ตรวจคำตอบและจุดที่ควรทบทวน</h3>{questions.map((q,i)=><details key={q.id}><summary>ข้อ {i+1} · {answers[q.id]===undefined?'ไม่ได้ตอบ':q.options[answers[q.id]]?.isCorrect?'ถูกต้อง':'ควรทบทวน'} · {q.topic}</summary><Question q={q} selected={answers[q.id]} disabled/><p>คำตอบที่ถูก: {clean(q.options.find(o=>o.isCorrect)!.text)}</p><p>{clean(q.options.find(o=>o.isCorrect)!.explanation)}</p><Reference week={q.weekId} page={q.pdfPage}/></details>)}</section>;
  const q=questions[index];if(!q)return null;
  return <section><div className="exam-toolbar"><span>ข้อ {index+1}/{questions.length} · ตอบแล้ว {Object.keys(answers).length}</span><span className={seconds<300?'error':''}><Timer size={16}/> {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</span><Button variant="secondary" size="sm" onClick={()=>setFlags(old=>({...old,[q.id]:!old[q.id]}))}><Flag size={15}/>{flags[q.id]?'ปักธงแล้ว':'ปักธงข้อนี้'}</Button></div><div className="question-palette">{questions.map((item,i)=><button key={item.id} className={`${i===index?'active':''} ${answers[item.id]!==undefined?'answered':''}`} onClick={()=>setIndex(i)} aria-label={`ข้อ ${i+1}${flags[item.id]?' ปักธง':''}${answers[item.id]!==undefined?' ตอบแล้ว':''}`}>{i+1}{flags[item.id]?' ⚑':''}</button>)}</div><div key={q.id} className="practice-surface"><p className="muted">Week {WEEKS_INFO[q.weekId].weekNumber} · {q.topic}</p><Question q={q} selected={answers[q.id]} instant={instant} allowChange={!instant} onAnswer={i=>setAnswers(old=>({...old,[q.id]:i}))}/><div className="button-row"><Button variant="secondary" disabled={index===0} onClick={()=>setIndex(n=>n-1)}>ก่อนหน้า</Button><Button variant="secondary" disabled={index===questions.length-1} onClick={()=>setIndex(n=>n+1)}>ถัดไป</Button><Button onClick={submit}>ส่งข้อสอบ ({Object.keys(answers).length}/{questions.length})</Button></div></div></section>;
}
function SlideLibrary({weeks,sources,errors,retry}:{weeks:WeekId[];sources:Sources;errors:WeekId[];retry:()=>void}) {
  const [query,setQuery]=useState(''),[pageAnswers,setPageAnswers]=useSaved<Record<string,string>>('dsi102_slide_notes',{});
  const {jumpToPdf}=useApp();
  return <section><div className="section-title"><div><h2>เนื้อหาต้นฉบับครบทุกหน้า</h2><p className="muted">ข้อความถอดจาก PDF โดยคงเลขหน้าจริงไว้ ภาพ ตาราง และหน้าที่ไม่มีข้อความให้เปิด PDF ตรวจ</p></div></div><label className="source-filter">ค้นหาในสไลด์ที่เลือก <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="คำศัพท์หรือหัวข้อ…"/></label>
    {weeks.map(w=>{const source=sources[w];if(errors.includes(w))return <div className="empty-state" key={w} role="alert"><p>โหลดข้อความ Week {WEEKS_INFO[w].weekNumber} ไม่สำเร็จ</p><Button variant="secondary" onClick={retry}>ลองโหลดอีกครั้ง</Button><Reference week={w} page={1}/></div>;if(!source)return <p key={w} role="status">กำลังโหลด Week {WEEKS_INFO[w].weekNumber}…</p>;const pages=source.pages.filter(p=>`${p.title} ${p.text}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));return <div className="slide-week" key={w}><h3>Week {WEEKS_INFO[w].weekNumber} · {source.count} หน้า</h3><p className="muted">ต้นฉบับ: {source.source}</p>{pages.length===0&&<p>ไม่พบคำค้นในสัปดาห์นี้</p>}{pages.map(p=><details className="slide-detail" key={p.page}><summary><span className="slide-number">{p.page}</span><span>{p.title}</span></summary><div className="slide-content"><div className="section-title"><span>ข้อความต้นฉบับ · หน้า {p.page}</span><Reference week={w} page={p.page}/></div>{p.text.trim()?<pre>{p.text}</pre>:<p>หน้านี้เป็นภาพหรือไม่มีข้อความที่ถอดได้ กรุณาเปิด PDF</p>}<label htmlFor={`slide-note-${w}-${p.page}`}>ลองสรุปหน้านี้เป็นหนึ่งประโยค</label><textarea id={`slide-note-${w}-${p.page}`} rows={2} value={pageAnswers[`${w}-${p.page}`]||''} onChange={e=>setPageAnswers(old=>({...old,[`${w}-${p.page}`]:e.target.value}))} placeholder="จดสิ่งที่เข้าใจ แล้วเปิด PDF ตรวจเทียบ"/><Button variant="secondary" size="sm" onClick={()=>jumpToPdf(w,p.page)}>เปิดหน้านี้เพื่อตรวจสรุป <ExternalLink size={14}/></Button></div></details>)}</div>;})}
  </section>;
}
