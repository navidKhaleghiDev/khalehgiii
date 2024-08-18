import { useCallback, useEffect } from 'react';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton } from '@ui/atoms/BaseButton';
import { NoResult } from '@ui/molecules/NoResult';
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '@context/user/userContext';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import { API_USERS_LOGOUT } from '@src/services/users';

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, setUser } = useUserContext();
  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  const logoutFunction = useCallback(async () => {
    const data = {
      refresh_token: refresh || '',
    };
    await API_USERS_LOGOUT(data);
  }, [refresh]);

  const logout = useCallback(() => {
    logoutFunction();
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  }, [logoutFunction, navigate, setUser]);

  useEffect(() => {
    if (user === null) {
      logout();
    }
  }, [user, navigate, logout]);

  return (
    <div className="p-16 h-screen flex flex-col justify-center items-center font-on">
      <NoResult description={t('global.notFoundPage')} />
      <Link to={ROUTES_PATH.dashboard}>
        <BaseButton
          className="mt-6"
          label={t('global.goToHome')}
          type="default"
          size="lg"
        />
      </Link>
    </div>
  );
}

export default NotFoundPage;
