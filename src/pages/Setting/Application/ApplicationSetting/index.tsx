import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { Divider } from '@ui/atoms/Divider';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionKeycloak } from '@src/types/permissions';
import { BaseButton, Typography } from '@redesignUi/atoms';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { inputRegexPattern } from '@redesignUi/atoms/Inputs/Regex';
import { regexPattern } from '@redesignUi/atoms/Inputs';
import { TitleSection } from '@redesignUi/atoms/TitleSection';
import {
  API_ADD_CONFIG,
  API_ADD_UPDATE,
  API_CONFIG_LIST,
} from '@src/services/config';

import { ApplicationSettingProp } from '../../type';

interface ApplicationSettingProps {
  userExist?: boolean;
  dir?: 'rtl' | 'ltr';
}
export function ApplicationSetting({
  userExist,
  dir,
}: ApplicationSettingProps) {
  const { t } = useTranslation();
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyles = 'col-span-6 lg:col-span-4';

  const userPermissions = useUserPermission();
  const SettingsKeycloakP = checkPermission(
    userPermissions,
    EPermissionKeycloak.VIEW
  );

  const { control, handleSubmit, reset, formState } =
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

  const handleOnSubmit = async (data: ApplicationSettingProp) => {
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
    <div>
      <div className=" mb-[2.87rem]">
        <Typography
          color="black"
          variant="body2B"
          className="w-full col-span-12 dark:text-white"
        >
          {t('setting.application')}
        </Typography>
      </div>
      <form
        className="w-full h-full flex flex-col justify-between"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {SettingsKeycloakP ? (
          <>
            <TitleSection label={t('setting.sso')} />

            <div className="grid w-full grid-cols-12 gap-x-[1.87rem] gap-y-5">
              <div className={inputStyles}>
                <BaseInputController
                  id="keycloak_base_url"
                  name="keycloak_base_url"
                  rules={{
                    required: inputRegexPattern.required,
                  }}
                  control={control}
                  label={t('setting.ssoBaseURL')}
                  placeholder="http://localhost"
                  fullWidth
                  dir={dir}
                />
              </div>
              <div className={inputStyles}>
                <BaseInputController
                  id="keycloak_client_id"
                  name="keycloak_client_id"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label={t('setting.ssoClientID')}
                  placeholder={t('setting.clientIDP')}
                  fullWidth
                  dir={dir}
                />
              </div>

              <div className={inputStyles}>
                <BaseInputController
                  id="keycloak_secret"
                  name="keycloak_secret"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label={t('setting.ssoSecret')}
                  placeholder={t('setting.secretP')}
                  fullWidth
                  dir={dir}
                />
              </div>

              <div className={inputStyles}>
                <BaseInputController
                  id="keycloak_port"
                  name="keycloak_port"
                  rules={{
                    required: regexPattern.required,
                    pattern: regexPattern.numbers,
                  }}
                  control={control}
                  label={t('setting.ssoPort')}
                  placeholder="8080"
                  fullWidth
                  dir={dir}
                />
              </div>
              <div className={inputStyles}>
                <BaseInputController
                  id="keycloak_realm"
                  name="keycloak_realm"
                  rules={{
                    required: regexPattern.required,
                  }}
                  control={control}
                  label="SSO realm"
                  placeholder={t('setting.realmP')}
                  fullWidth
                  dir={dir}
                />
              </div>
            </div>
          </>
        ) : null}
        <Divider />
        <TitleSection label={t('setting.logServer')} />

        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
          <div className={inputStyles}>
            <BaseInputController
              id="log_server_ip"
              name="log_server_ip"
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.ip,
              }}
              control={control}
              label={t('setting.logServerIP')}
              placeholder="192.168.1.1"
              fullWidth
              dir={dir}
            />
          </div>
          <div className={inputStyles}>
            <BaseInputController
              id="log_server_port"
              name="log_server_port"
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.numbers,
              }}
              control={control}
              label={t('setting.logServerPort')}
              placeholder="8000"
              fullWidth
              dir={dir}
            />
          </div>
        </div>
        <Divider />
        <TitleSection label={t('setting.manager')} />

        <div className="grid w-full grid-cols-12 gap-[1.87rem] mt-5">
          <div className={inputStyles}>
            <BaseInputController
              id="daas_provider_baseurl"
              name="daas_provider_baseurl"
              rules={{
                required: inputRegexPattern.required,
              }}
              control={control}
              label={t('setting.daasProvider')}
              placeholder="sep.npd-co.com"
              fullWidth
              dir={dir}
            />
          </div>
        </div>
        <div className="flex self-end mt-8 lg:mt-[10.5rem] w-40 sm:w-[11.875rem]">
          <BaseButton
            label={t('dashboard.saveChanges')}
            disabled={!formState.isDirty}
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
