import { STORAGE_KEY_USER } from "@src/services/client/users";
import { IUser } from "@src/services/client/users/types";
import { ConfigForm } from "./ConfigForm";

export function DashboardPage() {
  const user = JSON.parse(
    localStorage.getItem(STORAGE_KEY_USER) ?? ""
  ) as IUser;

  return user.http ? (
    <iframe
      width="100%"
      height="100%"
      src={user.http}
      title="Desktop As Service"
    />
  ) : (
    <ConfigForm user={user} />
  );
}
