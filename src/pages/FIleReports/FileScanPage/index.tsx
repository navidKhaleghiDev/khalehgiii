import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms/Typography';
import usersThreeIcon from '@iconify-icons/ph/users-three';
import WifiHighDuotone from '@iconify-icons/ph/wifi-high-duotone';
import { UsersInfoCard } from '@redesignUi/molecules/Cards/UsersInfoCard';
import { IResponsePagination, ISwrResponse } from '@src/types/services';
import { http, HTTP_ANALYSES } from '@src/services/http';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';

import { UsersDaAsList } from './UsersDaAsList';

export function ReportFileScanPage() {
  const { t } = useTranslation();

  const { data: analyzeScan, isLoading: isLoadingAnalyzeScan } = useSWR<
    ISwrResponse<IScanStats>
  >(E_ANALYZE_SCAN_STATS, HTTP_ANALYSES.fetcherSWR, {
    shouldRetryOnError: false,
  });
  const { data: usersDaas, isLoading: isLoadingDaAsList } = useSWR<
    IResponsePagination<IDaAs>
  >(`${E_USERS_DAAS}/?is_recording=True `, http.fetcherSWR, {
    shouldRetryOnError: false,
  });

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
          count={analyzeScan?.data?.info?.today_scans ?? 0}
        />
        <UsersInfoCard
          icon={WifiHighDuotone}
          title={t('fileScan.onlineUsers')}
          count={usersDaas?.data?.online_users ?? 0}
          isLoading={isLoadingDaAsList}
        />
      </div>
      <UsersDaAsList />
    </>
  );
}