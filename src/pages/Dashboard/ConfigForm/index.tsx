import { useEffect, useState } from "react";
import { BaseButton, BaseInput, Typography } from "@ui/atoms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { regexPattern } from "@ui/atoms/Inputs";
import { IAddConfig } from "@src/services/config/types";
import {
  API_ADD_CONFIG,
  API_ADD_UPDATE,
  API_CONFIG_LIST,
} from "@src/services/config";
import { IUser } from "@src/services/users/types";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";

export function ConfigForm({ user }: { user: IUser | null }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, reset, getValues } = useForm<IAddConfig>({
    mode: "onChange",
    defaultValues: {
      id: null,
      keycloak_base_url: "",
      keycloak_port: "",
      keycloak_ssl: false,
      keycloak_client_id: "",
      keycloak_secret: "",
      keycloak_realm: "",
      daas_provider_baseurl: "",
    },
  });

  useEffect(() => {
    const getConfig = async () => {
      await API_CONFIG_LIST()
        .then(({ data }) => {
          if (data[0]) {
            reset(data[0]);
          }
        })
        .catch(() => {
          // ...
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (user) {
      getConfig();
    }
  }, []);

  const handleOnSubmit = async (data: IAddConfig) => {
    setLoadingButton(true);

    if (data?.id) {
      // update
      await API_ADD_UPDATE(data)
        .then(() => {
          toast.success("با موفقیت بروزرسانی شد");
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => setLoadingButton(false));
      return;
    }
    // add new product
    await API_ADD_CONFIG(data)
      .then(() => {
        toast.success("با موفقیت ذخیره شد");
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setLoadingButton(false));
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <form
      className=" w-full flex flex-col items-center justify-between"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Typography
        color="neutral"
        size="h5"
        className="w-full my-8 col-span-12 text-right"
      >
        تنظیمات مربوط به keycloak خود را وارد نمایید
      </Typography>
      <div className="grid w-full grid-cols-12 gap-16" dir="ltr">
        <div className="col-span-4">
          <BaseInput
            id="keycloak_base_url"
            name="keycloak_base_url"
            rules={{
              required: regexPattern.required,
              // pattern: regexPattern.url,
            }}
            control={control}
            label="keycloak base url"
            placeholder="http://localhost"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="keycloak_client_id"
            name="keycloak_client_id"
            rules={{
              required: regexPattern.required,
            }}
            control={control}
            label="keycloak client id"
            placeholder="client id"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="keycloak_realm"
            name="keycloak_realm"
            rules={{
              required: regexPattern.required,
            }}
            control={control}
            label="keycloak realm"
            placeholder="realm"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="keycloak_secret"
            name="keycloak_secret"
            rules={{
              required: regexPattern.required,
            }}
            control={control}
            label="keycloak secret"
            placeholder="secret"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="daas_provider_baseurl"
            name="daas_provider_baseurl"
            rules={{
              required: regexPattern.required,
              // pattern: regexPattern.ip,
            }}
            control={control}
            label="daas provider baseurl"
            placeholder="192.168.2.21"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="keycloak_port"
            name="keycloak_port"
            rules={{
              required: regexPattern.required,
              pattern: regexPattern.numbers,
            }}
            control={control}
            label="keycloak port"
            placeholder="8080"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseSwitch
            name="keycloak_ssl"
            control={control}
            label="keycloak ssl"
          />
        </div>
      </div>

      <BaseButton
        label={getValues("id") ? "بروزرسانی تنظیمات" : "ذخیره تنظیمات"}
        size="xl"
        submit
        loading={loadingButton}
      />
    </form>
  );
}
