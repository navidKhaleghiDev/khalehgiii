import { Link } from 'react-router-dom';

import { BaseIcon, Typography } from '@redesignUi/atoms';

import { menuItemStyles } from './styles';
import { MenuItemProps } from './types';

/**
 * This component renders a single menu item with an optional icon and label.
 * The item can be styled as active, a child item, and can optionally be collapsed.
 *
 * @param {MenuItemProps} props - The props for the MenuItem component.
 * @param {NavigationProps} props.item - The navigation item data, including path, label, and icon.
 * @param {string} props.pathname - The current path for determining the active item.
 * @param {boolean} [props.isChildren] - Indicates if this item is a child item.
 * @param {boolean} [props.collapsed=false] - Indicates if the menu item is collapsed.
 *
 * @returns {JSX.Element} The rendered menu item component.
 */

export function MenuItem(props: MenuItemProps): JSX.Element {
  const { item, pathname, isChildren, collapsed } = props;
  const isActive = pathname === item.path;
  const hasSubMenu = Array.isArray(item.items) && item.items.length > 0;
  const isInSubMenu =
    hasSubMenu && item.items?.some((subItem) => pathname === subItem.path);

  return (
    <div>
      <Link
        className={menuItemStyles({
          active: isActive || isInSubMenu,
          isChildren,
        })}
        to={item.path}
        target={item.isNewTab ? '_blank' : '_self'}
      >
        <div className="flex items-center">
          {item?.icon ? (
            <BaseIcon
              icon={item.icon}
              className="w-6 h-6 text-gray-500 dark:text-gray-300"
            />
          ) : null}
          {!collapsed ? (
            <Typography className="pt-1 px-2" variant="body5">
              {item.label}
            </Typography>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
