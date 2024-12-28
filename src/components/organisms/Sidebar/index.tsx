import { useState } from 'react';

import { BaseSwitchWithIcon } from '@ui/atoms/BaseSwitchWithIcon';
import { useTheme } from '@context/settings/themeContext';
import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';

import { MenuContent } from './MenuContent';
import { SideBarFooter } from './SideBarFooter';

export function SideBar(): JSX.Element {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleSideBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div className="relative z-30 h-full bg-white dark:bg-gray-600 rounded-2xl hidden xl:flex xl:flex-col xl:justify-between xl:items-end ">
      <div className="flex flex-col items-center w-full  overflow-y-auto overflow-x-hidden no-scrollbar">
        <div
          className={`flex flex-col pt-5 sticky z-50 top-0 px-3 bg-white dark:bg-gray-600 ${
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
          <hr className="w-full bg-white border border-gray-300 rounded mt-5" />
        </div>
        <MenuContent collapse={toggleSidebar} />
      </div>

      <SideBarFooter
        toggle={toggleSidebar}
        toggleSidebarHandler={toggleSideBar}
      />
    </div>
  );
}
