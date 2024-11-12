import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import { Typography } from '@redesignUi/atoms';
import { BaseButton, IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseInputUploadImageController } from '@redesignUi/atoms/BaseInputUploadImage/Controller';
import { BaseInputController } from '@redesignUi/atoms/Inputs/BaseInput/Controller';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { Pagination } from '@redesignUi/molecules/Pagination';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import pencilSimple from '@iconify-icons/ph/pencil-simple';

import {
  groupManagementAdminHeaderItem,
  groupManagementUserHeaderItem,
} from '../constants/groupManagementHeaderItem';
import { TGroup, TGroupUpdate } from '../../types';

type GroupManagementEditFormProps = {
  setFilterQuery: (e: string) => void;
  filterQuery: string;
  paginatedData: any;
  setCurrentPage: (val: number) => void;
  handleClickAction: any;
  isLoading: boolean;
  currentPage: number;
  group: TGroup;
  control: Control<TGroupUpdate>;
  handleSubmit: UseFormHandleSubmit<TGroupUpdate, undefined>;
  onSubmit: SubmitHandler<TGroupUpdate>;
  allGroupData: TGroup;
  isDirty: boolean;
  setOpenEditModal: any;
};

export function GroupManagementEditForm(props: GroupManagementEditFormProps) {
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
    setOpenEditModal,
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
                {group?.name}
              </Typography>
              <Typography variant="body6" color="neutralMiddle">
                {`${allAdminsLength} ${t(
                  'groupManagement.admin'
                )}   |   ${allUsersLength} ${t('groupManagement.user')}  `}
              </Typography>
            </div>
          ) : (
            <BaseInputController
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
        body={adminData}
        onClick={handleClickAction}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-5" />
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
