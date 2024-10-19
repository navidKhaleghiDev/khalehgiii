import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms/Typography';
import { DashboardCard } from '@redesignUi/molecules/Cards/DashboardCard';
import usersThreeIcon from '@iconify-icons/ph/users-three';
import WifiHighDuotone from '@iconify-icons/ph/wifi-high-duotone';
import { IResponsePagination, ISwrResponse } from '@src/types/services';
import { http, HTTP_ANALYSES } from '@src/services/http';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { IDaAs } from '@src/services/users/types';
import { E_USERS_DAAS } from '@src/services/users/endpoint';

import { UsersDaAsList } from './UsersDaAsList';

export function ReportFileScanPage() {
  const { t } = useTranslation();

  const { data: analyzeScan, isLoading: analyzeScanLoading } = useSWR<
    ISwrResponse<IScanStats>
  >(E_ANALYZE_SCAN_STATS, HTTP_ANALYSES.fetcherSWR);
  const { data: usersDaas, isLoading: userDaasLoading } = useSWR<
    IResponsePagination<IDaAs>
  >(`${E_USERS_DAAS}/?is_recording=True `, http.fetcherSWR);

  // Remember to add the skeleton for this element after adding the skeletons library
  if (analyzeScanLoading || userDaasLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-gray-100 pt-10 px-2">
      <Typography color="black" variant="body2B">
        {t('fileScan.scannedFiles')}
      </Typography>
      <div className="flex items-center gap-[1.875rem] mt-7">
        <DashboardCard
          icon={usersThreeIcon}
          title={t('fileScan.todayScans')}
          count={analyzeScan?.data?.info?.today_scans ?? 0}
          onClick={() => console.log('click')}
        />
        <DashboardCard
          icon={WifiHighDuotone}
          title={t('fileScan.onlineUsers')}
          count={usersDaas?.data?.online_users ?? 0}
          onClick={() => console.log('click')}
        />
      </div>
      <UsersDaAsList />
    </div>
  );
}
