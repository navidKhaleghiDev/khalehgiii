import { Typography } from "@ui/atoms/Typography/Typography";
import { BaseInput, Card } from "@ui/atoms";
import { useState } from "react";
import { BaseButton, IconButton } from "@ui/atoms/BaseButton";
import { Divider } from "@ui/atoms/Divider";
import { FieldValues, useForm } from "react-hook-form";
import { Dropdown } from "@ui/atoms/DropDown";

enum ETimeLimitDuration {
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  PERMANENTLY = "PERMANENTLY",
}

interface IUpdateDaasValues extends FieldValues {
  time_limit_duration: ETimeLimitDuration;
  time_limit_value?: number;
}

const options = [
  {
    id: ETimeLimitDuration.DAILY,
    label: "روزانه",
    value: ETimeLimitDuration.DAILY,
  },
  {
    id: ETimeLimitDuration.WEEKLY,
    label: "هفتگی",
    value: ETimeLimitDuration.WEEKLY,
  },
  {
    id: ETimeLimitDuration.MONTHLY,
    label: "ماهانه",
    value: ETimeLimitDuration.MONTHLY,
  },
  {
    id: ETimeLimitDuration.PERMANENTLY,
    label: "دايمی",
    value: ETimeLimitDuration.PERMANENTLY,
  },
];

export function SetAccessTime({ id }: any) {
  const [isEditable, setIsEditable] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const { control, handleSubmit, reset, getValues } =
    useForm<IUpdateDaasValues>({
      mode: "onChange",
      // defaultValues: {
      //   id: null,
      //   keycloak_base_url: "",
      //   keycloak_port: "",
      //   keycloak_ssl: false,
      //   keycloak_client_id: "",
      //   keycloak_secret: "",
      //   keycloak_realm: "",
      //   daas_provider_baseurl: "",
      // },
    });

  function onClickActions(): void {
    console.log(id);
  }

  const handleOnSubmit = async (data: any) => {
    console.log({ data });
    setIsEditable(false);
    // setLoadingButton(true);

    // if (data?.id) {
    //   // update
    //   await API_ADD_UPDATE(data)
    //     .then(() => {
    //       toast.success("با موفقیت بروزرسانی شد");
    //     })
    //     .catch((err) => {
    //       toast.error(err);
    //     })
    //     .finally(() => setLoadingButton(false));
    //   return;
    // }
    // // add new product
    // await API_ADD_CONFIG(data)
    //   .then(() => {
    //     toast.success("با موفقیت ذخیره شد");
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   })
    //   .finally(() => setLoadingButton(false));
  };

  return (
    <div className="w-full flex justify-center">
      {!isEditable ? (
        <Card color="white" className="px-2 h-6 w-64 ">
          <div className="flex items-center justify-between  h-full">
            <div className="flex items-center justify-between text-teal-600">
              <Typography size="body3" color="teal">
                سالانه
              </Typography>
              <div className="h-4 px-10">
                <Divider vr />
              </div>
              <Typography size="body3" color="teal">
                10 ساعت
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
            containerClassName="col-span-5 xl:col-span-5"
            fullWidth
            hiddenError
          />
          <BaseInput
            control={control}
            size="xs"
            id="time_limit_value"
            name="time_limit_value"
            placeholder="ساعت مورد نظر را وارد کنید"
            className="col-span-5 lg:col-span-5"
            hiddenError
          />

          <BaseButton
            label="ثبت"
            submit
            size="sm"
            loading={loadingButton}
            className="col-span-2 lg:col-span-2"
          />
        </form>
      )}
    </div>
  );
}
