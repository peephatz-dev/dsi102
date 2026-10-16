const assert=require('node:assert/strict'),fs=require('node:fs');
let pages=0,lessons=0,figures=0;
const expected=[48,54,78,48,74,66,74,72];
for(let w=1;w<=8;w++){
 const d=JSON.parse(fs.readFileSync(`public/reading/week${w}.json`));assert.equal(d.pages.length,expected[w-1]);
 d.pages.forEach((p,i)=>{
  assert.equal(p.page,i+1);assert.equal(p.id,`week${w}-${i+1}`);assert.ok(p.title.trim());assert.ok(!/^Slide \d+$/.test(p.title),'Unresolved heading '+p.id);
  assert.ok(p.takeaway.trim());assert.ok(p.section);assert.ok(p.originalText!==undefined);assert.ok(fs.existsSync('public'+p.preview));
  if(p.kind==='lesson'){lessons++;assert.ok(p.explanation.trim(),'No explanation '+p.id);assert.ok(p.sourceText.trim(),'No source reading '+p.id)}
  if(p.imageOnly){figures++;assert.ok(p.headingInferred);assert.ok(p.sourceText.length>80,'Image-only slide lacks interpreted text '+p.id)}
  pages++;
 });
 assert.ok(d.sections.every(s=>d.pages[s.page-1].title===s.title));
}
const w3=JSON.parse(fs.readFileSync('public/reading/week3.json'));
assert.equal(w3.pages[3].title,'What is an Operating System?');assert.equal(w3.pages[27].title,'Program vs process');assert.ok(w3.pages[31].sourceText.includes('waiting → ready'));
const w5=JSON.parse(fs.readFileSync('public/reading/week5.json'));
assert.equal(w5.pages[8].title,'Hub');assert.equal(w5.pages[9].title,'Switch');assert.ok(w5.pages[24].explanation.includes('ขาวเขียว'));
const w6=JSON.parse(fs.readFileSync('public/reading/week6.json'));
assert.equal(w6.pages[31].title,'IPv4');assert.equal(w6.pages[38].title,'IPv6');assert.ok(w6.pages[36].sourceText.includes('192.168.1.63'));assert.ok(w6.pages[41].sourceText.includes('40 bytes'));
console.log(`${pages} physical slides in order; ${lessons} full reading lessons; ${figures} image-only slides have interpreted text and original previews.`);
