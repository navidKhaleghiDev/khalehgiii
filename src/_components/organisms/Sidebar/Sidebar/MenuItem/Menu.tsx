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
  const hasSubMenu = item.items && item.items.length > 0;
  const isInSubMenu =
    hasSubMenu && item.items?.some((subItem) => pathname === subItem.path);

  return (
    <div>
      {!collapsed || !hasSubMenu ? (
        <Link
          className={menuItemStyles({
            active: isActive || isInSubMenu,
            isChildren,
            isActiveChildren: isActive && isChildren,
          })}
          to={item.path}
          target={item.isNewTab ? '_blank' : '_self'}
        >
          <div className={`flex items-center ${!collapsed && 'fixed'}`}>
            {item?.icon && (
              <BaseIcon
                icon={item.icon}
                className="w-6 h-6 text-gray-500 dark:text-gray-300"
              />
            )}
            {!collapsed && (
              <Typography
                className=" pt-1 px-2 hidden sm:block "
                variant="body5"
              >
                {item.label}
              </Typography>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={menuItemStyles({
            active: isActive || isInSubMenu,
            isChildren,
            isActiveChildren: isActive && isChildren,
          })}
        >
          <div className={`flex items-center  ${!collapsed && 'fixed'}`}>
            {item?.icon && (
              <BaseIcon
                icon={item.icon}
                className="w-6 h-6"
                text-gray-500
                dark:text-gray-300
              />
            )}
            {!collapsed && (
              <Typography className="hidden sm:block " variant="body5">
                {item.label}
              </Typography>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
