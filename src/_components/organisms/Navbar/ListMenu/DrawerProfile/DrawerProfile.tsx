import React from 'react';

import { useTheme } from '@context/settings/themeContext';
import x from '@iconify-icons/ph/x';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { BaseSwitchWithIcon } from '@redesignUi/atoms/BaseSwitchWithIcon';

import sunRisingTwotoneLoop from '@iconify-icons/line-md/sun-rising-twotone-loop';
import moonTwotoneAltLoop from '@iconify-icons/line-md/moon-twotone-alt-loop';

type DrawerProfileProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DrawerProfile({ isOpen, setIsOpen }: DrawerProfileProps) {
  const { toggleTheme } = useTheme();

  return (
    <div
      className={`fixed top-0 left-full z-30 w-[17.12rem] lg:w-[19.18rem] h-[62.43rem] bg-white shadow-md flex justify-between xl:hidden transition-transform duration-500 delay-500 ${
        isOpen && '-translate-x-full '
      }`}
    >
      <div className="flex w-[14.37rem] h-[25rem] mx-auto pt-5">
        <div className="flex justify-between items-center  w-full h-[3.75rem] border-b border-gray-300">
          <BaseSwitchWithIcon
            id="1"
            name="dark"
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
      </div>
    </div>
  );
}
