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

// const headerItem: IHeaderDaasCard = {
//   id: t('table.observeUserBehavior'),
//   email: t('table.userName'),
//   http_port: 'پورت http',
//   https_port: 'پورت https',
//   created_at: t('table.dateOfCreated'),
//   daas_configs: {
//     time_limit_duration: ETimeLimitDuration.DAILY,
//     time_limit_value_in_hour: '',
//     can_download_file: '',
//     clipboard_down: '',
//     clipboard_up: '',
//     webcam_privilege: '',
//     microphone_privilege: '',
//     max_transmission_download_size: '',
//     max_transmission_upload_size: '',
//     can_upload_file: 'تنظیمات دسترسی',
//     is_globally_config: '',
//   },
//   forbidden_upload_files: '',
//   forbidden_download_files: '',
//   last_uptime: t('table.numberOfScans'),
//   is_running: t('table.userStatus'),
//   usage_in_minute: 'زمان استفاده شده',
//   extra_allowed_download_files: '',
//   extra_allowed_upload_files: '',
//   allowed_files_type_for_download: '',
//   allowed_files_type_for_upload: '',
//   daas_version: 'نسخه دسکتاپ',
//   is_lock: 'دسکتاپ',
// };

export function UserDaAsCard({ daas, isHeader }: ProductCardProps) {
  return (
    <>
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
    </>
  );
}
