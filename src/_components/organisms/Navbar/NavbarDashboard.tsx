import { Link } from 'react-router-dom';

import PhBellSimpleRinging from '@iconify-icons/ph/bell-simple-ringing';
import PhGlobe from '@iconify-icons/ph/globe';
import { IconButtonBadge } from '@redesignUi/atoms/IconButtonBadge';

import { useTheme } from '@context/settings/themeContext';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { languageOptions } from '@src/constants/optios';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';

import { ListMenu } from './ListMenu/ListMenu';

/**
 * @component
 * @returns{JSX.Element}
 */

export function NavbarDashboard(): JSX.Element {
  const { theme } = useTheme();
  const { changeLanguage } = useLanguage();

  return (
    <div>
      <div
        dir="rtl"
        className="flex h-16 items-center justify-between px-5 2xl:container 2xl:mx-auto relative bg-white dark:bg-gray-700"
      >
        <div className="flex justify-between items-center pt-[0.93rem] pb-[0.56rem] gap-2.5 ">
          <div className="block xl:hidden">
            <ListMenu />
          </div>
          <div className="hidden md:block">
            <IconButtonBadge icon={PhBellSimpleRinging} content={4} size="md" />
          </div>
          <BaseDropdownIcon
            size="md"
            icon={PhGlobe}
            onSelect={(v: string) => changeLanguage(v)}
            options={languageOptions}
          />
          {/* <BaseDropdownIcon
            size="md"
            icon={PhGlobe}
            onSelect={(v: string) => changeLanguage(v)}
            options={languageOptions.map((option) => ({
              ...option,
              label: t(`global.${option.id}`),
            }))}
          /> */}
        </div>

        <Link to={ROUTES_PATH.home}>
          <img
            src={theme === 'light' ? 'logo.svg' : 'darkModeLogo.svg'}
            alt="NETSEP"
            className="left-[0.081px] top-[1.75px] w-14 h-[1.12rem] md:w-[5.43rem] md:h-[1.43rem] xl:w-[7.43rem] xl:h-8"
          />
        </Link>
      </div>
    </div>
  );
}
