import { Avatar } from "@ui/atoms/Avatar";
import { BaseButton } from "@ui/atoms/BaseButton";
import { useNavigate } from "react-router-dom";
import { BaseInput, regexPattern } from "@ui/atoms/Inputs";
import { Typography } from "@ui/atoms/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { API_USERS_LOGIN, STORAGE_KEY_USER } from "@src/services/users";
import { PasswordInput } from "@ui/atoms/Inputs/PasswordInput";
import { toast } from "react-toastify";

import { ILoginFieldValues } from "../types";
import { loginString as strings } from "./string";
import { ToggleSwitch } from "@ui/atoms/ToggleSwitch";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILoginFieldValues>({
    mode: "onChange",
    defaultValues: {
      is_admin: false,
    },
  });

  const handelSubmitForm = async ({
    email,
    password,
    is_admin,
  }: ILoginFieldValues) => {
    setLoadingButton(true);
    await API_USERS_LOGIN({ email, password, is_admin })
      .then(({ data }) => {
        localStorage.setItem(
          STORAGE_KEY_USER,
          JSON.stringify({ ...data, email, password, is_admin })
        );
        toast.success(strings.loginSuccess);
        navigate(ROUTES_PATH.dashboard);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handelSubmitForm)}
      className="flex flex-col items-center w-full mt-auto"
    >
      <div className="absolute top-[-6rem]">
        <Avatar icon="ph:user" intent="grey" size="lg" />
      </div>
      <Typography color="neutral" size="h5" className="mb-5">
        {strings.enterEmailAndPass}
      </Typography>
      {error && (
        <Typography color="red" size="body3" className="mb-2">
          {error}
        </Typography>
      )}
      <div className="w-full flex flex-col items-center justify-end">
        <BaseInput
          fullWidth
          control={control}
          placeholder="email"
          rules={{
            required: regexPattern.required,
          }}
          id="email"
          name="email"
          endIcon="ph:user"
        />
        <PasswordInput
          name="password"
          control={control}
          placeholder="password"
        />
        <div className="w-full flex justify-between items-center">
          <ToggleSwitch
            control={control}
            leftButton={{
              icon: "iconamoon:arrow-left-2-light",
              label: "ادمین",
            }}
            rightButton={{
              icon: "ph:shield-warning",
              label: "کاربر",
            }}
            name="is_admin"
          />
        </div>

        <BaseButton
          label="ورود به حساب کاربری"
          endIcon="ic:round-login"
          className="mt-8"
          loading={loadingButton}
          size="md"
          submit
          fullWidth
        />
      </div>
    </form>
  );
}
