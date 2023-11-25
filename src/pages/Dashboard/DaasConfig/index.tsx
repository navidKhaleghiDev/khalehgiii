import { BaseButton } from "@ui/atoms/BaseButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DaasConfigForm } from "@ui/utils/DaasConfigForm";
import { IDaasConfig } from "@src/services/config/types";
import useSWR from "swr";
import { ISwrResponse } from "@src/types/services";
import { E_DAAS_CONFIGS } from "@src/services/config/endpoint";
import { http } from "@src/services/http";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { Modal } from "@ui/molecules/Modal";
import { API_UPDATE_DAAS_CONFIG } from "@src/services/config";
import { toast } from "react-toastify";

export function DaasConfig() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const { data: daasConfig, isLoading } = useSWR<ISwrResponse<IDaasConfig>>(
    E_DAAS_CONFIGS,
    http.fetcherSWR
  );

  const { control, handleSubmit, getValues, reset } = useForm<IDaasConfig>({
    mode: "onChange",
    defaultValues: {
      id: daasConfig?.data?.id,
      can_upload_file: daasConfig?.data?.can_upload_file,
      can_download_file: daasConfig?.data?.can_download_file,
      clipboard_down: daasConfig?.data?.clipboard_down,
      clipboard_up: daasConfig?.data?.clipboard_up,
      webcam_privilege: daasConfig?.data?.webcam_privilege,
      microphone_privilege: daasConfig?.data?.microphone_privilege,
      max_transmission_download_size:
        daasConfig?.data?.max_transmission_download_size,
      max_transmission_upload_size:
        daasConfig?.data?.max_transmission_upload_size,
    },
  });

  useEffect(() => {
    reset(daasConfig?.data);
  }, [daasConfig]);

  const handleOnSubmit = () => {
    setOpenConfirmModal(true);
  };

  const handleOnUpdate = async () => {
    const updatedDaasConfig = getValues();
    setLoadingButtonModal(true);

    if (updatedDaasConfig.id) {
      await API_UPDATE_DAAS_CONFIG(updatedDaasConfig)
        .then(() => {
          toast.success("با موفقیت بروزرسانی شد.");
          setOpenConfirmModal(false);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
      return;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <DaasConfigForm control={control} />
      <div className="flex justify-center col-span-6">
        <BaseButton label={"بروز رسانی"} size="md" type="secondary" submit />
      </div>
      <Modal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        type="error"
        title="از انجام این کار مطمئن هستید؟"
        buttonOne={{
          label: "بله",
          onClick: handleOnUpdate,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: "خیر",
          onClick: () => setOpenConfirmModal(false),
          color: "red",
        }}
      />
    </form>
  );
}
