import {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import { IconButton } from '@ui/atoms/BaseButton/IconButton';
import { Controller } from 'react-hook-form';
import usersThreeLight from '@iconify-icons/ph/users-three-light';
import cameraPlusLight from '@iconify-icons/ph/camera-plus-light';
import { baseUploadInput, baseUploadInputImage } from './styles';

type BaseUploadInputProps = {
  control: any;
  name: any;
  rules: any;
  defaultValue: any;
  type: 'add' | 'edit';
  onClick: any;
};
export function BaseUploadInput({
  control,
  name,
  rules,
  defaultValue,
  type,
  onClick,
}: BaseUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  const handleBrowsFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleRemoveSelectedFile = () => {
    setPreviewLink(null);
  };

  useEffect(() => {
    if (defaultValue) {
      setPreviewLink(URL.createObjectURL(defaultValue));
    }
  }, [defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={baseUploadInput({})}>
          <input
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
              } else {
                console.log('has error');
              }

              // eslint-disable-next-line no-param-reassign
              // (event.target as HTMLInputElement).value = '';
            }}
          />
          {!previewLink ? (
            <IconButton
              size="xxl"
              type="button"
              color="neutralNoBg"
              onClick={handleBrowsFile}
              className="bg-gray-100 dark:bg-gray-600 w-14 h-14 rounded-full p-3"
              icon={type === 'add' ? cameraPlusLight : usersThreeLight}
            />
          ) : (
            <img
              alt=""
              src={previewLink}
              className={baseUploadInputImage({})}
            />
          )}
          {previewLink && (
            <IconButton
              size="md"
              type="button"
              color="redNoBg"
              className="absolute right-0 bottom-0 bg-gray-100 dark:bg-gray-600 border border-white border-2 rounded-full"
              onClick={handleRemoveSelectedFile}
              icon="ph:x"
            />
          )}
        </div>
      )}
    />
  );
}
