import { UserContext } from '@context/user/userContext';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';

import {
  API_USERS_LOGOUT,
  API_USERS_LOGOUT_ONLINE_ASSISTANCE,
} from '@src/services/users';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const isAdminGroup =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of.length >= 1;

  const logoutFunction = async () => {
    const token = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

    const data = { refresh_token: token || '' };

    if (isAdminGroup) {
      await API_USERS_LOGOUT_ONLINE_ASSISTANCE();
    } else {
      await API_USERS_LOGOUT(data);
    }
  };

  const logout = () => {
    logoutFunction()
      .then(() => {
        setUser(null);
        http.removeAuthHeader();
        navigate(ROUTES_PATH.login);
      })
      .catch((err) => toast.error(err));
  };

  return logout;
};
