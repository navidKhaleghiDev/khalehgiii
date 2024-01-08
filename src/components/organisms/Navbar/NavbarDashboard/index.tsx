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

import { AccessTime } from './AccessTime';
import { useUserContext } from '@context/user/userContext';
import { http } from '@src/services/http';
import { Modal } from '@ui/molecules/Modal';
import { ChangePasswordForm } from './ChangePasswordForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';
import { languageOptions } from '@src/constants/optios';

export function NavbarDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { user, setUser } = useUserContext();
  const { changeLanguage, lang } = useLanguage();
  const timeStyle = lang === 'fa' ? 'mr-16' : 'ml-16';

  const logout = () => {
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  };

  return (
    <nav className="w-full bg-black px-8 2xl:container h-12">
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
              name={'language'}
              size="sm"
              onSelect={(l: string) => changeLanguage(l)}
              options={languageOptions}
              id={''}
              placeHolder={''}
            />
          </ToolTip>
          <Avatar icon={userIcon} intent="primary" size="sm" className="ml-4" />
          <div className={lang === 'en' ? 'ml-2' : 'none'}>
            <Typography weight="bold" color="white" size="caption">
              {user?.email}
            </Typography>
            <Typography color="white" size="caption">
              {user?.is_superuser ? t('header.admin') : t('header.user')}
            </Typography>
          </div>

          {user ? (
            user?.is_superuser ? null : (
              <div className={timeStyle}>
                <AccessTime />
              </div>
            )
          ) : null}
        </div>

        <div className="flex">
          {/* <NavigationButtons /> */}
          <Link to={ROUTES_PATH.dashboard}>
            <img src="/logo.png" alt="logo" className="h-8" />
          </Link>
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
