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
  EPermissionMalwareConfig,
  EPermissionWhiteListFiles,
} from '@src/types/permissions';
import { DashboardCards } from '../DashboardCards';
import { DlpConfigCp } from '../DlpConfig';
import { DaasConfigCp } from '../DaasConfig';
import { SettingsMalwareCp } from '../SettingsMalware';
import { SettingsKeycloakCp } from '../SettingsKeycloak';

export function AdminPanel({ userExist }: { userExist: boolean }) {
  const { t } = useTranslation();
  const userPermissions = useUserPermission();
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

  const dashboardCoditions =
    SettingsConfigP || DaasConfigP || DlpConfigP || SettingsMalwareP;

  return (
    <ContainerDashboard>
      <DashboardCards permissions={userPermissions ?? []} />
      {dashboardCoditions && (
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
        </BaseTabs>
      )}
    </ContainerDashboard>
  );
}
