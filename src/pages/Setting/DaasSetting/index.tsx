import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ISwrResponse } from '@src/types/services';
import { E_DAAS_CONFIGS } from '@src/services/config/endpoint';
import { http } from '@src/services/http';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { API_UPDATE_DAAS_CONFIG } from '@src/services/config';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { BaseButton } from '@redesignUi/atoms';

import { DaasSettingForm } from './DaasSettingForm';
import { DaasSettingProp } from '../type';

export function DaasSetting() {
  const { t } = useTranslation();
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: daasConfig, isLoading } = useSWR<ISwrResponse<DaasSettingProp>>(
    E_DAAS_CONFIGS,
    http.fetcherSWR
  );
  const userPermissions = useUserPermission();

  const { control, handleSubmit, getValues, reset, formState } =
    useForm<DaasSettingProp>({
      mode: 'onChange',
      defaultValues: {
        id: daasConfig?.data?.id,
        can_upload_file: daasConfig?.data?.can_upload_file,
        can_download_file: daasConfig?.data?.can_download_file,
        max_transmission_download_size:
          daasConfig?.data?.max_transmission_download_size,
        max_transmission_upload_size:
          daasConfig?.data?.max_transmission_upload_size,
        time_limit_duration: daasConfig?.data?.time_limit_duration,
      },
    });

  useEffect(() => {
    if (daasConfig?.data) {
      reset(daasConfig.data);
    }
  }, [daasConfig, reset]);

  const handleOnUpdate = async () => {
    const updatedDaasSetting = getValues();
    setLoadingButton(false);

    if (updatedDaasSetting.id) {
      await API_UPDATE_DAAS_CONFIG(updatedDaasSetting)
        .then(() => {
          toast.success(t('global.sucessfulyUpdated'));
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButton(true);
        });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-between"
      onSubmit={handleSubmit(handleOnUpdate)}
    >
      <DaasSettingForm control={control} userPermissions={userPermissions} />

      <div className="flex self-end mt-8 lg:mt-[10rem]">
        <BaseButton
          label={t('dashboard.saveChanges')}
          loading={loadingButton}
          submit
          disabled={!formState.isDirty}
          type="teal"
          className="mb-1"
        />
      </div>
    </form>
  );
}
