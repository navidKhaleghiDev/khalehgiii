import { useTranslation } from 'react-i18next';

import { useUserContext } from '@context/user/userContext';
import { Card, Typography } from '@redesignUi/atoms';
import { CurveBottomSvg } from '@redesignUi/atoms/Svgs/CurveBottomSvg';
import { CurveTopSvg } from '@redesignUi/atoms/Svgs/CurveTopSvg';
import { UserInfoSvg } from '@redesignUi/atoms/Svgs/UserInfoSvg';

export interface UserInfoProps {
  userInfoClassName?: string;
  curveTopSvgClassName?: string;
  curveBottomSvgClassName?: string;
  className?: string;
}

export function UserInfo({
  userInfoClassName,
  curveTopSvgClassName,
  curveBottomSvgClassName,
  className,
}: UserInfoProps) {
  const { user } = useUserContext();
  const { t } = useTranslation();

  return (
    <Card rounded="xxl" shadow="base" className={className}>
      <div>
        {user?.first_name && user?.last_name ? (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {user.first_name} {user.last_name}
          </Typography>
        ) : (
          <Typography
            color="black"
            variant="body4B"
            className="xl:py-1 py-0 xl:text-base font-medium text-sm whitespace-nowrap overflow-hidden"
          >
            {user?.email}
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
