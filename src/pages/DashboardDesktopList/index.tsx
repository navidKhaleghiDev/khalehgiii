import { STORAGE_KEY_USER } from "@src/services/users";
import { IUser } from "@src/services/users/types";
import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";

import { DaAsList } from "./DaAsList";
import { BackButton } from "@ui/atoms/BackButton";

export function DashboardDesktopListPage() {
  const user = JSON.parse(
    localStorage.getItem(STORAGE_KEY_USER) ?? ""
  ) as IUser;

  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <DaAsList user={user} />
    </ContainerDashboard>
  );
}
