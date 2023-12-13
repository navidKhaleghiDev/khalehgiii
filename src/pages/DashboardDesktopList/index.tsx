import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";
import { BackButton } from "@ui/atoms/BackButton";

import { DaAsList } from "./DaAsList";

export function DashboardDesktopListPage() {
  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <DaAsList />
    </ContainerDashboard>
  );
}
