import type { ProcessRun, ProcessStep } from './processEngine';
export function buildAdvancedRun(engine:string,option:string,amount:number):ProcessRun {
 let actors:ProcessRun['actors']=[],steps:ProcessStep[]=[],state:Record<string,string>={},initial:Record<string,string>={},result='';
 const setup=(labels:string[],values:Record<string,string>)=>{actors=labels.map((label,i)=>({id:`actor-${i}`,label}));state={...values};initial={...values}};
 const event=(from:number,to:number,action:string,payload:string,changes:Record<string,string>={},status:ProcessStep['status']='ok')=>{state={...state,...changes};steps.push({from,to,action,payload,state:{...state},status})};
 switch(engine){
 case 'emat':{
  const average=amount/100*110+(1-amount/100)*210;setup(['Virtual address','TLB','Page table / RAM','Expected time'],{HitRatio:amount+'%',HitTime:'110 ns',MissTime:'210 ns'});event(0,1,'แบ่งกรณีตาม hit ratio',amount+'% hit');event(1,2,'TLB hit ใช้ 1 memory access','10 + 100 = 110 ns');event(1,2,'TLB miss ใช้ page table และ data','10 + 100 + 100 = 210 ns');event(2,3,'ถ่วงน้ำหนักเวลาแต่ละกรณี',amount+'%×110 + '+(100-amount)+'%×210',{EMAT:average.toFixed(1)+' ns'});result='EMAT = '+average.toFixed(1)+' ns ภายใต้สมมติฐานที่ระบุ';break;
 }
 case 'context':{
  setup(['Process A','CPU registers','PCB A / B','Process B'],{PC:'A: instruction 10',Register:'A: 42',Process:'A'});event(0,1,'A กำลังทำงาน','PC=10; R=42');if(option==='switch'){event(1,2,'save context ของ A','A: PC=10, R=42',{PCB_A:'PC=10; R=42'});event(2,1,'restore context ของ B','B: PC=3, R=7',{PC:'B: instruction 3',Register:'B: 7',Process:'B'});event(1,3,'B รันต่อจากบริบทของตน','instruction 3');result='สลับเป็น B โดยบริบทของ A ถูกเก็บไว้'}else{event(1,0,'A ทำงานต่อ','next instruction 11',{PC:'A: instruction 11'});result='ไม่มีการสลับ process ในกรณีนี้'}break;
 }
 case 'snapshot':{
  setup(['VM workload','Current state','Snapshot reference','Restore'],{Current:'version A',Snapshot:'ยังไม่มี'});event(0,2,'สร้าง snapshot จุดอ้างอิง A','state A',{Snapshot:'A'});event(0,1,'workload เขียนข้อมูลใหม่','state B',{Current:'version B'});if(option==='restore'){event(2,3,'ขอใช้ snapshot A','restore A');event(3,1,'Current กลับไปตาม snapshot','state A',{Current:'version A'})}else if(option==='clone'){actors[3].label='Cloned VM';event(2,3,'Clone VM ใหม่จากจุดอ้างอิง A','new VM at state A',{Clone:'version A'});}else if(option==='migrate'){actors[3].label='Destination host';event(1,3,'ย้าย execution state ไป host ใหม่','state B at destination',{Host:'destination host'});}else event(1,0,'คงข้อมูลที่แก้ใหม่','state B');result='Current='+state.Current+'; snapshot reference='+state.Snapshot;break;
 }
 case 'ipv6':{
  const full=option==='short'?'2001:0db8:0000:0000:0000:0000:0000:0001':'0000:0000:0000:0000:0000:ffff:c000:0201';setup(['Address notation','IPv6 parser','8 × 16-bit groups','Application'],{Notation:option==='short'?'2001:db8::1':'::ffff:192.0.2.1',Bits:'128'});event(0,1,'อ่านรูปแบบ address',state.Notation);event(1,2,'ขยายกลุ่มให้ครบ 8 กลุ่ม',full,{Expanded:full});event(2,3,'ส่ง address ที่แปลแล้วให้ application','128-bit address');result=full;break;
 }
 case 'diagnose':{
  setup(['Device / Link','IP routing','DNS','Application'],{ปัญหา:option,ทดสอบ:'ยังไม่เริ่ม'});const fail={link:0,ip:1,dns:2,app:3}[option as 'link'|'ip'|'dns'|'app'];for(let i=0;i<=fail;i++)event(i?i-1:0,i,'ตรวจหน้าที่ '+actors[i].label,i===fail?'failed':'passed',{ทดสอบ:actors[i].label+': '+(i===fail?'failed':'passed')},i===fail?'blocked':'ok');result='หลักฐานแรกในแบบจำลองชี้ที่ '+actors[fail].label;break;
 }
 case 'mfa':{
  setup(['ผู้ใช้','Password verification','Second factor','Application'],{Password:'ผ่าน',Factor:'ยังไม่ยืนยัน'});event(0,1,'ยืนยัน password ในตัวอย่าง','password accepted');event(1,2,'นโยบายขอ factor อีกประเภท','second factor required');if(option==='both'){event(2,3,'factor ตามนโยบายผ่าน','factor verified',{Factor:'ผ่าน',Session:'สร้างแล้ว'});result='สร้าง session หลังผ่านทั้งสองเงื่อนไข'}else{event(2,0,'ยังไม่มีหลักฐาน factor','login not completed',{Factor:'ไม่ผ่าน',Session:'ยังไม่สร้าง'},'blocked');result='password อย่างเดียวไม่ผ่านนโยบายนี้'}break;
 }
 case 'raid':{
  const a=12,b=10,parity=a^b;setup(['Disk A: data','Disk B: data','Parity disk','Reconstruction'],{A:String(a),B:String(b),Parity:String(parity)});event(0,2,'คำนวณ XOR parity',a+' XOR '+b+' = '+parity);event(0,3,'จำลอง disk A หาย','A unavailable',{A:'หาย'},'warning');if(option==='one'){event(1,3,'ใช้ B กับ parity reconstruct A',b+' XOR '+parity+' = '+(b^parity),{Recovered:String(b^parity)});result='กู้ A = '+(b^parity)+' ได้จาก B และ parity'}else{event(1,3,'B หายพร้อม A; เหลือ parity อย่างเดียว','insufficient information',{B:'หาย',Recovered:'ไม่ได้'},'blocked');result='หนึ่ง parity ไม่พอเมื่อข้อมูลสองลูกหาย'}break;
 }
 case 'recovery':{
  setup(['Backup ล่าสุด','เหตุเสียหาย','Restore','Validate / service'],{Backup:'t=0',Incident:'t='+amount+' นาที'});event(0,1,'เกิดเหตุหลัง backup',amount+' นาทีหลังสำรอง',{ช่วงข้อมูลเสี่ยง:amount+' นาที'});event(1,2,'restore ตัวอย่างใช้ 15 นาที','restore duration=15');event(2,3,'validate ตัวอย่างใช้ 5 นาที','validation duration=5',{เวลากู้ตัวอย่าง:'20 นาที'});result='ช่วงข้อมูลเสี่ยง '+amount+' นาที; เวลากู้ตัวอย่าง 20 นาที เป็นคนละตัวชี้วัด';break;
 }
 case 'reuse':{
  setup(['Service A','ข้อมูล credential ที่รั่ว','Service B','ผู้ใช้ / response'],{Password_B:option==='reused'?'เหมือน A':'ต่างจาก A',ผล:'ยังไม่ลอง'});event(0,1,'จำลอง credential ของ A เปิดเผย','example credential A');event(1,2,'นำ credential A ไปลองที่ B','same candidate');if(option==='reused'){event(2,3,'ตรงกับ password B ในตัวอย่าง','authentication accepted',{ผล:'บัญชี B เสี่ยงได้รับผล'},'warning');result='failure ของ A ขยายผลถึง B เพราะ password ซ้ำ'}else{event(2,3,'ไม่ตรงกับ password B','authentication rejected',{ผล:'candidate นี้ไม่ผ่าน'},'blocked');result='credential A ใช้เข้า B ไม่ได้ในกรณีนี้'}break;
 }
 case 'capacity':{
  const served=Math.min(20,amount),rejected=amount-served;setup(['แหล่งคำขอ','Network','Service queue','Application'],{Sources:option==='one'?'หนึ่งแหล่ง':'หลายแหล่ง',Capacity:'20 / รอบ'});event(0,1,'คำขอเข้าสู่บริการ',amount+' requests');event(1,2,'ตรวจ capacity ในรอบนี้',amount+' demand vs 20 capacity');event(2,3,'บริการรับงานที่อยู่ใน capacity',served+' accepted',{Accepted:String(served),Rejected:String(rejected)},rejected?'warning':'ok');result='รับ '+served+'; ปฏิเสธส่วนเกิน '+rejected+' ตามกติกาตัวอย่าง';break;
 }
 case 'session':{
  setup(['Client','Session store','Resource authorization','Application'],{Token:option==='revoked'?'revoked':'active'});event(0,1,'ส่ง token ใน request','session #S102');if(option==='revoked'){event(1,0,'token ถูกเพิกถอนแล้ว','401',{ผล:'ยังไม่ตรวจ resource'},'blocked');result='request หยุดที่ session verification'}else{event(1,2,'session active ยังต้องตรวจ resource','principal B requests resource A');event(2,0,'resource policy ไม่อนุญาต','403',{ผล:'ปฏิเสธ resource'},'blocked');result='session active ไม่เท่ากับมีสิทธิ์ใน resource นี้'}break;
 }
 case 'webSafety':{
  const csrf=option.startsWith('csrf'),safe=option.endsWith('safe')&&!option.endsWith('unsafe');setup(csrf?['Browser ที่มี session','Untrusted origin','Server token check','Application action']:['Untrusted content','Output renderer','Browser parser','Page context'],{Mode:csrf?'CSRF':'XSS',ผล:'ยังไม่เกิด action'});if(csrf){event(1,0,'คำขอจาก origin ที่ไม่เชื่อถือ','unintended action request');event(0,2,'browser แนบ session ตามเงื่อนไข','authenticated request; missing CSRF token');event(2,safe?0:3,safe?'ตรวจ token แล้วปฏิเสธ':'ไม่ตรวจ token ตามนโยบายตัวอย่าง',safe?'403':'action executed',{ผล:safe?'หยุด unintended action':'action เกิดในแบบจำลอง'},safe?'blocked':'warning');}else{event(0,1,'รับ content ที่ยังไม่เชื่อถือ','untrusted text');event(1,2,safe?'encode สำหรับ text context':'ส่ง content ให้ตีความผิดเป็น code',safe?'encoded text':'untrusted code interpretation');event(2,3,safe?'แสดงเป็นข้อความ':'เกิด script interpretation ในแบบจำลอง',safe?'text displayed':'unintended script',{ผล:safe?'content เป็นข้อความ':'content ถูกตีความเป็น code'},safe?'ok':'warning')}result=state.ผล;break;
 }
 case 'lifecycle':{
  setup(['Design / requirements','Development','Review / testing','Deploy / monitor'],{Checks:'ยังไม่ตรวจ'});event(0,1,'กำหนด asset และ access requirements','security requirements');event(1,2,'ส่ง implementation ให้ทบทวน','code + configuration');if(option==='checked'){event(2,2,'ตรวจ input, output, access และ dependencies','review + tests',{Checks:'ผ่านตามชุดตรวจตัวอย่าง'});event(2,3,'deploy แล้วติดตามเหตุ','monitored release');result='มีการตรวจหลายช่วงและติดตามหลัง deploy'}else{event(2,3,'ข้ามการตรวจแล้ว deploy','unchecked release',{Checks:'ไม่ได้ตรวจ'},'warning');result='ข้อผิดพลาดที่ไม่ได้ตรวจอาจคงอยู่หลัง deploy'}break;
 }
 default:throw new Error('Unsupported teaching process '+engine);
 }
 return {actors,steps,result,initial};
}
