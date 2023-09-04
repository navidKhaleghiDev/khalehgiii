import {
  persianDateAndNumber,
  persianDayLabel,
} from "@src/helper/utils/dateUtils";
import { useEffect, useState } from "react";
import { BaseButton, BaseInput } from "@ui/atoms";
import { BaseTextarea } from "@ui/atoms/Inputs/BaseTextarea";
import { PageBackButton } from "@ui/atoms/BackButton/PageBackButton";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { E_PRODUCTS } from "@src/services/server/products/endpoint";
import {
  API_ADD_PRODUCT,
  API_UPDATE_PRODUCT,
} from "@src/services/server/products";
import { toast } from "react-toastify";
import { regexPattern } from "@ui/atoms/Inputs";

import { BoxDashboard } from "../BoxDashboard";
import { IAddConfig } from "@src/services/config/types";
import {
  API_ADD_CONFIG,
  API_ADD_UPDATE,
  API_CONFIG_LIST,
} from "@src/services/config";
import { IUser } from "@src/services/client/users/types";
import { BaseSwitch } from "@ui/atoms/BaseSwitch";

export function ConfigForm({ user }: { user: IUser }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState<IAddConfig>();

  const { control, handleSubmit, reset, watch } = useForm<IAddConfig>({
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
      await API_CONFIG_LIST({ username: user.email, password: user.password })
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

  // useEffect(() => {
  //   if (config) {
  //     reset(config);
  //   }
  // }, [config, reset]);

  const handleOnSubmit = async (data: IAddConfig) => {
    setLoadingButton(true);

    if (data?.id) {
      // update
      await API_ADD_UPDATE(data)
        .then(() => {
          console.log({ data });

          // toast.success("با موفقیت بروزرسانی شد");
          // mutate();
          // handleChangeContent();
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
        console.log({ data });

        // toast.success("با موفقیت بروزرسانی شد");
        // mutate();
        // handleChangeContent();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setLoadingButton(false));
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="w-full flex flex-col h-full p-16 2xl:container">
        <div className="grid grid-cols-3 gap-6 mb-16">
          <BoxDashboard
            icon="ph:calendar-check"
            title={persianDayLabel()}
            description={persianDateAndNumber()}
          />
        </div>
        <form
          className="flex flex-col items-center justify-between h-full"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="grid w-full grid-cols-12 gap-16" dir="ltr">
            <div className="col-span-4">
              <BaseInput
                id="keycloak_base_url"
                name="keycloak_base_url"
                rules={{
                  required: regexPattern.required,
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
                  pattern: regexPattern.ip,
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
            label="ذخیره تنظیمات"
            size="xl"
            submit
            loading={loadingButton}
            className="mt-24"
          />
        </form>
      </div>
    </div>
  );
}
