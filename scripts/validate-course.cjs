const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const cache = new Map();
function load(filename) {
  filename = path.resolve(filename);
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} }; cache.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  vm.runInNewContext(source, { exports: module.exports, module, Math, Date, require: spec => load(path.resolve(path.dirname(filename), spec + (spec.endsWith('.json') ? '' : '.ts'))) });
  return module.exports;
}
const data = load('src/data/allContent.ts');
const info = load('src/data/weeksInfo.ts');
const learning = load('src/components/studio/learning.ts');
const ids = info.ALL_WEEKS_LIST.map(w => w.id);
assert.equal(ids.length, 8);
let slides = 0, topics = 0, questions = 0, cards = 0;
const globalIds = new Set();
for (const week of ids) {
  const w = info.WEEKS_INFO[week];
  const source = JSON.parse(fs.readFileSync(`public/content/${week}.json`, 'utf8'));
  assert.equal(source.count, w.totalPages, `${week} PDF count`);
  assert.equal(source.pages.length, w.totalPages);
  assert.ok(fs.existsSync(`public${w.pdfFilePath}`));
  source.pages.forEach((p, i) => assert.equal(p.page, i + 1)); slides += source.count;
  for (const module of data.ALL_MODULES[week]) {
    assert.ok(module.pdfPageStart >= 1 && module.pdfPageEnd <= w.totalPages);
    for (const sub of module.subsections) {
      assert.ok(!globalIds.has(sub.id), `duplicate section ${sub.id}`); globalIds.add(sub.id);
      assert.ok(sub.content.trim(), `${sub.id} empty content`);
      assert.ok(sub.pdfPage >= 1 && sub.pdfPage <= w.totalPages, `${sub.id} invalid PDF page`);
      assert.ok(learning.TOPIC_QUESTIONS[week].some(q => q.id === `topic-${sub.id}`), `${sub.id} missing practice`);
      assert.ok(learning.CARD_BANK[week].some(c => c.id === `recall-${sub.id}`), `${sub.id} missing flashcard`);
      topics++;
    }
  }
  for (const q of learning.QUESTION_BANK[week]) {
    assert.ok(!globalIds.has(q.id), `duplicate question ${q.id}`); globalIds.add(q.id);
    assert.equal(q.options.filter(o => o.isCorrect).length, 1, `${q.id} correct answer count`);
    assert.equal(new Set(q.options.map(o => o.text)).size, q.options.length, `${q.id} duplicate options`);
    assert.ok(q.pdfPage >= 1 && q.pdfPage <= w.totalPages, `${q.id} invalid PDF page`);
    questions++;
  }
  for (const c of learning.CARD_BANK[week]) {
    assert.ok(!globalIds.has(c.id), `duplicate card ${c.id}`); globalIds.add(c.id);
    assert.ok(c.pdfPage >= 1 && c.pdfPage <= w.totalPages, `${c.id} invalid PDF page`); cards++;
  }
  console.log(`${week}: ${source.count} PDF pages, ${data.ALL_MODULES[week].length} modules, ${learning.QUESTION_BANK[week].length} questions`);
}
for (let i = 0; i < 25; i++) {
  const exam = learning.examPool(ids, 24);
  assert.equal(exam.length, 24);
  assert.equal(new Set(exam.map(q => q.id)).size, 24);
  for (const w of ids) assert.equal(exam.filter(q => q.weekId === w).length, 3);
}
assert.equal(learning.examPool(['week1'], 64).length, learning.QUESTION_BANK.week1.length);
console.log(JSON.stringify({ slides, topics, questions, cards, validation: 'passed' }));
const visuals = load('src/components/studio/visualCatalog.ts');
for (const module of Object.values(data.ALL_MODULES).flat()) {
 assert.ok(visuals.VISUAL_MODULE_IDS.includes(module.id), `Missing visual: ${module.id}`);
 const story = visuals.getVisualStory(module);
 assert.ok(story.nodes.length >= 2);
 for (const node of story.nodes) { assert.ok(node.label && node.description); assert.ok(node.page >= 1 && node.page <= info.WEEKS_INFO[module.weekId].totalPages); }
}
console.log('All 59 modules have source-linked visual explanations.');
const slideData = load('src/components/studio/lessonSlides.ts');
let slideCount = 0;
for (const module of Object.values(data.ALL_MODULES).flat()) {
 const slides = slideData.buildLessonSlides(module); slideCount += slides.length;
 assert.equal(new Set(slides.map(s => s.id)).size, slides.length);
 assert.equal(slides.filter(s => s.kind === 'topic').length, module.subsections.length);
 for (const sub of module.subsections) assert.equal(slides.find(s => s.id === sub.id).subsection.content, sub.content, 'Full topic content retained');
 slides.forEach(s => assert.ok(s.page >= 1 && s.page <= info.WEEKS_INFO[module.weekId].totalPages));
}
console.log(`${slideCount} illustrated lesson pages; all 136 topics retain full content.`);
const processes = load('src/components/studio/processEngine.ts');
const scenarios = load('src/components/studio/processCatalog.ts').PROCESS_SCENARIOS;
const teaching = load('src/components/studio/teachingScenes.ts');
let processVariants = 0;
for (const [id, scenario] of Object.entries(scenarios)) {
 for (const [choice] of scenario.options) {
  const values = scenario.input ? [scenario.input.min, scenario.input.initial, scenario.input.max] : [undefined];
  for (const value of values) {
   const run = processes.buildProcessRun(id, choice, value);processVariants++;
   assert.ok(run.result && run.steps.length);
   run.steps.forEach(s => { assert.ok(run.actors[s.from] && run.actors[s.to]);assert.ok(s.payload && s.action);assert.ok(Object.values(s.state).every(v => typeof v === 'string' && !v.includes('NaN'))); });
  }
 }
}
for (const module of Object.values(data.ALL_MODULES).flat()) {
 assert.ok(scenarios[module.id],`No chapter process ${module.id}`);
 for (const sub of module.subsections) for(const id of teaching.getTeachingScenes(module,sub)) assert.ok(scenarios[id],`Unknown topic process ${sub.id}: ${id}`);
}
const run = (id,choice,value) => processes.buildProcessRun(id,choice,value);
const finalState = r => r.steps[r.steps.length-1].state;
assert.equal(finalState(run('w2-m2','add',12)).ผล,'19');
assert.equal(finalState(run('w3-m6','hit',140)).Physical,'5260');
assert.equal(finalState(run('w3-m6','miss',140)).Physical,'5260');
assert.ok(!run('w3-m6','miss',140).steps.some(s=>s.action.includes('page fault')));
assert.ok(run('w3-m6','fault',140).steps.some(s=>s.action.includes('page fault')));
assert.equal(finalState(run('w3-m5','rr',2)).เวลา,'10');
assert.ok(run('w3-m5','priority',2).steps[0].action.includes('P2'));
assert.equal(finalState(run('w4-m1','three',8)).VMs,'2');
assert.equal(finalState(run('w4-m3','auto',60)).Instances,'3');
assert.equal(finalState(run('w5-m5','mesh',0)).เส้นทาง,'PC A → Switch C → PC D');
assert.ok(run('w5-m5','star',0).steps.some(s=>s.status==='blocked'));
assert.equal(finalState(run('w6-m2','send',20)).ขนาด,'78 bytes');
assert.equal(finalState(run('w6-m2','receive',20)).ขนาด,'20 bytes');
assert.equal(finalState(run('w6-m4','local',24)).Network,'192.168.10.0');
assert.equal(finalState(run('w6-m4','local',24)).Broadcast,'192.168.10.255');
assert.equal(finalState(run('w6-m5','tcp',1)).ได้รับ,'1');
assert.equal(finalState(run('w6-m5','udp',1)).ได้รับ,'0');
assert.equal(finalState(run('week6-extra-2','route',3)).Delivered,'no');
assert.equal(finalState(run('week6-extra-2','route',4)).Delivered,'yes');
assert.equal(finalState(run('w7-m5','other')).ผล,'ไม่เปิดเผยข้อมูล');
assert.equal(finalState(run('raid','one')).Recovered,'12');
assert.equal(finalState(run('emat','lookup',90)).EMAT,'120.0 ns');
assert.equal(finalState(run('differential','same',-5)).Difference,'6');
assert.equal(finalState(run('aging','enabled')).LowJob,'running');
console.log(`${processVariants} process variants validated; all 136 topics have working teaching scenes.`);
