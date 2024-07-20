import { IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { TFile } from '@ui/atoms/Inputs/BaseUploadInput/types';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { E_USERS_DAAS, USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { API_USERS_GROUPS, API_USERS_GROUPS_GET } from '@src/services/users';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IDaAs } from '@src/services/users/types';
import { AdminsList } from './AdminsList';
import { UsersList } from './UsersList';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  groupId?: string;
};

const PAGE_SIZE = 8;
const PAGE = 1;

export function GroupModal({ handleClose, groupId }: PropsType) {
  const { t } = useTranslation();

  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];

  const countPage = data?.data?.count || 0;

  const {
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      image: '',
    },
  });
  const createGroup = async (data) => {
    // setLoadingButtonModal(true);

    await API_USERS_GROUPS(data)
      .then(() => {
        // mutate();
        toast.success(t('global.successfullyAdded'));
        // setDeleteModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        // setLoadingButtonModal(false);
      });
  };

  // const getGroupItem = async () => {
  //   console.log('run');
  //   await API_USERS_GROUPS_GET(groupId)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       toast.error(err);
  //     })
  //     .finally(() => {
  //       // setLoadingButtonModal(false);
  //     });
  // };

  // useEffect(() => {
  //   if (groupId) {
  //     getGroupItem();
  //   }
  // }, [groupId]);

  const groups =
    groupId === undefined
      ? listDaas
      : {
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

  let updatedData;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    updatedData = {
      ...data,
      users: data?.users.map((item) => item.id),
      admins: data?.admins.map((item) => item.id),
    };

    console.log(updatedData, 'submit adminlist');
    createGroup(updatedData);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full"
      >
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
            name="name"
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
            <AdminsList control={control} admins={groups} />
          </BaseTab>
          <BaseTab
            label={t(`groupManagement.${groupId ? 'users' : 'choiceUsers'}`)}
          >
            <UsersList control={control} users={groups} />
          </BaseTab>
        </BaseTabs>
      </form>
    </div>
  );
}
