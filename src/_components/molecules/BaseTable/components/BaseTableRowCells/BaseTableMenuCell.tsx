/**
 * Imports React components, hooks, and utilities for the BaseTableMenuCell component.
 *
 * @module BaseTableMenuCell
 */

import { BaseButton, IconButton } from '@redesignUi/atoms/BaseButton';
import ToolTip from '@redesignUi/atoms/Tooltip';
import { useCallback, useState, useRef } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { useLanguage } from '@context/settings/languageContext';
import { useTranslation } from 'react-i18next';
import moreIcon from '@iconify-icons/ph/dots-three-vertical-bold';
import {
  BaseTableMenuCellProps,
  IdItem,
  MenuHeader,
  MenuType,
} from '../../types';
import { baseTableMenuCell } from '../../styles';

/**
 * Defines menu properties.
 *
 * @typedef {Object} Menu
 * @property {MenuHeader} menu - Contains menu header details.
 */
type Menu = {
  menu: MenuHeader;
};

/**
 * Renders a table cell with a dropdown menu for additional actions.
 *
 * @function BaseTableMenuCell
 * @template T
 * @param {BaseTableMenuCellProps<T>} props - Properties for the BaseTableMenuCell component.
 * @returns {JSX.Element|null} The rendered BaseTableMenuCell component or null.
 */
export function BaseTableMenuCell<T extends IdItem>(
  props: BaseTableMenuCellProps<T>
) {
  const { row, header, onClick } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { isFarsi } = useLanguage();
  const { t } = useTranslation();

  useClickOutside({ ref, setValue: setOpen, value: open });

  const menuStyle = isFarsi ? 'left-0' : 'right-0';

  /**
   * Renders an IconButton for the menu component.
   *
   * @function MenuComponent
   * @param {Menu} param0 - Object containing menu data.
   * @returns {JSX.Element} The rendered IconButton.
   */
  const MenuComponent = useCallback(
    ({ menu }: Menu) => (
      <IconButton
        key={row.id}
        icon={menu.icon || moreIcon}
        color="neutralNoBg"
        onClick={() => setOpen((prev) => !prev)}
      />
    ),
    [row.id]
  );

  return (
    header.type === 'menu' && (
      <div ref={ref} className="flex">
        {header.tooltip ? (
          <ToolTip tooltip={t(header.tooltip)}>
            <MenuComponent menu={header} />
          </ToolTip>
        ) : (
          <MenuComponent menu={header} />
        )}
        {open && (
          <div
            className={`z-20 absolute top-7 ${menuStyle} bg-white dark:bg-gray-600 border border-gray-200 rounded-lg shadow w-[200px] flex-col`}
          >
            {header.menu.map((menu: MenuType) => (
              <div className="mb-1" key={menu.action}>
                <div className="rounded-lg h-auto flex w-full">
                  <BaseButton
                    className={baseTableMenuCell({
                      color: menu.color,
                    })}
                    type="neutral"
                    startIcon={menu.icon}
                    label={menu.title}
                    onClick={
                      onClick ? () => onClick(menu.action, row) : undefined
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
