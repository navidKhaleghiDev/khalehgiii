import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { regexPattern } from '@ui/atoms/Inputs';
import { IAddConfig } from '@src/services/config/types';
import {
  API_ADD_CONFIG,
  API_ADD_UPDATE,
  API_CONFIG_LIST,
} from '@src/services/config';
import { Divider } from '@ui/atoms/Divider';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionKeycloak } from '@src/types/permissions';
import { BaseButton, Typography } from '@redesignUi/atoms';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { useLanguage } from '@context/settings/languageContext';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';

import { ApplicationSettingProp } from '../type';

function TitleSection({ label }: { label: string }) {
  return (
    <Typography
      color="black"
      variant="body4B"
      className="w-full col-span-12 dark:text-white"
    >
      {label}
    </Typography>
  );
}
export function DassSetting({ userExist }: { userExist?: boolean }) {
  const { t } = useTranslation();
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();
  const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const userPermissions = useUserPermission();
  const SettingsKeycloakP = checkPermission(
    userPermissions,
    EPermissionKeycloak.VIEW
  );

  const { control, handleSubmit, reset, getValues } =
    useForm<ApplicationSettingProp>({
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
  }, [reset, userExist]);

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
    <div className="mx-5">
      <div className="mb-10">
        <TitleSection label="Application" />
      </div>
      <form
        className="w-full h-full flex flex-col justify-between"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {SettingsKeycloakP ? (
          <>
            <TitleSection label="SSO" />
            <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-4">
              <div className="col-span-6 lg:col-span-4">
                <BaseInputController
                  id="keycloak_base_url"
                  name="keycloak_base_url"
                  rules={{
                    required: regexPattern.required,
                    pattern: regexPattern.url,
                  }}
                  control={control}
                  label="SSO base URL"
                  placeholder="http://localhost"
                  fullWidth
                  dir={direction}
                />
              </div>
              <div className="col-span-6 lg:col-span-4">
                <BaseInputController
                  id="keycloak_client_id"
                  name="keycloak_client_id"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label="SSO client ID"
                  placeholder="client id"
                  fullWidth
                  dir={direction}
                />
              </div>

              <div className="col-span-6 lg:col-span-4">
                <BaseInputController
                  id="keycloak_secret"
                  name="keycloak_secret"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label="SSO Secret"
                  placeholder="secret"
                  fullWidth
                  dir={direction}
                />
              </div>

              <div className="col-span-6 lg:col-span-4">
                <BaseInputController
                  id="keycloak_port"
                  name="keycloak_port"
                  rules={{
                    required: regexPattern.required,
                    pattern: regexPattern.numbers,
                  }}
                  control={control}
                  label="SSO Port"
                  placeholder="8080"
                  fullWidth
                  dir={direction}
                />
              </div>
              <div className="col-span-6 lg:col-span-4">
                <BaseInputController
                  id="keycloak_realm"
                  name="keycloak_realm"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label="SSO realm"
                  placeholder="realm"
                  fullWidth
                  dir={direction}
                />
              </div>
            </div>
          </>
        ) : null}
        <Divider />

        <TitleSection label="Log Server" />

        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-4">
          <div className="col-span-6 lg:col-span-4">
            <BaseInputController
              id="log_server_port"
              name="log_server_port"
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
              control={control}
              label="Log Server Port"
              placeholder="8000"
              fullWidth
              dir={direction}
            />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <BaseInputController
              id="log_server_ip"
              name="log_server_ip"
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.ip,
              }}
              control={control}
              label="Log Server IP"
              placeholder="192.168.1.1"
              fullWidth
              dir={direction}
            />
          </div>
        </div>
        <Divider />

        <TitleSection label="Manager" />

        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
          <div className="col-span-6 lg:col-span-4">
            <BaseInputController
              id="daas_provider_baseurl"
              name="daas_provider_baseurl"
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.url,
              }}
              control={control}
              label="Daas provider baseURL"
              placeholder="sep.npd-co.com"
              fullWidth
              dir={direction}
            />
          </div>
        </div>
        <div className="mt-5 w-40 md:w-[11.88rem] h-10 ">
          <BaseButton
            label={
              getValues('id')
                ? t('dashboard.updateSetting')
                : t('dashboard.saveChanges')
            }
            size="lg"
            submit
            loading={loadingButton}
            fullWidth
          />
        </div>
      </form>
    </div>
  );
}
