import React from 'react';

import x from '@iconify-icons/ph/x';
import { IconButton } from '@redesignUi/atoms/BaseButton';

type DrawerProfileProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DrawerProfile({ isOpen, setIsOpen }: DrawerProfileProps) {
  return (
    <div
      className={`fixed top-0 left-full z-30 w-[17.12rem] lg:w-[19.18rem] h-[62.43rem] bg-white shadow-md flex justify-between xl:hidden transition-transform duration-500 delay-500 ${
        isOpen && '-translate-x-full '
      }`}
    >
      <div className="flex w-[14.37rem] h-[25rem] mx-auto pt-5">
        <div className="flex justify-between items-center  w-full h-[3.75rem] border-b border-gray-300">
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
