import { buildAdvancedRun } from './processAdvanced';
import { PROCESS_SCENARIOS } from './processCatalog';
export type ProcessActor={id:string;label:string};
export type ProcessStep={from:number;to:number;action:string;payload:string;state:Record<string,string>;status:'ok'|'blocked'|'warning'};
export type ProcessRun={actors:ProcessActor[];steps:ProcessStep[];result:string;initial:Record<string,string>};
export function buildProcessRun(id:string,choice?:string,value?:number):ProcessRun {
 const config=PROCESS_SCENARIOS[id];if(!config)throw new Error(`No teaching scenario for ${id}`);
 const option=config.options.some(o=>o[0]===choice)?choice!:config.options[0][0];
 const amount=config.input?Math.round(Math.max(config.input.min,Math.min(config.input.max,value??config.input.initial))):0;
 let actors:ProcessActor[]=[], steps:ProcessStep[]=[], state:Record<string,string>={}, initial:Record<string,string>={}, result='';
 const setup=(names:string[],values:Record<string,string>)=>{actors=names.map((label,i)=>({id:`actor-${i}`,label}));state={...values};initial={...state}};
 const event=(from:number,to:number,action:string,payload:string,changes:Record<string,string>={},status:ProcessStep['status']='ok')=>{state={...state,...changes};steps.push({from,to,action,payload,state:{...state},status})};
 if(id==='volatility'){
 setup(['Program','RAM','Persistent storage'],{RAM:'42',Storage:'saved 42',Power:'ON'});event(0,1,'เก็บค่าที่กำลังทำงาน','42');event(0,2,'บันทึกค่าใน storage','saved 42');if(option==='power-off'){event(1,1,'ตัดพลังงาน: volatile value ไม่คงอยู่','RAM contents lost',{RAM:'lost',Power:'OFF'},'warning');event(2,2,'ข้อมูลที่บันทึกแล้วใน storage ยังคงอยู่','saved 42');}result='RAM='+state.RAM+'; storage='+state.Storage;return {actors,steps,result,initial};
 }
 if(id==='differential'){
 const a=3+amount,b=-3+(option==='same'?amount:0);setup(['Sender','Wire A','Wire B','Differential receiver'],{Signal:'A=3; B=-3',Noise:String(amount)});event(0,1,'ส่ง signal A แล้วรับ noise',String(a),{A:String(a)});event(0,2,'ส่ง signal B แล้วรับ noise',String(b),{B:String(b)});event(1,3,'Receiver รับ A',String(a));event(2,3,'หาความต่าง A−B',a+' − ('+b+') = '+(a-b),{Difference:String(a-b)});result='A−B='+String(a-b)+(option==='same'?' เท่ากับ signal difference เดิม 6':' ต่างจาก 6 เพราะ noise ไม่ร่วมเท่ากัน');return {actors,steps,result,initial};
 }
 if(id==='aging'){
 setup(['Low-job priority 5','Ready queue','CPU','High-job arrivals'],{LowPriority:'5',LowJob:'waiting'});let priority=5;for(let i=1;i<=5;i++){event(3,1,'High-job เข้าคิวรอบ '+i,'priority=2');if(option==='enabled')priority--;event(0,1,'ประเมิน priority หลังรอ','Low priority='+priority,{LowPriority:String(priority)});if(priority<2){event(1,2,'Low-job ถูกเลือกเพราะ priority ดีขึ้น','Low-job runs',{LowJob:'running'});break;}event(1,2,'High-job ได้ CPU ก่อน','High-job runs');}result=state.LowJob==='running'?'Low-job ได้ CPU ในตัวอย่าง Aging':'Low-job ยังรอใน 5 รอบที่แสดง';return {actors,steps,result,initial};
 }
 switch(config.engine){
 case 'service':{
  setup(['ผู้ใช้ / Browser','Application','Database','หน้าจอผลลัพธ์'],{คำขอ:'ยังไม่ส่ง',รายการ:'ยังไม่บันทึก'});
  event(0,1,'ส่งคำขอจอง','POST /reservations · book=102',{คำขอ:'ได้รับแล้ว'});
  event(1,2,'ตรวจหนังสือและข้อมูลคำขอ','SELECT book 102');
  if(option==='offline'){event(2,1,'อ่านข้อมูลไม่สำเร็จ','database unavailable',{รายการ:'ยังไม่บันทึก'},'blocked');event(1,3,'แจ้งให้ผู้ใช้ลองใหม่','503 Service unavailable');result='ไม่มี reservation ใหม่ เพราะข้อมูลต้นทางยังไม่พร้อม';}
  else{event(2,1,'พบหนังสือที่จองได้','book 102 · available');event(1,2,'บันทึกรายการที่ตรวจแล้ว','reservation #R102',{รายการ:'บันทึก #R102'});event(1,3,'แสดงผลการจอง','200 · reservation #R102');result='ข้อมูลจองถูกบันทึก และผู้ใช้เห็นผลจากบริการ';}break;
 }
 case 'encoding':{
  const code=option.charCodeAt(0),bits=code.toString(2).padStart(8,'0');setup(['ตัวอักษร','ASCII encoder','Byte buffer','ผู้รับ / decoder'],{ตัวอักษร:option,รหัส:'ยังไม่แปลง',บิต:'ยังไม่สร้าง'});
  event(0,1,'อ่านตัวอักษร',option);event(1,2,'แปลงตามตาราง ASCII',`${option} → ${code}`,{รหัส:String(code)});event(2,3,'ส่ง byte ที่ประกอบจาก 8 bits',bits,{บิต:bits});event(3,3,'ถอดรหัสกลับตามกติกาเดียวกัน',String.fromCharCode(code),{ผลรับ:option});result=`${option} = ASCII ${code} = ${bits} · 1 byte`;break;
 }
 case 'sensor':{
  const on=amount>35;setup(['Temperature sensor','IT: เก็บข้อมูล','Rule engine','OT: พัดลม','Monitoring'],{อุณหภูมิ:`${amount}°C`,พัดลม:'OFF',โหมด:option==='auto'?'อัตโนมัติ':'เฝ้าดู'});
  event(0,1,'อ่านค่าและส่ง telemetry',`${amount}°C`);event(1,2,'ตรวจเงื่อนไขที่กำหนด',`${amount} > 35 = ${on}`,{เงื่อนไข:on?'เป็นจริง':'เป็นเท็จ'});
  if(option==='auto')event(2,3,'ส่งคำสั่งไป actuator',on?'FAN ON':'FAN OFF',{พัดลม:on?'ON':'OFF'});else event(2,4,'แจ้งค่ารอการตัดสินใจของคน',`sensor=${amount}°C`,{พัดลม:'ยังไม่ได้สั่งจากกฎ'},'warning');
  event(option==='auto'?3:2,4,'บันทึกผลเพื่อติดตาม',`temperature=${amount}, mode=${option}`);result=option==='auto'?`พัดลม ${on?'ON':'OFF'} ตามกฎที่ตั้งไว้`:'มีข้อมูลและผลวิเคราะห์ แต่ยังไม่มีคำสั่งควบคุมจากระบบ';break;
 }
 case 'cpu':{
  setup(['RAM: instruction + data','Control unit / PC','Register','ALU','RAM: result'],{PC:'0',Register:'ยังไม่มีค่า',ผล:'ยังไม่เขียน'});
  event(0,1,'FETCH: อ่านคำสั่งที่ PC ชี้',option==='add'?'LOAD A; ADD 7; STORE B':'LOAD A',{PC:'1'});event(1,2,'DECODE / LOAD: อ่าน operand',String(amount),{Register:String(amount)});
  if(option==='add'){event(2,3,'EXECUTE: คำนวณ ADD',`${amount} + 7`,{ผลชั่วคราว:String(amount+7),PC:'2'});event(3,2,'เก็บผลใน register',String(amount+7),{Register:String(amount+7)});event(2,4,'STORE: เขียนผลกลับ memory',`B=${amount+7}`,{ผล:String(amount+7),PC:'3'});result=`RAM[B] = ${amount+7}`;}else{event(2,2,'LOAD เสร็จโดยไม่สั่ง ADD',String(amount),{ผล:'ไม่มี STORE ในโปรแกรมตัวอย่าง'});result=`Register = ${amount} · ไม่มีการบวก`; }break;
 }
 case 'parallel':{
  const lanes=option==='parallel'?4:1,rounds=Math.ceil(amount/lanes);setup(['งานคำนวณ','Dispatcher',`${lanes} execution lane${lanes>1?'s':''}`,'Result buffer'],{งานทั้งหมด:String(amount),งานเสร็จ:'0',รอบ:'0'});
  event(0,1,'ตรวจว่าแบ่งงานอิสระได้หรือไม่',option==='dependent'?'งานถัดไปต้องรอผลก่อนหน้า':`${amount} independent tasks`);
  for(let i=0;i<rounds;i++){const finished=Math.min(amount,(i+1)*lanes);event(1,2,`แจกงานรอบ ${i+1}`,`tasks ${i*lanes+1}–${finished}`,{รอบ:String(i+1)});event(2,3,'รวมผลของงานที่เสร็จ',`${finished}/${amount}`,{งานเสร็จ:String(finished)})}result=`${amount} งาน · ${lanes} lanes · ${rounds} รอบตามกติกาตัวอย่าง`;break;
 }
 case 'memory':{
  setup(['CPU','Cache','RAM','CPU register'],{Cache:option==='hit'?'X = 42':'ไม่มี X',Register:'ว่าง'});event(0,1,'CPU ขออ่าน X','address X');
  if(option==='hit')event(1,3,'CACHE HIT: คืนสำเนาที่มี','X=42',{Register:'42'});else{event(1,2,'CACHE MISS: ขอข้อมูลจาก RAM','address X',{เส้นทาง:'อ่าน RAM'});event(2,1,'คืนค่าและเติม cache','X=42',{Cache:'X = 42'});event(1,3,'ส่งค่าให้ CPU','42',{Register:'42'})}result='CPU ได้ X=42 แต่เส้นทางการเข้าถึงต่างกัน';break;
 }
 case 'bus':{
  setup(['CPU','Address bus','Control bus','Memory[16]','Data bus'],{Address:'ยังไม่ส่ง',Memory:'9',Data:'ว่าง'});event(0,1,'ระบุตำแหน่งที่จะเข้าถึง','address=16',{Address:'16'});event(0,2,'กำหนดการอ่านหรือเขียน',option.toUpperCase(),{Control:option.toUpperCase()});event(1,3,'เลือกตำแหน่ง memory','memory[16]');
  if(option==='write'){event(0,4,'CPU ส่งค่าบน data bus',String(amount),{Data:String(amount)});event(4,3,'memory รับและบันทึกค่า',String(amount),{Memory:String(amount)});result=`memory[16] เปลี่ยนจาก 9 เป็น ${amount}`;}else{event(3,4,'memory ส่งค่าบน data bus','9',{Data:'9'});event(4,0,'CPU รับผลอ่าน','9',{Register:'9'});result='CPU อ่านค่า 9; memory ไม่เปลี่ยน'}break;
 }
 case 'platform':{
  setup(['Application','Operating system','Driver','Printer / hardware'],{งาน:'ยังไม่ส่ง',อุปกรณ์:option==='ready'?'พร้อม':'ไม่พร้อม'});event(0,1,'เรียกบริการระบบเพื่อพิมพ์','print(document.pdf)');
  if(option==='missing')event(1,0,'OS คืนข้อผิดพลาดให้ application','device / driver unavailable',{งาน:'ยังไม่พิมพ์'},'blocked');else{event(1,2,'OS ส่งคำขอไป driver','print job #1');event(2,3,'แปลงคำขอให้ตรงกับอุปกรณ์','device command',{งาน:'พิมพ์แล้ว'});event(3,1,'แจ้งสถานะเสร็จ','completed');event(1,0,'คืนผลให้โปรแกรม','success')}result=state.งาน;break;
 }
 case 'decision':{
  const demand=option==='pilot'?20:100,capacity=Math.floor(amount/10)*10;setup(['ทีม / workload','แผนทรัพยากร','การทดลอง / ใช้งาน','ติดตามผล'],{งบ:String(amount),Demand:String(demand),Capacity:String(capacity)});event(0,1,'กำหนดงานและขอบเขต',`${demand} หน่วยงาน`);event(1,2,'จัดสรรภายใต้งบ',`capacity=${capacity}`);
  const enough=capacity>=demand;event(2,3,'เทียบสิ่งที่ต้องการกับทรัพยากร',`${capacity} ${enough?'>=':'<'} ${demand}`,{ผล:enough?'รองรับ demand ตัวอย่าง':'ปรับขอบเขตหรือเพิ่มทรัพยากร'},enough?'ok':'warning');result=state.ผล;break;
 }
 case 'io':{
  setup(['CPU','I/O device','DMA controller','RAM'],{วิธี:option,ข้อมูลในRAM:'0',CPUขนข้อมูล:'0'});event(0,1,'เริ่มคำขอ I/O',`${amount} หน่วยข้อมูล`);
  if(option==='trap'){actors[2].label='OS trap handler';event(0,2,'โปรแกรมเรียกบริการระบบหรือเกิด exception','trap / exception',{CPU:'เข้า handler'});event(2,0,'OS จัดการแล้วกำหนดการทำงานต่อ','handled / resume ตามเหตุ',{CPU:'ผลขึ้นกับ handler'});}else if(option==='dma'){event(0,2,'ตั้งค่า source / destination / length',`device → RAM; length=${amount}`);event(1,2,'device ส่งข้อมูลให้ DMA','data block');event(2,3,'DMA โอน block เข้า RAM',`${amount} units`,{ข้อมูลในRAM:String(amount)});event(2,0,'แจ้ง CPU เมื่อโอนเสร็จ','completion interrupt');}
  else{if(option==='poll'){event(0,1,'CPU ตรวจสถานะ','ready=false',{CPU:'ตรวจสถานะ'},'warning');event(0,1,'CPU ตรวจอีกครั้ง','ready=true');}else event(1,0,'อุปกรณ์แจ้งว่า ready','interrupt');event(1,0,'CPU รับข้อมูลจากอุปกรณ์',`${amount} units`,{CPUขนข้อมูล:String(amount)});event(0,3,'CPU ย้ายข้อมูลเข้า RAM',`${amount} units`,{ข้อมูลในRAM:String(amount)});}result=`RAM รับ ${amount} units · CPU ย้ายเอง ${state.CPUขนข้อมูล} units`;break;
 }
 case 'buffer':{
  setup(['Producer / application','พื้นที่พักข้อมูล','Consumer / printer'],{พื้นที่พัก:'ว่าง',ผล:'ยังไม่รับ'});
  if(option==='cache'){event(0,1,'อ่านครั้งแรกและเก็บสำเนา','X=42',{พื้นที่พัก:'cached X=42'});event(0,1,'ขอ X ซ้ำ','lookup X');event(1,0,'คืนสำเนาโดยไม่อ่านต้นทางอีก','X=42',{ผล:'cache hit'});}
  else if(option==='spool'){event(0,1,'enqueue งานสองรายการ','job A, job B',{พื้นที่พัก:'A → B'});event(1,2,'เครื่องพิมพ์รับทีละงาน','job A',{พื้นที่พัก:'B',ผล:'พิมพ์ A'});event(1,2,'รับงานถัดไปเมื่อเครื่องว่าง','job B',{พื้นที่พัก:'ว่าง',ผล:'พิมพ์ A และ B'});}
  else{event(0,1,'producer ส่งข้อมูลก่อน consumer พร้อม','chunk A',{พื้นที่พัก:'A'});event(0,1,'พัก chunk ถัดไป','chunk B',{พื้นที่พัก:'A, B'});event(1,2,'consumer ดึงข้อมูลเมื่อพร้อม','A, B',{พื้นที่พัก:'ว่าง',ผล:'ได้รับ A, B'});}result=state.ผล;break;
 }
 case 'process':{
  setup(['New','Ready queue','CPU: Running','I/O: Waiting','Terminated'],{Process:'New',คิว:'ว่าง'});event(0,1,'admit process เข้าคิว','P1',{Process:'Ready',คิว:'P1'});event(1,2,'scheduler dispatch','P1',{Process:'Running',คิว:'ว่าง'});
  if(option==='io'){event(2,3,'P1 ขอ I/O แล้วพัก CPU','read file',{Process:'Waiting'});event(3,1,'I/O เสร็จ กลับเข้าคิว Ready','I/O completion',{Process:'Ready',คิว:'P1'});event(1,2,'scheduler ให้ CPU อีกครั้ง','dispatch P1',{Process:'Running',คิว:'ว่าง'});}event(2,4,'process เสร็จสิ้น','exit 0',{Process:'Terminated'});result='P1 จบการทำงาน'+(option==='io'?' หลัง Waiting → Ready → Running':'โดยไม่ผ่าน Waiting');break;
 }
 case 'scheduler':{
  setup(['Ready queue','CPU','Completed'],{คิว:'P1(5), P2(3), P3(2)',เวลา:'0',เสร็จ:'0/3'});let time=0,done=0;const queue=[{id:'P1',left:5},{id:'P2',left:3},{id:'P3',left:2}];
  if(option==='priority')queue.sort((a,b)=>({P1:3,P2:1,P3:2}[a.id as 'P1'|'P2'|'P3'])-({P1:3,P2:1,P3:2}[b.id as 'P1'|'P2'|'P3']));
  while(queue.length){const p=queue.shift()!,slice=option==='rr'?Math.min(amount,p.left):p.left;event(0,1,`dispatch ${p.id}`,`${time} → ${time+slice}`,{กำลังทำ:p.id,คิว:queue.map(q=>q.id).join(', ')||'ว่าง'});time+=slice;p.left-=slice;if(p.left){queue.push(p);event(1,0,'quantum หมด: วนกลับท้ายคิว',`${p.id} เหลือ ${p.left}`,{เวลา:String(time),คิว:queue.map(q=>`${q.id}(${q.left})`).join(', ')});}else{done++;event(1,2,`${p.id} ทำงานครบ`,`finish t=${time}`,{เวลา:String(time),เสร็จ:`${done}/3`});}}
  result=`ใช้ CPU รวม ${time} หน่วย · P1/P2/P3 เสร็จครบ · ไม่มี context-switch cost ในตัวอย่าง`;break;
 }
 case 'paging':{
  const physical=5*1024+amount;setup(['Process: virtual address','TLB','Page table','RAM: frame 5','Backing store'],{Page:'2',Offset:String(amount),Frame:'ยังไม่ทราบ'});event(0,1,'ค้น page 2 ใน TLB',`virtual=${2*1024+amount}`);
  if(option==='hit')event(1,3,'TLB HIT: ใช้ mapping ที่ cache ไว้',`frame=5, offset=${amount}`,{Frame:'5',Physical:String(physical)});
  else{event(1,2,'TLB MISS: อ่าน page table','page=2');if(option==='fault'){event(2,4,'page ไม่ resident: page fault','load page 2',{สถานะ:'รอ page เข้า RAM'},'warning');event(4,3,'นำ page เข้าสู่ frame ที่จัดสรร','frame 5',{สถานะ:'page resident'});}event(2,1,'อัปเดต TLB ด้วย mapping','2 → 5',{Frame:'5'});event(1,3,'เข้าถึง frame + offset',`${5}×1024 + ${amount} = ${physical}`,{Physical:String(physical)});}result=`physical address = ${physical} bytes · TLB miss ${option==='fault'?'พร้อม page fault':'ไม่จำเป็นต้องเป็น page fault'}`;break;
 }
 case 'virtual':{
  const count=option==='three'?3:2;setup(['ผู้ดูแล','Hypervisor','Host RAM','VMs'],{RAMทั้งหมด:`${amount} GiB`,RAMใช้:'0 GiB',VMs:'0'});event(0,1,'ขอสร้าง VMs ขนาดเครื่องละ 4 GiB',`${count} × 4 GiB`);let used=0,created=0;
  for(let i=0;i<count;i++){if(used+4>amount){event(1,0,'ไม่พอสำหรับ VM ถัดไป',`free=${amount-used} GiB`,{},'blocked');break;}event(1,2,`จอง RAM ให้ VM ${i+1}`,'4 GiB',{RAMใช้:`${used+=4} GiB`});event(2,3,'VM ได้ memory ที่จัดสรร',`VM ${++created}`,{VMs:String(created)});}result=`สร้าง ${created}/${count} VMs · RAM เหลือ ${amount-used} GiB`;break;
 }
 case 'hypervisor':{
  setup(['Guest VM','Hypervisor','Host OS','Hardware'],{ประเภท:option==='type1'?'Type 1':'Type 2',คำขอ:'ยังไม่ส่ง'});event(0,1,'Guest ขอใช้ resource','virtual I/O',{คำขอ:'อยู่ที่ hypervisor'});if(option==='type2'){event(1,2,'ใช้บริการของ host OS','host I/O');event(2,3,'host OS ใช้ hardware','device request');}else event(1,3,'hypervisor ทำงานบน hardware','device request');event(3,1,'คืนผล resource operation','completed');event(1,0,'Guest VM ได้ผล','I/O complete',{คำขอ:'เสร็จแล้ว'});result=option==='type1'?'Type 1 อยู่บน hardware โดยตรง':'Type 2 อาศัย host OS';break;
 }
 case 'elastic':{
  const required=Math.ceil(amount/20),instances=option==='auto'?required:1,served=Math.min(amount,instances*20);setup(['Clients / demand','Cloud API','Resource pool','Instances','Metering'],{Demand:String(amount),Instances:'1',Capacity:'20'});event(0,1,'ขอใช้บริการ',`${amount} หน่วยงาน`);event(1,2,'คำนวณ instance ที่ต้องใช้',`ceil(${amount}/20)=${required}`);event(2,3,option==='auto'?'จัด instance ตาม demand':'คงจำนวน instance',`${instances} instances`,{Instances:String(instances),Capacity:String(instances*20)});event(3,4,'วัดงานที่รองรับได้ในแบบจำลอง',`${served}/${amount}`,{งานรองรับ:String(served),งานเกิน:String(amount-served)},served<amount?'warning':'ok');result=`capacity=${instances*20} · งานรองรับ ${served}/${amount}`;break;
 }
 case 'ownership':{
  setup(['Customer','Application / data','Runtime + OS','Infrastructure','Provider'],{Model:option.toUpperCase(),ผู้ใช้:'ยังไม่กำหนดสิทธิ์'});event(4,3,'ผู้ให้บริการจัด infrastructure','network / servers');event(option==='iaas'?0:4,2,'ผู้รับผิดชอบเตรียม OS / runtime',option==='iaas'?'Customer manages':'Provider manages');event(option==='saas'?4:0,1,'ผู้รับผิดชอบดูแล application',option==='saas'?'Provider manages':'Customer manages');event(0,1,'ลูกค้ากำหนด identities และ data access','roles + permissions',{ผู้ใช้:'กำหนดสิทธิ์แล้ว'});result=`${option.toUpperCase()}: ขอบเขตผู้ดูแลเปลี่ยน แต่ identity และ data ยังต้องจัดการ`;break;
 }
 case 'container':{
  const per=option==='vm'?3:1,total=amount*per;setup(['Deployment request','Orchestrator / hypervisor','OS / kernel','Workloads'],{Workloads:String(amount),RAM:'ยังไม่จัด'});event(0,1,'ขอเริ่ม workloads',`${amount} workloads`);event(1,2,option==='vm'?'สร้าง guest OS สำหรับแต่ละ VM':'ใช้ host kernel ร่วมผ่าน isolation',option==='vm'?`${amount} guest OS`:'shared host kernel',{OS:option==='vm'?'guest OS แยก':'host kernel ร่วม'});event(2,3,'เริ่ม application ของแต่ละ workload',`${amount} instances`,{RAM:`${total} หน่วยสมมติ`});result=`${amount} × ${per} = ${total} หน่วย RAM สมมติ · ขอบเขต isolation ต่างกัน`;break;
 }
 case 'forward':{
  setup(['PC A','Hub / Switch / Router','PC B','PC C'],{Payload:'HELLO B',ปลายทาง:'MAC B / IP B',ได้รับ:'ยังไม่มี'});event(0,1,'ส่ง frame เข้าพอร์ตอุปกรณ์','src MAC A → dst MAC B');
  if(option==='hub'){event(1,2,'Hub กระจายสัญญาณออกพอร์ต B','HELLO B',{B:'ได้รับ frame',ได้รับ:'B'});event(1,3,'Hub กระจายออกพอร์ต C ด้วย','HELLO B',{C:'NIC ปฏิเสธ frame ที่ไม่ได้ส่งถึง C'});result='สัญญาณถึง B และ C; NIC ของ C ไม่รับ frame ที่ปลายทางเป็น B';}
  else if(option==='switch'){event(1,1,'lookup MAC table','MAC B → port 2',{ตาราง:'B อยู่ port 2'});event(1,2,'Switch ส่งเฉพาะพอร์ตที่ทราบ','dst MAC B',{ได้รับ:'B',C:'ไม่ได้ส่งไปพอร์ต C'});result='Known unicast ไป PC B ตาม MAC table';}
  else{event(1,1,'Router lookup routing table','IP B → next hop B',{Route:'เครือข่าย B'});event(1,2,'สร้าง link frame สำหรับ next hop','src MAC Router → dst MAC B',{ได้รับ:'B',IP:'A → B คงเดิม'});result='IP packet ถูกส่งข้ามเครือข่ายใน frame ของ link ถัดไป'}break;
 }
 case 'cable':{
  const mapping=option==='straight'?[1,2,3,4,5,6,7,8]:[3,6,1,4,5,2,7,8];setup(['ปลาย A','ตัวนำ 8 เส้น','ปลาย B'],{ชนิด:option==='straight'?'straight-through':'crossover',ขา:'ยังไม่ตรวจ'});for(let i=0;i<8;i++){event(0,1,`ตรวจขา A${i+1}`,`pin ${i+1}`);event(1,2,'ตัวนำเชื่อมถึงขาปลาย B',`A${i+1} → B${mapping[i]}`,{ขา:`${i+1} → ${mapping[i]}`})}result=mapping.map((n,i)=>`${i+1}→${n}`).join(' · ');break;
 }
 case 'fiber':{
  setup(['Optical transmitter','Fiber core','Optical receiver'],{Mode:option==='single'?'single-mode':'multi-mode',Pulse:'ยังไม่ส่ง'});event(0,1,'แปลงสัญญาณเป็น optical pulse','light pulse',{Pulse:'เข้า core'});event(1,1,'เดินทางตาม modes ที่รองรับ',option==='single'?'one guided mode':'multiple guided modes',{เส้นทาง:option==='single'?'หนึ่ง mode หลัก':'หลาย modes'});event(1,2,'receiver รับพลังงานแสงและอ่านข้อมูล',option==='single'?'pulse':'pulse with modal dispersion',{Pulse:'อ่านเป็นข้อมูล'});result='เปลี่ยนข้อมูล → optical signal → ข้อมูลที่ receiver';break;
 }
 case 'topology':{
  setup(['PC A','Switch B','Switch C','PC D'],{Topology:option,LinkAB:amount?'up':'down',เส้นทาง:'ยังไม่หา'});const edges=option==='star'?[[0,1],[1,3],[1,2]]:[[0,1],[1,3],[0,2],[2,3]];const active=edges.filter(([a,b])=>!(a===0&&b===1&&amount===0));const queue:number[][]=[[0]],seen=new Set([0]);let path:number[]|undefined;
  while(queue.length){const p=queue.shift()!,last=p[p.length-1];if(last===3){path=p;break}for(const [a,b]of active){const next=a===last?b:b===last?a:-1;if(next>=0&&!seen.has(next)){seen.add(next);queue.push([...p,next])}}}
  if(!path){event(0,1,'ไม่มีเส้นทางผ่าน link ที่ใช้งานได้','frame not delivered',{เส้นทาง:'ไม่พบ'},'blocked');result='PC D ไม่ได้รับข้อมูล'}else{for(let i=1;i<path.length;i++)event(path[i-1],path[i],'ส่งต่อบน link ที่ยังทำงาน','HELLO D',{เส้นทาง:path.slice(0,i+1).map(n=>actors[n].label).join(' → ')});result=state.เส้นทาง}break;
 }
 case 'scope':{
  setup(['ผู้ใช้','Gateway','Identity / policy','Intranet / Extranet'],{ผู้ใช้:option,สิทธิ์:'ยังไม่ตรวจ'});event(0,1,'ขอเข้าบริการองค์กร','GET /workspace');event(1,2,'ตรวจขอบเขตผู้ใช้และ policy',option);const allowed=option!=='public';event(2,allowed?3:0,allowed?'อนุญาตเฉพาะขอบเขตที่กำหนด':'ไม่มีสิทธิ์เข้าทรัพยากรภายใน',allowed?option==='partner'?'partner resources':'internal resources':'403',{สิทธิ์:allowed?'อนุญาต':'ปฏิเสธ'},allowed?'ok':'blocked');result=state.สิทธิ์;break;
 }
 case 'media':{
  const signal=option==='copper'?'electrical':option==='fiber'?'optical':'radio';setup(['ข้อมูลต้นทาง','Transmitter','สื่อส่งสัญญาณ','Receiver'],{Bits:'01000001',Signal:'ยังไม่สร้าง'});event(0,1,'ส่งบิตเข้าสู่ transmitter','01000001');event(1,2,'แทนข้อมูลด้วยสัญญาณของสื่อ',signal,{Signal:signal});event(2,3,'receiver ตรวจสัญญาณและคืน bits','01000001',{ได้รับ:'01000001'});result=`bits → ${signal} signal → bits`;break;
 }
 case 'specialNetwork':{
  const names=option==='satellite'?['Ground station A','Satellite','Ground station B']:option==='sensor'?['Sensor nodes','Gateway','Data service']:['Server','SAN fabric','Storage'];setup(names,{ข้อมูล:'ยังไม่ส่ง'});const payload=option==='satellite'?'user data':option==='sensor'?'temperature=28':'storage block #102';event(0,1,'ส่งข้อมูลเข้าตัวกลางของเครือข่าย',payload);event(1,2,'ส่งต่อไปยังบริการปลายทาง',payload,{ข้อมูล:'ปลายทางได้รับ '+payload});result=state.ข้อมูล;break;
 }
 case 'protocol':{
  const message=option==='valid'?'TEMP|28|C':'TEMP|twenty-eight|C';setup(['Sender','Link','Parser','Application'],{Message:message,Parse:'ยังไม่แปล'});event(0,1,'ส่ง bytes ผ่าน link',message);event(1,2,'parser แยก type / value / unit',message);if(option==='valid'){event(2,3,'ตรวจ field แล้วสร้างข้อมูลที่มีความหมาย','type=TEMP; value=28; unit=C',{Parse:'valid',ค่า:'28°C'});result='Application เข้าใจอุณหภูมิ 28°C'}else{event(2,0,'value ไม่ตรงชนิดตัวเลขที่ตกลงไว้','parse error',{Parse:'invalid'},'blocked');result='Link ส่งสำเร็จ แต่ application ใช้ข้อมูลไม่ได้'}break;
 }
 case 'encapsulation':{
  setup(['Application','TCP','IPv4','Ethernet','Physical link'],{Payload:`${amount} bytes`,ขนาด:`${option==='send'?amount:amount+58} bytes`});const stages=[{a:0,b:1,n:amount+20,label:'TCP header 20'},{a:1,b:2,n:amount+40,label:'IPv4 header 20'},{a:2,b:3,n:amount+58,label:'Ethernet header 14 + FCS 4'},{a:3,b:4,n:amount+58,label:'สัญญาณบน link'}];
  if(option==='send')for(const p of stages)event(p.a,p.b,p.b===4?'แทน frame เป็นสัญญาณ':'เพิ่ม '+p.label,`${p.n} bytes`,{ขนาด:`${p.n} bytes`,ชั้น:actors[p.b].label});else{event(4,3,'อ่านสัญญาณกลับเป็น frame',`${amount+58} bytes`);event(3,2,'ตรวจและถอด Ethernet header / FCS',`${amount+40} bytes`,{ขนาด:`${amount+40} bytes`});event(2,1,'อ่าน IPv4 header แล้วส่ง TCP segment',`${amount+20} bytes`,{ขนาด:`${amount+20} bytes`});event(1,0,'รับ application payload',`${amount} bytes`,{ขนาด:`${amount} bytes`})}result=option==='send'?`Ethernet frame = ${amount+58} bytes; payload=${amount}`:`Application ได้ payload ${amount} bytes`;break;
 }
 case 'subnet':{
  const ip=0xc0a80a19>>>0,mask=(0xffffffff<<(32-amount))>>>0,network=(ip&mask)>>>0,broadcast=(network|(~mask))>>>0,target=option==='local'?0xc0a80a64>>>0:0xc0a80b64>>>0,same=((target&mask)>>>0)===network;const dotted=(n:number)=>[24,16,8,0].map(b=>(n>>>b)&255).join('.');setup(['Host 192.168.10.25','Subnet calculation','Local link','Default gateway'],{Prefix:`/${amount}`,Network:'ยังไม่คำนวณ'});event(0,1,'AND address กับ subnet mask',dotted(mask),{Network:dotted(network),Broadcast:dotted(broadcast),UsableHosts:String(2**(32-amount)-2)});event(1,same?2:3,same?'ปลายทางอยู่ subnet เดียวกัน':'ส่ง packet ไป gateway',dotted(target),{Route:same?'local delivery':'via gateway'});result=`${dotted(network)}/${amount} · broadcast ${dotted(broadcast)} · ${state.Route}`;break;
 }
 case 'transport':{
  setup(['Sender','Network','Receiver','ACK / timeout'],{Protocol:option.toUpperCase(),ได้รับ:'0',ส่งซ้ำ:'0'});if(option==='tcp'){event(0,2,'เริ่ม TCP handshake','SYN');event(2,0,'ตอบ handshake','SYN + ACK');event(0,2,'ยืนยันและพร้อมส่ง','ACK')}
  event(0,1,'ส่งข้อมูลหนึ่งชุด','DATA #1');if(amount===1){event(1,1,'จำลอง packet สูญหาย','DATA #1 lost',{},'warning');if(option==='tcp'){event(3,0,'ไม่ได้รับ ACK: timer ครบตามแบบจำลอง','retransmission timeout');event(0,2,'ส่งข้อมูลซ้ำและครั้งนี้ถึงผู้รับ','DATA #1',{ได้รับ:'1',ส่งซ้ำ:'1'});event(2,0,'ผู้รับ ACK ข้อมูล','ACK #1')}else event(1,2,'UDP ไม่มีกลไกส่งซ้ำเอง','receiver has no DATA #1',{ได้รับ:'0'},'warning')}
  else{event(1,2,'ข้อมูลถึงผู้รับ','DATA #1',{ได้รับ:'1'});if(option==='tcp')event(2,0,'ยืนยันการรับ','ACK #1')}result=`${option.toUpperCase()}: ได้รับ ${state.ได้รับ} ชุด · ส่งซ้ำ ${state.ส่งซ้ำ} ครั้ง`;break;
 }
 case 'web':{
  setup(['Browser','DNS resolver','Web server','TLS channel','Page renderer'],{URL:'library.example.test',Address:'ยังไม่ทราบ',หน้า:'ยังไม่โหลด'});event(0,1,'ค้น address ของชื่อบริการ','DNS query');if(option==='dnsfail'){event(1,0,'ไม่มี address สำหรับชื่อที่ถาม','NXDOMAIN',{หน้า:'ยังไม่เริ่ม connection'},'blocked');result='DNS ไม่สำเร็จ จึงยังไม่ส่ง HTTP ไปปลายทาง';}
  else{event(1,0,'DNS คืน address ตัวอย่าง','203.0.113.10',{Address:'203.0.113.10'});event(0,2,'สร้าง TCP connection','SYN → SYN/ACK → ACK');event(0,3,'ตรวจ identity และสร้าง TLS channel','verified service identity',{ช่องทาง:'TLS'});event(3,2,'ส่ง HTTP request ภายในช่องทาง','GET /');event(2,4,'คืน HTTP response ให้ browser แสดงผล','200 + HTML',{หน้า:'แสดงแล้ว'});result='Browser แสดงหน้า HTML ที่รับผ่าน HTTPS'}break;
 }
 case 'ttl':{
  const hops=option==='short'?1:3;setup(['Source','Router 1','Router 2','Router 3','Destination'],{TTL:String(amount),Delivered:'no'});let ttl=amount,from=0,dropped=false;for(let i=1;i<=hops;i++){event(from,i,'packet เข้าสู่ router',`TTL=${ttl}`);ttl--;if(ttl<=0){event(i,i,'TTL หมด: ไม่ส่งต่อ packet','discard',{TTL:'0'},'blocked');dropped=true;break}event(i,i,'ลด TTL ก่อนส่งต่อ',`TTL=${ttl}`,{TTL:String(ttl)});from=i;}if(!dropped)event(from,4,'packet ถึงปลายทาง',`TTL=${ttl}`,{Delivered:'yes'});result=dropped?'Packet ถูกทิ้งก่อนถึงปลายทาง':`Packet ถึงปลายทางด้วย TTL=${ttl}`;break;
 }
 case 'addressing':{
  setup(['Browser / name','DNS','PC A','Router / next hop','Service: port 443'],{IP:'ยังไม่ทราบ',Frame:'ยังไม่สร้าง'});event(0,1,'resolve ชื่อบริการ','service.example.test');event(1,2,'คืน IP address ตัวอย่าง','203.0.113.10',{IP:'A → 203.0.113.10',Port:'443'});if(option==='remote'){event(2,3,'frame ส่งถึง MAC ของ gateway','src MAC A → dst MAC Router',{Frame:'A → Router'});event(3,4,'Router สร้าง frame ของ link ถัดไป','src MAC Router → dst MAC Server',{Frame:'Router → Server'})}else event(2,4,'ส่ง frame ถึง peer บน local subnet','src MAC A → dst MAC Server',{Frame:'A → Server'});event(4,4,'ส่งข้อมูลให้ process ที่ port 443','application payload',{Process:'บริการ HTTPS'});result='Name ใช้ค้น IP; MAC ส่งใน link; port เลือก process';break;
 }
 case 'access':{
  setup(['Browser / principal','Authentication','Server authorization','Data store'],{Principal:option==='other'?'student B':'student A',RecordOwner:'student A',ผล:'ยังไม่คืนข้อมูล'});event(0,1,'ส่งคำขอพร้อม session','GET /record/A');if(option==='offline'){event(1,0,'บริการยังไม่พร้อม','503',{ผล:'Unavailable'},'blocked');result='Availability: บริการไม่พร้อม';break}event(1,2,'รู้ตัวตนแล้ว ต้องตรวจสิทธิ์ต่อ resource',`principal=${state.Principal}; owner=A`);if(option==='other'){event(2,0,'principal ไม่ใช่ผู้มีสิทธิ์ในนโยบายนี้','403 Forbidden',{ผล:'ไม่เปิดเผยข้อมูล'},'blocked');result='Authentication ผ่าน แต่ authorization ปฏิเสธ'}else{event(2,3,'สิทธิ์ตรงกับ resource','allow read record A');event(3,0,'คืนข้อมูลให้ผู้มีสิทธิ์','200 record A',{ผล:'คืนข้อมูลเจ้าของ'});result='ตรวจตัวตนและสิทธิ์ก่อนส่งข้อมูล'}break;
 }
 case 'boundary':{
  setup(['Internet client','Firewall','DMZ public service','IDS / IPS','Internal application'],{Firewall:option==='blocked'?'deny':'allow',ผล:'ยังไม่ถึงข้อมูล'});event(0,1,'traffic ขอเข้าบริการ','dst port 443');if(option==='blocked'){event(1,0,'rule ปฏิเสธ traffic','deny',{ผล:'หยุดที่ firewall'},'blocked');result=state.ผล;break}event(1,2,'อนุญาตเข้า public service ใน DMZ','allow HTTPS');event(2,3,'ตรวจ event ตาม detection rule','suspicious request');if(option==='ips'){event(3,2,'IPS ถูกตั้งให้บล็อก event นี้','drop',{ผล:'หยุดที่ IPS'},'blocked')}else{event(3,2,option==='ids'?'IDS แจ้งเตือนโดยไม่บล็อก':'บันทึกเหตุเพื่อวิเคราะห์','alert',{การตรวจ:'alert only'},'warning');event(2,4,'app รับ request แล้วตรวจ authorization','unauthorized resource');event(4,0,'application ปฏิเสธสิทธิ์','403',{ผล:'หยุดที่ application authorization'},'blocked')}result=state.ผล;break;
 }
 case 'segment':{
  setup(['Device','NAC / identity','Guest zone','Internal zone','Resource'],{Device:option,Zone:'ยังไม่กำหนด'});event(0,1,'ตรวจ identity และ posture','device assessment');if(option==='guest'){event(1,2,'นโยบายให้เข้า Guest zone','guest-only',{Zone:'Guest'});event(2,3,'inter-zone policy ปฏิเสธเส้นทาง','deny Guest → Internal',{},'blocked');result='อุปกรณ์ Guest ไป resource ภายในไม่ได้'}else{event(1,3,'ผ่าน policy เข้า Internal','managed device',{Zone:'Internal'});event(3,4,'ขอ resource ภายใต้สิทธิ์ที่กำหนด','authorized request');result='Managed device เข้า zone ที่อนุญาต'}break;
 }
 case 'patch':{
  setup(['Inventory','Update service','Endpoint','Verification','Monitoring'],{Version:'v1',จุดอ่อน:'ยังไม่แก้'});event(0,1,'พบ endpoint ที่ต้องอัปเดต','v1 → target v2');event(1,2,'ติดตั้ง update package','v2 package',{การติดตั้ง:option==='success'?'สำเร็จ':'ไม่สำเร็จ'});event(2,3,'อ่านเวอร์ชันและทดสอบการทำงาน',option==='success'?'v2 reported':'v1 reported',{Version:option==='success'?'v2':'v1'});if(option==='success'){event(3,4,'verify ผ่านแล้วติดตามต่อ','version v2 + health check',{จุดอ่อน:'แก้ตาม update ตัวอย่าง'});result='มีหลักฐาน version และ health check หลังอัปเดต'}else{event(3,1,'verify ไม่ผ่าน ส่งกลับให้แก้ไข','v1 still present',{จุดอ่อน:'ยังไม่แก้'},'warning');result='การติดตั้งไม่สำเร็จ จุดอ่อนตัวอย่างยังอยู่'}break;
 }
 case 'tls':{
  setup(['Sender','Network observer','Receiver','Identity check'],{ช่องทาง:option==='tls'?'TLS':'plaintext',Observer:'ยังไม่เห็น traffic'});if(option==='tls'){event(0,3,'ตรวจอัตลักษณ์บริการ','certificate validation');event(3,0,'สร้างช่องทางที่ปกป้องเนื้อหา','identity accepted');event(0,1,'ส่ง encrypted application payload','🔒 ciphertext',{Observer:'เห็น endpoints / metadata ไม่ใช่ plaintext'});event(1,2,'receiver อ่านข้อมูลหลังถอดรหัสตาม channel','application data',{Receiver:'อ่าน payload ได้'})}else{event(0,1,'ส่ง application data ที่ไม่เข้ารหัส','message=HELLO',{Observer:'อ่าน HELLO ได้'});event(1,2,'receiver รับข้อความ','HELLO',{Receiver:'อ่าน HELLO ได้'})}result=state.Observer;break;
 }
 case 'backup':{
  setup(['ข้อมูลใช้งาน','เหตุข้อมูลเสียหาย','Backup store','Restore service','ตรวจผล / เปิดบริการ'],{ข้อมูล:'version A',Backup:option==='tested'?'tested version A':'unusable backup',บริการ:'พร้อม'});event(0,1,'จำลองข้อมูลใช้งานเสียหาย','file unreadable',{บริการ:'หยุดบางส่วน',ข้อมูล:'อ่านไม่ได้'});event(1,3,'เริ่มแผนกู้ข้อมูล','restore request');event(3,2,'อ่านชุดสำรองและตรวจว่ากู้ได้','version A');if(option==='tested'){event(2,3,'ชุดสำรองผ่านการอ่าน','version A',{ข้อมูล:'restore version A'});event(3,4,'ตรวจความครบถ้วนก่อนเปิดบริการ','verification passed',{บริการ:'กลับมาให้บริการ'});result='กู้ version A และตรวจผลก่อนกลับมาใช้งาน'}else{event(2,3,'backup ไม่ผ่านการตรวจ','restore failed',{บริการ:'ยังไม่พร้อม'},'blocked');result='มีชื่อ backup แต่ใช้งานกู้คืนไม่ได้'}break;
 }
 case 'phishing':{
  setup(['ข้อความอ้าง IT','ผู้ใช้','Portal ทางการ','ผู้รับผิดชอบ IT','ปลายทางไม่เชื่อถือ'],{ข้อความ:'ขอ password / OTP ด่วน',ข้อมูล:'ยังไม่เปิดเผย'});event(0,1,'ส่งข้อความกดดันให้รีบทำตาม','ยืนยันบัญชีเดี๋ยวนี้');if(option==='verify'){event(1,2,'ผู้ใช้เปิด portal ที่รู้จักเอง','trusted URL');event(2,3,'ตรวจคำขอผ่านช่องทางทางการ','no such request');event(3,1,'แจ้งให้หยุดและรายงาน','report phishing',{ข้อมูล:'ไม่เปิดเผยตามคำขอ'});result='ตัดเส้นทางก่อนข้อมูลออกไป'}else{event(1,4,'ผู้ใช้ส่งข้อมูลตามคำขอปลอม','simulated credential disclosure',{ข้อมูล:'เปิดเผยในแบบจำลอง'},'warning');event(4,3,'ต้องตรวจบัญชีและ sessions ที่ได้รับผล','incident report');result='ข้อมูลเปิดเผย ต้องตอบสนองและตรวจผลกระทบ'}break;
 }
 case 'incident':{
  setup(['Endpoint','Monitoring','Response team','Backup / clean system','Service'],{เครื่อง:'พบพฤติกรรมผิดปกติ',ขอบเขต:'ยังไม่จำกัด',บริการ:'เสื่อมลง'});event(0,1,'ส่ง event ให้ตรวจวิเคราะห์','suspicious activity');event(1,2,'ตรวจหลักฐานและประสานทีม','incident candidate');if(option==='ignore'){event(2,0,'ยังไม่จำกัดการเชื่อมต่อ','no containment',{ขอบเขต:'ยังเปิดเส้นทางเดิม'},'warning');result='ยังไม่มีผล containment หรือ recovery ที่ยืนยัน'}else{event(2,0,'Contain: แยกเครื่องตามแผน','isolate endpoint',{ขอบเขต:'จำกัดแล้ว'});event(2,3,'Eradicate: จัดการสาเหตุและเตรียมระบบสะอาด','verified clean baseline',{เครื่อง:'จัดการสาเหตุตัวอย่าง'});event(3,4,'Recover: คืนข้อมูลและตรวจบริการ','restore + validate',{บริการ:'กู้และตรวจแล้ว'});event(4,2,'Lessons learned: ปรับแผนและ controls','review evidence');result='จำกัดเหตุ จัดการสาเหตุ กู้และตรวจผล แล้วทบทวน'}break;
 }
 case 'malware':{
  setup(['Host content','Endpoint A','Network / data','Endpoint B','ผู้ตอบสนอง'],{A:'ยังไม่เกิดผล',B:'ยังไม่เกิดผล',ข้อมูล:'เปิดได้'});if(option==='virus'){event(0,1,'host content ที่ติดถูกทำงาน','infected host executed',{A:'กลไก virus ทำงาน'});event(1,2,'มีการถ่ายโอน host content ที่ติด','infected host file');event(2,3,'ฝั่ง B ยังต้องมีเงื่อนไขให้ host ทำงาน','host execution condition',{B:'ขึ้นกับการทำงานของ host'},'warning');result='Virus พึ่ง host content ที่ติดและเงื่อนไขการทำงาน'}else if(option==='worm'){event(1,2,'กลไก worm พยายามแพร่ผ่าน network','propagation attempt',{A:'worm active'});event(2,3,'B มีเงื่อนไขจุดอ่อนที่แบบจำลองกำหนด','vulnerable B',{B:'ได้รับผล'},'warning');result='Worm แพร่ได้ตามเงื่อนไขของระบบ ไม่ต้องอธิบายเป็นการแนบ host file แบบ virus'}else{event(0,1,'ภัยถูกทำงานบน endpoint','ransomware behavior',{A:'เกิดเหตุ'});event(1,2,'จำลองการจำกัดการเข้าถึงข้อมูล','files inaccessible',{ข้อมูล:'เปิดไม่ได้'},'warning');event(2,4,'ประสานตอบสนองและตรวจ backup','contain + recovery');result='Ransomware กระทบการเข้าถึงข้อมูล ต้องจำกัดผลและวางแผนกู้คืน'}break;
 }
 case 'application':{
  setup(['Browser: untrusted input','Server','Data query / output','Authorization','Response'],{Input:'untrusted value',ผล:'ยังไม่ประมวลผล'});event(0,1,'ส่งข้อมูลที่ยังไม่เชื่อถือ','user supplied input');if(option==='auth'){event(1,3,'ตรวจ principal กับ resource / action','request record of another user');event(3,4,'ไม่มีสิทธิ์ในนโยบายตัวอย่าง','403',{ผล:'ปฏิเสธก่อนเปิดเผยข้อมูล'},'blocked');}
  else if(option==='safe'){event(1,2,'แยก query instruction ออกจาก parameter','query template + data',{Query:'data stays data'});event(2,4,'encode output ตามบริบทที่แสดง','encoded text',{ผล:'แสดงเป็นข้อมูล ไม่ตีความเป็น script'});}
  else{event(1,2,'โปรแกรมนำ input ไปตีความผิดบริบท','data becomes instruction',{Query:'untrusted instruction'},'warning');event(2,4,'เกิดผลที่ไม่ควรให้ input ควบคุม','unintended interpretation',{ผล:'แสดงจุดเสี่ยงตามแบบจำลอง'},'warning');}result=state.ผล;break;
 }
 case 'caseStudy':{
  const lessons=option==='wannacry'?['patching','segmentation','tested backup']:option==='equifax'?['patch verification','data access limits','monitoring']:['incident coordination','business continuity','controlled recovery'];setup(['กรณีศึกษา','หลักฐาน / บทเรียน','Controls','การดำเนินงานองค์กร'],{Case:option,แผน:'ยังไม่เลือก'});event(0,1,'อ่านบทเรียนที่เอกสารระบุ',option);for(const lesson of lessons)event(1,2,'เชื่อมหลักฐานกับ control',lesson,{แผน:lesson});event(2,3,'นำไปปรับมาตรการและแผนองค์กร',lessons.join(', '));result=lessons.join(' · ');break;
 }
 default:return buildAdvancedRun(config.engine,option,amount);
 }
 if(!steps.length)throw new Error(`Empty teaching model ${id}`);
 return {actors,steps,result,initial};
}
