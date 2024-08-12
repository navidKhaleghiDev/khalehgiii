/* eslint-disable no-nested-ternary */
import { Avatar } from '@ui/atoms/Avatar';
import { Typography } from '@ui/atoms/Typography/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { IconButton } from '@ui/atoms/BaseButton';
import ToolTip from '@ui/atoms/Tooltip';
import userIcon from '@iconify-icons/ph/user';
import languageIcon from '@iconify-icons/ph/globe-thin';
import signOutBoldIcon from '@iconify-icons/ph/sign-out-bold';
import gearIcon from '@iconify-icons/ph/gear';

import { useUserContext } from '@context/user/userContext';
import { STORAGE_KEY_REFRESH_TOKEN, http } from '@src/services/http';
import { Modal } from '@ui/molecules/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import { languageOptions } from '@src/constants/optios';
import {
  API_USERS_LOGOUT,
  API_USERS_LOGOUT_ONLINE_ASSISTANCE,
} from '@src/services/users';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import {
  EPermissionDaas,
  EPermissionMalwareConfig,
} from '@src/types/permissions';
import { HeadOnlineAssistant } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant';

import { ChangePasswordForm } from './ChangePasswordForm';
import { AccessTime } from './AccessTime';
import { HeadDescription } from './HeadDescription';

export function NavbarDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { user, setUser } = useUserContext();
  const userPermissions = useUserPermission();
  const isAdmin =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of?.length >= 1;

  const viewDaasPermission = checkPermission(
    userPermissions,
    EPermissionDaas.VIEW
  );

  const viewMalwareConfigPermission = checkPermission(
    userPermissions,
    EPermissionMalwareConfig.VIEW
  );

  // const { toggleTheme, theme } = useTheme();
  const { changeLanguage, lang } = useLanguage();
  const timeStyle = lang === 'fa' ? 'mr-16' : 'ml-16';

  const refresh = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN);

  async function logoutFunction() {
    const data = {
      refresh_token: refresh || '',
    };

    if (isAdmin) {
      await API_USERS_LOGOUT_ONLINE_ASSISTANCE(data);
    } else await API_USERS_LOGOUT(data);
  }

  const logout = () => {
    logoutFunction();
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  };

  return (
    <nav className="w-full bg-black dark:bg-slate-800 px-8 2xl:container h-12">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <ToolTip tooltip={t('global.exit')} position="bottom">
            <IconButton
              icon={signOutBoldIcon}
              size="xl"
              className="ml-4 rounded-3xl"
              color="red"
              onClick={logout}
            />
          </ToolTip>

          {user?.is_superuser && (
            <ToolTip tooltip={t('global.setting')} position="bottom">
              <IconButton
                icon={gearIcon}
                size="xl"
                className="ml-4 rounded-3xl"
                color="teal"
                onClick={() => setOpenModal(true)}
              />
            </ToolTip>
          )}
          <ToolTip tooltip={t('global.language')} position="right">
            <DropDownWithIcon
              icon={languageIcon}
              size="xs"
              onSelect={(v: string) => changeLanguage(v)}
              options={languageOptions}
            />
          </ToolTip>
          <Avatar icon={userIcon} intent="primary" size="sm" className="ml-4" />
          <div className={lang === 'en' ? 'ml-2' : 'none'}>
            <Typography weight="bold" color="white" variant="caption">
              {user?.email}
            </Typography>
            <Typography color="white" variant="caption">
              {user?.is_superuser ? t('header.admin') : t('header.user')}
            </Typography>
          </div>

          {user && !user.is_superuser ? (
            viewDaasPermission ? (
              <div className={timeStyle}>
                <AccessTime />
              </div>
            ) : null
          ) : viewMalwareConfigPermission || viewDaasPermission ? (
            <div className={timeStyle}>
              <HeadDescription />
            </div>
          ) : null}
        </div>

        <HeadOnlineAssistant />
        <div className="flex">
          <Link to={ROUTES_PATH.dashboard}>
            <img src="/logo.png" alt="logo" className="h-8" />
          </Link>
          {/* <BaseSwitchOnClick
            pureValue={theme === 'light'}
            pureOnChange={() => toggleTheme()}
          /> */}
        </div>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title={t('global.changeNameAndPassword')}
        content={<ChangePasswordForm user={user} logout={logout} />}
        type="success"
      />
    </nav>
  );
}
