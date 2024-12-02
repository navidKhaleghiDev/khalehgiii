import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useLanguage } from '@context/settings/languageContext';
import { ToolTip } from '@redesignUi/atoms/Tooltip';

import { NavigationParams } from '../types';
import { navigationSideBar } from '../navigation';
import { MenuItemAccordion } from '../MenuItemAccordion';
import { MenuDropdown } from '../MenuDropdown/MenuDropdown';
import { MenuItem } from '../MenuItem';

interface MenuContentProps {
  collapse: boolean;
}
export function MenuContent({ collapse }: MenuContentProps): JSX.Element {
  const [isDropdownVisible, setDropdownVisible] =
    useState<NavigationParams | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { pathname } = useLocation();
  const { dir } = useLanguage();

  return (
    <div
      className={`
      ${
        collapse ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out dark:bg-gray-600`}
    >
      <div className="flex flex-col items-center w-full mt-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className={`${collapse ? 'w-full px-3' : 'absolute z-40'}`}>
          {navigationSideBar.map((item: NavigationParams, index) => {
            const shouldAddHR = [2].includes(index);

            if (!item.items) {
              return !collapse ? (
                <div>
                  <ToolTip
                    position={dir === 'rtl' ? 'left' : 'right'}
                    key={item.id}
                    tooltip={`${item.label}`}
                  >
                    <MenuItem
                      item={item}
                      pathname={pathname}
                      collapsed={!collapse}
                    />
                  </ToolTip>
                </div>
              ) : (
                <div className="w-full" key={item.id}>
                  <MenuItem
                    item={item}
                    pathname={pathname}
                    collapsed={!collapse}
                  />
                </div>
              );
            }

            return collapse ? (
              <div className="w-full" key={item.id}>
                <MenuItemAccordion
                  open={openAccordion}
                  setOpen={setOpenAccordion}
                  index={index}
                  item={item}
                  pathname={pathname}
                  collapsed={!collapse}
                  icon={item.icon}
                />
                {shouldAddHR && (
                  <hr className="w-full bg-white border border-gray-300 rounded my-5" />
                )}
              </div>
            ) : (
              <div className="flex justify-center flex-col items-center">
                <div
                  key={item.id}
                  onPointerUp={() => {
                    if (isDropdownVisible?.id === item.id) {
                      setDropdownVisible(null);
                    } else {
                      setDropdownVisible(item);
                    }
                  }}
                  className={`flex justify-center flex-col items-center cursor-pointer ${
                    collapse ? 'w-full' : null
                  }`}
                >
                  <MenuItem
                    item={item}
                    pathname={pathname}
                    collapsed={!collapse}
                  />

                  {isDropdownVisible?.id === item.id && !collapse && (
                    <MenuDropdown
                      items={item.items}
                      mouseHover={() => setDropdownVisible(null)}
                    />
                  )}
                </div>
                {shouldAddHR && (
                  <hr className="w-10 bg-white border border-gray-300 rounded my-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
