import { UserContext } from '@context/user/userContext';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import {
  API_USERS_LOGOUT,
  API_USERS_LOGOUT_ONLINE_ASSISTANCE,
} from '@src/services/users';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { UserParams } from '@src/services/users/types';

type IUserUpdate = Partial<UserParams>;

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);
  const data = { refresh_token: token || '' };

  const logout = async () => {
    setLoading(true);
    await API_USERS_LOGOUT(data)
      .then(() => {
        toast.success(t('global.successfullyLoggedOut'));
      })
      .catch((err) => {
        toast.error(err.message || t('global.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
        setUser(null);
        http.removeAuthHeader();
        navigate(ROUTES_PATH.login);
      });
  };
  const logoutAssistance = async () => {
    setLoading(true);
    await API_USERS_LOGOUT_ONLINE_ASSISTANCE()
      .then(() => {
        toast.success(t('global.successfullyLoggedOut'));
      })
      .catch((err) => {
        toast.error(err.message || t('global.somethingWentWrong'));
      })
      .finally(() => {
        setLoading(false);
        const updatedUser: IUserUpdate = { ...user, online_assistance: null };
        setUser(updatedUser as UserParams);
      });
  };

  return { logout, loading, logoutAssistance };
};
