import { useCallback, useState } from 'react';
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
import { Typography } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';

const PAGE_SIZE = 5;
const PAGE = 1;

const groupManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.recordingActivity',
    id: 'userName',
    type: 'avatar',
    email: 'email',
    isActive: 'isActive',
    permission: EPermissionSessionRecording.VIEW,
    class: 'w-8/12',
  },
  {
    label: 'table.recordingActivity',
    id: 'userName',
    type: 'component',
    component: (props) => <Drop />,
    permission: EPermissionSessionRecording.VIEW,
    class: 'w-8/12',
  },
];

export function GroupManagementEdit() {
  const { id } = useParams();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    id ? USERS_GROUPS_GET(id) : null,
    http.fetcherSWR
  );
  const group = data?.data ?? [];

  const paginatedData = useCallback(
    (key) => {
      const fullData = group[key] || [];
      const allFilteredData = fullData.filter((item) =>
        item.email.toLowerCase().includes(filterQuery.toLowerCase())
      );
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      if (filterQuery) {
        return allFilteredData.length > PAGE_SIZE
          ? allFilteredData.slice(startIndex, endIndex)
          : allFilteredData;
      }
      return fullData.slice(startIndex, endIndex);
    },
    [group, filterQuery, currentPage]
  );

  return (
    <div>
      <div>
        <Typography>{t('groupManagement.editGroup')}</Typography>
      </div>
      <SearchInput
        onChange={(e) => setFilterQuery(e)}
        value={filterQuery}
        id="search"
        name="search"
      />
      <BaseTable
        header={groupManagementHeaderItem}
        body={paginatedData('admins')}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-4" />
      <BaseTable
        header={groupManagementHeaderItem}
        body={paginatedData('users')}
        loading={isLoading}
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
