import { Avatar, BaseButton, Card } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import userIcon from '@iconify-icons/ph/user';
import { API_USERS_LOGOUT } from '@src/services/users';
import { useUserContext } from '@context/user/userContext';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@src/routes/routesConstants';

export function LoginOnlineAssistant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  async function logoutFunction() {
    const data = {
      refresh_token: refresh || '',
    };
    await API_USERS_LOGOUT(data);
  }
  const logout = () => {
    logoutFunction();
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  };

  return (
    <div className="font-on bg-white dark:bg-slate-900 flex flex-col items-center justify-center min-h-screen ">
      <Card
        color="neutral"
        className="relative p-10 w-[24.375rem] h-[25rem] flex flex-col items-center "
      >
        <div className="absolute top-[-6rem]">
          <Avatar icon={userIcon} intent="primary" size="lmd" />
        </div>
        <div className=" relative w-full flex flex-col gap-7 justify-center h-80 ">
          <BaseButton label={t('onlineAssistant.internet')} />
          <BaseButton
            onClick={() => navigate(ROUTES_PATH.assistanseDashboard)}
            label={t('onlineAssistant.remote')}
          />
          <BaseButton
            onClick={logout}
            type="redBorder"
            label={t('onlineAssistant.exitFromUserProfile')}
          />
        </div>
      </Card>
    </div>
  );
}
