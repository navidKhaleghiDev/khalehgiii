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

/**
 * `GroupModalForm` component provides a form interface for creating or updating a user group.
 * It includes file upload, input fields for group name, and tabs for managing group members
 * (admins and users). The form submission handles either creating a new group or updating
 * an existing group, depending on the provided props.
 *
 * @component
 * @param {TGroupModalFormProps} props - The properties required by the component.
 *
 * @param {TGroup | undefined} props.group - The existing group data, if editing.
 * @param {boolean} props.permissions - User permissions for editing or creating a group.
 * @param {TGroupUpdate | undefined} props.updatedData - The updated group data state.
 * @param {function} props.setUpdatedData - Function to set the updated group data.
 * @param {function} props.createGroup - Function to create a new group.
 * @param {function} props.buildFormData - Function to build form data for API submission.
 * @param {boolean} props.loading - Loading state for the form submission.
 * @param {boolean | undefined} props.loadingGroup - Loading state for group data.
 * @param {function} props.setOpenModal - Function to control the state of the modal.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <GroupModalForm
 *     group={groupData}
 *     permissions={userPermissions}
 *     updatedData={updatedGroupData}
 *     setUpdatedData={setUpdatedGroupData}
 *     createGroup={createGroupFunction}
 *     buildFormData={buildFormDataFunction}
 *     loading={loadingState}
 *     loadingGroup={loadingGroupState}
 *     setOpenModal={setModalState}
 *   />
 * );
 */
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
      image: group?.id ? group?.image : '',
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

  /**
   * Handles form submission to create or update a group.
   *
   * @param {TGroupUpdate} listData - The data to submit.
   */
  const onSubmit: SubmitHandler<TGroupUpdate> = (listData) => {
    createGroup(buildFormData(listData) as any);
  };

  /**
   * Updates a specific property of the group data being edited.
   *
   * @template K
   * @param {K} key - The key of the property to update.
   * @param {TGroupUpdate[K]} value - The new value for the property.
   */
  const updateGroupProperty = <K extends keyof TGroupUpdate>(
    key: K,
    value: TGroupUpdate[K]
  ) => {
    if (updatedData) {
      setUpdatedData({
        ...updatedData,
        [key]: value,
      });
    } else if (group) {
      setUpdatedData({
        ...group,
        [key]: value,
      });
    }
  };

  /**
   * Handles the update of the group's properties (like users or admins).
   *
   * @param {UpdateGroupPayload} updatedList - The updated list of group members.
   */
  const handleUpdateGroup = async (updatedList: UpdateGroupPayload) => {
    setUpdatedData(updatedList as unknown as TGroupUpdate);
  };

  /**
   * Handles adding a new member to the group, either as a user or an admin.
   *
   * @param {boolean} [isAdmin=false] - Whether the in user or admin tab
   */
  const handleAddNewMember = (isAdmin?: boolean) => {
    const userType = isAdmin ? 'admins' : 'users';
    const alternateUserType = !isAdmin ? 'admins' : 'users';

    const newMembers = [
      ...(group?.[userType] || []),
      ...(getValues(userType) || []),
    ];

    const updatedAlternative = updatedData
      ? updatedData[alternateUserType]
      : false;

    const existingMembers = group ? group[alternateUserType] : [];

    if (group) {
      const updatedGroupData = {
        users: isAdmin ? existingMembers : newMembers,
        admins: isAdmin ? newMembers : existingMembers,
        name: getValues('name') || group.name,
        image: getValues('image'),
      };
      if (updatedAlternative) {
        setUpdatedData({
          ...updatedGroupData,
          [alternateUserType]: updatedAlternative,
        });
      } else {
        setUpdatedData(updatedGroupData);
      }
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
            disabled={!permissions}
            onClick={(value: any) => updateGroupProperty('image', value)}
            name="image"
            control={control}
            type={group ? 'edit' : 'add'}
            setValue={setValue}
            clearErrors={clearErrors}
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
