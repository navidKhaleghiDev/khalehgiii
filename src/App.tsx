import { Suspense, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routesConfig from '@src/routes/routesConfig';
import { UserContext } from '@context/user/userContext';
import { useLanguage } from '@context/settings/languageContext';
import { useTheme } from '@context/settings/themeContext';
import { IUser } from './services/users/types';

function generateRouter(user: any) {
  return routesConfig(user);
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const { dir, lang } = useLanguage();
  const { theme } = useTheme();
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      <div dir={dir} className={theme}>
        <Suspense>
          <RouterProvider router={generateRouter(user)} />
        </Suspense>
        <ToastContainer
          rtl={lang === 'fa'}
          style={{ direction: 'rtl', fontSize: 20 }}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
