import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { t } from 'i18next';

import { useTheme } from '@context/settings/themeContext';
import x from '@iconify-icons/ph/x';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseSwitchWithIcon } from '@redesignUi/atoms/BaseSwitchWithIcon';
import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';

import { Avatar, Typography } from '@redesignUi/atoms';
import PhSignOut from '@iconify-icons/ph/sign-out';
import { useUserContext } from '@context/user/userContext';
import User from '@iconify-icons/ph/user';
import { useLanguage } from '@context/settings/languageContext';
import { useDrawerContext } from '@context/drawer/drawerContext';
import { navigationSideBar } from '@redesignUi/organisms/Sidebar/navigation';
import { NavigationProps } from '@redesignUi/organisms/Sidebar/types';
import { MenuItem } from '@redesignUi/organisms/Sidebar/MenuItem';
import { MenuItemAccordion } from '@redesignUi/organisms/Sidebar/MenuItemAccordion';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { useLogout } from '@src/helper/hooks/useLogout';

export function DrawerProfile() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const dropdownRef = useRef(null);
  const { logout } = useLogout();
  const { isOpen, setIsOpen } = useDrawerContext();
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { lang } = useLanguage();
  useClickOutside({
    ref: dropdownRef,
    setValue: setIsOpen,
    value: isOpen,
  });

  const isUser = user?.first_name && user?.last_name;

  const handleToggle = () => (isDark ? toggleTheme() : null);

  const handleLogout = () => {
    handleToggle();
    logout();
  };

  return (
    <div
      ref={dropdownRef}
      className={`fixed top-0 ${
        lang === 'fa' ? 'right-0' : 'left-0'
      } z-50 w-[17.12rem] lg:w-[19.18rem] h-full bg-white dark:bg-gray-600 shadow-md flex flex-col justify-between transition-transform duration-500`}
    >
      <div className="flex justify-between items-center w-full h-[3.75rem] p-5">
        <BaseSwitchWithIcon
          id="1"
          name="dark"
          checked={isDark}
          onChange={toggleTheme}
          rightIcon={sunRisingTwotoneLoop}
          leftIcon={moonTwotoneAltLoop}
        />
        <IconButton
          icon={x}
          size="md"
          color="neutralNoBg"
          onClick={() => setIsOpen(false)}
        />
      </div>

      <hr className="w-full bg-white border border-gray-300 rounded mb-3" />

      <div className="flex-1 overflow-y-auto px-5 no-scrollbar">
        {navigationSideBar.map((item: NavigationProps, index) => {
          const shouldAddHR = [2].includes(index);
          if (!item.items) {
            return (
              <div className="w-full" key={item.id}>
                <MenuItem item={item} pathname={pathname} collapsed={!isOpen} />
              </div>
            );
          }

          return (
            <div className="w-full" key={item.id}>
              <MenuItemAccordion
                open={openAccordion}
                setOpen={setOpenAccordion}
                index={index}
                item={item}
                pathname={pathname}
                collapsed={!isOpen}
                icon={item.icon}
              />
              {shouldAddHR && (
                <hr className="w-full bg-white border border-gray-300 rounded my-5" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start w-full mb-5 px-5 sticky bottom-0">
        <div className="flex items-center">
          <Avatar icon={User} size="md" className="my-3" />
          <div className="mx-2">
            <span>
              <Typography variant="body5" color="neutralDark">
                {isUser ? user?.first_name && user.last_name : ''}
              </Typography>
            </span>
            <span>
              <Typography variant="body6" color="neutralMiddle">
                {user?.email}
              </Typography>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <IconButton
            icon={PhSignOut}
            size="md"
            onClick={handleLogout}
            color="neutralNoBg"
            className="text-red-500 hover:text-red-500 dark:text-red-300 dark:hover:text-red-300 text-lg"
          />
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
        </div>
      </div>
    </div>
  );
}
