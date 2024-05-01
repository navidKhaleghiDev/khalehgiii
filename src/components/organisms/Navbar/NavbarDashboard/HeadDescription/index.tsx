import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES, http } from '@src/services/http';
import { IResponsePagination, ISwrResponse } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Typography } from '@ui/atoms';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { IDaAs } from '@src/services/users/types';

export function HeadDescription() {
  const { t } = useTranslation();

  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: 1,
    currentPage: 1,
  });
  const { data: list } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );
  const todayScans = data?.data?.info?.today_scans || '0';
  const remainingDays = data?.data?.info?.remaining_days || '--';
  const malwareFiles = data?.data?.info?.malware_files || '0';
  const onlineUsers = list?.data?.online_users || '0';
  const recordingSessions = list?.data?.online_recording_sessions || '0';

  return (
    <div className=" shadow-md rounded-lg h-7 px-2 flex justify-center items-center bg-white dark:inset-0 dark:bg-cover dark:bg-blur dark:bg-opacity-20 ">
      <Typography color="teal" className=" px-2 ">
        {`${dayLabel()}  ${dateAndNumber()}  `}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2  ">
        {` ${t('dashboard.numbersOfScans')} ${todayScans}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${malwareFiles}  ${t('dashboard.infectedFile')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${remainingDays} ${t('dashboard.dayLeft')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${onlineUsers} ${t('global.onlineUsers')}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${recordingSessions} ${t('global.inRecording')}`}
      </Typography>
    </div>
  );
}
