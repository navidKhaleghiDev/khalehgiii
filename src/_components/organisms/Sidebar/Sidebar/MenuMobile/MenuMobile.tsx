import { useLocation } from 'react-router-dom';
import { MenuMobileItem } from './component/MenuItem';
import { NavigationProps } from '../types';
import { navigationSideBar } from '../navigation';

/**
 * This component renders the sidebar navigation menu, including menu items, accordions for mean items that has children ,
 * and a logout button. It also shows the status of services.
 *
 * @component
 * @returns {JSX.Element} The rendered sidebar component.
 */

export function MenuMobile(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div className="sm:hidden">
      <div className="fixed bottom-4 flex justify-around items-center sm:flex-col  w-full h-12 px-20 bg-neutral-100 rounded-full">
        {navigationSideBar.map((item: NavigationProps) => {
          return (
            <MenuMobileItem
              key={item.id}
              item={item}
              pathname={pathname}
              collapsed={false}
            />
          );
        })}
      </div>
    </div>
  );
}
