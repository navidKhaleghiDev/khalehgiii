import { useState } from 'react';

import { BaseSwitchWithIcon } from '@redesignUi/atoms/BaseSwitchWithIcon';
import { useTheme } from '@context/settings/themeContext';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';

import { MenuContent } from './MenuContent';
import { SideBarFooter } from './SideBarFooter';

export function SideBar(): JSX.Element {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const windowDimensions = useWindowDimensions();

  const toggleSideBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

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
      <div className="flex flex-col items-center w-full mt-5 px-3 overflow-y-auton">
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
          <hr className="w-full bg-white border border-gray-300 rounded mt-5 mb-2" />
        </div>
        <MenuContent collaps={toggleSidebar} />
      </div>

      <SideBarFooter
        toggle={toggleSidebar}
        toggleSidebarHandler={toggleSideBar}
      />
    </div>
  );
}
