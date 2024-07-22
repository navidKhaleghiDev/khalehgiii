import { BaseButton } from '@ui/atoms/BaseButton';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { DaasConfigForm } from '@ui/utils/DaasConfigForm';
import { IDaasConfig } from '@src/services/config/types';
import useSWR from 'swr';
import { ISwrResponse } from '@src/types/services';
import { E_DAAS_CONFIGS } from '@src/services/config/endpoint';
import { http } from '@src/services/http';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { Modal } from '@ui/molecules/Modal';
import { API_UPDATE_DAAS_CONFIG } from '@src/services/config';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useUserPermission } from '@src/helper/hooks/usePermission';

export function DaasConfigCp() {
  const { t } = useTranslation();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const { data: daasConfig, isLoading } = useSWR<ISwrResponse<IDaasConfig>>(
    E_DAAS_CONFIGS,
    http.fetcherSWR
  );
  const userPermissions = useUserPermission();

  const { control, handleSubmit, getValues, reset, formState } =
    useForm<IDaasConfig>({
      mode: 'onChange',
      defaultValues: {
        id: daasConfig?.data?.id,
        can_upload_file: daasConfig?.data?.can_upload_file,
        can_download_file: daasConfig?.data?.can_download_file,
        clipboard_down: daasConfig?.data?.clipboard_down,
        clipboard_up: daasConfig?.data?.clipboard_up,
        webcam_privilege: daasConfig?.data?.webcam_privilege,
        microphone_privilege: daasConfig?.data?.microphone_privilege,
        max_transmission_download_size:
          daasConfig?.data?.max_transmission_download_size,
        max_transmission_upload_size:
          daasConfig?.data?.max_transmission_upload_size,
      },
    });

  useEffect(() => {
    reset(daasConfig?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daasConfig]);

  const handleOnSubmit = () => {
    setOpenConfirmModal(true);
  };

  const handleOnUpdate = async () => {
    const updatedDaasConfig = getValues();
    setLoadingButtonModal(true);

    if (updatedDaasConfig.id) {
      await API_UPDATE_DAAS_CONFIG(updatedDaasConfig)
        .then(() => {
          toast.success(t('global.sucessfulyUpdated'));
          setOpenConfirmModal(false);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <DaasConfigForm
        control={control}
        userPermissions={userPermissions}
        isMetaConfig
      />

      <div className="flex justify-center col-span-6">
        <BaseButton
          label={t('dashboard.update')}
          size="md"
          type="default"
          disabled={!formState.isDirty}
          submit
        />
      </div>
      <Modal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnUpdate,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenConfirmModal(false),
          color: 'red',
        }}
      />
    </form>
  );
}
