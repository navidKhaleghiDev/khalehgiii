import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Typography, BaseButton } from '@redesignUi/atoms';
import { regexPattern } from '@ui/atoms/Inputs';
import { API_ANALYZE_MIME_TYPE_CREATE } from '@src/services/analyze';
import { FileInputController } from '@redesignUi/atoms/Inputs/FileInput/Controller';

type PropsType = {
  handleClose: () => void;
};

interface IFieldValues extends FieldValues {
  file: File[];
}

export function UploadFileModal({ handleClose }: PropsType) {
  const { t } = useTranslation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const { control, handleSubmit } = useForm<IFieldValues>({
    mode: 'onChange',
  });

  const handleOnSubmit = async (data: IFieldValues) => {
    setLoadingButtonModal(true);
    const body = new FormData();
    if (data.file.length > 0) {
      body.append('file', data?.file[0]);
      await API_ANALYZE_MIME_TYPE_CREATE(body)
        .then(() => {
          toast.success(t('global.successfullyAdded'));
          handleClose();
        })
        .catch((err) => {
          toast.error(err);
          setShowConfirm(false);
        })
        .finally(() => {
          setLoadingButtonModal(false);
        });
    } else {
      toast.error('choose correct file.');
    }
  };

  return (
    <div className="pt-5">
      <form
        className="h-full grid grid-cols-6 gap-4 p-4"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
          <FileInputController
            control={control}
            name="file"
            id="file"
            rules={{
              required: regexPattern.required,
            }}
            className="mb-20"
          />
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
            <div className="flex gap-2">
              <BaseButton
                label={t('global.confirm')}
                size="md"
                onClick={() => setShowConfirm(true)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
