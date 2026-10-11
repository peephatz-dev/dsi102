"""Prepare checked-in translations from public course text; no runtime network calls."""
import concurrent.futures, json, re, time, urllib.parse, urllib.request
from pathlib import Path
root=Path('src/i18n')
strings=json.loads((root/'source-strings.json').read_text())
cachefile=root/'translations.json'
cache=json.loads(cachefile.read_text()) if cachefile.exists() else {'th':{},'en':{}}
tasks=[]
for lang in ['en','th']:
 pending=[s for s in strings if s not in cache[lang] and (bool(re.search('[\u0e00-\u0e7f]',s)) if lang=='en' else not re.search('[\u0e00-\u0e7f]',s))]
 batch=[];length=0
 for s in pending:
  n=len(urllib.parse.quote(s))*1.05+5
  if batch and (length+n>6200 or len(batch)>=35): tasks.append((lang,batch));batch=[];length=0
  batch.append(s);length+=n
 if batch:tasks.append((lang,batch))
print('Translation batches:',len(tasks),flush=True)
def translate(task):
 lang,items=task
 qs=urllib.parse.urlencode([('client','dict-chrome-ex'),('sl','th' if lang=='en' else 'en'),('tl',lang)]+[('q',s) for s in items])
 for retry in range(6):
  try:
   host=['translate.google.com','clients5.google.com','translate.google.co.th'][retry%3]
   req=urllib.request.Request('https://'+host+'/translate_a/t?'+qs,headers={'User-Agent':'Mozilla/5.0'})
   data=json.load(urllib.request.urlopen(req,timeout=35))
   if len(data)!=len(items): raise ValueError('Translation batch length mismatch')
   values=[x[0] if isinstance(x,list) else x for x in data]
   if any(not isinstance(x,str) for x in values):raise ValueError('Invalid translation')
   return lang,dict(zip(items,values))
  except Exception as e:
   if retry==5:raise RuntimeError(str(e)+' '+str(len(items)))
   time.sleep(1+retry)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
 for i,result in enumerate(pool.map(translate,tasks)):
  lang,values=result;cache[lang].update(values)
  if i%10==0 or i==len(tasks)-1:
   cachefile.write_text(json.dumps(cache,ensure_ascii=False,indent=2)+'\n')
   print('Translated batches',i+1,'/',len(tasks),flush=True)
