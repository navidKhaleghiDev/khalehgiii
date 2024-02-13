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

  const isSSl = import.meta.env.VITE_IS_SSL;
  const isSSlTrue = isSSl === 'true';

  const httpCondition = isSSlTrue ? 'https' : 'http';
  const changePort = isSSlTrue ? user?.https_port : user?.http_port;

  return !user?.is_superuser ? (
    <Daas src={`${httpCondition}://${user?.base_url}:${changePort}`} />
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
        <BaseTab label="malware">
          <SettingsMalware user={user} />
        </BaseTab>
      </BaseTabs>
    </ContainerDashboard>
  );
}
