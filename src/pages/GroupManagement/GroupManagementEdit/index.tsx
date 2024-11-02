import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { createAPIEndpoint } from '@src/helper/utils';
import { http } from '@src/services/http';
import { USERS_GROUPS_GET } from '@src/services/users/endpoint';
import { TGroup } from '@src/services/users/types';
import { EPermissionSessionRecording } from '@src/types/permissions';
import { IResponseData } from '@src/types/services';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { Typography } from '@redesignUi/atoms';

const PAGE_SIZE = 10;
const PAGE = 1;

export function GroupManagementEdit() {
  const { id } = useParams();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const endpoint = createAPIEndpoint({
    endPoint: id ? USERS_GROUPS_GET(id) : null,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading, mutate } = useSWR<IResponseData<TGroup[]>>(
    endpoint,
    http.fetcherSWR
  );

  const group = data?.data ?? [];
  console.log(group);

  return (
    <div>
      <div>
        <Typography>{t('groupManagement.editGroup')}</Typography>
      </div>

      <BaseTable
        header={groupManagementHeaderItem}
        body={group.admins}
        loading={isLoading}
        isMobile
      />
      <div className="border-t border-gray-200 my-4" />
      <BaseTable
        header={groupManagementHeaderItem}
        body={group.users}
        loading={isLoading}
        isMobile
      />
    </div>
  );
}

const groupManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.recordingActivity',
    id: 'id',
    type: 'avatar',
    email: 'email',
    isActive: 'isActive',
    permission: EPermissionSessionRecording.VIEW,
    class: 'w-2/12',
  },
];
