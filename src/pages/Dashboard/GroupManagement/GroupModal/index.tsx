/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, BaseSyntheticEvent } from 'react';
import { IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import {
  ErrorOption,
  Field,
  FieldArray,
  FieldArrayPath,
  FieldError,
  FieldErrors,
  FieldName,
  FieldRefs,
  FieldValues,
  FormProvider,
  FormState,
  InternalFieldName,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
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
import { LoadingSpinner } from '@ui/molecules/Loading';
// import { AdminsList } from './AdminsList';
import { UsersList } from './UsersList';

const PAGE_SIZE = 8;
// const PAGE = 1;

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

  // const handleChangeTab = () => {
  //   if (tabsRef.current) {
  //     tabsRef.current.changeTab(1);
  //   }
  // };
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
  console.log(group, '====');

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
          onSubmit={methods.handleSubmit(onSubmit as any)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex gap-3 items-center  w-10/12 h-28 ">
            <BaseUploadInput
              name="image"
              control={methods.control}
              type={group ? 'edit' : 'add'}
              setValue={methods.setValue}
              // onClick={handleGetImageData}
              clearErrors={methods.clearErrors}
              defaultValue={group?.id ? group?.image : ''}
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
              label={t(`groupManagement.${group ? 'admins' : 'choiceAdmins'}`)}
            >
              <GroupTabContent
                group={group}
                control={methods.control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup}
                onAddNewMember={() => {}}
                isAdmins
              />
            </BaseTab>
            <BaseTab
              label={t(`groupManagement.${group ? 'users' : 'choiceUsers'}`)}
            >
              <GroupTabContent
                group={group}
                control={methods.control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup}
                onAddNewMember={() => {}}
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
