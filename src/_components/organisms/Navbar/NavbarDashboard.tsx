import { Link } from 'react-router-dom';

import { LogoSvg } from '@redesignUi/atoms/Svgs/LogoSvg';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { languageOptions } from '@src/constants/optios';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';
import PhTranslate from '@iconify-icons/ph/translate';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { ListMenu } from './ListMenu';
// import { NotificationMenu } from './NotificationMenu';

/**
 * @component
 * @returns{JSX.Element}
 */

export function NavbarDashboard(): JSX.Element {
  const { changeLanguage } = useLanguage();
  const windowDimensions = useWindowDimensions();

  return (
    <div>
      <div className="flex h-16 items-center justify-between container mx-auto shadow-base">
        <div className="flex justify-between items-center pt-[0.93rem] pb-[0.56rem] gap-2.5 ">
          {windowDimensions.height <= 760 || windowDimensions.width <= 1280 ? (
            <ListMenu />
          ) : null}

          {/*
          need api
          <div className="hidden md:block">
            <NotificationMenu />
          </div> */}
          <BaseDropdownIcon
            icon={PhTranslate}
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
