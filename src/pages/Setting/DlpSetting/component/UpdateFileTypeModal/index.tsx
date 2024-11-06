import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { regexPattern } from '@ui/atoms/Inputs';
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
// import { BaseInputNumberController } from '@redesignUi/atoms/Inputs/BaseInputNumber/Controller';
// import PhDownloadSimple from '@iconify-icons/ph/download-simple';
// import PhUploadSimple from '@iconify-icons/ph/upload-simple';
// import { useLanguage } from '@context/settings/languageContext';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  fileType?: Partial<FileTypeProp>;
  setOpenUpdateModal: any;
};

export function UpdateFileTypeModal({
  handleClose,
  fileType,
  setOpenUpdateModal,
}: PropsType) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  // const { lang } = useLanguage();

  // const inputStyle = 'col-span-6 lg:col-span-4 h-16';
  // const direction = lang === 'fa' ? 'rtl' : 'ltr';

  const { control, handleSubmit, watch } = useForm<FileTypeProp>({
    mode: 'onChange',
    defaultValues: {
      id: fileType?.id,
      file_type: fileType?.file_type,
      allowed_for_download: fileType?.allowed_for_download ?? false,
      allowed_for_upload: fileType?.allowed_for_upload ?? false,
      is_active: fileType?.is_active ?? false,
    },
  });

  const access = watch('is_active');

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
          size="md"
          rules={{
            pattern: regexPattern.wordStartedWithPointAndEn,
            required: regexPattern.required,
          }}
        />
        <div className="mb-5 self-end">
          <BaseSwitchController
            id="is_active"
            name="is_active"
            control={control}
            label={access ? t('table.active') : t('table.deactive')}
          />
        </div>
      </div>
      {access ? (
        <div className="gap-8 grid-flow-row-dense grid col-span-6 sm:grid-cols-3 pb-5">
          <BaseCheckBoxController
            control={control}
            id="allowed_for_upload"
            name="allowed_for_upload"
            label={t('table.allowedForUpload')}
          />
          <BaseCheckBoxController
            control={control}
            id="allowed_for_download"
            name="allowed_for_download"
            label={t('table.allowedForDownload')}
          />
        </div>
      ) : /* It does not currently have an API
      /* <div className="flex w-full gap-[1.87rem]">
            <div className={inputStyle}>
              <BaseInputNumberController
                id="max_transmission_upload_size"
                name="max_transmission_upload_size"
                control={control}
                label={t('table.maxUploadSize')}
                // disabled={!hasChangePermission}
                placeholder="50"
                icon={PhUploadSimple}
                dir={direction}
                max={50}
                rules={{
                  required: regexPattern.required,
                }}
              />
            </div>
            <div className={inputStyle}>
              <BaseInputNumberController
                id="max_transmission_download_size"
                name="max_transmission_download_size"
                control={control}
                label={t('table.maxDownloadSize')}
                // disabled={!hasChangePermission}
                placeholder="500"
                icon={PhDownloadSimple}
                dir={direction}
                max={500}
                rules={{
                  required: regexPattern.required,
                }}
              />
            </div>
          </div> */
      null}

      <div className="flex justify-center col-span-6">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">{t('global.areYouSure')}</Typography>

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
        )}

        {!showConfirm && (
          <div className="flex gap-2.5">
            <BaseButton
              label={t('global.confirm')}
              size="md"
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label={t('global.cancel')}
              size="md"
              type="neutral"
              onClick={() => setOpenUpdateModal(false)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
