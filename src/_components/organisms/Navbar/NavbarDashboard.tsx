import { Link } from 'react-router-dom';

import PhGlobe from '@iconify-icons/ph/globe';
import { LogoSvg } from '@redesignUi/atoms/Svgs/LogoSvg';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { languageOptions } from '@src/constants/optios';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';

import { ListMenu } from './ListMenu/ListMenu';
import { NotificationMenu } from './NotificationMenu';

/**
 * @component
 * @returns{JSX.Element}
 */

export function NavbarDashboard(): JSX.Element {
  const { changeLanguage } = useLanguage();

  return (
    <div>
      <div className="flex h-16 items-center justify-between px-5 2xl:container 2xl:mx-auto relative bg-white dark:bg-gray-700">
        <div className="flex justify-between items-center pt-[0.93rem] pb-[0.56rem] gap-2.5 ">
          <div className="block xl:hidden">
            <ListMenu />
          </div>
          <div className="hidden md:block">
            <NotificationMenu />
          </div>
          <BaseDropdownIcon
            icon={PhGlobe}
            size="sm"
            onSelect={(v: string) => changeLanguage(v)}
            options={languageOptions}
          />
        </div>
        <Link to={ROUTES_PATH.home}>
          <LogoSvg className="left-[0.081px] top-[1.75px] w-14 h-[1.12rem] md:w-[5.43rem] md:h-[1.43rem] xl:w-[7.43rem] xl:h-8" />
        </Link>
      </div>
    </div>
  );
}