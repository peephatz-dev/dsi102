"""Refresh searchable slide text and published PDFs from the user's week folders.
Requires Python with pypdf. Run from the repository root.
Content notes in src/data remain authored separately; this does not overwrite them.
"""
import json
import pathlib
import re
import shutil
from pypdf import PdfReader
root = pathlib.Path(__file__).resolve().parents[1]
paths = [root / 'DSI102_Week1_Introduction to Digital Technology.pdf']
paths += [next(root.glob(f'Week{i}*/*.pdf')) for i in range(2, 9)]
manifest = {}
for week, path in enumerate(paths, 1):
    reader = PdfReader(path)
    pages = []
    for number, page in enumerate(reader.pages, 1):
        text = page.extract_text() or ''
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        lines = [line for line in lines if not line.startswith(('DSI102 /', 'DSI102 |', 'D S I 1 0 2', 'CYBER ATTACKS,')) and not re.match(r'^\d+\s*/\s*\d+$', line)]
        title = next((line for line in lines if len(line) > 5), f'Slide {number}')
        pages.append({'page': number, 'title': title, 'text': text})
    key = f'week{week}'
    source = str(path.relative_to(root))
    (root / 'public/content').mkdir(parents=True, exist_ok=True)
    (root / 'public/pdfs').mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, root / f'public/pdfs/{key}.pdf')
    (root / f'public/content/{key}.json').write_text(json.dumps({'source': source, 'pages': pages, 'count': len(pages)}, ensure_ascii=False))
    manifest[key] = {'source': source, 'pages': len(pages)}
    print(f'{key}: {len(pages)} pages')
(root / 'src/data/sourceManifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
