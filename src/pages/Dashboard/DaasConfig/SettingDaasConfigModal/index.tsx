import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { DaasConfigForm } from '@ui/utils/DaasConfigForm';
import { IDaasConfig } from '@src/services/config/types';
import { useTranslation } from 'react-i18next';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  daasConfig: IDaasConfig;
};

export function SettingDaasConfigModal({ handleClose, daasConfig }: PropsType) {
  const { t } = useTranslation();

  const [showConfirm, setShowConfirm] = useState(false);
  const { control, handleSubmit } = useForm<IDaasConfig>({
    mode: 'onChange',
    defaultValues: {
      can_upload_file: daasConfig.can_upload_file,
      can_download_file: daasConfig.can_download_file,
      clipboard_down: daasConfig.clipboard_down,
      clipboard_up: daasConfig.clipboard_up,
      webcam_privilege: daasConfig.webcam_privilege,
      microphone_privilege: daasConfig.microphone_privilege,
      max_transmission_download_size: daasConfig.max_transmission_download_size,
      max_transmission_upload_size: daasConfig.max_transmission_upload_size,
    },
  });

  const handleOnSubmit = () => {
    handleClose();
    // handleOnChange({ ...daas, ...data });
  };

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-8 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <DaasConfigForm isRecording control={control} />
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
