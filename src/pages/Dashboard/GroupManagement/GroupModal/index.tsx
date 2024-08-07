/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef } from 'react';
import { BaseButton, IconButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { GroupTabContent } from '@src/pages/Dashboard/GroupManagement/GroupModal/GroupTabContent';
import { useTranslation } from 'react-i18next';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import {
  API_USERS_GROUPS_CREATE,
  API_USERS_GROUPS_UPDATE,
} from '@src/services/users';
import { toast } from 'react-toastify';
import { TGroup, UpdateGroupPayload } from '@src/services/users/types';
import {
  GroupModalProps,
  GroupTabsRefType,
  TGroupUpdate,
} from '@src/pages/Dashboard/GroupManagement/GroupModal/types';
import { Modal } from '@ui/molecules/Modal';

const getIds = (list: TGroupUpdate) => {
  const users = list.users.map((item) => item.id);
  const admins = list.admins.map((item) => item.id);
  return {
    name: list.name,
    users,
    admins,
  };
};

export function GroupModal({
  handleClose,
  group,
  mutate,
  loadingGroup,
  setGroupSelected,
}: GroupModalProps) {
  const { t } = useTranslation();
  const tabsRef = useRef<GroupTabsRefType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<TGroupUpdate | undefined>(
    undefined
  );
  const [isUpdatingGroupMember, setIsUpdatingGroupMember] = useState(false);

  const methods = useForm<TGroupUpdate>({
    mode: 'onChange',
    defaultValues: {
      image: '',
      name: group?.id ? group.name : '',
    },
  });
  const {
    clearErrors,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isDirty },
  } = methods;

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
  const updateGroup = async () => {
    if (!group?.id || !updatedData) return;
    setLoading(true);
    await API_USERS_GROUPS_UPDATE(getIds(updatedData), group?.id)
      .then(() => {
        toast.success(t('global.successfullyAdded'));
        mutate();
        handleClose();
        setGroupSelected(undefined);
        setOpenModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setOpenModal(false);
        setLoading(false);
      });
  };
  const onSubmit: SubmitHandler<TGroupUpdate> = (listData) => {
    const formData = new FormData();
    formData.append('name', listData.name);
    listData.users.map((item) => formData.append('users', item.id));
    listData.admins.map((item) => formData.append('admins', item.id));
    createGroup(formData as any);
  };

  const handleAddNewMember = (isAdmin: boolean | undefined) => {
    // when we wanted to update  the existed group
    const userType = isAdmin ? 'admins' : 'users';
    const alternateUserType = !isAdmin ? 'admins' : 'users';
    const dataValue = getValues(userType) || [];
    const groupData = group ? group[userType] : [];
    const alternateGroupData = group ? group[alternateUserType] : [];

    const updatedList = [...groupData, ...dataValue];
    if (group) {
      setUpdatedData({
        users: isAdmin ? alternateGroupData : updatedList,
        admins: isAdmin ? updatedList : alternateGroupData,
        name: watch('name') || group?.name,
      });

      setIsUpdatingGroupMember(false);
    }
    // when we create the new group
    if (!group && !isAdmin) handleSubmit(onSubmit)();

    if (!group && tabsRef.current) {
      tabsRef.current.changeTab(1);
    }
  };

  const handleUpdateGroup = async (updatedList: UpdateGroupPayload) => {
    setUpdatedData(updatedList as unknown as TGroupUpdate);
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex gap-3 items-center  w-10/12 h-28 ">
            <BaseUploadInput
              name="image"
              control={control}
              type={group ? 'edit' : 'add'}
              setValue={setValue}
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
                isUpdatingGroupMember={isUpdatingGroupMember}
                setIsUpdatingGroupMember={setIsUpdatingGroupMember}
                activeTab={0}
                group={updatedData || group}
                control={control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup || loading}
                onAddNewMember={handleAddNewMember}
                isAdmins
              />
            </BaseTab>
            <BaseTab
              label={t(`groupManagement.${group ? 'users' : 'choiceUsers'}`)}
            >
              <GroupTabContent
                isUpdatingGroupMember={isUpdatingGroupMember}
                setIsUpdatingGroupMember={setIsUpdatingGroupMember}
                activeTab={1}
                group={updatedData || group}
                control={control}
                onUpdateGroup={handleUpdateGroup}
                loading={loadingGroup || loading}
                onAddNewMember={handleAddNewMember}
              />
            </BaseTab>
          </BaseTabs>
          {group && (
            <BaseButton
              label={t('global.confirm')}
              size="md"
              onClick={() => setOpenModal(true)}
              className="mt-4"
              disabled={!updatedData && !isDirty}
            />
          )}
        </form>
      </FormProvider>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: updateGroup,
          loading: false,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModal(false),
          color: 'red',
        }}
      />
    </div>
  );
}
