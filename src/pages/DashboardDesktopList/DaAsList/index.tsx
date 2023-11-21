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
import { SettingContentModal } from "./SettingContentModal";

// function mergeUniqueLists(oldList: string[], newList: string[]): string[] {
//   const set = new Set([...oldList, ...newList]);
//   return Array.from(set);
// }

function compareExtensionLists(oldList?: string[], newList?: string[]) {
  const removedList: string[] = [];
  const addedList: string[] = [];
  if (!oldList || !newList) return { addedList, removedList };

  const setOne = new Set(oldList);
  const setTwo = new Set(newList);

  // Find strings added
  newList.forEach((item) => {
    if (!setOne.has(item)) {
      addedList.push(item);
    }
  });

  // Find strings missing
  oldList.forEach((item) => {
    if (!setTwo.has(item)) {
      removedList.push(item);
    }
  });

  return {
    addedList,
    removedList,
  };
}

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
  can_upload_file: "تنظیمات دسترسی",
  can_download_file: false,
  clipboard_down: false,
  clipboard_up: false,
  forbidden_upload_files: null,
  forbidden_download_files: null,
  webcam_privilege: false,
  microphone_privilege: false,
  max_transmission_download_size: null,
  max_transmission_upload_size: null,
  extra_allowed_download_files: null,
  extra_allowed_upload_files: null,
  allowed_files_type_for_download: null,
  allowed_files_type_for_upload: null,
};

type PropsType = { user: IUser | null };
export function DaAsList({ user }: PropsType) {
  const [activeDaas, setActiveDaas] = useState<Partial<IDaAs>>();
  const [actionOnClick, setActionOnClick] =
    useState<ActionOnClickActionsType>();

  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

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

    if (action === "edit") {
      setActiveDaas(daas as IDaAs);
      setOpenSettingModal(true);
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
      updateDaas(activeDaas);
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

  const updateDaas = async (daas?: Partial<IDaAs>, isLdp?: boolean) => {
    if (!daas) return;
    let daasUpdated = daas;
    if (isLdp) {
      const resultDownload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_download ?? [],
        daas?.allowed_files_type_for_download ?? []
      );

      const resultUpload = compareExtensionLists(
        activeDaas?.allowed_files_type_for_upload ?? [],
        daas?.allowed_files_type_for_upload ?? []
      );

      const newExtraAllowedDownloadFiles = [
        ...(daas.extra_allowed_download_files || []),
        ...resultDownload.addedList,
      ];
      const newForbiddenDownloadFiles = [
        ...(daas.forbidden_download_files || []),
        ...resultDownload.removedList,
      ];

      const newExtraAllowedUploadFiles = [
        ...(daas.extra_allowed_upload_files || []),
        ...resultUpload.addedList,
      ];
      const newForbiddenUploadFiles = [
        ...(daas.forbidden_upload_files || []),
        ...resultUpload.removedList,
      ];

      // const newExtraAllowedDownloadFiles = mergeUniqueLists(
      //   daas.extra_allowed_download_files ?? [],
      //   resultDownload.addedList
      // );
      // const newForbiddenDownloadFiles = mergeUniqueLists(
      //   daas.forbidden_download_files ?? [],
      //   resultDownload.removedList
      // );

      // const newExtraAllowedUploadFiles = mergeUniqueLists(
      //   daas.extra_allowed_upload_files ?? [],
      //   resultUpload.addedList
      // );
      // const newForbiddenUploadFiles = mergeUniqueLists(
      //   daas.forbidden_upload_files ?? [],
      //   resultUpload.removedList
      // );

      console.log({
        newExtraAllowedDownloadFiles,
        newForbiddenDownloadFiles,
        newExtraAllowedUploadFiles,
        newForbiddenUploadFiles,
      });

      daasUpdated = {
        ...daas,
        extra_allowed_download_files: [
          ...new Set(newExtraAllowedDownloadFiles),
        ],
        extra_allowed_upload_files: [...new Set(newExtraAllowedUploadFiles)],
        forbidden_download_files: [
          ...new Set(newForbiddenDownloadFiles),
        ].filter((value) => !resultDownload.addedList.includes(value)),
        forbidden_upload_files: [...new Set(newForbiddenUploadFiles)].filter(
          (value) => !resultUpload.addedList.includes(value)
        ),
      };
    }

    console.log({ daasUpdated });

    // get
    await API_DAAS_UPDATE(daasUpdated.id as string, daasUpdated)
      .then(() => {
        mutate();
        toast.success("با موفقیت بروزرسانی شد");
        openModal && setOpenModal(false);
        openSettingModal && setOpenSettingModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
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
      <Modal
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        type="success"
        content={
          <SettingContentModal
            handleOnChange={(daas) => updateDaas(daas, true)}
            daas={activeDaas as IDaAs}
          />
        }
      />
    </div>
  );
}
