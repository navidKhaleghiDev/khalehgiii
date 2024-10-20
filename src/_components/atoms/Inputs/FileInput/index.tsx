import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

import { BaseIcon } from '@redesignUi/atoms/BaseIcon';
import PhCloudArrowUp from '@iconify-icons/ph/cloud-arrow-up';
import { Typography } from '@redesignUi/atoms/Typography';

import { BaseInputProps } from '../BaseInput/types';

interface FileInputProps extends BaseInputProps {
  name: string;
  id: string;
}

export function FileInput(props: FileInputProps) {
  const { name, id, onChange, value } = props;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handelClick = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  //   const handelDragEnter = () => {
  //     console.log('your drag is entered');
  //   };

  return (
    <>
      <input
        id={id}
        name={name}
        ref={inputRef}
        type="file"
        onChange={onChange}
        value={value}
        // className="hidden"
      />

      <button
        className="flex flex-col hover:bg-gray-50 gap-3 items-center border border-neutral-200 w-[630px] px-6 py-4 font-kalameh rounded-2xl"
        type="button"
        onClick={handelClick}
        onDrop={() => console.log('the item has been dropped')}
        onDragStart={() => console.log}
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
      </button>
    </>
  );
}
