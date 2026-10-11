import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, CheckCircle2, Instagram, ShoppingBag } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '../../i18n/LocaleContext';
import { translate } from '../../i18n/translate';
export const FOLLOW_SESSION_KEY = 'dsi102_modhiw_follow_confirmed_v1';
export const MODHIW_URL = 'https://www.instagram.com/modhiw.offical?rpxt=ZTU5dzFvbXN1MTY4';
export function FollowGate({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [unlocked, setUnlocked] = useState(() => { try { return sessionStorage.getItem(FOLLOW_SESSION_KEY) === 'true'; } catch { return false; } });
  const [visited, setVisited] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const node = dialog.current; if (unlocked || !node) return;
    node.showModal(); firstLink.current?.focus({ preventScroll: true });
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; if (node.open) node.close(); };
  }, [unlocked]);
  const keepFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled)')).filter(node => node.getClientRects().length > 0);
    const first = controls[0], last = controls[controls.length - 1];
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  };
  const enter = () => {
    if (!visited || !confirmed) return;
    try { sessionStorage.setItem(FOLLOW_SESSION_KEY, 'true'); } catch { /* Remain usable in this tab without storage. */ }
    setUnlocked(true);
  };
  useEffect(() => { if (unlocked) document.querySelector<HTMLElement>('.studio-main')?.focus({ preventScroll: true }); }, [unlocked]);
  return <>
    {unlocked ? children : <div className="gate-background" aria-hidden="true"><div className="gate-background-brand">DSI 102<span>Learning studio</span></div><div className="gate-background-grid"/></div>}
    {!unlocked && <dialog ref={dialog} className="follow-gate" aria-labelledby="follow-title" aria-describedby="follow-description" onCancel={event => event.preventDefault()} onKeyDown={keepFocus}>
      <div className="follow-toolbar"><span className="follow-course"><ShoppingBag size={16} aria-hidden="true"/> DSI 102 × มดหิ้ว</span><LanguageSwitch/></div>
      <div className="follow-content">
        <div className="follow-badge"><Instagram size={22} aria-hidden="true"/><span>MODHIW</span></div>
        <p className="follow-eyebrow">สื่อเรียนไว้ให้น้อง ๆ</p>
        <h1 id="follow-title">ของฟรี<br/><span>ไม่มีในโลก</span></h1>
        <p id="follow-description">ก่อนเข้าอ่าน DSI 102 ฝากกดติดตามมดหิ้วเป็นกำลังใจให้กันหน่อย แล้วกลับมาเรียนได้ครบทุก Week เลย</p>
        <div className="follow-account"><span className="follow-avatar" aria-hidden="true"><ShoppingBag size={24}/></span><div><strong>มดหิ้ว</strong><span data-no-translate>@modhiw.offical</span></div><span className="follow-platform" data-no-translate>Instagram</span></div>
        <ol className="follow-steps"><li className={visited ? 'is-done' : 'is-current'}><span aria-hidden="true">{visited ? <Check size={13}/> : '1'}</span>เปิด Instagram และกดติดตาม</li><li className={confirmed ? 'is-done' : visited ? 'is-current' : ''}><span aria-hidden="true">{confirmed ? <Check size={13}/> : '2'}</span>กลับมายืนยัน แล้วเริ่มเรียน</li></ol>
        <a ref={firstLink} className={`follow-instagram ${visited ? 'is-visited' : ''}`} href={MODHIW_URL} target="_blank" rel="noopener noreferrer" onClick={() => setVisited(true)}><Instagram size={18} aria-hidden="true"/>{translate(visited ? 'เปิด Instagram อีกครั้ง' : 'ไปติดตามมดหิ้ว', language)}<ArrowUpRight size={18} aria-hidden="true"/></a>
        <div className={`follow-confirmation ${visited ? 'is-ready' : ''}`}>
          <label><input type="checkbox" checked={confirmed} disabled={!visited} onChange={event => setConfirmed(event.target.checked)}/><span>ฉันติดตามมดหิ้วแล้ว</span></label>
          <p aria-live="polite">{visited ? 'กดติดตามใน Instagram แล้วติ๊กยืนยันเพื่อเข้าอ่าน' : 'เปิด Instagram จากปุ่มด้านบนก่อน แล้วกลับมายืนยัน'}</p>
        </div>
        <button className="follow-enter" disabled={!visited || !confirmed} onClick={enter}><CheckCircle2 size={18} aria-hidden="true"/>{translate('ยืนยันและเริ่มเรียน', language)}</button>
        <p className="follow-privacy">ไม่ต้องเข้าสู่ระบบในเว็บนี้ · การติดตามใช้การยืนยันด้วยตัวคุณเอง</p>
      </div>
      <footer className="follow-footer"><span>8 Weeks</span><span>136 หัวข้อ</span><span>514 สไลด์</span></footer>
    </dialog>}
  </>;
}
