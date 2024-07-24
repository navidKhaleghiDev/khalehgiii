/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef } from 'react';
import { IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import {
  API_USERS_GROUPS_CREATE,
  API_USERS_GROUPS_UPDATE,
} from '@src/services/users';
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
  mutate: any;
};
type TabsRefType = {
  changeTab: (index: number) => void;
  getActiveTab?: () => number;
};

const PAGE_SIZE = 8;
// const PAGE = 1;

export function GroupModal({ handleClose, groupList, mutate }: PropsType) {
  const { t } = useTranslation();
  const tabsRef = useRef<TabsRefType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddNew, setIsAddNew] = useState(false);

  const handleChangeTab = () => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(1);
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

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      image: '',
      name: groupList?.id ? groupList.name : '',
    },
  });

  const createGroup = async (list: TGroupList) => {
    setLoading(true);
    await API_USERS_GROUPS_CREATE(list)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  const updateGroup = async (updatedList: TGroupList) => {
    if (!groupList?.id) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(updatedList, groupList?.id)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
        handleClose();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const groups = !groupList?.id ? listDaas : groupList;

  const onSubmit: SubmitHandler<TGroupList> = (listData) => {
    const formData = new FormData();
    formData.append('name', listData.name);
    listData.users.map((item) => formData.append('users', item.id));
    listData.admins.map((item) => formData.append('admins', item.id));

    createGroup(formData as any);
  };
  return (
    <div className="p-5 w-full flex flex-col items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit as any)}
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
              control={methods.control}
              type={groupList ? 'edit' : 'add'}
              setValue={methods.setValue}
              // onClick={handleGetImageData}
              clearErrors={methods.clearErrors}
              defaultValue={groupList?.id ? groupList?.image : ''}
              rules={undefined}
            />
            <BaseInput
              className="h-11"
              name="name"
              size="lg"
              id="name"
              label=""
              control={methods.control}
              placeholder=""
              type="text"
              rules={undefined}
              fullWidth
            />
          </div>

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
                  updateGroup={updateGroup}
                  handleChangeTab={handleChangeTab}
                  listDaas={listDaas}
                  control={methods.control}
                  admins={groups as any}
                  setIsAddNew={setIsAddNew}
                  isAddNew={isAddNew}
                />
              )}
            </BaseTab>
            <BaseTab
              label={t(
                `groupManagement.${groupList ? 'users' : 'choiceUsers'}`
              )}
            >
              {!groups ? (
                <LoadingSpinner />
              ) : (
                <UsersList
                  updateGroup={updateGroup}
                  loading={loading}
                  listDaas={listDaas}
                  control={methods.control}
                  users={groups}
                  setIsAddNew={setIsAddNew}
                  isAddNew={isAddNew}
                />
              )}
            </BaseTab>
          </BaseTabs>
        </form>
      </FormProvider>
    </div>
  );
}
