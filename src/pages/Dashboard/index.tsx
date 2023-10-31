import { ConfigForm } from "./ConfigForm";
import { DashboardCards } from "./DashboardCards";
import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";
import { useUserContext } from "@context/user/userContext";
import { Daas } from "./Daas";

export function DashboardPage() {
  const { user } = useUserContext();

  return !user?.is_superuser ? (
    <Daas src={`http://${user?.base_url}:${user?.http_port}`} />
  ) : (
    <ContainerDashboard>
      <DashboardCards />
      <ConfigForm user={user} />
    </ContainerDashboard>
  );
}
