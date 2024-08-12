/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';

import { BaseButton, BaseInput } from '@ui/atoms';
import { BaseTab, BaseTabs } from '@ui/atoms/BaseTabs';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { regexPattern } from '@ui/atoms/Inputs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { TGroup, UpdateGroupPayload } from '@src/services/users/types';
import { GroupTabContent } from '../GroupTabContent';
import { GroupTabsRefType, TGroupUpdate } from '../types';

type TGroupModalFormProps = {
  group: TGroup | undefined;
  permissions: boolean;
  updatedData: TGroupUpdate | undefined;
  setUpdatedData: (updatedData: TGroupUpdate | undefined) => void;
  createGroup: (list: TGroup) => void;
  buildFormData: (data: TGroupUpdate) => FormData;
  loading: boolean;
  loadingGroup: boolean | undefined;
  setOpenModal: (open: boolean) => void;
};

export function GroupModalForm({
  group,
  permissions,
  updatedData,
  setUpdatedData,
  createGroup,
  buildFormData,
  loading,
  loadingGroup,
  setOpenModal,
}: TGroupModalFormProps) {
  const tabsRef = useRef<GroupTabsRefType>(null);
  const [isUpdatingGroupMember, setIsUpdatingGroupMember] = useState(false);
  const { t } = useTranslation();

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

  const onSubmit: SubmitHandler<TGroupUpdate> = (listData) => {
    createGroup(buildFormData(listData) as any);
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

  const handleUpdateGroup = async (updatedList: UpdateGroupPayload) => {
    setUpdatedData(updatedList as unknown as TGroupUpdate);
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

  return (
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
            disabled={!permissions}
            fullWidth
          />
        </div>
        <BaseTabs ref={tabsRef} className="px-12 pb-10">
          <BaseTab
            label={t(`groupManagement.${group ? 'admins' : 'choiceAdmins'}`)}
          >
            <GroupTabContent
              permissions={permissions}
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
              permissions={permissions}
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
            disabled={(!updatedData && !isDirty) || !permissions}
          />
        )}
      </form>
    </FormProvider>
  );
}
