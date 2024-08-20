import { useRef, useState, useEffect, ChangeEvent } from 'react';
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
  type,
  onClick,
  setValue,
  clearErrors,
  disabled = false,
}: BaseUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isAdd = type === 'add';

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const { value: fieldValue } = field;

        if (typeof fieldValue === 'string') {
          setPreviewUrl(fieldValue);
        }

        const handleBrowseFile = () => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
          }
        };

        const handleRemoveSelectedFile = () => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setPreviewUrl(null);
            setValue(name, '');
            onClick('');
            clearErrors(name);
          }
        };

        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
          const fileList: FileList | null = event.currentTarget.files;

          if (fileList && fileList.length > 0) {
            const file: File = fileList[0];
            const newPreviewUrl = URL.createObjectURL(file);

            setPreviewUrl(newPreviewUrl);
            setValue(name, file);
            onClick(file);
          }
        };

        return (
          <div>
            <div className={baseUploadInput()}>
              <input
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
              />
              {!previewUrl ? (
                <IconButton
                  disabled={disabled}
                  size="xxxl"
                  type="button"
                  color="neutralNoBg"
                  onClick={handleBrowseFile}
                  className="bg-gray-100 dark:bg-gray-600 w-18 h-18 rounded-full p-3"
                  icon={isAdd ? cameraPlusLight : usersThreeLight}
                />
              ) : (
                <div className="relative group">
                  <img
                    alt=""
                    src={previewUrl}
                    className={baseUploadInputImage()}
                  />
                  <IconButton
                    disabled={disabled}
                    size="lg"
                    type="button"
                    color="default"
                    className="absolute top-5 right-5 hidden group-hover:flex group-hover:opacity-60 bg-gray-100 dark:bg-gray-600 border-white border-2 rounded-full"
                    onClick={handleBrowseFile}
                    icon={pencilSimple}
                  />
                </div>
              )}
              {previewUrl && (
                <IconButton
                  disabled={disabled}
                  size="lg"
                  type="button"
                  color="redNoBg"
                  className="absolute right-0 bottom-0 bg-gray-100 dark:bg-gray-600 border-white border-2 rounded-full"
                  onClick={handleRemoveSelectedFile}
                  icon="ph:x"
                />
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
