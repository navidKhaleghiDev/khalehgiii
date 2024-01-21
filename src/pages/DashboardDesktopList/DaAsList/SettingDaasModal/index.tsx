import { IDaAs } from '@src/services/users/types';
import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { DaasConfigForm } from '@ui/utils/DaasConfigForm';
import { DlpSettingsForm } from '@ui/utils/DlpSettingsForm';
import { IDaasConfig } from '@src/services/config/types';
import { ExtendTwoType } from '@src/types/global';
import { useTranslation } from 'react-i18next';

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
};

export function SettingDaasModal({ handleOnChange, daas }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const { control, handleSubmit, setValue, watch } = useForm<
    ExtendTwoType<IDaAs, IDaasConfig>
  >({
    mode: 'onChange',
    defaultValues: {
      id: daas?.id,
      time_limit_duration: daas.daas_configs.time_limit_duration,
      time_limit_value_in_hour: daas.daas_configs.time_limit_value_in_hour,
      can_upload_file: daas.daas_configs.can_upload_file,
      can_download_file: daas.daas_configs.can_download_file,
      clipboard_down: daas.daas_configs.clipboard_down,
      clipboard_up: daas.daas_configs.clipboard_up,
      webcam_privilege: daas.daas_configs.webcam_privilege,
      microphone_privilege: daas.daas_configs.microphone_privilege,
      max_transmission_download_size:
        daas.daas_configs.max_transmission_download_size,
      max_transmission_upload_size:
        daas.daas_configs.max_transmission_upload_size,
      forbidden_upload_files: daas.forbidden_upload_files,
      forbidden_download_files: daas.forbidden_download_files,
      allowed_files_type_for_download: daas.allowed_files_type_for_download,
      allowed_files_type_for_upload: daas.allowed_files_type_for_upload,
      extra_allowed_download_files: daas.extra_allowed_download_files,
      extra_allowed_upload_files: daas.extra_allowed_upload_files,
    },
  });

  const handleOnSubmit = ({
    can_upload_file,
    can_download_file,
    clipboard_up,
    clipboard_down,
    webcam_privilege,
    microphone_privilege,
    time_limit_duration,
    time_limit_value_in_hour,
    max_transmission_upload_size,
    max_transmission_download_size,
    is_globally_config,
    daas_configs,
    is_lock,
    allowed_files_type_for_download,
    allowed_files_type_for_upload,
    forbidden_upload_files,
    forbidden_download_files,
    extra_allowed_download_files,
    extra_allowed_upload_files,
    ...data
  }: ExtendTwoType<IDaAs, IDaasConfig>) => {
    console.log('--------', { data });
    // id?: string;
    // is_lock: boolean;
    // daas_configs: IDaasConfig;
    // allowed_files_type_for_download: string[] | null;
    // allowed_files_type_for_upload: string[] | null;
    // email: string;
    // http_port: number | string;
    // https_port: number | string;
    // created_at: string;
    // last_uptime: string;
    // is_running?: boolean | string;
    // usage_in_minute: number | string;
    // forbidden_upload_files: string[] | null;
    // forbidden_download_files: string[] | null;
    // extra_allowed_download_files: string[] | null;
    // extra_allowed_upload_files: string[] | null;
    // daas_version: string;

    const updatedDaasData = {
      // id: data.id,
      daas_configs: {
        can_upload_file,
        can_download_file,
        clipboard_up,
        clipboard_down,
        webcam_privilege,
        microphone_privilege,
        time_limit_duration,
        time_limit_value_in_hour,
        max_transmission_upload_size,
        max_transmission_download_size,
        is_globally_config,
      },
      is_lock,
      allowed_files_type_for_download,
      allowed_files_type_for_upload,
      forbidden_upload_files,
      forbidden_download_files,
      extra_allowed_download_files,
      extra_allowed_upload_files,
      ...data,
    };
    handleOnChange(updatedDaasData);
  };

  const handleSetDlpValues = (name: keyof IDaAs, values: string[]) => {
    setValue(name, values);
  };

  const dlpDownloadList = watch('allowed_files_type_for_download') || [];
  const dlpUploadList = watch('allowed_files_type_for_upload') || [];

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <DaasConfigForm control={control} />
      <DlpSettingsForm
        handleSetDlpValues={handleSetDlpValues}
        dlpDownloadList={dlpDownloadList}
        dlpUploadList={dlpUploadList}
      />

      <div className="flex justify-center col-span-6">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">{t('global.areYouSure')}</Typography>
            <BaseButton
              label={t('global.yes')}
              size="sm"
              submit
              className="mx-2"
            />
            <BaseButton
              label={t('global.no')}
              size="sm"
              type="red"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        )}

        {!showConfirm && (
          <BaseButton
            label={t('global.confirm')}
            size="md"
            onClick={() => setShowConfirm(true)}
          />
        )}
      </div>
    </form>
  );
}
