const ts=require('typescript'),fs=require('fs'),path=require('path');
const entries=new Set(),templates=new Set();
const thai=/[\u0e00-\u0e7f]/;
const skipProps=/^(id|className|engine|type|variant|size|status|weekId|infographicId|pdfFileName|pdfFilePath|source|categoryId|href|key|value|role|d|fill|stroke|aria-live|aria-current|aria-busy|originalText|layoutText|preview|relatedTopicId|relatedModuleId|keys)$/;
function add(s){s=s.trim();if(!s||s.length<2||/:not\(|a\[href\]/.test(s))return;if(thai.test(s)||(/[A-Za-z]{3}/.test(s)&&!/^([\w./:@#-]+|var\(.+\)|https?:.*|[A-Z_0-9 ]+)$/s.test(s)))entries.add(s);}
function visitFiles(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory()){if(d.name!=='i18n')visitFiles(p)}else if(/\.(tsx?|json)$/.test(p)&&!p.includes('teachingCoverage')){
 if(p.endsWith('.json')){const walk=(v,k)=>{if(typeof v==='string'&&!skipProps.test(k))add(v);else if(Array.isArray(v))v.forEach(x=>walk(x,k));else if(v&&typeof v==='object')Object.entries(v).forEach(([key,val])=>walk(val,key));};walk(JSON.parse(fs.readFileSync(p,'utf8')),'');continue;}
 const file=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,p.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function walk(n){if(ts.isPropertyAssignment(n)&&thai.test(n.name.getText(file)))add(n.name.getText(file).replace(/['"]/g,''));if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)||ts.isJsxText(n)){
 const par=n.parent;let key='';if(ts.isPropertyAssignment(par))key=par.name.getText(file).replace(/['"]/g,'');if(ts.isJsxAttribute(par))key=par.name.getText(file);
 if(!ts.isImportDeclaration(par)&&!ts.isExportDeclaration(par)&&!skipProps.test(key))add(n.text);
 }else if(ts.isTemplateExpression(n)){const parts=[n.head.text,...n.templateSpans.map(x=>x.literal.text)];const pattern=parts.map((p,i)=>p+(i<parts.length-1?`{${i}}`:'')).join('');if(thai.test(pattern)||(/[A-Za-z]{3}/.test(pattern)&&!/(?:className|var\(|\/src\/|\/content\/|\/pdfs\/|^M\{|^status-)/.test(pattern))){templates.add(pattern);add(pattern);parts.forEach(add);} }
 ts.forEachChild(n,walk)}walk(file);
 }} }
visitFiles('src');visitFiles('public/content');visitFiles('public/reading');
// Exact snippets are also used by markdown parsing and dynamically assembled trace messages.
for(const s of [...entries]){for(const l of s.split(/[\n|~]/))add(l.replace(/^[\s*#•\d.\-]+/,'').trim());for(const m of s.matchAll(/\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*/g))if(thai.test(m[1]||m[2]||m[3]||''))add(m[1]||m[2]||m[3]);for(const m of s.matchAll(/[\u0e00-\u0e7f]+(?: +[\u0e00-\u0e7f]+)*/g))if(m[0].length>1)entries.add(m[0]);}
fs.writeFileSync('src/i18n/source-strings.json',JSON.stringify([...entries].sort(),null,2)+'\n');
fs.writeFileSync('src/i18n/source-templates.json',JSON.stringify([...templates].sort(),null,2)+'\n');
console.log({strings:entries.size,templates:templates.size,characters:[...entries].reduce((n,s)=>n+s.length,0)});
