import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { http } from '@src/services/http';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { TGroup, TGroupMembers } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { BaseButton, BaseInput, Typography } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import pencilSimple from '@iconify-icons/ph/pencil-simple';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { BaseInputUploadImage } from '@redesignUi/atoms/BaseInputUploadImage';
import pluse from '@iconify-icons/ph/plus-bold';

import { Pagination } from '@redesignUi/molecules/Pagination';
import {
  groupManagementAdminHeaderItem,
  groupManagementUserHeaderItem,
} from './constants/groupManagmentHeaderItem';

const PAGE_SIZE = 5;
const PAGE = 1;

export function GroupManagementEdit() {
  const { id } = useParams();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [updateGroup, setUpdateGroup] = useState<TGroup[]>([]);
  const [editMode, setEditMode] = useState(false);

  const { data, isLoading } = useSWR<IResponseData<TGroup[]>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );
  const group = useMemo(() => data?.data ?? [], [data]);

  useEffect(() => {
    if (group) setUpdateGroup(group);
  }, [group]);

  const paginatedData = useCallback(
    (key: keyof TGroup) => {
      const fullData: TGroupMembers[] = updateGroup[key] || [];
      const updatedDataByLabel = fullData.map((g) => {
        return { ...g, value: key };
      });
      const allFilteredData = updatedDataByLabel.filter((item) =>
        item.email.toLowerCase().includes(filterQuery.toLowerCase())
      );
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      if (filterQuery) {
        return allFilteredData.length > PAGE_SIZE
          ? allFilteredData.slice(startIndex, endIndex)
          : allFilteredData;
      }
      return updatedDataByLabel.slice(startIndex, endIndex);
    },
    [updateGroup, filterQuery, currentPage]
  );

  const handleClickAction = useCallback(
    (action, row) => {
      const alternateAction = action === 'users' ? 'admins' : 'users';

      if (!updateGroup) return;

      const existsInAction = updateGroup[action].some((ug) => ug.id === row.id);
      if (existsInAction) return;

      const uData = updateGroup[alternateAction].filter(
        (ug) => ug.id !== row.id
      );

      setUpdateGroup((prev) => {
        return {
          ...prev,
          [alternateAction]: uData,
          [action]: [row, ...prev[action]],
        };
      });
    },
    [updateGroup]
  );

  return (
    <div>
      <Typography variant="body2B" color="black" className="my-5">
        {t('groupManagement.editGroup')}
      </Typography>

      <div className="flex justify-between border-b border-gray-200 my-6">
        <div className="w-full flex my-4 ">
          <BaseInputUploadImage
            disabled={!editMode}
            name="image"
            defaultValue={group.image}
            onClick={(value: any) =>
              setUpdateGroup((prev) => {
                return { ...prev, image: value };
              })
            }
          />
          {!editMode ? (
            <div className="flex flex-col justify-center px-6 my-5  ">
              <Typography>{group?.name}</Typography>
              <Typography
                variant="body6"
                color="neutral"
                className="!text-gray-400"
              >
                admins 10 | users 10
              </Typography>
            </div>
          ) : (
            <div className="px-6 ">
              <BaseInput
                label={t('groupManagement.groupName')}
                id="name"
                name="name"
                value={updateGroup.name}
                onChange={(e) => {
                  return setUpdateGroup((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </div>
          )}
        </div>
        <IconButton
          className="self-center "
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
        body={paginatedData('admins')}
        onClick={handleClickAction}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-4" />
      <BaseTable
        header={groupManagementUserHeaderItem}
        body={paginatedData('users')}
        loading={isLoading}
        onClick={handleClickAction}
        isMobile
      />
      <div className="flex w-full justify-end mb-5 ">
        <BaseButton label={t('groupManagement.saveChanges')} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={group?.users?.length / 5}
        allItems={group?.users?.length}
        itemsPer={5}
        paginationLabel="یوزر"
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
