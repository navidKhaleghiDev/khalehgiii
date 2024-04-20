import { useState, useRef, useEffect } from 'react';
import { IconButton } from '@ui/atoms/BaseButton/IconButton';
import { Controller } from 'react-hook-form';
import usersThreeLight from '@iconify-icons/ph/users-three-light';
import cameraPlusLight from '@iconify-icons/ph/camera-plus-light';
import { baseUploadInput, baseUploadInputImage } from './styles';

export function BaseUploadInput({
  control,
  name,
  rules,
  className,
  classNameInput,
  fullWidth,
  defaultValue = false,
  size,
  type,
  label,
  setError = false,
  onClick,
  error,
}) {
  const fileInputRef = useRef(null);
  const [previewLink, setPreviewLink] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (defaultValue) {
      setPreviewLink(URL.createObjectURL(defaultValue));
    }
  }, [defaultValue]);

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={handleButtonClick} className={baseUploadInput({})}>
            <input
              className="hidden"
              ref={fileInputRef}
              type="file"
              onChange={(event) => {
                // setError
                const file = event.currentTarget.files[0];
                if (file) {
                  switch (true) {
                    case error: // Check if error exists
                      console.log('has error');
                      break;
                    default:
                      setPreviewLink(URL.createObjectURL(file));
                      field.onChange(file);
                      onClick(file);
                      break;
                  }
                }
              }}
            />
            {!previewLink ? (
              <IconButton
                size="xxl"
                type="button"
                icon={type === 'add' ? cameraPlusLight : usersThreeLight}
              />
            ) : (
              <img
                alt=""
                src={previewLink}
                className={baseUploadInputImage({})}
              />
            )}
            <div className="absolute">
              <IconButton
                size="xxl"
                type="button"
                icon={type === 'add' ? cameraPlusLight : usersThreeLight}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
