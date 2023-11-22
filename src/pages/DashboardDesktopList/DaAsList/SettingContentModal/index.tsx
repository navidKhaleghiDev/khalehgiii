import { IDaAs } from "@src/services/users/types";
import { BaseButton } from "@ui/atoms/BaseButton";
import { Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { DaasConfigForm } from "@ui/utils/DaasConfigForm";
import { DlpSettingsForm } from "@ui/utils/DlpSettingsForm";

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
};

export function SettingContentModal({ handleOnChange, daas }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<IDaAs>({
    mode: "onChange",
    defaultValues: {
      can_upload_file: daas.can_upload_file,
      can_download_file: daas.can_download_file,
      clipboard_down: daas.clipboard_down,
      clipboard_up: daas.clipboard_up,
      webcam_privilege: daas.webcam_privilege,
      microphone_privilege: daas.microphone_privilege,
      forbidden_upload_files: daas.forbidden_upload_files,
      forbidden_download_files: daas.forbidden_download_files,
      allowed_files_type_for_download: daas.allowed_files_type_for_download,
      allowed_files_type_for_upload: daas.allowed_files_type_for_upload,
      max_transmission_download_size: daas.max_transmission_download_size,
      max_transmission_upload_size: daas.max_transmission_upload_size,
    },
  });

  const handleOnSubmit = (data: IDaAs) => {
    handleOnChange({ ...daas, ...data });
  };

  const handleSetDlpValues = (name: keyof IDaAs, values: string[]) => {
    setValue(name, values);
  };

  const dlpDownloadList = watch("allowed_files_type_for_download") || [];
  const dlpUploadList = watch("allowed_files_type_for_upload") || [];

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <DaasConfigForm control={control} />
      <DlpSettingsForm
        handleSetDlpValues={handleSetDlpValues}
        dlpDownloadList={dlpDownloadList}
        dlpUploadList={dlpUploadList}
      />

      <div className="flex justify-center col-span-6">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">آیا مطمین هستید؟</Typography>
            <BaseButton label={"بله"} size="sm" submit className="mx-2" />
            <BaseButton
              label="خیر"
              size="sm"
              type="red"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        )}

        {!showConfirm && (
          <BaseButton
            label={"ثبت"}
            size="md"
            onClick={() => setShowConfirm(true)}
          />
        )}
      </div>
    </form>
  );
}
