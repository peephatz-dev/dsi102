import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Language = 'th' | 'en';
export const LANGUAGE_KEY = 'dsi102_language';
const LocaleContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'th', setLanguage: () => {} });
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'th'; } catch { return 'th'; }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'th' ? 'DSI 102 · สื่อเรียนไว้ให้น้อง ๆ' : 'DSI 102 · Visual learning for students';
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* Language still works without storage. */ }
  }, [language]);
  return <LocaleContext.Provider value={{ language, setLanguage }}>{children}</LocaleContext.Provider>;
}
export const useLanguage = () => useContext(LocaleContext);
