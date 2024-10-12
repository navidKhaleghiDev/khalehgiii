import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userIcon from '@iconify-icons/ph/user';

import { Avatar, BaseButton, Card } from '@ui/atoms';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useUserContext } from '@context/user/userContext';
import { useLogout } from '@src/helper/hooks/useLogout';

export function LoginOnlineAssistance() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const logout = useLogout();

  const isAdminGroup =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of.length >= 1;

  const isInDaas = user?.online_assistance?.admin;

  useEffect(() => {
    if (!isAdminGroup) {
      navigate(ROUTES_PATH.home);
    } else if (isInDaas && user?.online_assistance) {
      navigate(user?.online_assistance?.user_http_address);
    } else {
      navigate(ROUTES_PATH.loginAssistance);
    }
  }, [isAdminGroup, isInDaas, navigate, user?.online_assistance]);

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
          <BaseButton
            label={t('onlineAssistance.internet')}
            onClick={() => navigate(ROUTES_PATH.home)}
          />
          <BaseButton
            onClick={() => navigate(ROUTES_PATH.assistanceDashboard)}
            label={t('onlineAssistance.remote')}
          />
          <BaseButton
            onClick={logout}
            type="redBorder"
            label={t('onlineAssistance.exitFromUserProfile')}
          />
        </div>
      </Card>
    </div>
  );
}
