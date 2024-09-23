import { useEffect, useState } from 'react';
import { BaseButton, BaseInput, Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { regexPattern } from '@ui/atoms/Inputs';
import { IAddConfig } from '@src/services/config/types';
import {
  API_ADD_CONFIG,
  API_ADD_UPDATE,
  API_CONFIG_LIST,
} from '@src/services/config';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { Divider } from '@ui/atoms/Divider';
import { useTranslation } from 'react-i18next';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionKeycloak } from '@src/types/permissions';

function TitleSection({ label }: { label: string }) {
  return (
    <Typography
      color="neutral"
      variant="h5"
      className="w-full my-4 col-span-12 text-left uppercase"
    >
      {label}
    </Typography>
  );
}
export function SettingsKeycloakCp({ userExist }: { userExist?: boolean }) {
  const { t } = useTranslation();
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const userPermissions = useUserPermission();
  const SettingsKeycloakP = checkPermission(
    userPermissions,
    EPermissionKeycloak.VIEW
  );

  const { control, handleSubmit, reset, getValues, formState } =
    useForm<IAddConfig>({
      mode: 'onChange',
      defaultValues: {
        id: null,
        keycloak_base_url: '',
        keycloak_port: '',
        keycloak_ssl: false,
        keycloak_client_id: '',
        keycloak_secret: '',
        keycloak_realm: '',
        daas_provider_baseurl: '',
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
    if (userExist) {
      getConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = async (data: IAddConfig) => {
    setLoadingButton(true);

    if (data?.id) {
      // update
      await API_ADD_UPDATE(data)
        .then(() => {
          toast.success(t('global.sucessfulyUpdated'));
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
        toast.success(t('global.sucessfylySaved'));
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
      {SettingsKeycloakP ? (
        <>
          <TitleSection label="keycloak" />
          <Divider />
          <div className="grid w-full grid-cols-12 gap-16 mt-4" dir="ltr">
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
            {/* <div className="col-span-4">
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
      </div> */}
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
        </>
      ) : null}
      <TitleSection label="log server" />

      <Divider />
      <div className="grid w-full grid-cols-12 gap-16 mt-4" dir="ltr">
        <div className="col-span-4">
          <BaseInput
            id="log_server_ip"
            name="log_server_ip"
            rules={{
              required: regexPattern.required,
              pattern: regexPattern.ip,
            }}
            control={control}
            label="log server ip"
            placeholder="192.168.1.1"
            ltrLabel
            fullWidth
          />
        </div>
        <div className="col-span-4">
          <BaseInput
            id="log_server_port"
            name="log_server_port"
            rules={{
              required: regexPattern.required,
              // pattern: regexPattern.ip,
            }}
            control={control}
            label="log server port"
            placeholder="8000"
            ltrLabel
            fullWidth
          />
        </div>
      </div>

      <TitleSection label="manager" />

      <Divider />
      <div className="grid w-full grid-cols-12 gap-16 mt-4" dir="ltr">
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
      </div>

      <BaseButton
        label={
          getValues('id')
            ? t('dashboard.updateSetting')
            : t('dashboard.saveSettings')
        }
        size="xl"
        submit
        loading={loadingButton}
        disabled={!formState.isDirty}
      />
    </form>
  );
}
