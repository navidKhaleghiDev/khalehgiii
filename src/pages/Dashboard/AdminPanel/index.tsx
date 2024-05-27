import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import { usePermission } from '@src/helper/hooks/usePermission';

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
        <BaseTab label="application">
          <SettingsKeycloak userExist={userExist} />
        </BaseTab>

        <BaseTab label="Daas">
          <DaasConfig />
        </BaseTab>

        <BaseTab label="DLP">
          <DlpConfig />
        </BaseTab>

        <BaseTab label="malware">
          <SettingsMalware userExist={userExist} />
        </BaseTab>
      </BaseTabs>
    </ContainerDashboard>
  );
}
