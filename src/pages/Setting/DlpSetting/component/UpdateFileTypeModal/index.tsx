import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  API_CREATE_FILE_TYPE,
  API_UPDATE_FILE_TYPE,
} from '@src/services/config';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { BaseButton, Typography } from '@redesignUi/atoms';
import PhFile from '@iconify-icons/ph/file';
import { FileTypeProp } from '@src/pages/Setting/type';
import { BaseSwitchController } from '@redesignUi/atoms/BaseSwitch/Controller';
import { BaseCheckBoxController } from '@redesignUi/atoms/Inputs/BaseCheckBox/Controller';
import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
import PhUploadSimple from '@iconify-icons/ph/upload-simple';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { PermissionDaas } from '@src/types/permissions';
import { regexPattern } from '@redesignUi/atoms/Inputs';
import { useLanguage } from '@context/settings/languageContext';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  fileType?: Partial<FileTypeProp>;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
};

export function UpdateFileTypeModal({
  handleClose,
  fileType,
  setOpenUpdateModal,
}: PropsType) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const userPermissions = useUserPermission();

  const { dir } = useLanguage();
  const inputStyle = 'col-span-6 lg:col-span-4 h-16';
  const hasChangePermission = checkPermission(
    userPermissions,
    PermissionDaas.CHANGE
  );

  const { control, handleSubmit, watch, formState } = useForm<FileTypeProp>({
    mode: 'onChange',
    defaultValues: {
      id: fileType?.id,
      file_type: fileType?.file_type,
      allowed_for_download: fileType?.allowed_for_download ?? false,
      allowed_for_upload: fileType?.allowed_for_upload ?? false,
      is_active: fileType?.is_active ?? false,
      upload_file_size_mb: fileType?.upload_file_size_mb || 0,
      download_file_size_mb: fileType?.download_file_size_mb || 0,
    },
  });

  const access = watch('is_active');
  const uploadAccess = watch('allowed_for_upload');
  const downloadAccess = watch('allowed_for_download');

  const handleOnSubmit = async (data: FileTypeProp) => {
    setLoadingButtonModal(true);

    if (data.id) {
      await API_UPDATE_FILE_TYPE(data as FileTypeProp)
        .then(() => {
          toast.success(t('global.sucessfulyUpdated'));
          handleClose(true);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
      return;
    }

    await API_CREATE_FILE_TYPE(data)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        handleClose(true);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  return (
    <form
      className="w-full h-full grid grid-cols-6 gap-x-8 gap-y-5"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="col-span-6 flex flex-col-reverse sm:flex-row justify-between">
        <BaseInputController
          control={control}
          name="file_type"
          id="file_type"
          placeholder=".txt"
          label={t('table.fileType')}
          endIcon={PhFile}
          dir={dir}
          size="md"
          rules={{
            pattern: regexPattern.DotSeparatedLetters,
            required: regexPattern.required,
          }}
        />
        <div className="mb-5 self-start sm:self-end">
          <BaseSwitchController
            id="is_active"
            name="is_active"
            control={control}
            label={access ? t('table.active') : t('table.deactive')}
          />
        </div>
      </div>
      {access ? (
        <div className="flex-col sm:flex-row flex w-full gap-x-[1.87rem]">
          <div className="whitespace-nowrap">
            <BaseCheckBoxController
              control={control}
              id="allowed_for_upload"
              name="allowed_for_upload"
              label={t('table.allowedForUpload')}
              className="py-5"
            />
            <div className={inputStyle}>
              <BaseInputNumberController
                id="upload_file_size_mb"
                name="upload_file_size_mb"
                control={control}
                label={t('table.maxUploadSize')}
                disabled={!hasChangePermission || !uploadAccess}
                placeholder={t('table.upload')}
                icon={PhUploadSimple}
                dir={dir}
                rules={{
                  required: uploadAccess ? regexPattern.required : '',
                  min: uploadAccess
                    ? { value: 1, message: t('setting.zero') }
                    : '',
                  max: {
                    value: 50,
                    message: t(
                      'userList.enterTheAllowedVolumeForThisFormatInTheOppositeField'
                    ),
                  },
                }}
              />
            </div>
          </div>
          <div className="whitespace-nowrap">
            <BaseCheckBoxController
              control={control}
              id="allowed_for_download"
              name="allowed_for_download"
              label={t('table.allowedForDownload')}
              className="py-5"
            />
            <div className={inputStyle}>
              <BaseInputNumberController
                id="download_file_size_mb"
                name="download_file_size_mb"
                control={control}
                label={t('table.maxDownloadSize')}
                disabled={!hasChangePermission || !downloadAccess}
                placeholder={t('table.download')}
                icon={PhUploadSimple}
                dir={dir}
                rules={{
                  required: downloadAccess ? regexPattern.required : '',
                  min: downloadAccess
                    ? { value: 1, message: t('setting.zero') }
                    : '',
                  max: {
                    value: 500,
                    message: t(
                      'userList.enterTheAllowedVolumeForThisFormatInTheOppositeField'
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      ) : null}

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
              loading={loadingButtonModal}
            />
            <BaseButton
              label={t('global.no')}
              size="sm"
              type="neutral"
              className="mx-2"
              onClick={() => setShowConfirm(false)}
            />
          </div>
        ) : null}

        {!showConfirm ? (
          <div className="flex gap-2.5">
            <BaseButton
              label={t('global.confirm')}
              size="md"
              onClick={() => setShowConfirm(true)}
              disabled={!formState.isDirty}
            />
            <BaseButton
              label={t('global.cancel')}
              size="md"
              type="neutral"
              onClick={() => setOpenUpdateModal(false)}
            />
          </div>
        ) : null}
      </div>
    </form>
  );
}
