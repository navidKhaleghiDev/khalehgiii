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
import { regexPattern } from '@ui/atoms/Inputs';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionGroupManagement } from '@src/types/permissions';

export function GroupModal({
  handleClose,
  group,
  mutate,
  loadingGroup,
  setGroupSelected,
}: GroupModalProps) {
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

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
    formState: { isDirty },
  } = methods;

  const GroupManagementChange = checkPermission(
    userPermissions,
    EPermissionGroupManagement.CHANGE
  );

  const buildFormData = (data: TGroupUpdate) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image === '' || data.image instanceof Blob) {
      formData.append('image', data?.image);
    }
    data.users.forEach((user) => formData.append('users', user.id));
    data.admins.forEach((admin) => formData.append('admins', admin.id));
    return formData;
  };

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
    await API_USERS_GROUPS_UPDATE(buildFormData(updatedData), group?.id)
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
    createGroup(buildFormData(listData) as any);
  };

  const handleAddNewMember = (isAdmin?: boolean) => {
    const userType = isAdmin ? 'admins' : 'users';
    const alternateUserType = !isAdmin ? 'admins' : 'users';

    const newMembers = [
      ...(group?.[userType] || []),
      ...(getValues(userType) || []),
    ];
    const existingMembers = group ? group[alternateUserType] : [];

    if (group) {
      setUpdatedData({
        users: isAdmin ? existingMembers : newMembers,
        admins: isAdmin ? newMembers : existingMembers,
        name: getValues('name') || group.name,
        image: getValues('image'),
      });
      setIsUpdatingGroupMember(false);
    } else if (!group) {
      handleSubmit(onSubmit)();
      if (tabsRef.current) tabsRef.current.changeTab(1);
    }
  };

  const handleUpdateGroup = async (updatedList: UpdateGroupPayload) => {
    setUpdatedData(updatedList as unknown as TGroupUpdate);
  };

  const updateGroupProperty = <K extends keyof TGroupUpdate>(
    key: K,
    value: TGroupUpdate[K]
  ) => {
    if (group) {
      setUpdatedData({
        ...group,
        [key]: value,
      });
    }
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
              disabled
              onClick={(value: any) => updateGroupProperty('image', value)}
              name="image"
              control={control}
              type={group ? 'edit' : 'add'}
              setValue={setValue}
              clearErrors={clearErrors}
              defaultValue={group?.id ? group?.image : ''}
              rules={undefined}
            />
            <BaseInput
              pureOnChange={(e) => updateGroupProperty('name', e.target.value)}
              className="h-11"
              name="name"
              size="lg"
              id="name"
              label=""
              control={control}
              placeholder=""
              type="text"
              rules={{
                required: regexPattern.required,
              }}
              disabled={!GroupManagementChange}
              fullWidth
            />
          </div>
          <BaseTabs ref={tabsRef} className="px-12 pb-10">
            <BaseTab
              label={t(`groupManagement.${group ? 'admins' : 'choiceAdmins'}`)}
            >
              <GroupTabContent
                permissions={GroupManagementChange}
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
                permissions={GroupManagementChange}
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
              disabled={(!updatedData && !isDirty) || !GroupManagementChange}
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
