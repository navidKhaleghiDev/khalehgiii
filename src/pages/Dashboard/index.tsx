import { useUserContext } from '@context/user/userContext';

import { AdminPanel } from './AdminPanel';
import { UserPanel } from './UserPanel';

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
        <BaseTab label="groupManagement">
          <GroupManagement />
        </BaseTab>
      </BaseTabs>
    </ContainerDashboard>
  );
}
