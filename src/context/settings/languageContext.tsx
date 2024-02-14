// LanguageContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import i18next from 'i18next';

const storedLang = localStorage.getItem('lang');

interface LanguageContextProps {
  lang: string;
  changeLanguage: (lang: string) => void;
  dir: string | undefined;
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

  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  const contextValue = useMemo(
    () => ({ lang, changeLanguage, dir }),
    [lang, changeLanguage, dir]
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
