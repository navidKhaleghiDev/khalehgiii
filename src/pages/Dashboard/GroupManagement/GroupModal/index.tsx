import { useState, useRef } from 'react';
import { IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { TFile } from '@ui/atoms/Inputs/BaseUploadInput/types';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { API_USERS_GROUPS_CREATE } from '@src/services/users';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IDaAs } from '@src/services/users/types';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { AdminsList } from './AdminsList';
import { UsersList } from './UsersList';
import { TGroupList } from '../type';

type PropsType = {
  handleClose: (isUpdated?: boolean) => void;
  groupList?: {
    id: string;
    users: { id: string; email: string }[];
    admins: { id: string; email: string }[];
    name: string;
    created_at: string;
    updated_at: string;
    image: string | undefined;
  };
};
type TabsRefType = {
  changeTab: (index: number) => void;
  getActiveTab?: () => number;
};

const PAGE_SIZE = 8;
// const PAGE = 1;

export function GroupModal({ handleClose, groupList }: PropsType) {
  const tabsRef = useRef<TabsRefType>(null);
  const { t } = useTranslation();

  const [hasError, setHasError] = useState(false);
  // const [currentPage, setCurrentPage] = useState<number>(PAGE);
  // const [filterQuery, setFilterQuery] = useState<string>('');
  // const [selectedAdmins, setSelectedAdmins] = useState();
  // const [activeTab, setActiveTab] = useState(0);
  const [isAddNew, setIsAddNew] = useState(false);

  const handleChangeTab = () => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(1);
      // setActiveTab();
      // tabsRef.current.getActiveTab();
    }
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage: 1,
    filterQuery: '',
  });

  const { data } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];

  // const countPage = data?.data?.count || 0;

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
      name: groupList?.id ? groupList.name : '',
    },
  });

  const createGroup = async (list: TGroupList) => {
    await API_USERS_GROUPS_CREATE(list)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {});
  };

  const groups = !groupList?.id ? listDaas : groupList;

  const onSubmit: SubmitHandler<TGroupList> = (listData) => {
    const formData = new FormData();
    formData.append('name', listData.name);
    listData.users.map((item) => formData.append('users', item.id));
    listData.admins.map((item) => formData.append('admins', item.id));
    if (listData.image !== undefined) {
      formData.append('image', listData.image);
    }
    createGroup(formData as any);
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
        onSubmit={handleSubmit(onSubmit as any)}
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
          {t(`groupManagement.${groupList ? 'editGroup' : 'createGroup'}`)}
        </Typography>
        <div className="flex gap-3 items-center  w-10/12 h-28 ">
          <BaseUploadInput
            name="image"
            control={control}
            type={groupList ? 'edit' : 'add'}
            setValue={setValue}
            onClick={handleGetImageData}
            clearErrors={clearErrors}
            defaultValue={groupList?.id ? groupList?.image : ''}
            rules={undefined}
          />
          <BaseInput
            className="h-11"
            name="name"
            size="lg"
            id="name"
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
        <BaseTabs ref={tabsRef} className="px-12 pb-10">
          <BaseTab
            label={t(
              `groupManagement.${groupList ? 'admins' : 'choiceAdmins'}`
            )}
          >
            {!groups ? (
              <LoadingSpinner />
            ) : (
              <AdminsList
                handleChangeTab={handleChangeTab}
                listDaas={listDaas}
                control={control}
                admins={groups}
                setIsAddNew={setIsAddNew}
                isAddNew={isAddNew}
              />
            )}
          </BaseTab>
          <BaseTab
            label={t(`groupManagement.${groupList ? 'users' : 'choiceUsers'}`)}
          >
            {!groups ? (
              <LoadingSpinner />
            ) : (
              <UsersList
                listDaas={listDaas}
                control={control}
                users={groups}
                setIsAddNew={setIsAddNew}
                isAddNew={isAddNew}
              />
            )}
          </BaseTab>
        </BaseTabs>
      </form>
    </div>
  );
}
