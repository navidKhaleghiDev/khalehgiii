import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useLanguage } from '@context/settings/languageContext';
import { ToolTip } from '@redesignUi/atoms/Tooltip';

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

  return (
    <div
      className={`
      ${
        collaps ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out dark:bg-gray-600`}
    >
      <div className="flex flex-col items-center w-full mt-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className={`${collaps ? 'w-full' : 'absolute z-40'} px-3`}>
          {navigationSideBar.map((item: NavigationProps, index) => {
            const shouldAddHR = [2].includes(index);

            if (!item.items) {
              return !collaps ? (
                <div>
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
                </div>
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
