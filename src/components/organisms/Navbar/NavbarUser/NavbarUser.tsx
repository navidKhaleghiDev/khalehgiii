import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES_PATH } from '@src/routes/routesConstants';
import { languageOptions } from '@src/constants/optios';
import { BaseDropdownIcon } from '@ui/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';
import { useUserContext } from '@context/user/userContext';
import { Avatar, Typography } from '@ui/atoms';
import { SseSvg } from '@ui/atoms/Svgs/SseSvg';
import { IconButton } from '@ui/atoms/BaseButton';
import { ToolTip } from '@ui/atoms/Tooltip';
import PhTranslate from '@iconify-icons/ph/translate';
import PhSignOut from '@iconify-icons/ph/sign-out';
import User from '@iconify-icons/ph/user';
import { useLogout } from '@src/helper/hooks/useLogout';

import { AccessTime } from './AccessTime/AccessTime';
import { HeadOnlineAssistant } from '../component/HeadOnlineAssistant';

export function NavbarUser(): JSX.Element {
  const { user } = useUserContext();
  const { logout } = useLogout();
  const { changeLanguage, lang } = useLanguage();
  const { t } = useTranslation();

  const isUser = user?.first_name && user?.last_name;

  const logOutStyles =
    'text-gray-500 hover:text-gray-500 dark:text-red-300 dark:hover:text-red-300 text-lg';

  return (
    <div>
      <div className="flex h-16 items-center justify-between container mx-auto shadow-base py-3">
        <div className="flex justify-between items-center gap-5">
          <ToolTip
            tooltip={t('global.exit')}
            position={lang === 'fa' ? 'right' : 'left'}
          >
            <IconButton
              icon={PhSignOut}
              color="neutralNoBg"
              size="md"
              onClick={logout}
              className={logOutStyles}
            />
          </ToolTip>
          <BaseDropdownIcon
            icon={PhTranslate}
            size="sm"
            onSelect={(v: string) => changeLanguage(v)}
            options={languageOptions}
          />
          <div className="flex items-center">
            <Avatar icon={User} size="md" className="my-2" />
            <div className="mx-2">
              <span>
                <Typography variant="body5" color="neutralDark">
                  {isUser ? user?.first_name && user.last_name : ''}
                </Typography>
              </span>
              <span>
                <Typography variant="body6" color="neutralMiddle">
                  {user?.email}
                </Typography>
              </span>
            </div>
          </div>
          <div className="mx-[3.75rem]">
            <AccessTime />
          </div>
        </div>

        {!isUser && <HeadOnlineAssistant />}
        <Link to={ROUTES_PATH.home}>
          <SseSvg className="left-[0.081px] top-[1.75px] w-14 h-[1.12rem] md:w-[5.43rem] md:h-[1.43rem] xl:w-[7.43rem] xl:h-8" />
        </Link>
      </div>
    </div>
  );
}