import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { useUserContext } from '@context/user/userContext';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { useTranslation } from 'react-i18next';
import { SettingsKeycloak } from './SettingsKeycloak';
import { DashboardCards } from './DashboardCards';
import { Daas } from './Daas';
import { DlpConfig } from './DlpConfig';
import { DaasConfig } from './DaasConfig';
import { SettingsMalware } from './SettingsMalware';

export function DashboardPage() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const isSSl = import.meta.env.VITE_IS_SSL === 'true';

  return !user?.is_superuser ? (
    <Daas
      src={`${isSSl ? 'https' : 'http'}://${user?.base_url}:${
        isSSl ? user?.https_port : user?.http_port
      }`}
    />
  ) : (
    <ContainerDashboard>
      <DashboardCards />
      <BaseTabs label={t('global.setting')}>
        <BaseTab label="application">
          <SettingsKeycloak user={user} />
        </BaseTab>
        <BaseTab label="Daas">
          <DaasConfig />
        </BaseTab>
        <BaseTab label="DLP">
          <DlpConfig />
        </BaseTab>
        <BaseTab label="malware log server">
          <SettingsMalware user={user} />
        </BaseTab>
      </BaseTabs>
    </ContainerDashboard>
  );
}
