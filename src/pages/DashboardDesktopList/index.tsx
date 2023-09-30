import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";

import { DaAsList } from "./DaAsList";
import { BackButton } from "@ui/atoms/BackButton";
import { useUserContext } from "@context/user/userContext";

export function DashboardDesktopListPage() {
  const { user } = useUserContext();

  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <DaAsList user={user} />
    </ContainerDashboard>
  );
}
