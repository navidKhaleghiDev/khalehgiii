import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// import keyIcon from '@iconify-icons/ph/key';
// import desktopIcon from '@iconify-icons/ph/desktop';
// import usersThreeIcon from '@iconify-icons/ph/users-three';
// import shieldCheckIcon from '@iconify-icons/ph/shield-check';
// import PhGlobeHemisphereWest from '@iconify-icons/ph/globe-hemisphere-west';
import { ROUTES_PATH } from '@src/routes/routesConstants';
// import { checkPermission } from '@src/helper/hooks/usePermission';
// import FolderSimpleDashed from '@iconify-icons/ph/folder-simple-dashed';
import FolderSimple from '@iconify-icons/ph/folder-simple';
import Scan from '@iconify-icons/ph/scan';
// import {
//   // EPermissionDaas,
//   // EPermissionExtensions,
//   // EPermissionFileScan,
//   // EPermissionInternetLogs,
//   // EPermissionKeycloak,
//   // EPermissionScanReports,
//   // EPermissionUba,
//   // EPermissionUsers,
//   PermissionsCodeName,
// } from '@src/types/permissions';
import { DashboardCard } from '@redesignUi/molecules/Cards/DashboardCard';
// import { Typography } from '@redesignUi/atoms';
import useSWR from 'swr';
import { ISwrResponse } from '@src/types/services';
import { IScanStats } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { HTTP_ANALYSES } from '@src/services/http';
// import { DashboardInfoCards } from '../DashboardInfoCards';
// import { DashboardAdminLogs } from '../DashboardAdminLogs';

export function DashboardCards() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const malwareFiles = data?.data?.info?.malware_files || 0;
  const todayScans = data?.data?.info?.today_scans || 0;
  return (
    <div className="flex flex-col gap-5">
      <DashboardCard
        icon={FolderSimple}
        title={`${t('dashboard.infectedFile')}`}
        count={malwareFiles}
        className="max-w-full xl:p-5 lg:py-[1.125rem] md:py-[1.0625rem] pt-0 pb-0 pr-2.5 md:box-content xl:box-border box-border"
        disabled
      />
      <DashboardCard
        icon={Scan}
        title={`${t('dashboard.scans')}`}
        count={todayScans}
        className="max-w-full xl:p-5 lg:py-[1.125rem] md:py-[1.0625rem] pt-0 pb-0 pr-2.5 md:box-content xl:box-border box-border"
        onClick={() => navigate(ROUTES_PATH.reportsScanFile)}
      />

      {/* {checkPermission(permissions, EPermissionUsers.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={usersThreeIcon}
            title={t('dashboard.adminLists')}
            onClick={() => navigate(ROUTES_PATH.dashboardAdminsList)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionDaas.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={desktopIcon}
            title={t('dashboard.desktopLists')}
            onClick={() => navigate(ROUTES_PATH.dashboardDesktopList)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionKeycloak.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={keyIcon}
            title="SSO Administration"
            onClick={() => {
              window.open(import.meta.env.VITE_KEY_CLOAK_ADMIN_PANEL, '_blank');
            }}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionFileScan.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={shieldCheckIcon}
            title={t('dashboard.fileScanReports')}
            onClick={() => navigate(ROUTES_PATH.reportsScanFile)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionExtensions.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={shieldCheckIcon}
            title={t('dashboard.extensionList')}
            onClick={() => navigate(ROUTES_PATH.extensionList)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionUba.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={shieldCheckIcon}
            title="UBA"
            onClick={() => navigate(ROUTES_PATH.uba)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionScanReports.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={shieldCheckIcon}
            title={t('global.reports')}
            onClick={() => navigate(ROUTES_PATH.reports)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionInternetLogs.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={PhGlobeHemisphereWest}
            title={t('global.internetLog')}
            onClick={() => navigate(ROUTES_PATH.internetLog)}
          />
        </div>
      )}

      {checkPermission(permissions, EPermissionInternetLogs.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={PhGlobeHemisphereWest}
            title={t('global.knowledgeManagement')}
            onClick={() => navigate(ROUTES_PATH.knowledgeManagement)}
          />
        </div>
      )}
      {checkPermission(permissions, EPermissionFileScan.VIEW) && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <DashboardCard
            icon={desktopIcon}
            title={t('global.monitoring')}
            onClick={() => navigate(ROUTES_PATH.monitoring)}
          />
        </div>
      )} */}
    </div>
  );
}
