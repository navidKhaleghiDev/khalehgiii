import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { IconButton } from '@ui/atoms/BaseButton/IconButton';
import { Controller } from 'react-hook-form';
import usersThreeLight from '@iconify-icons/ph/users-three-light';
import cameraPlusLight from '@iconify-icons/ph/camera-plus-light';
import pencilSimple from '@iconify-icons/ph/pencil-simple';
import { baseUploadInput, baseUploadInputImage } from './styles';
import { BaseUploadInputProps } from './types';

export function BaseUploadInput({
  control,
  name,
  rules,
  defaultValue,
  type,
  onClick,
  setValue,
  clearErrors,
}: BaseUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  const isAdd = type === 'add';

  const handleBrowsFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleRemoveSelectedFile = () => {
    setPreviewLink(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setValue(name, '');
      onClick('');
      clearErrors(name);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setPreviewLink(defaultValue);
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div>
          <div className={baseUploadInput()}>
            <input
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              type="file"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const fileList: FileList | null = event.currentTarget.files;

                if (fileList && fileList.length > 0) {
                  const file: File = fileList[0];
                  setPreviewLink(URL.createObjectURL(file));
                  field.onChange(file);
                  onClick(file);
                }
              }}
            />
            {!previewLink ? (
              <IconButton
                size="xxxl"
                type="button"
                color="neutralNoBg"
                onClick={handleBrowsFile}
                className="bg-gray-100 dark:bg-gray-600 w-18 h-18 rounded-full p-3"
                icon={isAdd ? cameraPlusLight : usersThreeLight}
              />
            ) : (
              <div className="relative group  ">
                <img
                  alt=""
                  src={previewLink}
                  className={baseUploadInputImage()}
                />
                <IconButton
                  size="lg"
                  type="button"
                  color="default"
                  className="absolute top-5  right-5  hidden group-hover:flex group-hover:opacity-60 bg-gray-100 dark:bg-gray-600  border-white border-2 rounded-full "
                  onClick={handleBrowsFile}
                  icon={pencilSimple}
                />
              </div>
            )}
            {previewLink && (
              <IconButton
                size="lg"
                type="button"
                color="redNoBg"
                className="absolute right-0 bottom-0 bg-gray-100 dark:bg-gray-600  border-white border-2 rounded-full"
                onClick={handleRemoveSelectedFile}
                icon="ph:x"
              />
            )}
          </div>
        </div>
      )}
    />
  );
}
