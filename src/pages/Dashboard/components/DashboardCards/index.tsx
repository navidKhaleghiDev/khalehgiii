import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { ROUTES_PATH } from '@src/routes/routesConstants';
import FolderSimple from '@iconify-icons/ph/folder-simple';
import Scan from '@iconify-icons/ph/scan';
import { DashboardCard } from '@redesignUi/molecules/Cards/DashboardCard';
import { SwrResponse } from '@src/types/services';
import { ScanStats } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { HTTP_ANALYSES } from '@src/services/http';

export function DashboardCards() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useSWR<SwrResponse<ScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const malwareFiles = data?.data?.info?.malware_files || 0;
  const todayScans = data?.data?.info?.today_scans || 0;
  return (
    <div className="lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
      <div className="flex flex-col gap-5">
        <DashboardCard
          icon={FolderSimple}
          title={`${t('dashboard.virusFiles')}`}
          count={malwareFiles}
          className="max-w-full xl:!h-[8.125rem] xl:p-5 lg:py-[1.125rem] md:py-[1.0625rem] pt-0 pb-0 pr-2.5 md:box-content xl:box-border box-border"
          disabled
        />
        <DashboardCard
          icon={Scan}
          title={`${t('dashboard.scans')}`}
          count={todayScans}
          className="max-w-full xl:!h-[8.125rem] xl:p-5 lg:py-[1.125rem] md:py-[1.0625rem] pt-0 pb-0 pr-2.5 md:box-content xl:box-border box-border"
          onClick={() => navigate(ROUTES_PATH.reportsScanFile)}
        />
      </div>
    </div>
  );
}
