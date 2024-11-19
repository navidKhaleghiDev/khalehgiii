import React, { createContext, useContext, useState, useMemo } from 'react';
import i18next from 'i18next';

const storedLang = localStorage.getItem('lang');
if (!storedLang) {
  localStorage.setItem('lang', 'fa');
}

interface LanguageContextProps {
  lang: string;
  changeLanguage: (lang: string) => void;
  dir: 'rtl' | 'ltr';
  isFarsi: boolean;
  rtl: boolean;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: LanguageProviderProps): JSX.Element {
  const [lang, setLang] = useState<string>(() => storedLang || 'fa');
  const newLang = lang === 'fa' ? 'en' : 'fa';

  const changeLanguage = React.useCallback(
    (l: string) => {
      setLang(l || newLang);
      i18next.changeLanguage(l || newLang);
      localStorage.setItem('lang', l || newLang);
      window.location.reload();
    },
    [newLang]
  );

  const dir: 'rtl' | 'ltr' = lang === 'fa' ? 'rtl' : 'ltr';

  const rtl = lang === 'fa' || lang === 'ar';

  const isFarsi = lang === 'fa';

  const contextValue = useMemo(
    () => ({ lang, changeLanguage, dir, isFarsi, rtl }),
    [lang, changeLanguage, dir, isFarsi, rtl]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
