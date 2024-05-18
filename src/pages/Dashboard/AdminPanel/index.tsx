import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import {
  usePermission,
  checkPermission,
} from '@src/helper/hooks/usePermission';
import {
  EPermissionDaasMetaConfig,
  EPermissionKeycloak,
  EPermissionMalware,
  EPermissionWhiteListFiles,
} from '@src/types/permissions';

import { SettingsKeycloak } from '../SettingsKeycloak';
import { DashboardCards } from '../DashboardCards';
import { DlpConfig } from '../DlpConfig';
import { DaasConfig } from '../DaasConfig';
import { SettingsMalware } from '../SettingsMalware';

export function AdminPanel({ userExist }: { userExist: boolean }) {
  const { t } = useTranslation();
  const { allUserPermissions } = usePermission();

  return (
    <ContainerDashboard>
      <DashboardCards permissions={allUserPermissions ?? []} />
      <BaseTabs label={t('global.setting')}>
        {checkPermission(allUserPermissions, EPermissionKeycloak.VIEW) && (
          <BaseTab label="application">
            <SettingsKeycloak userExist={userExist} />
          </BaseTab>
        )}
        {checkPermission(
          allUserPermissions,
          EPermissionDaasMetaConfig.VIEW
        ) && (
          <BaseTab label="Daas">
            <DaasConfig />
          </BaseTab>
        )}

        {checkPermission(
          allUserPermissions,
          EPermissionWhiteListFiles.VIEW
        ) && (
          <BaseTab label="DLP">
            <DlpConfig />
          </BaseTab>
        )}

        {checkPermission(allUserPermissions, EPermissionMalware.VIEW) && (
          <BaseTab label="malware">
            <SettingsMalware userExist={userExist} />
          </BaseTab>
        )}
      </BaseTabs>
    </ContainerDashboard>
  );
}
