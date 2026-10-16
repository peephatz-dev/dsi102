import { useState } from 'react';
import { ArrowUpRight, BookOpen, FileText, Highlighter, Lightbulb, Search, ShieldCheck } from 'lucide-react';
import { ALL_WEEKS_LIST } from '../../data/weeksInfo';
import { useApp } from '../../context/AppContext';
import { WeekId } from '../../types/course';
import { sourcePageKey } from './SlideReader';
const categories=['ทั้งหมด','พื้นฐานและแพลตฟอร์ม','เครือข่าย','ความปลอดภัย'];
export function ReadingLibrary({onSelect}:{onSelect:(week:WeekId)=>void}) {
 const [filter,setFilter]=useState(0);const {completedSections}=useApp();
 const weeks=ALL_WEEKS_LIST.filter(w=>filter===0||(filter===1&&w.weekNumber<=4)||(filter===2&&w.weekNumber>=5&&w.weekNumber<=6)||(filter===3&&w.weekNumber>=7));
 return <section className="reading-library"><header className="library-title"><div className="library-symbol"><BookOpen size={32}/></div><div><h1>ห้องสมุด DSI 102</h1><p>อ่านให้เข้าใจ ทีละหัวข้อ ตามสไลด์จริง</p></div></header>
   <div className="library-welcome"><BookOpen size={22}/><div><h2>หยิบ Week ที่อยากเรียน แล้วเลื่อนอ่านได้เลย</h2><p>รวมสรุป คำอธิบายละเอียด ตัวอย่าง และจุดที่มักสับสน ครบทั้ง 8 Week พร้อมเปิด PDF เทียบได้ทุกหน้า</p></div></div>
   <div className="reading-key"><span><Highlighter size={15}/>สรุปใจความ</span><span><BookOpen size={15}/>อธิบายทีละประเด็น</span><span><Lightbulb size={15}/>ตัวอย่างให้เห็นภาพ</span><span><FileText size={15}/>อ้างอิงสไลด์จริง</span></div>
   <div className="library-heading"><h2><BookOpen size={20}/>ชั้นหนังสือของเรา</h2><span>8 Week · 514 สไลด์ต้นฉบับ</span></div>
   <div className="library-filters" role="group" aria-label="หมวดบทเรียน">{categories.map((label,i)=><button key={i} aria-pressed={filter===i} onClick={()=>setFilter(i)}>{label}</button>)}</div>
   <div className="library-shelves">{weeks.map(w=>{const done=Array.from({length:w.totalPages},(_,i)=>completedSections[sourcePageKey(w.id,i+1)]).filter(Boolean).length;return <button className={`library-book book-week-${w.weekNumber}`} key={w.id} onClick={()=>onSelect(w.id)}><div className="book-cover"><span className="book-spine">DSI 102 · WEEK {w.weekNumber}</span><img src={`/slides/${w.id}/1.webp`} alt={`ปกสไลด์ Week ${w.weekNumber}`} loading="lazy" width="1100" height="620"/><span className="book-open"><BookOpen size={16}/>เปิดอ่าน<ArrowUpRight size={15}/></span></div><div className="book-description"><div className="book-meta"><span>Week {String(w.weekNumber).padStart(2,'0')}</span><span>{w.totalPages} หน้า</span></div><h3>{w.thaiTitle}</h3><p>{w.shortDesc}</p><footer><span>{done>0?`อ่านแล้ว ${done}/${w.totalPages} หน้า`:'พร้อมเริ่มอ่าน'}</span><ArrowUpRight size={17}/></footer><progress aria-label={`ความก้าวหน้า Week ${w.weekNumber}`} value={done} max={w.totalPages}/></div></button>})}</div>
   <aside className="library-footnote"><ShieldCheck size={19}/><p>หัวข้อเรียงตามหน้าจริงของ PDF · มีข้อความอธิบายประกอบและภาพต้นฉบับ · ความก้าวหน้าบันทึกในเบราว์เซอร์นี้</p></aside>
 </section>;
}
