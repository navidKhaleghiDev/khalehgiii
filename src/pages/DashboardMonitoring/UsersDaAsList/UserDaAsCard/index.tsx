import { Card, Typography } from '@ui/atoms';
import { IDaAs } from '@src/services/users/types';
import { IconButton } from '@ui/atoms/BaseButton';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { CircleBg } from '@ui/atoms/CircleBg';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IHeaderDaasCard } from '@src/pages/DashboardDesktopList/DaAsList/types';
import { UserScanCount } from './UserScanCount';

type ProductCardProps = {
  daas: IHeaderDaasCard | IDaAs;
  isHeader?: boolean;
};

export function UserDaAsCard({ daas, isHeader }: ProductCardProps) {
  return (
    <Card
      color="neutral"
      className={`${isHeader && 'bg-teal-500 text-white'} flex ${
        isHeader ? 'h-10' : 'h-14'
      } items-center px-2 my-2 w-full text-neutral-600`}
    >
      <div className="px-3 w-2/12 flex justify-center text-center break-words uppercase">
        {!isHeader ? (
          <Link to={`${ROUTES_PATH.monitoring}/${daas.email}`}>
            <IconButton icon={moreIcon} color="neutralNoBg" />
          </Link>
        ) : (
          <Typography size="body4">{daas.id}</Typography>
        )}
      </div>

      <Typography
        size="body4"
        type="div"
        className="px-3 w-4/12 text-center break-words uppercase"
      >
        {daas.email}
      </Typography>

      <Typography
        size="body4"
        type="div"
        className="px-3 w-4/12 text-center break-words uppercase"
      >
        {!isHeader ? dateAndNumber(daas.created_at) : daas.created_at}
      </Typography>

      <div className="px-3 w-2/12 flex justify-center text-center break-words uppercase">
        {!isHeader ? (
          <UserScanCount email={daas.email} />
        ) : (
          <Typography size="body4">{daas.last_uptime}</Typography>
        )}
      </div>

      <Typography
        size="body4"
        type="div"
        className="w-3/12 text-center break-words uppercase"
      >
        {isHeader ? (
          daas.is_running
        ) : (
          <CircleBg
            bgColor={daas.is_running ? 'bg-green-600' : 'bg-gray-400'}
          />
        )}
      </Typography>
    </Card>
  );
}
