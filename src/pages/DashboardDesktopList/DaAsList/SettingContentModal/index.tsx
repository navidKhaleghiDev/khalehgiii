import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";
import { IDaAs } from "@src/services/users/types";
import { BaseButton } from "@ui/atoms/BaseButton";

import { Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
};

export function SettingContentModal({ handleOnChange, daas }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { control, handleSubmit } = useForm<IDaAs>({
    mode: "onChange",
    defaultValues: {
      can_upload_file: daas.can_upload_file,
      can_download_file: daas.can_download_file,
      clipboard_down: daas.clipboard_down,
      clipboard_up: daas.clipboard_up,
    },
  });

  const handleOnSubmit = (data: IDaAs) => {
    handleOnChange({ ...daas, ...data });
  };

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
