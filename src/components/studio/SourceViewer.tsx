import { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Button } from '../arc/button/button';
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WEEKS_INFO, ALL_WEEKS_LIST } from '../../data/weeksInfo';
import { WeekId } from '../../types/course';
GlobalWorkerOptions.workerSrc = workerUrl;

export function SourceViewer({ inline = false }: { inline?: boolean }) {
  const { activePdfWeek, setActivePdfWeek, pdfPage, setPdfPage, setPdfViewerOpen } = useApp();
  const info = WEEKS_INFO[activePdfWeek];
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(480);
  const [retry, setRetry] = useState(0);
  const wrap = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const page = Math.min(Math.max(1, pdfPage), doc?.numPages || info.totalPages);
  useEffect(() => {
    if (inline) return;
    const previous = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setPdfViewerOpen(false); };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); previous?.focus(); };
  }, [inline]);
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    observer.observe(node); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setDoc(null); setError(''); setLoading(true);
    let cancelled = false;
    const task = getDocument(info.pdfFilePath);
    task.promise.then(pdf => { if (!cancelled) setDoc(pdf); }).catch(() => { if (!cancelled) { setError('เปิด PDF ไม่สำเร็จ ลองโหลดอีกครั้งหรือเปิดต้นฉบับในแท็บใหม่'); setLoading(false); } });
    return () => { cancelled = true; void task.destroy(); };
  }, [info.pdfFilePath, retry]);
  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    let renderTask: ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined;
    setLoading(true); setError('');
    doc.getPage(page).then(p => {
      if (cancelled || !canvas.current) return;
      const base = p.getViewport({ scale: 1 });
      const scale = Math.max(180, width - 24) / base.width * zoom;
      const viewport = p.getViewport({ scale });
      const target = canvas.current, ratio = Math.min(window.devicePixelRatio || 1, 2);
      target.width = viewport.width * ratio; target.height = viewport.height * ratio;
      target.style.width = `${viewport.width}px`; target.style.height = `${viewport.height}px`;
      const ctx = target.getContext('2d'); if (!ctx) return;
      renderTask = p.render({ canvasContext: ctx, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      return renderTask.promise;
    }).then(() => { if (!cancelled) setLoading(false); }).catch(e => {
      if (!cancelled && e.name !== 'RenderingCancelledException') { setError('แสดงหน้านี้ไม่สำเร็จ กรุณาลองอีกครั้ง'); setLoading(false); }
    });
    return () => { cancelled = true; renderTask?.cancel(); };
  }, [doc, page, width, zoom]);
  return <aside className={`source-pane ${inline ? 'inline-source' : ''}`} aria-label="เอกสารอ้างอิง PDF">
    <header className="source-head"><div><FileText size={18}/><span>ตรวจสอบกับต้นฉบับ</span></div>{!inline && <Button ref={close} variant="ghost" size="sm" onClick={() => setPdfViewerOpen(false)} aria-label="ปิด PDF"><X size={18}/></Button>}</header>
    <div className="source-tools"><label>เอกสาร <select value={activePdfWeek} onChange={e => { setActivePdfWeek(e.target.value as WeekId); setPdfPage(1); }}>
      {ALL_WEEKS_LIST.map(w => <option key={w.id} value={w.id}>Week {w.weekNumber}: {w.badge}</option>)}</select></label>
      <div className="button-row"><Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPdfPage(page - 1)} aria-label="หน้าก่อนหน้า"><ChevronLeft size={18}/></Button>
      <label className="page-input">หน้า <input aria-label="เลขหน้า PDF" type="number" min={1} max={doc?.numPages || info.totalPages} value={page} onChange={e => { const n = Number(e.target.value); if (n >= 1 && n <= (doc?.numPages || info.totalPages)) setPdfPage(n); }}/></label><span>/ {doc?.numPages || info.totalPages}</span>
      <Button variant="ghost" size="sm" disabled={page >= (doc?.numPages || info.totalPages)} onClick={() => setPdfPage(page + 1)} aria-label="หน้าถัดไป"><ChevronRight size={18}/></Button>
      <Button variant="ghost" size="sm" disabled={zoom <= .75} onClick={() => setZoom(z => z - .25)} aria-label="ย่อ PDF"><ZoomOut size={17}/></Button>
      <Button variant="ghost" size="sm" disabled={zoom >= 2} onClick={() => setZoom(z => z + .25)} aria-label="ขยาย PDF"><ZoomIn size={17}/></Button></div>
    </div>
    <div className="pdf-canvas-wrap" ref={wrap} aria-busy={loading}>
      {loading && <p role="status">กำลังแสดงหน้า {page}…</p>}
      {error && <div role="alert"><p>{error}</p><Button variant="secondary" onClick={() => setRetry(n => n + 1)}>โหลด PDF ใหม่</Button></div>}
      <canvas ref={canvas} aria-label={`สไลด์ Week ${info.weekNumber} หน้า ${page}`} />
    </div>
    <footer><p>{info.pdfFileName}</p>{info.weekNumber >= 7 && <p>ลำดับโฟลเดอร์ Week {info.weekNumber}; เอกสารต้นฉบับระบุ Week {info.weekNumber + 1}</p>}<a href={`${info.pdfFilePath}#page=${page}`} target="_blank" rel="noreferrer">เปิดต้นฉบับในแท็บใหม่ <ExternalLink size={14}/></a><p>เลขหน้าใช้ลำดับจริงของ PDF ซึ่งอาจต่างจากเลขที่พิมพ์บนสไลด์</p></footer>
  </aside>;
}
