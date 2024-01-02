// LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';
import i18next from 'i18next';
const storedLang = localStorage.getItem('lang');

interface LanguageContextProps {
	lang: string;
	changeLanguage: (lang: string) => void;
	dir: 'ltr' | 'rtl' | undefined;
}

interface LanguageProviderProps {
	children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
	const [lang, setLang] = useState<string>(() => {
		return storedLang || 'fa';
	});
	const newLang = lang === 'fa' ? 'en' : 'fa';

	const changeLanguage = (l: string) => {
		setLang(l || newLang);
		i18next.changeLanguage(l || newLang);
		localStorage.setItem('lang', l || newLang);
	};
	const dir = lang === 'fa' ? 'rtl' : 'ltr';
	return (
		<LanguageContext.Provider value={{ lang, changeLanguage, dir }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = (): LanguageContextProps => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};
