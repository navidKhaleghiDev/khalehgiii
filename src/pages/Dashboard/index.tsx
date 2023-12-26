import { SettingsKeycloak } from './SettingsKeycloak';
import { DashboardCards } from './DashboardCards';
import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { useUserContext } from '@context/user/userContext';
import { Daas } from './Daas';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { DlpConfig } from './DlpConfig';
import { DaasConfig } from './DaasConfig';
import { useTranslation } from 'react-i18next';

export function DashboardPage() {
	const { user } = useUserContext();
	const { t } = useTranslation();

	return !user?.is_superuser ? (
		<Daas src={`http://${user?.base_url}:${user?.http_port}`} />
	) : (
		<ContainerDashboard>
			<DashboardCards />
			<BaseTabs label={t('global.setting')}>
				<BaseTab label="Keycloak">
					<SettingsKeycloak user={user} />
				</BaseTab>
				<BaseTab label="Daas">
					<DaasConfig />
				</BaseTab>
				<BaseTab label="DLP">
					<DlpConfig />
				</BaseTab>
			</BaseTabs>
		</ContainerDashboard>
	);
}
