import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { Typography, BaseButton } from '@ui/atoms';
import { API_ANALYZE_MIME_TYPE_CREATE } from '@src/services/analyze';
import { FileInputController } from '@ui/atoms/Inputs/FileInput/Controller';

type PropsType = {
  handleClose: () => void;
};

interface MimeType {
  file: File[];
}

const limitFileSize = 1073741824;

export function UploadFileModal({ handleClose }: PropsType) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButtonModal, setLoadingButtonModal] = useState(false);

  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<MimeType>({
    mode: 'onChange',
  });

  const handleOnSubmit = async (data: MimeType) => {
    // This logic (Can not add the file without type & limit of the file size)
    if (data.file[0].type !== '' && data.file[0].size <= limitFileSize) {
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
            setShowConfirm(false);
            toast.error(err);
            handleClose();
          })
          .finally(() => {
            setLoadingButtonModal(false);
          });
      } else {
        toast.error(t('global.correctFile'));
      }
    } else {
      toast.error(t('knowledgeManagement.appropriateType'));
    }
  };

  return (
    <div className="pt-5 w-full">
      <form
        className="h-full grid grid-cols-6 gap-4 p-4"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
          <FileInputController
            control={control}
            name="file"
            id="file"
            className="mb-20"
          />
        </div>
        <div className="flex justify-center col-span-6">
          {showConfirm ? (
            <div className="flex justify-center items-center w-full">
              <Typography className="mx-2" color="neutralDark">
                {t('global.areYouSure')}
              </Typography>
              <BaseButton
                label={t('global.yes')}
                size="sm"
                submit
                disabled={!watch('file')?.length}
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
            <div className="flex gap-2">
              <BaseButton
                label={t('global.confirm')}
                size="md"
                disabled={!watch('file')?.length}
                onClick={() => setShowConfirm(true)}
              />
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
