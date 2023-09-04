import { useEffect, useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { DaAsCard } from "./DaAsCard";
import { API_DAAS_LIST } from "@src/services/users";
import { IUser } from "@src/services/users/types";
import { IDaAs } from "@src/services/users/types";
import { IconButton } from "@ui/atoms/BaseButton";

const headerItem: IDaAs = {
  email: "ایمیل",
  http_port: "پورت http",
  https_port: "پورت https",
};
type PropsType = { user: IUser; onClose: () => void };
export function DaAsList({ user, onClose }: PropsType) {
  const [listDaas, setListDaas] = useState<IDaAs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConfig = async () => {
      await API_DAAS_LIST({ username: user.email, password: user.password })
        .then(({ data }) => {
          setListDaas(data);
        })
        .catch(() => {
          // ...
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (user) {
      getConfig();
    }
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full p-4">
      <IconButton icon="ic:round-close" color="red" onClick={onClose} />
      <DaAsCard daas={headerItem} isHeader />
      {listDaas.length > 0 ? (
        listDaas.map((item) => <DaAsCard key={item.id} daas={item} />)
      ) : (
        <NoResult />
      )}
    </div>
  );
}
