// import { Link, matchPath, useLocation } from 'react-router-dom';

// import { BackButton } from '@ui/atoms/BackButton';
// import { BaseButton } from '@ui/atoms';
import PhBellSimpleRinging from '@iconify-icons/ph/bell-simple-ringing';
import PhGlobe from '@iconify-icons/ph/globe';
import { IconButtonBadge } from '@redesignUi/atoms/IconButtonBadge';
import { IconButton } from '@redesignUi/atoms/BaseButton';
// import { ROUTES_PATH } from '@src/routes/routesConstants';

import { ListMenu } from './ListMenu/ListMenu';

// import { StatusDropdown } from '../Status';
// import { ProfileMenu } from '../ProfileMenu';

/**
 * @component
 * @returns{JSX.Element}
 */
interface Test {
  // dir: 'ltr' | 'rtl';
  darkMode: boolean;
}
export function NavbarDashboard({ darkMode }: Test): JSX.Element {
  // const location = useLocation();

  // const backButtonRoutes = [
  //   ROUTES_PATH.users,
  //   ROUTES_PATH.addUser,
  //   ROUTES_PATH.settings,
  //   ROUTES_PATH.myProductMyRules,
  //   ROUTES_PATH.myProductIpsList,
  //   ROUTES_PATH.servicesRulesRetrieve,
  //   ROUTES_PATH.myProductMyRulesRetrieve,
  // ];

  // const shouldShowBackButton = (pathname: string) => {
  //   return backButtonRoutes.some((route) => matchPath(route, pathname));
  // };

  // const showBackButton = shouldShowBackButton(location.pathname);

  return (
    <div>
      <div
        dir="rtl"
        className="flex h-20 items-center justify-between px-5 2xl:container 2xl:mx-auto relative bg-white dark:bg-gray-600 shadow-md"
      >
        {/* <div>
        {!showBackButton ? null : (
          <div className="flex justify-center items-center sm:hidden">
            <BackButton backToReferrer />
          </div>
        )}
      </div> */}
        <div className="flex justify-between items-center pt-[0.93rem] pb-[0.56rem] gap-2.5 ">
          <div className="block xl:hidden">
            {/* <IconButton icon={PhList} color="neutral" size="md" /> */}
            <ListMenu />
          </div>
          <div className="hidden md:block">
            <IconButtonBadge icon={PhBellSimpleRinging} content={4} size="md" />
          </div>
          <IconButton
            icon={PhGlobe}
            color="neutral"
            size="md"
            className="ltr:flex-row-reverse"
          />
        </div>

        {/* <Link to={ROUTES_PATH.home} className="hidden sm:flex"> */}

        <img
          src={darkMode ? 'logo.svg' : 'darkModeLogo.svg'}
          alt="NETSEP"
          className="left-[0.081px] top-[1.75px] w-14 h-[1.12rem] md:w-[5.43rem] md:h-[1.43rem] xl:w-[7.43rem] xl:h-8"
        />

        {/* </Link> */}
      </div>
    </div>
  );
}
