import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';

import {
  EPermissionConfig,
  EPermissionDaasMetaConfig,
  EPermissionGroupManagement,
  EPermissionMalwareConfig,
  EPermissionWhiteListFiles,
} from '@src/types/permissions';
import { useUserContext } from '@context/user/userContext';
import { DashboardCards } from './DashboardCards';
import { SettingsKeycloakCp } from './SettingsKeycloak';
import { DaasConfigCp } from './DaasConfig';
import { DlpConfigCp } from './DlpConfig';
import { SettingsMalwareCp } from './SettingsMalware';
import { GroupManagement } from './GroupManagement';

export function DashboardPage() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const userExist = user?.is_meta_admin || user?.is_superuser;

  const SettingsConfigP = checkPermission(
    userPermissions,
    EPermissionConfig.VIEW
  );
  const DaasConfigP = checkPermission(
    userPermissions,
    EPermissionDaasMetaConfig.VIEW
  );
  const DlpConfigP = checkPermission(
    userPermissions,
    EPermissionWhiteListFiles.VIEW
  );
  const SettingsMalwareP = checkPermission(
    userPermissions,
    EPermissionMalwareConfig.VIEW
  );

  const GroupManagementP = checkPermission(
    userPermissions,
    EPermissionGroupManagement.VIEW
  );

  const dashboardConditions =
    SettingsConfigP ||
    DaasConfigP ||
    DlpConfigP ||
    SettingsMalwareP ||
    GroupManagementP;

  return (
    <ContainerDashboard>
      <DashboardCards permissions={userPermissions ?? []} />
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
          {SettingsMalwareP ? (
            <BaseTab label="malware">
              <SettingsMalwareCp userExist={userExist} />
            </BaseTab>
          ) : null}
          {GroupManagementP ? (
            <BaseTab label="groupManagement">
              <GroupManagement />
            </BaseTab>
          ) : null}
        </BaseTabs>
      )}
    </ContainerDashboard>
  );
}
