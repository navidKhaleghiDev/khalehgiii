// ThemeContext.tsx
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

const themeMode = localStorage.getItem('theme');

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    themeMode === null || undefined || '' ? 'dark' : themeMode
  );
  const isDark = localStorage.getItem('theme') === 'dark';

  const toggleTheme = useCallback(() => {
    localStorage.setItem(
      'theme',
      localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
    );
    setTheme(localStorage.getItem('theme') as string);
  }, []);
  const contextValue = useMemo(
    () => ({ theme, toggleTheme, isDark }),
    [theme, toggleTheme, isDark]
  );
  return (
    <ThemeContext.Provider value={contextValue as ThemeContextType}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
