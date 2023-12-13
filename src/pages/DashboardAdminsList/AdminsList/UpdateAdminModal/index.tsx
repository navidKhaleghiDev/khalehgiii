import { BaseButton } from "@ui/atoms/BaseButton";
import { BaseInput, Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";
import { regexPattern } from "@ui/atoms/Inputs";
import { toast } from "react-toastify";
import { IUser } from "@src/services/users/types";
import { API_UPDATE_USER, API_CREATE_USER } from "@src/services/users";
import { PasswordInput } from "@ui/atoms/Inputs/PasswordInput";

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<IUser>;
};

export function UpdateAdminModal({ handleClose, admin }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const { control, handleSubmit } = useForm<IUser>({
    mode: "onChange",
    defaultValues: {
      id: admin?.id,
      email: admin?.email,
      username: admin?.username,
      first_name: admin?.first_name ?? "",
      last_name: admin?.last_name ?? "",
      is_meta_admin: admin?.is_meta_admin ?? false,
    },
  });

  const handleOnSubmit = async (data: IUser) => {
    setLoadingButtonModal(true);

    if (data.id) {
      await API_UPDATE_USER(data as IUser, data?.id as number)
        .then(() => {
          toast.success("با موفقیت بروزرسانی شد.");
          handleClose(true);
        })
        .catch((err) => {
          toast.error(err);
          setShowConfirm(false);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
      return;
    }

    await API_CREATE_USER(data)
      .then(() => {
        toast.success("با موفقیت اضافه شد.");
        handleClose(true);
      })
      .catch((err) => {
        toast.error(err);
        setShowConfirm(false);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-4 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
        <BaseInput
          control={control}
          name="first_name"
          id="first_name"
          label="نام"
          placeholder="نام"
          fullWidth
          maxLength={60}
          rules={{
            pattern: regexPattern.farsiLetter,
          }}
        />
        <BaseInput
          control={control}
          name="last_name"
          id="last_name"
          placeholder="نام خانوادگی"
          label="نام خانوادگی"
          fullWidth
          maxLength={60}
          rules={{
            pattern: regexPattern.farsiLetter,
          }}
        />
      </div>
      <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
        <BaseInput
          control={control}
          name="username"
          id="username"
          placeholder="username"
          label="نام کاربری"
          fullWidth
          maxLength={60}
          rules={{
            pattern: regexPattern.enCharAndNumber,
            required: regexPattern.required,
          }}
        />
        {!admin?.id && (
          <PasswordInput
            label="رمز عبور"
            name="password"
            control={control}
            placeholder="تکرار گذرواژه جدید"
            rules={{
              pattern: regexPattern.enCharAndNumber,
              required: regexPattern.required,
            }}
          />
        )}
      </div>
      <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
        <div className="w-1/2">
          <BaseInput
            control={control}
            name="email"
            id="email"
            label="ایمیل"
            placeholder="email@email.com"
            fullWidth
            maxLength={60}
            rules={{
              pattern: regexPattern.email,
              required: regexPattern.required,
            }}
          />
        </div>

        <div className="w-1/3 flex justify-between items-center mt-2">
          <Typography className="mb-1" type="h4" color="teal">
            :سوپر ادمین
          </Typography>
          <BaseSwitch control={control} name="is_meta_admin" />
        </div>
      </div>

      <Typography className="px-2 col-span-6 flex justify-start" color="red">
        1- هرکاربری که اضافه میشود ، به عنوان ادمین سیستم شناخته و دسترسی برای
        تغییرات سامانه را دارد.
      </Typography>

      <Typography className="px-2 col-span-6 flex justify-start" color="red">
        2- توجه داشته باشید کاربری که به عنوان سوپر ادمین شناخته شود ‌، قابلیت
        اضافه و حذف کردن دیگر ادمین هارا دارد.
      </Typography>
      <div className="flex justify-center col-span-6">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">آیا مطمین هستید؟</Typography>
            <BaseButton
              label={"بله"}
              size="sm"
              submit
              className="mx-2"
              loading={loadingButtonModal}
            />
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
          <div className="flex gap-2">
            <BaseButton
              label={"ثبت"}
              size="md"
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label={"لغو"}
              type="red"
              size="md"
              onClick={() => handleClose(true)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
