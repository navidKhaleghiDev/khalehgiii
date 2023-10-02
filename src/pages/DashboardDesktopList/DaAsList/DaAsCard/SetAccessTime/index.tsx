import { Typography } from "@ui/atoms/Typography/Typography";
import { BaseInput, Card } from "@ui/atoms";
import { useEffect, useState } from "react";
import { BaseButton, IconButton } from "@ui/atoms/BaseButton";
import { Divider } from "@ui/atoms/Divider";
import { FieldValues, useForm } from "react-hook-form";
import { Dropdown } from "@ui/atoms/DropDown";
import { API_DAAS_UPDATE } from "@src/services/users";
import { toast } from "react-toastify";
import { regexPattern } from "@ui/atoms/Inputs";
import { ETimeLimitDuration } from "@src/services/users/types";
import { OnClickActionsType } from "..";
import { TimeLimitDurationLabel } from "@src/constants/accessTime";

interface IUpdateDaasValues extends FieldValues {
  time_limit_duration: ETimeLimitDuration;
  time_limit_value_in_hour?: number;
}

const options = [
  {
    id: ETimeLimitDuration.DAILY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.DAILY],
    value: ETimeLimitDuration.DAILY,
  },
  {
    id: ETimeLimitDuration.WEEKLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.WEEKLY],
    value: ETimeLimitDuration.WEEKLY,
  },
  {
    id: ETimeLimitDuration.MONTHLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.MONTHLY],
    value: ETimeLimitDuration.MONTHLY,
  },
  {
    id: ETimeLimitDuration.PERMANENTLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.PERMANENTLY],
    value: ETimeLimitDuration.PERMANENTLY,
  },
];

type PropsType = {
  id: string;
  onClickActions?: OnClickActionsType;
  timeLimitDuration: ETimeLimitDuration;
  timeLimitValue: number;
};
export function SetAccessTime({
  id,
  onClickActions,
  timeLimitDuration,
  timeLimitValue,
}: PropsType) {
  const [isEditable, setIsEditable] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { control, handleSubmit, reset } = useForm<IUpdateDaasValues>({
    mode: "onChange",
  });

  useEffect(() => {
    if (timeLimitDuration && timeLimitValue) {
      reset({
        time_limit_duration: timeLimitDuration,
        time_limit_value_in_hour: timeLimitValue,
      });
    }
  }, []);

  const handleOnCancel = () => {
    reset();
    setIsEditable(false);
  };

  const handleOnSubmit = async (data: IUpdateDaasValues) => {
    setLoadingButton(true);

    await API_DAAS_UPDATE(id, {
      ...data,
      time_limit_value_in_hour: Number(data.time_limit_value_in_hour),
    })
      .then(() => {
        setIsEditable(false);
        toast.success("با موفقیت بروزرسانی شد");
        onClickActions && onClickActions("mutate");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <div className="w-full flex justify-center">
      {!isEditable ? (
        <Card color="white" className="px-2 h-6 w-64 ">
          <div className="flex items-center justify-between  h-full">
            <div className="flex items-center justify-between text-teal-600">
              <Typography size="body3" color="teal">
                {TimeLimitDurationLabel[timeLimitDuration]}
              </Typography>
              <div className="h-4 px-10">
                <Divider vr />
              </div>
              <Typography size="body3" color="teal">
                {timeLimitDuration !== ETimeLimitDuration.PERMANENTLY
                  ? `${timeLimitValue} ساعت`
                  : "---"}
              </Typography>
            </div>
            <IconButton
              icon="ph:note-pencil"
              color="tealNoBg"
              onClick={() => setIsEditable(true)}
            />
          </div>
        </Card>
      ) : (
        <form
          className="grid grid-cols-12 items-center gap-2"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Dropdown
            control={control}
            size="xs"
            id="time_limit_duration"
            name="time_limit_duration"
            options={options}
            placeHolder="زمان مورد نظر را انتخاب کنید"
            containerClassName="col-span-6 xl:col-span-4"
            rules={{
              required: regexPattern.required,
            }}
            fullWidth
            hiddenError
          />
          <BaseInput
            control={control}
            size="xs"
            id="time_limit_value_in_hour"
            name="time_limit_value_in_hour"
            placeholder="ساعت مورد نظر را وارد کنید"
            className="col-span-6 lg:col-span-4"
            rules={{
              required: regexPattern.required,
              pattern: regexPattern.numbers,
            }}
            fullWidth
            hiddenError
          />
          <div className="col-span-6 lg:col-span-4 flex justify-start items-center">
            <BaseButton
              label="ثبت"
              submit
              size="sm"
              loading={loadingButton}
              className="ml-2"
            />
            <IconButton icon="ph:x" color="red" onClick={handleOnCancel} />
          </div>
        </form>
      )}
    </div>
  );
}
