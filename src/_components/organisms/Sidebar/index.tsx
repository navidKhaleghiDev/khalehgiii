import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { t } from 'i18next';

import { useLanguage } from '@context/settings/languageContext';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { http } from '@src/services/http';
import { useUserContext } from '@context/user/userContext';
import ToolTip from '@redesignUi/atoms/Tooltip';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Avatar, Typography } from '@redesignUi/atoms';
import PhCaretDoubleRight from '@iconify-icons/ph/caret-double-right';
import PhCaretDoubleLeft from '@iconify-icons/ph/caret-double-left';
import User from '@iconify-icons/ph/user';
import PhSignOut from '@iconify-icons/ph/sign-out';
import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';
import { BaseSwitchWithIcon } from '@redesignUi/atoms/BaseSwitchWithIcon';
import { useTheme } from '@context/settings/themeContext';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { MenuDropdown } from './MenuDropdown/MenuDropdown';
import { MenuItem } from './MenuItem';
import { navigationSideBar } from './navigation';
import { NavigationProps } from './types';
import { MenuItemAccordion } from './MenuItemAccordion';

export function SideBar(): JSX.Element {
  const windowDimensions = useWindowDimensions();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isDropdownVisible, setDropdownVisible] =
    useState<NavigationProps | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { pathname } = useLocation();
  const { user, setUser } = useUserContext();
  const { lang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const handleLogout = () => {
    http.removeAuthHeader();
    setUser(null);
    navigate(ROUTES_PATH.login);
  };
  const enLanguageIcon = lang === 'en' ? PhCaretDoubleLeft : PhCaretDoubleRight;
  const faLanguageIcon = lang === 'fa' ? PhCaretDoubleLeft : PhCaretDoubleRight;

  return (
    <div
      className={`relative z-30 flex flex-col justify-between items-end h-full ${
        windowDimensions.height <= 760 || windowDimensions.width <= 1280
          ? 'hidden'
          : ''
      }
      ${
        toggleSidebar ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out bg-white dark:bg-gray-600 rounded-lg`}
    >
      <div className="flex flex-col items-center w-full mt-5 px-3">
        <div
          className={`flex flex-col ${
            toggleSidebar ? 'items-start' : 'items-center'
          } w-full`}
        >
          <BaseSwitchWithIcon
            id="1"
            name="dark"
            checked={isDark}
            onChange={toggleTheme}
            rightIcon={sunRisingTwotoneLoop}
            leftIcon={moonTwotoneAltLoop}
          />
          <hr className="w-full bg-white border border-gray-300 rounded my-5" />
        </div>

        {navigationSideBar.map((item: NavigationProps, index) => {
          const shouldAddHR = [2].includes(index);

          if (!item.items) {
            return !toggleSidebar ? (
              <ToolTip
                position={lang === 'fa' ? 'left' : 'right'}
                key={item.id}
                tooltip={`${item.label}`}
              >
                <MenuItem
                  item={item}
                  pathname={pathname}
                  collapsed={!toggleSidebar}
                />
              </ToolTip>
            ) : (
              <div className="w-full" key={item.id}>
                <MenuItem
                  item={item}
                  pathname={pathname}
                  collapsed={!toggleSidebar}
                />
              </div>
            );
          }

          return toggleSidebar ? (
            <div className="w-full" key={item.id}>
              <MenuItemAccordion
                open={openAccordion}
                setOpen={setOpenAccordion}
                index={index}
                item={item}
                pathname={pathname}
                collapsed={!toggleSidebar}
                icon={item.icon}
              />
              {shouldAddHR && (
                <hr className="w-full bg-white border border-gray-300 rounded my-5" />
              )}
            </div>
          ) : (
            <div
              key={item.id}
              onPointerUp={() => {
                if (isDropdownVisible?.id === item.id) {
                  setDropdownVisible(null);
                } else {
                  setDropdownVisible(item);
                }
              }}
              className={`flex justify-center flex-col items-center cursor-pointer ${
                toggleSidebar ? 'w-full' : null
              }`}
            >
              <MenuItem
                item={item}
                pathname={pathname}
                collapsed={!toggleSidebar}
              />
              {shouldAddHR && (
                <hr className="w-10 bg-white border border-gray-300 rounded my-5" />
              )}
              {isDropdownVisible?.id === item.id && !toggleSidebar && (
                <MenuDropdown
                  items={item.items}
                  mouseHover={() => setDropdownVisible(null)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`flex flex-col ${
          toggleSidebar ? 'items-start' : 'items-center'
        } w-full mb-5 px-3`}
      >
        <div className="flex items-center">
          {!toggleSidebar ? (
            <ToolTip
              tooltip={t('global.userName')}
              position={lang === 'fa' ? 'left' : 'right'}
            >
              <Avatar icon={User} size="md" className="my-2" />
            </ToolTip>
          ) : (
            <Avatar icon={User} size="md" className="my-2" />
          )}
          {toggleSidebar ? (
            <div className="mx-2">
              <span>
                <Typography variant="body5" color="neutralDark">
                  {`${user?.first_name} ${user?.last_name}`}
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
          {!toggleSidebar ? (
            <ToolTip
              tooltip={t('onlineAssistance.exitFromUserProfile')}
              position={lang === 'fa' ? 'left' : 'right'}
            >
              <IconButton
                icon={PhSignOut}
                color="neutralNoBg"
                size="md"
                onClick={handleLogout}
                className="text-red-500 hover:text-red-500 dark:text-red-300 dark:hover:text-red-300 text-lg "
              />
            </ToolTip>
          ) : (
            <IconButton
              icon={PhSignOut}
              color="neutralNoBg"
              size="md"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-500 dark:text-red-300 dark:hover:text-red-300 text-lg"
            />
          )}
          {toggleSidebar ? (
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

        <hr className="w-full bg-white border border-gray-300 rounded my-5" />
        <IconButton
          size="md"
          color="neutral"
          icon={toggleSidebar ? enLanguageIcon : faLanguageIcon}
          onClick={toggleSideBar}
        />
      </div>
    </div>
  );
}
