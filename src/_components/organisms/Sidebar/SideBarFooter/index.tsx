import { useState } from 'react';
import { t } from 'i18next';

import { useLanguage } from '@context/settings/languageContext';
import { useUserContext } from '@context/user/userContext';
import { ToolTip } from '@redesignUi/atoms/Tooltip';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Avatar, Typography } from '@redesignUi/atoms';
import { useTheme } from '@context/settings/themeContext';
import PhCaretDoubleRight from '@iconify-icons/ph/caret-double-right';
import PhCaretDoubleLeft from '@iconify-icons/ph/caret-double-left';
import User from '@iconify-icons/ph/user';
import PhSignOut from '@iconify-icons/ph/sign-out';
import { useLogout } from '@src/helper/hooks/useLogout';

import { NavigationProps, SideBarFooterProps } from '../types';

export function SideBarFooter({
  toggle,
  toggleSidebarHandler,
}: SideBarFooterProps): JSX.Element {
  useState<NavigationProps | null>(null);
  const { logout } = useLogout();
  const { user } = useUserContext();
  const { lang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const isUser = user?.first_name && user?.last_name;
  const logOutStyles =
    'text-red-500 hover:text-red-500 dark:text-red-300 dark:hover:text-red-300 text-lg';

  const capitalizeFirstLetter = (val: string | undefined) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const handleToggle = () => (isDark ? toggleTheme() : null);

  const handleLogout = () => {
    logout();
    handleToggle();
  };
  const enLanguageIcon = lang === 'en' ? PhCaretDoubleLeft : PhCaretDoubleRight;
  const faLanguageIcon = lang === 'fa' ? PhCaretDoubleLeft : PhCaretDoubleRight;

  return (
    <div
      className={`flex flex-col ${
        toggle ? 'items-start' : 'items-center'
      } w-full mb-5 px-3`}
    >
      <div className="flex items-center">
        {!toggle ? (
          <ToolTip
            tooltip={t('global.userName')}
            position={lang === 'fa' ? 'left' : 'right'}
          >
            <Avatar icon={User} size="md" className="my-2" />
          </ToolTip>
        ) : (
          <Avatar icon={User} size="md" className="my-2" />
        )}
        {toggle ? (
          <div className="mx-2">
            <span>
              <Typography variant="body5" color="neutralDark">
                {isUser
                  ? user?.first_name && user.last_name
                  : capitalizeFirstLetter(user?.username)}
              </Typography>
            </span>
            <span>
              <Typography variant="body6" color="neutralMiddle">
                {user?.email}
              </Typography>
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        {!toggle ? (
          <ToolTip
            tooltip={t('onlineAssistance.exitFromUserProfile')}
            position={lang === 'fa' ? 'left' : 'right'}
          >
            <IconButton
              icon={PhSignOut}
              color="neutralNoBg"
              size="md"
              onClick={handleLogout}
              className={logOutStyles}
            />
          </ToolTip>
        ) : (
          <IconButton
            icon={PhSignOut}
            color="neutralNoBg"
            size="md"
            onClick={handleLogout}
            className={logOutStyles}
          />
        )}
        {toggle ? (
          <span
            className="text-sm whitespace-nowrap text-red-500 dark:text-red-300"
            role="button"
            onClick={handleLogout}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleLogout();
              }
            }}
          >
            {t('onlineAssistance.exitFromUserProfile')}
          </span>
        ) : null}
      </div>

      <hr className="w-full bg-white border border-gray-300 rounded my-3" />
      <IconButton
        size="md"
        color="neutral"
        icon={toggle ? enLanguageIcon : faLanguageIcon}
        onClick={toggleSidebarHandler}
      />
    </div>
  );
}
