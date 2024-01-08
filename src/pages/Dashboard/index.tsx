import { SettingsKeycloak } from "./SettingsKeycloak";
import { DashboardCards } from "./DashboardCards";
import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";
import { useUserContext } from "@context/user/userContext";
import { Daas } from "./Daas";
import { BaseTab, BaseTabs } from "@ui/atoms/BaseTabs";
import { DlpConfig } from "./DlpConfig";
import { DaasConfig } from "./DaasConfig";
import { SettingsMalware } from "./SettingsMalware";

export function DashboardPage() {
  const { user } = useUserContext();

  return !user?.is_superuser ? (
    <Daas src={`http://${user?.base_url}:${user?.http_port}`} />
  ) : (
    <ContainerDashboard>
      <DashboardCards />
      <BaseTabs label="تنظیمات">
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
