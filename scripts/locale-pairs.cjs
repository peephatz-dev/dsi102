const ts=require('typescript'),fs=require('fs'),path=require('path');
const pairs={th:{},en:{}};
const fields=[['title','thaiTitle'],['term','thaiTerm'],['definition','thaiDefinition'],['front','thaiFront'],['back','thaiBack']];
function addObject(obj){for(const [en,th] of fields){const a=obj[en],b=obj[th];if(typeof a==='string'&&typeof b==='string'&&a!==b&&!/[\u0e00-\u0e7f]/.test(a)){pairs.en[b]=a;pairs.th[a]=b;}}}
function walkJSON(obj){if(Array.isArray(obj))return obj.forEach(walkJSON);if(obj&&typeof obj==='object'){addObject(obj);Object.values(obj).forEach(walkJSON)}}
for(const name of fs.readdirSync('src/data')){const p=path.join('src/data',name);if(name.endsWith('.json'))walkJSON(JSON.parse(fs.readFileSync(p,'utf8')));else if(name.endsWith('.ts')){const file=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true);function walk(n){if(ts.isObjectLiteralExpression(n)){const obj={};for(const v of n.properties)if(ts.isPropertyAssignment(v)&&(ts.isStringLiteral(v.initializer)||ts.isNoSubstitutionTemplateLiteral(v.initializer)))obj[v.name.getText(file).replace(/['"]/g,'')]=v.initializer.text;addObject(obj);}ts.forEachChild(n,walk)}walk(file)}}
fs.writeFileSync('src/i18n/authored-pairs.json',JSON.stringify(pairs,null,2)+'\n');console.log('Authored bilingual pairs:',Object.keys(pairs.en).length);
