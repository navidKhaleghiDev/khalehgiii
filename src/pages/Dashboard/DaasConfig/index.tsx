import { IDaAs } from "@src/services/users/types";
import { BaseButton } from "@ui/atoms/BaseButton";
import { BaseInput, Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

import useSWR from "swr";
import { IResponsePagination, ISwrResponse } from "@src/types/services";
import { IDaasConfig } from "@src/services/config/types";
import { http } from "@src/services/http";
import { E_DAAS_CONFIG_LIST } from "@src/services/config/endpoint";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { DlpConfigCard } from "./DlpConfigCard";
import { StringifyProperties } from "@src/types/global";
import { ActionOnClickActionsType } from "./DlpConfigCard/types";
import { NoResult } from "@ui/molecules/NoResult";
import Pagination from "@ui/molecules/Pagination";
import { Modal } from "@ui/molecules/Modal";
import { SettingContentModal } from "./SettingContentModal";

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
};

const LIMIT_DAAS_CONFIG_LIST = 8;

const headerItem: StringifyProperties<IDaasConfig> = {
  id: "",
  can_upload_file: "آپلود",
  can_download_file: "دانلود",
  clipboard_up: "کلیپبورد از کلاینت به سرور",
  clipboard_down: "کلیپبورد از سرور به کلاینت",
  webcam_privilege: "وب کم",
  microphone_privilege: "میکروفن",
  time_limit_duration: "زمان مجاز دسترسی",
  time_limit_value_in_hour: "",
  is_permanently: "",
  max_transmission_upload_size: "سایز آپلود",
  max_transmission_download_size: "سایز دانلود",
  used_as_default: "",
};

export function DaasConfig() {
  const [activeDaasConfig, setActiveDaasConfig] =
    useState<Partial<IDaasConfig>>();

  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, mutate, isLoading } = useSWR<IResponsePagination<IDaasConfig>>(
    E_DAAS_CONFIG_LIST({
      page: currentPage,
      pageSize: LIMIT_DAAS_CONFIG_LIST,
      filter: `search=${search}`,
    }),
    http.fetcherSWR
  );
  const [showConfirm, setShowConfirm] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const listDaasConfig = data?.data?.results ?? [];
  console.log({ listDaasConfig });

  const countPage = data?.data?.count || 0;

  const handleOnChangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleOnRequests = async () => {
    // if (!activeDaas) return;
    // setLoadingButtonModal(true);
    // if (actionOnClick === "delete") {
    //   await API_DAAS_DELETE(activeDaas.id as string)
    //     .then(() => {
    //       mutate();
    //       toast.success("با موفقیت حذف شد");
    //       setOpenModal(false);
    //     })
    //     .catch((err) => {
    //       toast.error(err);
    //     })
    //     .finally(() => {
    //       setLoadingButtonModal(false);
    //     });
    // } else {
    //   updateDaas(activeDaas);
    // }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseModal = (isUpdated?: boolean) => {};

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    daasConfig?: StringifyProperties<IDaasConfig> | IDaasConfig
  ): any {
    if (action === "mutate") {
      mutate();
      return;
    }
    console.log({ daasConfig });

    // if (action === "edit") {
    //   setActiveDaas(daas as IDaAs);
    //   setOpenSettingModal(true);
    //   return;
    // }

    // if (daas !== undefined && typeof daas !== "string") {
    //   setActionOnClick(action);
    //   setActiveDaas(daas);
    //   setOpenModal(true);
    // }
  }

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
      </div>
      <DlpConfigCard daasConfig={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaasConfig.length > 0 ? (
        listDaasConfig.map((item) => (
          <DlpConfigCard
            key={item.id}
            daasConfig={item}
            onClickActions={handleOnClickActions}
          />
        ))
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          // count={countPage}
          // pageSize={5}
          currentPage={currentPage}
          totalPages={Math.round(countPage / LIMIT_DAAS_CONFIG_LIST)}
          onPageChange={handlePageChange}
        />
      )}
      {/* <Modal
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
      /> */}
      <Modal
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        type="success"
        content={
          <SettingContentModal
            handleClose={handleCloseModal}
            daasConfig={activeDaasConfig as IDaasConfig}
          />
        }
      />
    </div>
  );
  // const { control, handleSubmit, setValue, watch } = useForm<IDaAs>({
  //   mode: "onChange",
  //   defaultValues: {
  //     can_upload_file: daas.can_upload_file,
  //     can_download_file: daas.can_download_file,
  //     clipboard_down: daas.clipboard_down,
  //     clipboard_up: daas.clipboard_up,
  //     webcam_privilege: daas.webcam_privilege,
  //     microphone_privilege: daas.microphone_privilege,
  //     forbidden_upload_files: daas.forbidden_upload_files,
  //     forbidden_download_files: daas.forbidden_download_files,
  //     allowed_files_type_for_download: daas.allowed_files_type_for_download,
  //     allowed_files_type_for_upload: daas.allowed_files_type_for_upload,
  //     max_transmission_download_size: daas.max_transmission_download_size,
  //     max_transmission_upload_size: daas.max_transmission_upload_size,
  //   },
  // });

  // const handleOnSubmit = (data: IDaAs) => {
  //   handleOnChange({ ...daas, ...data });
  // };

  // const handleSetDlpValues = (name: keyof IDaAs, values: string[]) => {
  //   setValue(name, values);
  // };

  // const dlpDownloadList = watch("allowed_files_type_for_download") || [];
  // const dlpUploadList = watch("allowed_files_type_for_upload") || [];
  // return <>sdf</>;

  // return (
  //   <form
  //     className="w-full h-full grid grid-cols-6 gap-8 p-4"
  //     onSubmit={handleSubmit(handleOnSubmit)}
  //   >
  //     <DaasConfigForm control={control} />
  //     <DlpSettingsForm
  //       handleSetDlpValues={handleSetDlpValues}
  //       dlpDownloadList={dlpDownloadList}
  //       dlpUploadList={dlpUploadList}
  //     />

  //     <div className="flex justify-center col-span-6">
  //       {showConfirm && (
  //         <div className="flex justify-center items-center w-full">
  //           <Typography className="mx-2">آیا مطمین هستید؟</Typography>
  //           <BaseButton label={"بله"} size="sm" submit className="mx-2" />
  //           <BaseButton
  //             label="خیر"
  //             size="sm"
  //             type="red"
  //             className="mx-2"
  //             onClick={() => setShowConfirm(false)}
  //           />
  //         </div>
  //       )}

  //       {!showConfirm && (
  //         <BaseButton
  //           label={"ثبت"}
  //           size="md"
  //           onClick={() => setShowConfirm(true)}
  //         />
  //       )}
  //     </div>
  //   </form>
  // );
}
