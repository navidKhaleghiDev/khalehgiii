import { Suspense, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routesConfig from '@src/routes/routesConfig';
import { UserContext } from '@context/user/userContext';
import { useLanguage } from '@context/settings/languageContext';
import { useTheme } from '@context/settings/themeContext';
import { IUser } from './services/users/types';

const router = createBrowserRouter(routesConfig);

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const { dir, lang } = useLanguage();
  const { theme } = useTheme();
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      <div dir={dir} className={theme}>
        <Suspense>
          <RouterProvider router={router} />
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
