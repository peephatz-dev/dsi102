import { useState } from 'react';
import { Button } from '../arc/button/button';
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WeekId } from '../../types/course';
const controls = [
  {id:'awareness',name:'Awareness + trusted verification',layer:'User',role:'หยุดตามคำขอที่ไม่ได้ตรวจสอบ แล้วเปิดช่องทางทางการเอง'},
  {id:'mfa',name:'Unique passwords + MFA',layer:'Identity',role:'ลดโอกาสที่รหัสผ่านรั่วจากที่หนึ่งจะใช้ยึดบัญชีอีกที่หนึ่งได้'},
  {id:'patch',name:'Patch + endpoint monitoring',layer:'Endpoint',role:'ลดช่องโหว่ที่แก้ได้และตรวจพฤติกรรมผิดปกติของเครื่อง'},
  {id:'segments',name:'Segmentation + traffic controls',layer:'Network',role:'จำกัดเส้นทางที่ไม่จำเป็นและช่วยควบคุมขอบเขตผลกระทบ'},
  {id:'access',name:'Server-side authorization',layer:'Application',role:'ตรวจสิทธิ์ต่อ resource และ action ที่ server'},
  {id:'tls',name:'TLS + identity validation',layer:'Communication',role:'ปกป้องเนื้อหาและตรวจอัตลักษณ์คู่สื่อสารตามการตั้งค่าที่ถูกต้อง'},
  {id:'backup',name:'Tested backup + recovery plan',layer:'Data',role:'คืนข้อมูลและบริการหลังสูญเสียหรือเสียหาย'},
];
const scenarios = [
  {name:'ข้อความขอรหัสผ่านเร่งด่วน',text:'อีเมลอ้าง Campus IT ขอให้ยืนยัน password ผ่านลิงก์ไม่รู้จัก มิฉะนั้นเกรดจะหาย',needed:['awareness','mfa'],recovery:'ตรวจและรายงานผ่าน IT ที่ติดต่อจากช่องทางทางการ หากเปิดเผยข้อมูลแล้วให้จัดการบัญชีและ session ที่เกี่ยวข้อง',page7:52,page8:34},
  {name:'เครื่องติด ransomware',text:'เครื่องผู้ใช้เปิดไฟล์ไม่ได้และมีข้อความเรียกค่าไถ่ ต้องตรวจผลต่อระบบอื่นและความพร้อมของข้อมูล',needed:['patch','segments','backup'],recovery:'แยกเครื่อง ตรวจหลักฐาน ประสานผู้รับผิดชอบ และ restore จากชุดสำรองที่ตรวจแล้ว',page7:46,page8:24},
  {name:'ผู้ใช้เห็นข้อมูลของคนอื่น',text:'บัญชีนักศึกษาที่ล็อกอินแล้วสามารถเข้าถึง academic record ของคนอื่นได้',needed:['access'],recovery:'จำกัดการเข้าถึง ตรวจสิทธิ์ทุก request ที่ server และตรวจผลกระทบจาก logs',page7:39,page8:57},
  {name:'การสื่อสารผ่านเครือข่ายที่ไม่เชื่อถือ',text:'ผู้ใช้กำลังเข้าบริการผ่านเส้นทางที่อาจมีผู้สังเกต traffic หรือแทรกแซงการสื่อสาร',needed:['tls','awareness'],recovery:'ตรวจตัวตนบริการและการตั้งค่า TLS แยกเนื้อหาที่เข้ารหัสออกจาก metadata ที่ยังอาจสังเกตได้',page7:45,page8:45},
];
export function SecurityLab({week}:{week:WeekId}) {
  const [scenario,setScenario]=useState(0),[enabled,setEnabled]=useState<string[]>([]),[show,setShow]=useState(false);
  const {jumpToPdf}=useApp();const current=scenarios[scenario];
  const covered=current.needed.filter(c=>enabled.includes(c));
  return <section className="security-lab"><div className="section-title"><div><h3>ทดลองเลือกการป้องกัน</h3><p className="muted">สถานการณ์จำลองเพื่อเรียนรู้บทบาทของ controls</p></div><ShieldCheck size={22}/></div><label>สถานการณ์ <select value={scenario} onChange={e=>{setScenario(Number(e.target.value));setShow(false);}}>{scenarios.map((s,i)=><option key={s.name} value={i}>{s.name}</option>)}</select></label><p className="lead-note">{current.text}</p><div className="control-list">{controls.map(c=><button key={c.id} className={enabled.includes(c.id)?'active':''} aria-pressed={enabled.includes(c.id)} onClick={()=>{setEnabled(old=>old.includes(c.id)?old.filter(x=>x!==c.id):[...old,c.id]);setShow(false);}}>{enabled.includes(c.id)?<CheckCircle2 size={18}/>:<Circle size={18}/>}<span>{c.name}<small>{c.layer}</small></span></button>)}</div><div className="button-row"><Button onClick={()=>setShow(true)}>วิเคราะห์ controls ที่เลือก</Button><Button variant="secondary" onClick={()=>{setEnabled([]);setShow(false);}}>ล้างตัวเลือก</Button></div>{show && <div className="answer-reveal" role="status"><h4>เชื่อมการป้องกันกับสถานการณ์</h4><p>เลือก controls หลักที่เกี่ยวข้อง {covered.length}/{current.needed.length} รายการ</p><ul>{current.needed.map(id=>{const c=controls.find(x=>x.id===id)!;return <li key={id}><strong>{enabled.includes(id)?'เลือกแล้ว':'ควรพิจารณา'}: {c.name}</strong><p>{c.role}</p></li>;})}</ul><p>{current.recovery}</p><p className="muted">เป็นแบบจำลองเชิงแนวคิด การเลือกครบไม่ได้รับประกันความปลอดภัยจริง และอาจต้องมี controls อื่นตามบริบท</p><Button variant="ghost" size="sm" onClick={()=>jumpToPdf(week,week==='week7'?current.page7:current.page8)}>ตรวจสถานการณ์กับ PDF</Button></div>}</section>;
}
