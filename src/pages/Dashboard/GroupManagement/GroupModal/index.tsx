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

import { GroupTabContent } from '@src/pages/Dashboard/GroupManagement/GroupModal/GroupTabContent';
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
import { IDaAs, TGroup, UpdateGroupPayload } from '@src/services/users/types';
import {
  GroupModalProps,
  GroupTabsRefType,
} from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import { TUserList } from '@src/pages/Dashboard/GroupManagement/type';

const PAGE_SIZE = 8;
// const PAGE = 1;

type GetIds = {
  formList: { id: string }[];
  list?: TUserList;
  // users: TUserList;
  // isAdmin?: boolean;
};
function getIds({ formList, list }: GetIds): string[] {
  const formListIds = formList.map((item) => item.id);
  const listIds = list ? list.map((item) => item.id) : [];
  return [...formListIds, ...listIds];
}

export function GroupModal({
  handleClose,
  group,
  mutate,
  loadingGroup,
}: GroupModalProps) {
  const { t } = useTranslation();
  const tabsRef = useRef<GroupTabsRefType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddNew, setIsAddNew] = useState(false);

  const activeTab = tabsRef.current?.getActiveTab ?? 0;

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
  const listDaas: IDaAs[] = data?.data?.results ?? [];
  // const countPage = data?.data?.count || 0;

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      image: '',
      name: group?.id ? group.name : '',
    },
  });
  const { clearErrors, control, handleSubmit, setValue, getValues } = methods;

  const createGroup = async (list: TGroup) => {
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

  const handleUpdateGroup = async (updatedList: UpdateGroupPayload) => {
    if (!group?.id) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(updatedList, group?.id)
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

  // const groups = !group?.id ? listDaas : group;

  const onSubmit: SubmitHandler<TGroup> = (listData) => {
    const formData = new FormData();
    formData.append('name', listData.name);
    listData.users.map((item) => formData.append('users', item.id));
    listData.admins.map((item) => formData.append('admins', item.id));

    createGroup(formData as any);
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
        {t(`groupManagement.${group ? 'editGroup' : 'createGroup'}`)}
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex gap-3 items-center  w-10/12 h-28 ">
            <BaseUploadInput
              name="image"
              control={control}
              type={group ? 'edit' : 'add'}
              setValue={setValue}
              // onClick={handleGetImageData}
              clearErrors={clearErrors}
              defaultValue={group?.id ? group?.image : ''}
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
          <BaseTabs ref={tabsRef} className="px-12 pb-10">
            <BaseTab
              label={t(`groupManagement.${group ? 'admins' : 'choiceAdmins'}`)}
            >
              <GroupTabContent
                group={group}
                control={control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup}
                onAddNewMember={() => {
                  const adminsIds = getIds({
                    formList: getValues('admins'),
                    list: group?.admins,
                  });

                  if (group) {
                    const usersIds = group.users.map((item) => item.id);

                    handleUpdateGroup({
                      users: usersIds,
                      admins: adminsIds,
                      name: group?.name,
                    });
                    return;
                  }

                  if (tabsRef.current) {
                    tabsRef.current.changeTab(1);
                  }
                }}
                isAdmins
              />
            </BaseTab>
            <BaseTab
              label={t(`groupManagement.${group ? 'users' : 'choiceUsers'}`)}
            >
              <GroupTabContent
                activeTab={activeTab}
                group={group}
                control={control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup}
                onAddNewMember={() => {
                  // const adminsIds = getIds({
                  //   formList: getValues('admins'),
                  //   list: group?.users,
                  // });

                  // if (group) {
                  //   const usersIds = group.users.map((item) => item.id);

                  //   handleUpdateGroup({
                  //     users: usersIds,
                  //     admins: adminsIds,
                  //     name: group?.name,
                  //   });
                  //   return;
                  // }

                  handleSubmit(onSubmit as any);
                }}
              />

              {/* {!groups ? (
                <LoadingSpinner />
              ) : (
                <UsersList
                  updateGroup={handleUpdateGroup}
                  loading={loading}
                  listDaas={listDaas}
                  control={methods.control}
                  users={groups}
                  setIsAddNew={setIsAddNew}
                  isAddNew={isAddNew}
                />
              )} */}
            </BaseTab>
          </BaseTabs>
        </form>
      </FormProvider>
    </div>
  );
}
