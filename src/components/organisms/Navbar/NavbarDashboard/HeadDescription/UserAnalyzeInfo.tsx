import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { ScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Typography } from '@ui/atoms';
import { SwrResponse } from '@src/types/services';

export function UserAnalyzeInfo() {
  const { t } = useTranslation();

  const { data } = useSWR<SwrResponse<ScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );

  const todayScans = data?.data?.info?.today_scans || ' 0';
  const remainingDays = data?.data?.info?.remaining_days || ' 0';
  const malwareFiles = data?.data?.info?.malware_files || ' 0';

  return (
    <>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2  ">
        {` ${t('dashboard.numbersOfScans')} : ${todayScans}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${t('dashboard.infectedFile')} : ${malwareFiles} `}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
      <Typography color="teal" className=" px-2 ">
        {` ${t('dashboard.dayLeft')} : ${remainingDays}`}
      </Typography>
      <Typography className=" px-1 ">|</Typography>
    </>
  );
}
