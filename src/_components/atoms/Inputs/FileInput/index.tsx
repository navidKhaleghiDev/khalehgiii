import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import { BaseIcon } from '@redesignUi/atoms/BaseIcon';
import X from '@iconify-icons/ph/x';
import PhFile from '@iconify-icons/ph/file';
import PhCloudArrowUp from '@iconify-icons/ph/cloud-arrow-up';
import { Typography } from '@redesignUi/atoms/Typography';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { FileInputProps } from './types';

/**
 * `FileInput` component provides a user interface for selecting or dragging and dropping files.
 *
 * @param {FileInputProps} props - Properties passed to the component.
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.id - The id attribute for the input element.
 * @param {Function} props.onChange - Callback fired when file selection changes.
 * @param {boolean} [props.disabled] - If true, disables the file input.
 * @param {string} [props.className] - Additional CSS classes for styling.
 *
 * @returns {JSX.Element} A component that allows users to upload files either by clicking to open a file picker or by dragging and dropping files.
 *
 */

export function FileInput(props: FileInputProps): JSX.Element {
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
          files?.length && ' border-2 border-teal-500 dark:border-teal-400'
        } px-6 py-4 dark:bg-gray-700 rounded-2xl`}
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        <div className="bg-gray-100 dark:bg-gray-600 rounded-full p-1.5">
          <BaseIcon
            icon={PhCloudArrowUp}
            size="md"
            className="rounded-full p-1 box-content dark:text-gray-400 dark:bg-gray-800 bg-gray-200"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-1">
          <Typography
            variant="body5B"
            className="text-teal-500 dark:text-teal-400"
          >
            {t('systemManagement.uploadFileTextInputOne')}
          </Typography>
          <Typography color="neutralDark" variant="body5">
            {t('systemManagement.uploadFileTextInputTwo')}
          </Typography>
        </div>
      </button>
      {files?.length ? (
        <div className="mt-5">
          <div className="text-start p-2 flex items-center justify-between rounded-lg dark:text-white bg-neutral-100 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="border-2 bg-white dark:bg-gray-700 dark:border-gray-500 p-1 rounded-lg">
                <BaseIcon
                  icon={PhFile}
                  size="md"
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <Typography variant="body5">
                {files.map((file) => file.name).join(', ')}
              </Typography>
            </div>
            <IconButton
              icon={X}
              size="sm"
              color="neutralNoBg"
              className="rounded-full p-1 box-content"
              onClick={() => setFiles(null)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
