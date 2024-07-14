import { IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { TFile } from '@ui/atoms/Inputs/BaseUploadInput/types';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { UsersList } from './UsersList';
import { AdminsList } from './AdminsList';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  groupId?: string;
};

export function GroupModal({ handleClose, groupId }: PropsType) {
  const { t } = useTranslation();

  const [hasError, setHasError] = useState(false);

  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      image: '',
    },
  });

  const groups = {
    id: '1',
    title: 'Developer',
    img: '',
    listCount: 5,
    admins: [
      { name: 'asghar', id: 3333 },
      { name: 'akbar', id: 4444 },
      { name: 'gholi', id: 5555 },
    ],
    users: [
      { name: 'shahram', id: 3333 },
      { name: 'bahram', id: 4444 },
      { name: 'parham', id: 5555 },
      { name: 'ghambar', id: 5555 },
    ],
  };

  // const handleOnSubmit = () => {
  //   handleClose();
  //   // handleOnChange({ ...daas, ...data });
  // };

  const validateFileSize = (file: TFile) => {
    if (file.size > 3 * 1024 * 1024) {
      // 3MB in bytes
      setError('image', {
        type: 'manual',
        message: 'The image file shouldent be more than 3MB ',
      });
      return true;
    }
    return false;
  };

  const handleGetImageData = (file: TFile) => {
    const uploadLimit = validateFileSize(file);
    if (uploadLimit) setHasError(true);
  };

  return (
    <div className="p-5 w-full flex flex-col items-center">
      <div className="w-full">
        <IconButton
          icon="ph:x"
          className="flex self-end"
          size="xl"
          onClick={handleClose}
        />
      </div>
      <Typography className=" -mt-8" variant="h4" color="teal">
        {t(`groupManagement.${groupId ? 'editGroup' : 'createGroup'}`)}
      </Typography>
      <div className="flex gap-3 items-center  w-10/12 h-28 ">
        <BaseUploadInput
          name="image"
          control={control}
          type={groupId ? 'edit' : 'add'}
          setValue={setValue}
          onClick={handleGetImageData}
          clearErrors={clearErrors}
          defaultValue=""
          rules={undefined}
        />
        <BaseInput
          className="h-11"
          name="ss"
          size="lg"
          id="ss"
          label=""
          control={control}
          placeholder=""
          type="text"
          rules={undefined}
          fullWidth
        />
      </div>
      {hasError && (
        <Typography variant="h5" className=" -mt-6 mb-5 " color="red">
          {errors.image?.message}
        </Typography>
      )}
      <BaseTabs className="px-12 pb-10">
        <BaseTab
          label={t(`groupManagement.${groupId ? 'admins' : 'choiceAdmins'}`)}
        >
          <AdminsList admins={groups.admins} />
        </BaseTab>
        <BaseTab
          label={t(`groupManagement.${groupId ? 'users' : 'choiceUsers'}`)}
        >
          <UsersList users={groups.users} />
        </BaseTab>
      </BaseTabs>
    </div>
  );
}
