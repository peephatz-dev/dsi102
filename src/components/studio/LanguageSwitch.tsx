import { Globe2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LocaleContext';
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" role="group" aria-label="ภาษาของเว็บไซต์">
    <Globe2 size={16} aria-hidden="true"/>
    <button type="button" lang="th" data-no-translate aria-pressed={language === 'th'} onClick={() => setLanguage('th')}>ไทย</button>
    <button type="button" lang="en" data-no-translate aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button>
  </div>;
}
