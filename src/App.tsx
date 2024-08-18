import { Suspense, useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routesConfig from '@src/routes/routesConfig';
import { UserContext } from '@context/user/userContext';
import { useLanguage } from '@context/settings/languageContext';
import { useTheme } from '@context/settings/themeContext';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import { IUser } from './services/users/types';
import { API_USERS_PROFILE } from './services/users';

function generateRouter(user: any) {
  return routesConfig(user);
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { dir, lang } = useLanguage();
  const { theme } = useTheme();
  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const token = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  useEffect(() => {
    if (token) {
      API_USERS_PROFILE()
        .then(({ data }) => {
          if (data.exceeded_usage) {
            setUser(null);
          } else {
            setUser(data);
          }
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <UserContext.Provider value={userValue}>
      <div dir={dir} className={theme}>
        <Suspense fallback={<div>Loading...</div>}>
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
