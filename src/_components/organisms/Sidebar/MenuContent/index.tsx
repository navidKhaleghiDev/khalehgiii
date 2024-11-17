import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useLanguage } from '@context/settings/languageContext';
import { ToolTip } from '@redesignUi/atoms/Tooltip';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { NavigationProps } from '../types';
import { navigationSideBar } from '../navigation';
import { MenuItemAccordion } from '../MenuItemAccordion';
import { MenuDropdown } from '../MenuDropdown/MenuDropdown';
import { MenuItem } from '../MenuItem';

export function MenuContent({ collaps }: any): JSX.Element {
  const [isDropdownVisible, setDropdownVisible] =
    useState<NavigationProps | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const windowDimensions = useWindowDimensions();

  return (
    <div
      className={`relative z-30 flex flex-col justify-between items-end h-full ${
        windowDimensions.height <= 760 || windowDimensions.width <= 1280
          ? 'hidden'
          : ''
      }
      ${
        collaps ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out bg-white dark:bg-gray-600 rounded-lg`}
    >
      <div className="flex flex-col items-center w-full mt-1 px-3 overflow-y-auto overflow-x-hidden">
        <div
          className={`${
            collaps ? 'w-full' : ''
          } overflow-y-auto overflow-x-hidden`}
        >
          {navigationSideBar.map((item: NavigationProps, index) => {
            const shouldAddHR = [2].includes(index);

            if (!item.items) {
              return !collaps ? (
                <ToolTip
                  position={lang === 'fa' ? 'left' : 'right'}
                  key={item.id}
                  tooltip={`${item.label}`}
                >
                  <MenuItem
                    item={item}
                    pathname={pathname}
                    collapsed={!collaps}
                  />
                </ToolTip>
              ) : (
                <div className="w-full" key={item.id}>
                  <MenuItem
                    item={item}
                    pathname={pathname}
                    collapsed={!collaps}
                  />
                </div>
              );
            }

            return collaps ? (
              <div className="w-full" key={item.id}>
                <MenuItemAccordion
                  open={openAccordion}
                  setOpen={setOpenAccordion}
                  index={index}
                  item={item}
                  pathname={pathname}
                  collapsed={!collaps}
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
                    collaps ? 'w-full' : null
                  }`}
                >
                  <MenuItem
                    item={item}
                    pathname={pathname}
                    collapsed={!collaps}
                  />

                  {isDropdownVisible?.id === item.id && !collaps && (
                    <MenuDropdown
                      items={item.items}
                      mouseHover={() => setDropdownVisible(null)}
                    />
                  )}
                </div>
                {shouldAddHR && (
                  <hr className="w-10 bg-white border border-gray-300 rounded my-5" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
