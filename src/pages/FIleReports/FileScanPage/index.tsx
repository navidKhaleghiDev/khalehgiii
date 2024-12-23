import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms/Typography';
import usersThreeIcon from '@iconify-icons/ph/users-three';
import WifiHighDuotone from '@iconify-icons/ph/wifi-high-duotone';
import { UsersInfoCard } from '@ui/molecules/Cards/UsersInfoCard';
import { ResponsePagination, SwrResponse } from '@src/types/services';
import { http, HTTP_ANALYSES } from '@src/services/http';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { ScanStats } from '@src/services/analyze/types';
import { DaAsParams } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';

import { UsersDaAsList } from './UsersDaAsList';

export function ReportFileScanPage() {
  const { t } = useTranslation();

  // TodayScan
  const {
    data: analyzeScan,
    isLoading: isLoadingAnalyzeScan,
    error: analyzeScanError,
  } = useSWR<SwrResponse<ScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR,
    {
      // shouldRetryOnError : Cancel the new Request after getting error(issue service call)
      shouldRetryOnError: false,
    }
  );
  const scanCount = !analyzeScanError
    ? analyzeScan?.data?.info?.today_scans
    : undefined;

  // OnlineDaasUsers
  const {
    data: usersDaas,
    isLoading: isLoadingDaAsList,
    error: userDaasError,
  } = useSWR<ResponsePagination<DaAsParams>>(
    `${E_USERS_DAAS}`,
    http.fetcherSWR,
    {
      // shouldRetryOnError : Cancel the new Request after getting error(issue service call)
      shouldRetryOnError: false,
    }
  );
  const daasCount = !userDaasError ? usersDaas?.data?.online_users : undefined;

  return (
    <>
      <Typography color="black" variant="body2B">
        {t('fileScan.scannedFiles')}
      </Typography>
      <div className="flex items-center gap-[1.875rem] mt-7 max-w-[21.875rem] md:max-w-[45.62rem] mb-[7.625rem]">
        <UsersInfoCard
          icon={usersThreeIcon}
          title={t('fileScan.todayScans')}
          iconColor="neutral"
          isLoading={isLoadingAnalyzeScan}
          count={scanCount}
        />
        <UsersInfoCard
          icon={WifiHighDuotone}
          title={t('fileScan.onlineUsers')}
          isLoading={isLoadingDaAsList}
          count={daasCount}
        />
      </div>
      <UsersDaAsList />
    </>
  );
}
