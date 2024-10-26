import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
// import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
// import { useTranslation } from 'react-i18next';
import {
  // checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';

// import {
//   EPermissionConfig,
//   EPermissionDaasMetaConfig,
//   EPermissionGroupManagement,
//   EPermissionWhiteListFiles,
// } from '@src/types/permissions';
// import { useUserContext } from '@context/user/userContext';
import { DashboardCards } from './DashboardCards';
// import { SettingsKeycloakCp } from './SettingsKeycloak';
// import { DaasConfigCp } from './DaasConfig';
// import { DlpConfigCp } from './DlpConfig';
// import { GroupManagement } from './GroupManagement';
// import { LicenseCp } from './License';
import { DashboardInfoCards } from './DashboardInfoCards';
import { DashboardAdminLogs } from './DashboardAdminLogs';
import DashboardProgressBar from './DashboardProgressChart';
import { DashboardOnlineUsersList } from './DashboardOnlineUsersList';
// import { DashboardAdminInfo } from './components/DashboardAdminInfo';

export function DashboardPage() {
  // const { user } = useUserContext();
  // const { t } = useTranslation();
  const userPermissions = useUserPermission();

  // const userExist = user?.is_meta_admin || user?.is_superuser;

  // const SettingsConfigP = checkPermission(
  //   userPermissions,
  //   EPermissionConfig.VIEW
  // );
  // const DaasConfigP = checkPermission(
  //   userPermissions,
  //   EPermissionDaasMetaConfig.VIEW
  // );
  // const DlpConfigP = checkPermission(
  //   userPermissions,
  //   EPermissionWhiteListFiles.VIEW
  // );
  // const GroupManagementP = checkPermission(
  //   userPermissions,
  //   EPermissionGroupManagement.VIEW
  // );

  // const dashboardConditions =
  //   SettingsConfigP || DaasConfigP || DlpConfigP || GroupManagementP;

  return (
    <ContainerDashboard>
      <div className="grid grid-flow-row grid-cols-12 gap-x-[1.875rem] gap-y-5 p-[0.125rem]">
        <div className="md:col-span-3 col-span-6 order-1">
          <DashboardInfoCards permissions={userPermissions ?? []} />
        </div>
        <div className="lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-3">
          <DashboardAdminLogs permissions={userPermissions ?? []} />
        </div>
        <div className="lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
          <DashboardCards />
        </div>
        <div className="xl:col-span-8 col-span-12 order-4">
          <DashboardProgressBar />
        </div>
        <div className="xl:col-span-4 xl:block hidden order-5">
          <DashboardOnlineUsersList permissions={userPermissions ?? []} />
        </div>
      </div>
      <div className="grid w-full grid-flow-row grid-cols-12 gap-x-[1.875rem] gap-y-5 p-[0.125rem]">
        {/* <DashboardAdminInfo /> */}
        {/* <div className="lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-3">
          <DashboardAdminLogs permissions={userPermissions ?? []} />
        </div> */}
        {/* <div className="lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
          <DashboardCards permissions={userPermissions ?? []} />
        </div> */}
        {/* <div className="row-start-1 row-span-4 md:col-span-3 col-span-6 col-start-1 order-1 h-min">
          <DashboardInfoCards permissions={userPermissions ?? []} />
        </div>
        <div className="md:row-start-1 row-start-5 md:row-span-4 row-span-12 lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-3 h-min">
          <DashboardAdminLogs permissions={userPermissions ?? []} />
        </div>
        <div className="row-start-1 md:row-span-3 row-span-4 lg:col-span-4 md:col-span-3 col-span-6 md:order-3 order-2">
          <DashboardCards permissions={userPermissions ?? []} />
        </div>
        <div className="md:row-start-5 row-span-8 xl:col-span-8 col-span-12 order-4">
          <DashboardProgressBar permissions={userPermissions ?? []} />
        </div>
        <div className="row-start-4 row-span-9 col-span-4 xl:block hidden order-5">
          <DashboardOnlineUsersList permissions={userPermissions ?? []} />
        </div> */}

        {/* <div className="col-span-12">
          {dashboardConditions && (
            <BaseTabs label={t('global.setting')}>
              {SettingsConfigP ? (
                <BaseTab label="application">
                  <SettingsKeycloakCp userExist={userExist} />
                </BaseTab>
              ) : null}
              {DaasConfigP ? (
                <BaseTab label="Daas">
                  <DaasConfigCp />
                </BaseTab>
              ) : null}
              {DlpConfigP ? (
                <BaseTab label="DLP">
                  <DlpConfigCp />
                </BaseTab>
              ) : null}
              <BaseTab label="license">
                <LicenseCp />
              </BaseTab>
              {GroupManagementP ? (
                <BaseTab label="groupManagement">
                  <GroupManagement />
                </BaseTab>
              ) : null}
            </BaseTabs>
          )}
        </div> */}
      </div>
    </ContainerDashboard>
  );
}
