import { useState } from 'react';
import useSWR from 'swr';

import { checkPermission } from '@src/helper/hooks/usePermission';
import { createAPIEndpoint } from '@src/helper/utils';
import { http } from '@src/services/http';
import { E_USERS } from '@src/services/users/endpoint';
import { IUser } from '@src/services/users/types';
import { EPermissionUsers, PermissionsCodeName } from '@src/types/permissions';
import { IResponsePagination } from '@src/types/services';
import { BaseMiniTable } from '@redesignUi/molecules/BaseMiniTable';
import { t } from 'i18next';

const PAGE_SIZE = 4;
const PAGE = 1;

export function DashboardAdminLogs({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery: '',
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useSWR<IResponsePagination<IUser>>(
    endpoint,
    http.fetcherSWR
  );
  const countPage = data?.data?.count || 0;

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };
  const listWhiteList = data?.data?.results ?? [];

  const header = {
    email: t('table.adminUserName'),
    last_login: t('table.lastLogin'),
    last_logout: t('table.lastLogout'),
  };

  return (
    checkPermission(permissions, EPermissionUsers.VIEW) && (
      <BaseMiniTable
        header={header}
        body={listWhiteList}
        loading={isLoading}
        date={['last_login', 'last_logout']}
        pagination={paginationProps}
        title={t('dashboard.adminLogin')}
        className="w-full xl:[&>*:last-child>*:last-child>*]:max-h-10 md:[&>*:last-child>*:last-child>*]:max-h-6 [&>*:last-child>*:last-child>*]:max-h-10 xl:h-[17.5rem] md:h-[13.125rem] h-auto"
      />
    )
  );
}
