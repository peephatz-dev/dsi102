const assert=require('node:assert/strict');
const strings=require('../src/i18n/source-strings.json');
const templates=require('../src/i18n/source-templates.json');
const translations=require('../src/i18n/translations.json');
const overrides=require('../src/i18n/overrides.json');
const authored=require('../src/i18n/authored-pairs.json');
const thai=/[\u0e00-\u0e7f]/;
const placeholders=s=>[...s.matchAll(/\{\d+\}/g)].map(m=>m[0]).sort();
for(const language of ['th','en']) {
  const catalog={...translations[language],...authored[language],...overrides[language]};
  for(const [source,target] of Object.entries(catalog)) {
    assert.equal(typeof target,'string'); assert.ok(target.trim(),`Empty ${language} translation: ${source}`);
    if(language==='en')assert.ok(!thai.test(target),`Thai remains in English translation: ${source}`);
  }
  for(const text of strings)if(language==='en'&&thai.test(text)||language==='th'&&!thai.test(text))assert.ok(catalog[text],`Missing ${language} translation: ${text}`);
  for(const source of templates)if(catalog[source])assert.deepEqual(placeholders(catalog[source]),placeholders(source),`Changed placeholders in ${language}: ${source}`);
}
console.log(`${strings.length} source strings and ${templates.length} variable templates validated for Thai/English; authored bilingual text retained.`);
