import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import { BaseIcon } from '@redesignUi/atoms/BaseIcon';
import X from '@iconify-icons/ph/x';
import PhFile from '@iconify-icons/ph/file';
import PhCloudArrowUp from '@iconify-icons/ph/cloud-arrow-up';
import { Typography } from '@redesignUi/atoms/Typography';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { FileInputProps } from './types';

export function FileInput(props: FileInputProps) {
  const { name, id, onChange, disabled, className } = props;

  const [files, setFiles] = useState<File[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    if (target.files) {
      const fileArray = Array.from(target.files);
      setFiles(fileArray);
      onChange(fileArray);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setFiles(fileArray);
      onChange(fileArray);
    }
  };

  return (
    <div className={`flex-col w-full ${className ?? ''}`}>
      <input
        id={id}
        name={name}
        ref={inputRef}
        type="file"
        onChange={handleOnChange}
        multiple
        disabled={disabled}
        className="hidden"
      />
      <button
        className={`flex flex-col w-full dark:hover:bg-gray-600 gap-3 items-center border border-neutral-200 dark:border-gray-500 ${
          files && ' border-2 border-teal-500 dark:border-teal-400'
        } px-6 py-4 dark:bg-gray-700 rounded-2xl`}
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        <div className="bg-gray-100 rounded-full p-1.5">
          <BaseIcon
            icon={PhCloudArrowUp}
            size="md"
            className="rounded-full p-1 box-content bg-gray-200"
          />
        </div>

        <div className="flex gap-1">
          <Typography color="teal" variant="body5B">
            {t('systemManagement.uploadFileTextInputOne')}
          </Typography>
          <Typography color="neutralDark" variant="body5">
            {t('systemManagement.uploadFileTextInputTwo')}
          </Typography>
        </div>
      </button>
      {files && (
        <div className="mt-2">
          <div className="text-start p-2 flex items-center justify-between rounded-lg dark:text-white bg-neutral-100 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="border">
                <BaseIcon icon={PhFile} color="neutral" size="md" />
              </div>
              <Typography variant="body5">
                {files.map((file) => file.name).join(', ')}
              </Typography>
            </div>
            <IconButton
              icon={X}
              size="sm"
              color="neutralNoBg"
              className="rounded-full p-1 box-content bg-gray-200 dark:bg-gray-800"
              onClick={() => setFiles(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
