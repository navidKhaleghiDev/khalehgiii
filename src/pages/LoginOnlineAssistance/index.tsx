import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@redesignUi/atoms';
import { BackButton } from '@redesignUi/atoms/BackButton';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useTranslation } from 'react-i18next';
import {
  API_USERS_LOGOUT,
  API_USERS_LOGOUT_ONLINE_ASSISTANCE,
} from '@src/services/users';
import languageIcon from '@iconify-icons/ph/globe-thin';
import Monitor from '@iconify-icons/ph/monitor';
import WifiHigh from '@iconify-icons/ph/wifi-high';

import { useUserContext } from '@context/user/userContext';
import { http, STORAGE_KEY_REFRESH_TOKEN } from '@src/services/http';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { languageOptions } from '@src/constants/optios';
import { useLanguage } from '@context/settings/languageContext';
import { LoginCard } from '@redesignUi/molecules/Cards/LoginCard';

export function LoginOnlineAssistance() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeLanguage, lang } = useLanguage();

  const { user, setUser } = useUserContext();

  const isAdminGroup =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of.length >= 1;

  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  async function logoutFunction() {
    const data = {
      refresh_token: refresh || '',
    };

    if (isAdminGroup) {
      await API_USERS_LOGOUT_ONLINE_ASSISTANCE(data);
    } else await API_USERS_LOGOUT(data);
  }
  const isInDaas = user?.online_assistance?.admin;

  const logout = () => {
    logoutFunction();
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  };

  useEffect(() => {
    if (!isAdminGroup) {
      navigate(ROUTES_PATH.dashboard);
    } else if (isInDaas && user?.online_assistance) {
      navigate(user?.online_assistance?.user_http_address);
    } else {
      navigate(ROUTES_PATH.loginAssistance);
    }
  }, [isAdminGroup, isInDaas, navigate, user?.online_assistance]);

  return (
    <div className="font-kalameh bg-teal-500 flex h-screen ">
      <div className="bg-white w-full lg:w-[52%] flex flex-col items-center lg:rtl:rounded-l-3xl lg:ltr:rounded-r-3xl ">
        <div className="absolute top-[1.87rem] rtl:right-5 ltr:left-5">
          <div className="flex items-center gap-[0.62rem]">
            <BackButton onClick={logout} dir={lang === 'fa' ? 'rtl' : 'ltr'} />
            <BaseDropdownIcon
              icon={languageIcon}
              size="md"
              onSelect={(v: string) => changeLanguage(v)}
              options={languageOptions}
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center h-full gap-12 justify-center">
          <div className="items-center justify-center flex flex-col gap-1 p-5">
            <Typography
              variant="body1"
              className="text-neutral-900 font-semibold leading-7"
            >
              {t('onlineAssistance.loginType')}
            </Typography>
            <Typography className="text-neutral-500 leading-7" variant="body3">
              {t('onlineAssistance.loginTypeChoose')}
            </Typography>
          </div>
          <div className="sm:flex-row flex flex-col py-5 gap-[1.87rem] w-[15.12rem] sm:w-[21.87rem]">
            <LoginCard
              icon={Monitor}
              title={t('onlineAssistance.remote')}
              subject="Online Assistance"
              onClick={() => navigate(ROUTES_PATH.assistanceDashboard)}
            />
            <LoginCard
              icon={WifiHigh}
              subject="Netsep"
              title={t('onlineAssistance.internet')}
              onClick={() => navigate(ROUTES_PATH.dashboard)}
            />
          </div>
        </div>
      </div>
      <div className="h-full lg:w-1/2 flex justify-center items-center">
        <img
          src="images/login/LoginOnlineAssistance.webp"
          alt="LoginOnlineAssistance"
          className="lg:block hidden object-fill"
        />
      </div>
    </div>
  );
}
