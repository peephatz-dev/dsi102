"""Index physical PDF headings, text geometry and page previews without altering the sources."""
import concurrent.futures,json,pathlib,re,subprocess,tempfile
import pdfplumber
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'public/reading'; OUT.mkdir(exist_ok=True)
PREV=ROOT/'public/slides'; PREV.mkdir(exist_ok=True)
def process(week):
 records=[]
 with pdfplumber.open(ROOT/f'public/pdfs/week{week}.pdf') as pdf:
  for number,page in enumerate(pdf.pages,1):
   words=page.extract_words(extra_attrs=['size'])
   candidates=[w for w in words if re.search('[a-zA-Z]{2}',w['text']) and not w['text'].startswith(('http','www.'))]
   if candidates:
    large=[w for w in candidates if w['size']>=20]
    size=min(large,key=lambda w:(round(w['top']),w['x0']))['size'] if large else max(w['size'] for w in candidates)
    title_words=[w for w in words if size*.91<=w['size']<=size*1.1]
    # Keep the leading title group when equally sized figure labels occur lower down.
    top=min(w['top'] for w in title_words) if title_words else 0
    selected=[]; last=top
    for word in title_words:
     if word['top']-last>size*1.75: break
     selected.append(word); last=word['top']
    title_words=selected
    title=' '.join(w['text'] for w in title_words).replace(' - ',' — ')
   else:title=''
   text=page.extract_text(x_tolerance=2,y_tolerance=4) or ''
   records.append({'page':number,'title':title,'layoutText':text,'imageOnly':not bool(text.strip()),'preview':f'/slides/week{week}/{number}.webp'})
 if len(list((PREV/f'week{week}').glob('*.webp'))) != len(records):
  render_previews(week)
 (OUT/f'week{week}.json').write_text(json.dumps({'week':f'week{week}','pages':records},ensure_ascii=False,indent=2)+'\n')
 print(f'Week {week}: indexed and rendered {len(records)} pages',flush=True)
def render_previews(week):
 with tempfile.TemporaryDirectory(prefix=f'dsi-slides-{week}-') as tmp:
  subprocess.run(['pdftoppm','-scale-to','1100','-png',str(ROOT/f'public/pdfs/week{week}.pdf'),tmp+'/page'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  dest=PREV/f'week{week}'; dest.mkdir(exist_ok=True)
  for p in pathlib.Path(tmp).glob('page-*.png'):
   number=int(p.stem.split('-')[-1]);Image.open(p).convert('RGB').save(dest/f'{number}.webp',quality=82,method=4)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(process,range(1,9)))
