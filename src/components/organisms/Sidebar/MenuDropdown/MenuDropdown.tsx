import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseIcon, Typography } from '@ui/atoms';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { NavigationParams } from '../types';

interface MenuDropdownProps {
  items: NavigationParams[];
  mouseHover?: () => void;
}

/**

@component
@param {MenuDropdownProps} props The props for MenuDropdown component
@param {NavigationProps} props.item The navigation item data, including path, label, and icon
@param {NavigationProps} props.mouseHover The props for handle mouseHover
*/
export function MenuDropdown({ items, mouseHover }: MenuDropdownProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef(null);
  useClickOutside({
    ref: dropdownRef,
    setValue: setIsOpen,
    value: isOpen,
  });
  return isOpen ? (
    <div
      ref={dropdownRef}
      className="absolute right-full ltr:left-full w-40 h-fit bg-white dark:bg-gray-600 shadow-md rounded-lg mt-10 overflow-hidden cursor-pointer"
      onPointerDown={mouseHover}
    >
      {items.map((item) => (
        <div key={item.id} className="w-full flex">
          <button
            type="button"
            key={item.id}
            tabIndex={0}
            className="w-full h-7 hover:bg-gray-100 dark:hover:bg-gray-500 rounded flex items-center"
            onPointerDown={() => navigate(item.path)}
          >
            {item.icon && <BaseIcon icon={item.icon} />}
            <Typography
              className="mr-3 ltr:ml-3 whitespace-nowrap"
              variant="body6"
              color="neutralMiddle"
            >
              {item.label}
            </Typography>
          </button>
        </div>
      ))}
    </div>
  ) : null;
}
