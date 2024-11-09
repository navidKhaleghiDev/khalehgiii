import { useState } from 'react';
import pencilSimple from '@iconify-icons/ph/pencil-simple';
import pluse from '@iconify-icons/ph/plus-bold';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseButton, IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseInputUploadImageController } from '@redesignUi/atoms/BaseInputUploadImage/Controller';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { Pagination } from '@redesignUi/molecules/Pagination';
import {
  groupManagementAdminHeaderItem,
  groupManagementUserHeaderItem,
} from '../constants/groupManagementHeaderItem';

export function GroupManagementEditForm(props) {
  const {
    setFilterQuery,
    filterQuery,
    paginatedData,
    setCurrentPage,
    handleClickAction,
    isLoading,
    currentPage,
    group,
    control,
    handleSubmit,
    onSubmit,
    allGroupData,
    isDirty,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  const numberOfUsers = group?.users?.length as number;

  const userData = paginatedData('users');
  const adminData = paginatedData('admins');

  const allAdminsLength = allGroupData?.admins?.length;
  const allUsersLength = allGroupData?.users?.length;

  const isGroupEdited = allGroupData !== group || isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between border-b border-gray-200 my-6">
        <div className="w-full flex my-4">
          <BaseInputUploadImageController
            name="image"
            control={control}
            disabled={!editMode}
          />
          {!editMode ? (
            <div className="flex flex-col justify-center px-6 my-5">
              <Typography>{group?.name}</Typography>
              <Typography
                variant="body6"
                color="neutral"
                className="!text-gray-400"
              >
                {`${allAdminsLength} ${t(
                  'groupManagement.admin'
                )}   |   ${allUsersLength} ${t('groupManagement.user')}  `}
              </Typography>
            </div>
          ) : (
            <div className="px-6 ">
              <BaseInputController
                name="name"
                id="name"
                control={control}
                label={t('groupManagement.groupName')}
              />
            </div>
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
      <div className="flex  justify-between">
        <SearchInput
          fullWidth
          className="w-1/2 ml-4 sm:w-[255px]"
          onChange={(e) => setFilterQuery(e)}
          value={filterQuery}
          id="search"
          name="search"
          placeholder={t('groupManagement.searchGroup')}
        />
        <BaseButton
          className="w-1/2 ml-4 sm:w-40"
          label={t('groupManagement.addMember')}
          endIcon={pluse}
        />
      </div>

      <BaseTable
        header={groupManagementAdminHeaderItem}
        body={adminData}
        onClick={handleClickAction}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-4" />
      <BaseTable
        header={groupManagementUserHeaderItem}
        body={userData}
        loading={isLoading}
        onClick={handleClickAction}
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
        totalPages={numberOfUsers / 5}
        allItems={numberOfUsers}
        itemsPer={5}
        paginationLabel={t('groupManagement.member')}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </form>
  );
}
