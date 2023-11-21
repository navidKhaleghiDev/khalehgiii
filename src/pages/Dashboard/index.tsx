import { ConfigKeycloakForm } from "./ConfigKeycloakForm";
import { DashboardCards } from "./DashboardCards";
import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";
import { useUserContext } from "@context/user/userContext";
import { Daas } from "./Daas";
import { BaseTab, BaseTabs } from "@ui/atoms/BaseTabs";
import { ConfigDaasForm } from "./ConfigDaasForm";

export function DashboardPage() {
  const { user } = useUserContext();

  return !user?.is_superuser ? (
    <Daas src={`http://${user?.base_url}:${user?.http_port}`} />
  ) : (
    <ContainerDashboard>
      <DashboardCards />

      <BaseTabs label="تنظیمات">
        <BaseTab label="Keycloak">
          <ConfigKeycloakForm user={user} />
        </BaseTab>
        <BaseTab label="Daas">
          <ConfigDaasForm user={user} />
        </BaseTab>
        <BaseTab label="White List">
          <div>Content for BaseTab 3</div>
        </BaseTab>
      </BaseTabs>
    </ContainerDashboard>
  );
}
