import { Link } from 'react-router-dom';

import { BaseIcon, Typography } from '@redesignUi/atoms';

import { menuItemStyles } from '../MenuItem/styles';
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
  return (
    <div
      className="absolute right-full ltr:left-full z-50 w-40 bg-white dark:bg-gray-600 shadow-md rounded-lg mt-16 mx-1 overflow-hidden"
      onMouseLeave={mouseHover}
    >
      {items.map((item) => (
        <div key={item.id}>
          <Link
            key={item.id}
            className={`${menuItemStyles(
              {}
            )} h-6 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md`}
            to={item.path}
          >
            {item.icon && <BaseIcon icon={item.icon} />}
            <Typography className="mr-3" variant="body5" color="neutralMiddle">
              {item.label}
            </Typography>
          </Link>
        </div>
      ))}
    </div>
  );
}
