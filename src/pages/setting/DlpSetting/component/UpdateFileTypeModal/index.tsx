import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { regexPattern } from '@ui/atoms/Inputs';
import {
  API_CREATE_FILE_TYPE,
  API_UPDATE_FILE_TYPE,
} from '@src/services/config';
import { FileTypeProp } from '@src/pages/setting/type';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { BaseButton, Card, Typography } from '@redesignUi/atoms';
import PhFile from '@iconify-icons/ph/file';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  fileType?: Partial<FileTypeProp>;
};

export function UpdateFileTypeModal({ handleClose, fileType }: PropsType) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const cardStyles =
    'flex items-center w-40 sm:w-full h-10 shrink-0 pr-[0.62rem] ltr:pl-[0.62rem] col-span-1';

  const { control, handleSubmit } = useForm<FileTypeProp>({
    mode: 'onChange',
    defaultValues: {
      id: fileType?.id,
      file_type: fileType?.file_type,
      allowed_for_download: fileType?.allowed_for_download ?? false,
      allowed_for_upload: fileType?.allowed_for_upload ?? false,
      is_active: fileType?.is_active ?? false,
    },
  });

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
      <div className="col-span-6 flex justify-between items-start">
        <BaseInputController
          control={control}
          name="file_type"
          id="file_type"
          placeholder=".txt"
          label={t('table.fileType')}
          endIcon={PhFile}
          size="md"
          fullWidth
          rules={{
            pattern: regexPattern.wordStartedWithPointAndEn,
            required: regexPattern.required,
          }}
        />
      </div>
      <div className="gap-8 grid-flow-row-dense grid col-span-6 sm:grid-cols-3 pb-5">
        {/* <div className="w-1/3 flex justify-between items-center">
          <BaseRadioButtonController
            id="allowed_for_download"
            value={'is_active'}
            control={control}
            name="allowed_for_download"
          />
        </div> */}
        <Card className={cardStyles} color="white" border>
          <BaseRadioButtonController
            control={control}
            id="allowed_for_download"
            name="allowed_for_download"
            value="allowed_for_download"
            label={t('table.active')}
          />
        </Card>
        <Card className={cardStyles} color="white" border>
          <BaseRadioButtonController
            control={control}
            id="allowed_for_download"
            name="allowed_for_download"
            value=""
            label={t('table.allowedForDownload')}
          />
        </Card>
        <Card className={cardStyles} color="white" border>
          <BaseRadioButtonController
            control={control}
            id="allowed_for_download"
            name="allowed_for_download"
            value="DAILY"
            label={t('table.allowedForUpload')}
          />
        </Card>

        {/* <div className="w-1/3 flex justify-between items-center">
          <BaseSwitch control={control} name="allowed_for_upload" />
          <Typography className="mb-1">:Allowed For Upload</Typography>
        </div> */}
      </div>

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
