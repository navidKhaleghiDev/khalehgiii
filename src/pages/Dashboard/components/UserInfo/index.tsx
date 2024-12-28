import { useTranslation } from 'react-i18next';

import { useUserContext } from '@context/user/userContext';
import { Card, Typography } from '@ui/atoms';
import { CurveBottomSvg } from '@ui/atoms/Svgs/CurveBottomSvg';
import { CurveTopSvg } from '@ui/atoms/Svgs/CurveTopSvg';
import { UserInfoSvg } from '@ui/atoms/Svgs/UserInfoSvg';

type UserInfoProps = {
  userInfoClassName?: string;
  curveTopSvgClassName?: string;
  curveBottomSvgClassName?: string;
  className?: string;
};

export function UserInfo({
  userInfoClassName,
  curveTopSvgClassName,
  curveBottomSvgClassName,
  className,
}: UserInfoProps) {
  const { user } = useUserContext();
  const { t } = useTranslation();

  const capitalizeFirstLetter = (val: string | undefined) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  return (
    <Card rounded="xxl" shadow="base" className={className}>
      <div>
        {user?.first_name && user?.last_name ? (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm overflow-hidden"
          >
            {capitalizeFirstLetter(user.first_name)}{' '}
            {capitalizeFirstLetter(user.last_name)}
          </Typography>
        ) : (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {capitalizeFirstLetter(user?.username)}
          </Typography>
        )}
        {user?.is_superuser && (
          <Typography
            color="neutralMiddle"
            variant="body5"
            className="xl:pb-1 pb-0 xl:text-sm text-xs"
          >
            {user.is_superuser ? t('header.admin') : t('header.user')}
          </Typography>
        )}
      </div>
      <CurveTopSvg className={curveTopSvgClassName} />
      <UserInfoSvg className={userInfoClassName} />
      <CurveBottomSvg className={curveBottomSvgClassName} />
    </Card>
  );
}
