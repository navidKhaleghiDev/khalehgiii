import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { http } from '@src/services/http';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { TGroup } from '@src/services/users/types';
import { EPermissionSessionRecording } from '@src/types/permissions';
import { IResponseData } from '@src/types/services';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { BaseButton, BaseIcon, BaseInput, Typography } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhListBulletsFill from '@iconify-icons/ph/list-bullets-fill';
import { components } from 'storybook/internal/components';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import pencilSimple from '@iconify-icons/ph/pencil-simple';
import { IconButton } from '@redesignUi/atoms/BaseButton';

const PAGE_SIZE = 5;
const PAGE = 1;

const dropdownOptions: DropDownHelperCellOption[] = [
  { id: 1, label: 'users' },
  { id: 1, label: 'admins' },
];

const groupManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.recordingActivity',
    id: 'userName',
    type: 'avatar',
    email: 'email',
    isActive: 'isActive',
    // permission: EPermissionSessionRecording.VIEW,
    class: 'w-8/12',
  },
  {
    label: 'table.recordingActivity',
    id: 'userName',
    type: 'drop',
    drop: {
      options: dropdownOptions,
      label: 'my label',
      defaultValueLabelKey: 'label',
      defaultValueKey: 'id',
    },
    // permission: EPermissionSessionRecording.VIEW,
    class: 'w-2/12 mr-auto',
  },
];

export function GroupManagementEdit() {
  const { id } = useParams();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [updateGroup, setUpdateGroupData] = useState([]);

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );
  const group = data?.data ?? [];

  useEffect(() => {
    if (group) setUpdateGroupData(group);
  }, [group]);

  const paginatedData = useCallback(
    (key) => {
      const fullData = updateGroup[key] || [];
      const updatedDataByLabel = fullData.map((g) => {
        return { ...g, label: key };
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

  const hendleClickAction = (action, row) => {
    const alternateAction = action === 'users' ? 'admins' : 'users';

    if (!updateGroup) return;

    const uData = updateGroup[alternateAction].filter((ug) => ug.id !== row.id);

    setUpdateGroupData((prev) => {
      return {
        ...prev,
        [alternateAction]: uData,
        [action]: [...prev[action], row],
      };
    });
  };

  return (
    <div>
      <Typography>{t('groupManagement.editGroup')}</Typography>
      <div className="flex justify-between">
        <div className="w-full  ">
          <Typography>{group?.name}</Typography>
          <Typography variant="body6" color="neutral">
            admins 10 | users 10
          </Typography>
          <div className="border-t border-gray-200 my-4" />
        </div>
        <div>
          <IconButton icon={pencilSimple} color="neutral" size="sm" />
        </div>
      </div>
      <SearchInput
        onChange={(e) => setFilterQuery(e)}
        value={filterQuery}
        id="search"
        name="search"
        placeholder={t('groupManagement.searchGroup')}
      />
      <BaseTable
        header={groupManagementHeaderItem}
        body={paginatedData('admins')}
        onClick={hendleClickAction}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-4" />
      <BaseTable
        header={groupManagementHeaderItem}
        body={paginatedData('users')}
        loading={isLoading}
        onClick={hendleClickAction}
        pagination={{
          countPage: 1,
          currentPage,
          totalPages: group?.users?.length / 5,
          allItems: group?.users?.length,
          itemsPer: 5,
          paginationLabel: 'یوزر',
          onPageChange: (page) => setCurrentPage(page),
        }}
        isMobile
      />
    </div>
  );
}
