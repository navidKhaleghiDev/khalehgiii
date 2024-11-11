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
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    themeMode === null || undefined || '' ? 'light' : themeMode
  );

  const isDark = localStorage.getItem('theme') === 'dark';

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, isDark, setTheme }),
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
