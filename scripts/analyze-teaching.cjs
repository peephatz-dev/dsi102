const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const cache = new Map();
function load(filename) {
 filename=path.resolve(filename);
 if(filename.endsWith('.json'))return JSON.parse(fs.readFileSync(filename,'utf8'));
 if(cache.has(filename))return cache.get(filename).exports;
 const module={exports:{}};cache.set(filename,module);
 const source=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
 vm.runInNewContext(source,{exports:module.exports,module,Math,Date,require:spec=>load(path.resolve(path.dirname(filename),spec+(spec.endsWith('.json')?'':'.ts')))});
 return module.exports;
}
const data=load('src/data/allContent.ts');
const {getTeachingScenes}=load('src/components/studio/teachingScenes.ts');
const {PROCESS_SCENARIOS}=load('src/components/studio/processCatalog.ts');
const rows=[];
let report='# แผนการดัดแปลงบทเรียนเป็นสื่อสาธิต\n\nวิเคราะห์เนื้อหาทั้ง 59 บทและ 136 หัวข้อจากบทเรียนที่เรียบเรียงไว้ แล้วจับคู่กับภาพกระบวนการที่มี input, event, observable state และ output ภาพใช้กลไกเชิงแนวคิดและข้อมูลตัวอย่าง ไม่ใช่การวัดอุปกรณ์หรือการเชื่อมต่อบริการจริง\n\n';
for(const [week,modules]of Object.entries(data.ALL_MODULES)){
 const source=JSON.parse(fs.readFileSync(`public/content/${week}.json`,'utf8'));
 report+=`## ${week}\n\n`;
 for(const module of modules){
  const scenario=PROCESS_SCENARIOS[module.id];if(!scenario)throw Error(`Missing process ${module.id}`);
  const pages=source.pages.filter(p=>p.page>=module.pdfPageStart&&p.page<=module.pdfPageEnd);
  const row={week,module:module.id,title:module.thaiTitle,sourcePages:[module.pdfPageStart,module.pdfPageEnd],sourceCharacters:pages.reduce((n,p)=>n+p.text.length,0),engine:scenario.engine,scenario:scenario.title,topics:module.subsections.map(s=>({id:s.id,title:s.title,page:s.pdfPage,characters:s.content.length+(s.thaiCommentary||'').length,existingInteractive:s.infographicId||null,teachingScenes:getTeachingScenes(module,s)}))};rows.push(row);
  report+=`### ${module.moduleNumber}. ${module.thaiTitle}\n\n- แหล่งอ้างอิง: PDF หน้า ${module.pdfPageStart}–${module.pdfPageEnd}\n- ภาพสาธิต: ${scenario.title}\n- คำถามกระบวนการ: ${scenario.question}\n- สิ่งที่เปลี่ยนได้: ${scenario.options.map(o=>o[1]).join(', ')}${scenario.input?`; ${scenario.input.label} ${scenario.input.min}–${scenario.input.max} ${scenario.input.unit}`:''}\n- กลไก: ${scenario.engine}; มี event log, ข้อมูลส่งต่อ, สถานะก่อน/หลัง และผลการรัน\n- ขอบเขตคำอธิบาย: ${scenario.explanation}\n- หัวข้อที่อ่านประกอบ:\n${row.topics.map(s=>`  - ${s.title} (PDF หน้า ${s.page}); ภาพสาธิต: ${s.teachingScenes.map(id=>PROCESS_SCENARIOS[id].title).join(' / ')}`).join('\n')}\n\n`;
  console.log(`${module.id} | ${module.thaiTitle} | ${scenario.engine} | ${module.subsections.map(s=>s.title).join('; ')}`);
 }
}
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/teaching-analysis.md',report);fs.writeFileSync('src/data/teachingCoverage.json',JSON.stringify(rows,null,2)+'\n');
console.log(`Analyzed ${rows.length} modules and ${rows.reduce((n,r)=>n+r.topics.length,0)} full topic texts against source page ranges.`);
