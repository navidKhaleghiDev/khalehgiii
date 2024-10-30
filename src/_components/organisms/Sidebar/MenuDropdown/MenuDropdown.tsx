import { useNavigate } from 'react-router-dom';

import { BaseIcon, Typography } from '@redesignUi/atoms';

import { NavigationProps } from '../types';

interface MenuDropdownProps {
  items: NavigationProps[];
  mouseHover: () => void;
}

/**
 * @component
 * @param {MenuDropdownProps}  props The props for MenuDropdown component
 * @param {NavigationProps}  props.item The navigation item data, including path, label, and icon
 * @param {NavigationProps}  props.mouseHover The props for handle mouseHover
 * @returns {JSX.Element} The render MenuDropdown component
 */
export function MenuDropdown({
  items,
  mouseHover,
}: MenuDropdownProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      className="absolute right-full ltr:left-full w-40 h-20 bg-white dark:bg-gray-600 shadow-md rounded-lg mt-10 overflow-hidden"
      onPointerLeave={mouseHover}
    >
      {items.map((item) => (
        <div key={item.id} className="w-full flex">
          <button
            type="button"
            key={item.id}
            tabIndex={0}
            className="w-full h-7 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md flex items-center"
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
  );
}
