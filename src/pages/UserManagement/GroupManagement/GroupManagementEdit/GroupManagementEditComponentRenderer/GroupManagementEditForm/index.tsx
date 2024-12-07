import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseButton, IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseInputUploadImageController } from '@redesignUi/atoms/BaseInputUploadImage/Controller';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { Pagination } from '@redesignUi/molecules/Pagination';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import pencilSimple from '@iconify-icons/ph/pencil-simple';

import { regexPattern } from '@redesignUi/atoms/Inputs';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import {
  groupManagementAdminHeaderItem,
  groupManagementUserHeaderItem,
} from '../../constants/groupManagementHeaderItem';
import {
  GroupManagementEditFormProps,
  GroupParams,
  GroupMembersParams,
} from '../../../types';

/**
 * Group Management Edit Form Component.
 *
 * This component renders a form for editing group management details,
 * including group name, image, and member details. It integrates pagination,
 * table filtering, and form submission functionality.
 *
 * @param {GroupManagementEditFormProps} props - The props for the component.
 * @param {function} props.setFilterQuery - Function to set the filter query for the table.
 * @param {string} props.filterQuery - Current filter query for the table.
 * @param {function} props.paginatedData - Function to retrieve paginated data for users or admins.
 * @param {function} props.setCurrentPage - Function to update the current pagination page.
 * @param {function} props.handleClickAction - Function to handle click actions on table rows.
 * @param {boolean} props.isLoading - Indicates whether data is currently loading.
 * @param {number} props.currentPage - Current page in the pagination.
 * @param {object} props.group - Group data, including users and admins.
 * @param {object} props.control - `react-hook-form` control object for form management.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @param {function} props.onSubmit - Callback for form submission.
 * @param {object} props.allGroupData - Complete group data for comparison and validations.
 * @param {boolean} props.isDirty - Indicates whether the form has unsaved changes.
 * @param {function} props.setOpenEditModal - Function to toggle the visibility of the edit modal.
 *
 * @returns {JSX.Element} - The rendered Group Management Edit Form component.
 */

export function GroupManagementEditForm<T extends GroupParams>(
  props: GroupManagementEditFormProps<T>
) {
  const {
    pageSize,
    setFilterQuery,
    filterQuery,
    setCurrentPage,
    handleClickAction,
    isLoading,
    currentPage,
    updateGroup,
    control,
    handleSubmit,
    onSubmit,
    allGroupData,
    isDirty,
    setOpenEditModal,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  const paginatedData = useCallback(
    (key: keyof GroupParams) => {
      const groupData = Array.isArray(updateGroup[key])
        ? (updateGroup[key] as GroupMembersParams[])
        : [];

      const mappedData = groupData.map((member) => ({ ...member, value: key }));

      const filteredData = filterQuery
        ? mappedData.filter((item) =>
            item.email.toLowerCase().includes(filterQuery.toLowerCase())
          )
        : mappedData;

      const startIndex = (currentPage - 1) * pageSize;
      const paginatedResult = filteredData.slice(
        startIndex,
        startIndex + pageSize
      );

      return paginatedResult;
    },
    [updateGroup, filterQuery, currentPage, pageSize]
  );

  const numberOfUsers =
    updateGroup.users.length >= updateGroup.admins.length
      ? updateGroup.users.length
      : updateGroup.admins.length;

  const allAdminsLength = allGroupData?.admins?.length;
  const allUsersLength = allGroupData?.users?.length;

  const isGroupEdited = allGroupData !== updateGroup || isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between border-b border-gray-200 mb-[1.875rem]">
        <div className="w-full flex mb-[1.875rem] gap-5 items-center">
          <BaseInputUploadImageController
            name="image"
            control={control}
            disabled={!editMode}
          />
          {!editMode ? (
            <div className="flex flex-col justify-center">
              <Typography variant="body2B" color="black">
                {updateGroup?.name}
              </Typography>
              <Typography variant="body6" color="neutralMiddle">
                {`${allAdminsLength} ${t(
                  'groupManagement.admin'
                )}   |   ${allUsersLength} ${t('groupManagement.user')}  `}
              </Typography>
            </div>
          ) : (
            <BaseInputController
              rules={{
                required: regexPattern.required,
                pattern: regexPattern.en_spc,
                minLength: 2,
                maxLength: 20,
              }}
              name="name"
              id="name"
              control={control}
              className="-mb-2"
              label={t('groupManagement.groupName')}
            />
          )}
        </div>
        <IconButton
          className="self-center"
          icon={pencilSimple}
          color="neutral"
          size="sm"
          onClick={() => setEditMode((prev) => !prev)}
        />
      </div>
      <div className="flex [&>*]:justify-between [&>*]:w-full pb-4">
        <FilterTableList
          buttonLabel={t('groupManagement.addMember')}
          onClickButton={() => setOpenEditModal(true)}
          searchQuery={filterQuery}
          searchPlaceholder={t('groupManagement.searchGroup')}
          handelSearchQuery={setFilterQuery}
        />
      </div>

      <BaseTable
        header={groupManagementAdminHeaderItem}
        body={paginatedData('admins') as GroupMembersParams[]}
        onClick={handleClickAction as OnClickActionsType<GroupMembersParams>}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-5" />
      <BaseTable
        header={groupManagementUserHeaderItem}
        body={paginatedData('users') as GroupMembersParams[]}
        loading={isLoading}
        onClick={handleClickAction as OnClickActionsType<GroupMembersParams>}
        isMobile
      />
      <div className="flex w-full justify-end mb-5">
        <BaseButton
          submit
          disabled={!isGroupEdited}
          label={t('groupManagement.saveChanges')}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(numberOfUsers / 5)}
        allItems={numberOfUsers}
        itemsPer={5}
        paginationLabel={t('groupManagement.member')}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </form>
  );
}
