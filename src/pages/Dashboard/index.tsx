import { ConfigForm } from "./ConfigForm";
import { DashboardCards } from "./DashboardCards";
import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";
import { useUserContext } from "@context/user/userContext";

export function DashboardPage() {
  const { user } = useUserContext();
  return user?.http ? (
    <iframe
      width="100%"
      height="100%"
      src={user.http}
      title="Desktop As Service"
    />
  ) : (
    <ContainerDashboard>
      <DashboardCards />
      <ConfigForm user={user} />
    </ContainerDashboard>
  );
}
