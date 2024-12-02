import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IDaAs } from '@src/services/users/types';
import { IDaasConfig } from '@src/services/config/types';
import { ExtendTwoType } from '@src/types/global';
import { BaseButton, Typography } from '@redesignUi/atoms';
import { EPermissionDaas, PermissionsCodeName } from '@src/types/permissions';
import { checkPermission } from '@src/helper/hooks/usePermission';

import { DaasModalContent } from '../DaasModalContent';

type PropsType = {
  handleOnChange: (daas: IDaAs) => void;
  daas: IDaAs;
  userPermissions: PermissionsCodeName[];
  setOpenSettingModal: (value: boolean) => void;
};

export function SettingDaasModal({
  handleOnChange,
  daas,
  userPermissions,
  setOpenSettingModal,
}: PropsType) {
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
      is_recording: daas.daas_configs.is_recording,
      has_evidence_gathering: daas.daas_configs.has_evidence_gathering,
      has_online_assistance: daas.daas_configs.has_online_assistance,
      has_clipboard_access: daas.daas_configs.has_clipboard_access,
      has_clipboard_log_access: daas.daas_configs.has_clipboard_log_access,
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
      chatroom_privileged: daas.chatroom_privileged,
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
    is_recording,
    chatroom_privileged,
    has_online_assistance,
    has_evidence_gathering,
    has_clipboard_access,
    has_clipboard_log_access,
    allowed_files_type_for_download,
    allowed_files_type_for_upload,
    forbidden_upload_files,
    forbidden_download_files,
    extra_allowed_download_files,
    extra_allowed_upload_files,
    ...data
  }: ExtendTwoType<IDaAs, IDaasConfig>) => {
    const updatedDaasData = {
      daas_configs: {
        can_upload_file,
        can_download_file,
        is_recording,
        has_evidence_gathering,
        has_clipboard_access,
        has_clipboard_log_access,
        has_online_assistance,
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
      chatroom_privileged,
      ...data,
    };
    handleOnChange(updatedDaasData);
  };

  const handleSetDlpValues = (
    name: keyof IDaAs,
    values: { [key: string]: number }
  ) => {
    setValue(name, values);
  };

  const dlpDownloadList = watch('allowed_files_type_for_download') || [];
  const dlpUploadList = watch('allowed_files_type_for_upload') || [];
  const timeOfUse = watch('time_limit_duration') || [];
  const usageInMinute = daas.usage_in_minute;

  const hasViewDaasPermission = checkPermission(
    userPermissions,
    EPermissionDaas.VIEW
  );

  return (
    <form
      className="h-full grid grid-cols-6 gap-x-8 gap-y-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {hasViewDaasPermission && (
        <DaasModalContent
          control={control}
          userPermissions={userPermissions}
          handleSetDlpValues={handleSetDlpValues}
          dlpDownloadList={dlpDownloadList}
          dlpUploadList={dlpUploadList}
          timeOfUse={timeOfUse}
          usageInMinute={usageInMinute}
          isRecording
        />
      )}
      <div className="flex justify-center col-span-6">
        {showConfirm ? (
          <div className="flex justify-center items-center w-full">
            <Typography color="black" className="mx-2">
              {t('global.areYouSure')}
            </Typography>
            <BaseButton
              label={t('global.yes')}
              size="sm"
              submit
              className="mx-2"
            />
            <BaseButton
              label={t('global.no')}
              size="sm"
              type="neutral"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        ) : (
          <div className="flex gap-2.5">
            <BaseButton
              label={t('global.confirm')}
              onClick={() => setShowConfirm(true)}
              type="teal"
              className="sm:w-[11.87rem] w-[5.93rem] whitespace-nowrap p-2"
            />
            <BaseButton
              label={t('global.cancel')}
              onClick={() => setOpenSettingModal(false)}
              type="neutral"
              className="sm:w-[11.87rem] w-[5.93rem]"
            />
          </div>
        )}
      </div>
    </form>
  );
}
