import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { ISwrResponse } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Typography } from '@ui/atoms';

export function HeadDescription() {
  const { t } = useTranslation();

  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const todayScans = data?.data?.info?.today_scans || '0';
  const remainingDays = data?.data?.info?.remaining_days || '--';

  return (
    <div className=" shadow-md rounded-lg h-7 px-2 flex justify-center items-center bg-white ">
      <Typography color="teal" className=" px-2 ">
        {`${dayLabel()}  ${dateAndNumber()}  `}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2  ">
        {` ${t('dashboard.numbersOfScans')} ${todayScans}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${remainingDays} ${t('dashboard.dayLeft')}`}
      </Typography>
    </div>
  );
}
