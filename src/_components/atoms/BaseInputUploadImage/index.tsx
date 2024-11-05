import { useRef, useState, useEffect, ChangeEvent } from 'react';
import usersThreeLight from '@iconify-icons/ph/users-three-light';
import cameraPlusLight from '@iconify-icons/ph/camera-plus-light';
import pencilSimple from '@iconify-icons/ph/pencil-simple';
import { IconButton } from '../BaseButton';
import { BaseUploadInputProps } from '@ui/atoms/Inputs/BaseUploadInput/types';
import {
  baseUploadInput,
  baseUploadInputImage,
} from '@ui/atoms/Inputs/BaseUploadInput/styles';
import trashSimple from '@iconify-icons/ph/trash-simple';
interface BaseInputUploadImageProps
  extends Omit<
    BaseUploadInputProps,
    'control' | 'rules' | 'setValue' | 'clearErrors' | 'type'
  > {
  defaultValue?: string;
  icon?: any;
}
export function BaseInputUploadImage({
  name,
  icon,
  onClick,
  disabled = false,
  defaultValue,
}: BaseInputUploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null
  );
  useEffect(() => {
    if (defaultValue) {
      setPreviewUrl(defaultValue);
    }
  }, [defaultValue]);
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
      onClick?.(null);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.currentTarget.files;
    if (fileList && fileList.length > 0) {
      const newFile = fileList[0];
      const newPreviewUrl = URL.createObjectURL(newFile);
      setPreviewUrl(newPreviewUrl);
      onClick?.(newFile);
    }
  };
  return (
    <div className="w-16 h-16">
      <div className="relative  flex justify-center items-center overflow-hidden">
        <input
          name={name}
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
        />
        {!previewUrl ? (
          <IconButton
            disabled={disabled}
            type="button"
            color="neutralNoBg"
            size="lg"
            onClick={handleBrowseFile}
            className="bg-gray-100 dark:bg-gray-600 !rounded-full p-3 border border-gray-300"
            icon={icon || usersThreeLight}
          />
        ) : (
          <div className="group relative">
            <img
              alt=""
              src={previewUrl}
              className={`relative ${
                !disabled && 'group-hover:opacity-40'
              } flex w-16 h-16 justify-center items-center rounded-full overflow-hidden cursor-pointer`}
            />

            {!disabled && (
              <IconButton
                disabled={disabled}
                size="sm"
                type="button"
                color="redNoBg"
                className="absolute peer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex bg-gray-100 dark:bg-gray-600 border-white border-2 !rounded-full"
                onClick={handleRemoveSelectedFile}
                icon={trashSimple}
              />
            )}
            {!disabled && (
              <IconButton
                size="sm"
                disabled={disabled}
                type="button"
                color="neutralNoBg"
                className="absolute peer-hover:hidden group-hover:opacity-100 !w-6 !h-6 right-0 bottom-0 bg-white dark:bg-gray-600 border border-gray-300 !rounded-full opacity-100  pointer-events-auto"
                onClick={handleBrowseFile}
                icon={pencilSimple}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
