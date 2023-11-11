import { ContainerDashboard } from "@ui/Templates/ContainerDashboard";

import { ScannedFileList } from "./ScannedFileList";
import { BackButton } from "@ui/atoms/BackButton";
import { useUserContext } from "@context/user/userContext";

export function ScannedFileListPage() {
  const { user } = useUserContext();

  return (
    <ContainerDashboard>
      <BackButton withLabel className="absolute bottom-20 left-24" />
      <ScannedFileList user={user} />
    </ContainerDashboard>
  );
}
