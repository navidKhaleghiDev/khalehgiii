import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";
import { IDaAs } from "@src/services/users/types";
import { BaseButton } from "@ui/atoms/BaseButton";
import { Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

// import { DlpList } from "./DlpList";

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
};

export function SettingContentModal({ handleOnChange, daas }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    control,
    handleSubmit,
    //  setValue,
    //   watch
  } = useForm<IDaAs>({
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
    },
  });

  const handleOnSubmit = (data: IDaAs) => {
    handleOnChange({ ...daas, ...data });
  };

  // const handleSetDlpValues = (name: keyof IDaAs, values: string[]) => {
  //   setValue(name, values);
  // };

  // const dlpDownloadList = watch("forbidden_download_files") || [];
  // const dlpUploadList = watch("forbidden_upload_files") || [];

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="can_upload_file" />
        <Typography className="mb-1">:Upload</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="can_download_file" />
        <Typography className="mb-1">:Download</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="clipboard_down" />
        <Typography className="mb-1">:Clipboard from Server</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="clipboard_up" />
        <Typography className="mb-1">:Clipboard from Client</Typography>
      </div>

      {/* <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="webcam_privilege" />
        <Typography className="mb-1">:Webcam Privilege</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch control={control} name="microphone_privilege" />
        <Typography className="mb-1">:Microphone Privilege</Typography>
      </div>

      <div className="px-2 col-span-3">
        <DlpList
          name="forbidden_download_files"
          valueList={dlpDownloadList}
          onChange={handleSetDlpValues}
          label=":DLP Download"
        />
      </div>
      <div className="px-2 col-span-3">
        <DlpList
          name="forbidden_upload_files"
          valueList={dlpUploadList}
          onChange={handleSetDlpValues}
          label=":DLP Upload"
        />
      </div> */}

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
