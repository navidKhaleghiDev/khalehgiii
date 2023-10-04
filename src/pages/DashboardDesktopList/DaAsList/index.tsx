import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { DaAsCard } from "./DaAsCard";
import { API_DAAS_DELETE } from "@src/services/users";
import { ETimeLimitDuration, IUser } from "@src/services/users/types";
import { IDaAs } from "@src/services/users/types";
import { Modal } from "@ui/molecules/Modal";
import { toast } from "react-toastify";
import useSWR from "swr";
import { http } from "@src/services/http";
import { IServerResponseList } from "@src/types/services";
import { E_USERS_DAAS } from "@src/services/users/endpoint";
import Pagination from "@ui/molecules/Pagination";
import { BaseInput } from "@ui/atoms";
import { ResetAllAccessTime } from "./ResetAllAccessTime";

const LIMIT_DESKTOP_LIST = 8;

const headerItem: IDaAs = {
  email: "ایمیل",
  http_port: "پورت http",
  https_port: "پورت https",
  created_at: "string",
  last_uptime: "string",
  time_limit_duration: ETimeLimitDuration.DAILY,
  time_limit_value_in_hour: 1,
  is_running: "وضعیت",
  usage_in_minute: "زمان استفاده شده",
};

type PropsType = { user: IUser | null };
export function DaAsList({ user }: PropsType) {
  const [desktopId, setDesktopId] = useState<number>();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loadingButtonDelete, setLoadingButtonDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, mutate } = useSWR<IServerResponseList<IDaAs[]>>(
    user
      ? E_USERS_DAAS({
          page: currentPage,
          pageSize: LIMIT_DESKTOP_LIST,
          filter: `search=${search}`,
        })
      : null,
    http.fetcherSWR,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  function handleOnClickActions(action: any, value: any): any {
    if (action === "mutate") {
      mutate();
    }

    if (value !== undefined && action === "delete") {
      setDesktopId(value);
      setOpenModalDelete(true);
    }
  }

  const handleRequestDelete = async () => {
    setLoadingButtonDelete(true);
    await API_DAAS_DELETE(`${desktopId}`)
      .then(() => {
        mutate();
        toast.success("با موفقیت حذف شد");
        setOpenModalDelete(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonDelete(false);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnChangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center">
        <BaseInput
          name="search"
          className="w-1/3"
          id="search"
          pureValue={search}
          pureOnChange={handleOnChangeSearch}
          placeholder="جستجو کنید"
        />
        <ResetAllAccessTime />
      </div>
      <DaAsCard daas={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaas.length > 0 ? (
        listDaas.map((item) => (
          <DaAsCard
            key={item.id}
            daas={item}
            onClickActions={handleOnClickActions}
          />
        ))
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.round(countPage / LIMIT_DESKTOP_LIST)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        type="error"
        title="از حذف این Desktop مطمئن هستید؟"
        buttonOne={{
          label: "بله",
          onClick: handleRequestDelete,
          loading: loadingButtonDelete,
        }}
        buttonTow={{
          label: "خیر",
          onClick: () => setOpenModalDelete(false),
          color: "red",
        }}
      />
    </div>
  );
}
