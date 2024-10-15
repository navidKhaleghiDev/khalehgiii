import useSWR from 'swr';

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
import FilterReports from './FilterReports';

// Note: Remember to add the i18 title

export function ReportFileScanPage() {
  const { data: analyzeScan } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );

  const { data: usersDaas } = useSWR<IResponsePagination<IDaAs>>(
    `${E_USERS_DAAS}/?is_recording=True `,
    http.fetcherSWR
  );

  return (
    <div className="bg-gray-100">
      <Typography color="black" variant="body2B">
        فایل های اسکن شده
      </Typography>
      <div className="flex items-center gap-[1.875rem] mt-7">
        <DashboardCard
          icon={usersThreeIcon}
          title="اسکن های امروز"
          count={analyzeScan?.data?.info?.today_scans ?? 0}
          onClick={() => console.log('click')}
        />
        <DashboardCard
          icon={WifiHighDuotone}
          title="کاربران آنلاین"
          count={usersDaas?.data?.online_users ?? 0}
          onClick={() => console.log('click')}
        />
      </div>
      <FilterReports />
      <UsersDaAsList />
    </div>
  );
}
