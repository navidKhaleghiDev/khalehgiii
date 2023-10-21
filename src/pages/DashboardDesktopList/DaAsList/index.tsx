import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { DaAsCard } from "./DaAsCard";
import { API_DAAS_DELETE, API_DAAS_UPDATE } from "@src/services/users";
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
import { ActionOnClickActionsType } from "./DaAsCard/types";

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
  access_mode: "دسترسی کامل",
};

type PropsType = { user: IUser | null };
export function DaAsList({ user }: PropsType) {
  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [actionOnClick, setActionOnClick] =
    useState<ActionOnClickActionsType>();

  const [openModal, setOpenModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
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

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    daas?: Partial<IDaAs> | string
  ): any {
    if (action === "mutate") {
      mutate();
      return;
    }

    if (daas !== undefined && typeof daas !== "string") {
      setActionOnClick(action);
      setActiveDaas(daas);
      setOpenModal(true);
    }
  }

  const handleOnRequests = async () => {
    if (!activeDaas) return;

    setLoadingButtonModal(true);
    if (actionOnClick === "delete") {
      await API_DAAS_DELETE(activeDaas.id as string)
        .then(() => {
          mutate();
          toast.success("با موفقیت حذف شد");
          setOpenModal(false);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    } else {
      await API_DAAS_UPDATE(activeDaas.id as string, activeDaas)
        .then(() => {
          mutate();
          toast.success("با موفقیت بروزرسانی شد");
          setOpenModal(false);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    }
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
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title="از انجام این کار مطمئن هستید؟"
        buttonOne={{
          label: "بله",
          onClick: handleOnRequests,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: "خیر",
          onClick: () => setOpenModal(false),
          color: "red",
        }}
      />
    </div>
  );
}
