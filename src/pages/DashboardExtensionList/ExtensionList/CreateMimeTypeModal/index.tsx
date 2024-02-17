import { BaseButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { regexPattern } from '@ui/atoms/Inputs';
import { toast } from 'react-toastify';
import { API_ANALYZE_MIME_TYPE_CREATE } from '@src/services/analyze';

type PropsType = {
  handleClose: () => void;
};

interface IFieldValues extends FieldValues {
  file: File[];
}

export function CreateMimeTypeModal({ handleClose }: PropsType) {
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
          toast.success('با موفقیت اضافه شد.');
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
    <form
      className="w-full h-full grid grid-cols-6 gap-4 p-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="px-2 col-span-6 flex justify-between items-start w-full gap-2">
        <BaseInput
          control={control}
          name="file"
          id="file"
          placeholder="انتخاب کنید"
          type="file"
          label="فایل"
          size="xl"
          fullWidth
          maxLength={60}
          rules={{
            required: regexPattern.required,
          }}
        />
      </div>

      <Typography className="px-2 col-span-6 flex justify-start" color="red">
        برای ایجاد رشته فایل و پسوند فایل جدید ، فایل مرتبط خود را آپلود نماپید.
      </Typography>
      <div className="flex justify-center col-span-6">
        {showConfirm && (
          <div className="flex justify-center items-center w-full">
            <Typography className="mx-2">آیا مطمین هستید؟</Typography>
            <BaseButton
              label="بله"
              size="sm"
              submit
              className="mx-2"
              loading={loadingButtonModal}
            />
            <BaseButton
              label="خیر"
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
              label="ثبت"
              size="md"
              onClick={() => setShowConfirm(true)}
            />
            <BaseButton
              label="لغو"
              type="red"
              size="md"
              onClick={handleClose}
            />
          </div>
        )}
      </div>
    </form>
  );
}
