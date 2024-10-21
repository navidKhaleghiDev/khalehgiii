import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import { BaseIcon } from '@redesignUi/atoms/BaseIcon';
import PhCloudArrowUp from '@iconify-icons/ph/cloud-arrow-up';
import { Typography } from '@redesignUi/atoms/Typography';

export interface FileInputProps {
  name: string;
  id: string;
  disabled?: boolean;
  className?: string;
  onChange: (files: File[] | null) => void;
}

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
    <>
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
        className={`flex flex-col w-full dark: hover:bg-gray-50 gap-3 items-center border border-neutral-200 ${
          files && ' border-2 border-teal-500'
        } px-6 py-4 font-kalameh dark:bg-gray-700 rounded-2xl ${
          className ?? ''
        }`}
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

        <div className="flex">
          <Typography color="neutralDark" variant="body5">
            {t('systemManagement.uploadFileTextInputTwo')}
          </Typography>
          <Typography color="teal" variant="body5B">
            {t('systemManagement.uploadFileTextInputOne')}
          </Typography>
        </div>
        {files && (
          <div className="mt-2">
            <div>
              <Typography variant="body5">
                {files.map((file) => file.name).join(', ')}
              </Typography>
            </div>
          </div>
        )}
      </button>
    </>
  );
}
