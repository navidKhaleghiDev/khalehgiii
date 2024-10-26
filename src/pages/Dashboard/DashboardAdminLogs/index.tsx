import moment from 'moment-jalaali';
import { useState } from 'react';
import useSWR from 'swr';

import { Card, Typography } from '@redesignUi/atoms';
import { LoadingPage } from '@redesignUi/molecules/Loading';
import { checkPermission } from '@src/helper/hooks/usePermission';
// import { useUserPermission } from '@src/helper/hooks/usePermission';
import { createAPIEndpoint } from '@src/helper/utils';
// import { adminListHeaderItem } from '@src/pages/DashboardAdminsList/AdminsList/constants/ adminListHeaderItem';
import { http } from '@src/services/http';
import { E_USERS } from '@src/services/users/endpoint';
import { IUser } from '@src/services/users/types';
import { EPermissionUsers, PermissionsCodeName } from '@src/types/permissions';
import { IResponsePagination } from '@src/types/services';
// import { BaseTable } from '@ui/atoms/BaseTable';
// import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';

const PAGE_SIZE = 10;
const PAGE = 1;

export function DashboardAdminLogs({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}) {
  const [currentPage] = useState<number>(PAGE);
  const [filterQuery] = useState<string>('');

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IUser>>(
    endpoint,
    http.fetcherSWR
  );
  const listWhiteList = data?.data?.results ?? [];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    checkPermission(permissions, EPermissionUsers.VIEW) && (
      <Card
        color="white"
        rounded="xxl"
        shadow="base"
        className="xl:p-5 py-6 px-5 xl:h-[17.5rem] h-[13rem] overflow-x-hidden overflow-y-auto"
      >
        <Typography color="black" variant="body4B" className="mb-2.5">
          ورود و خروج ادمین ها
        </Typography>
        <table className="table-auto w-full border-separate border-spacing-x-0 border-spacing-y-2.5">
          <thead>
            <tr className="text-xs font-normal">
              <th className="text-xs font-normal px-2 py-1">نام ادمین</th>
              <th className="text-xs font-normal px-2 py-1">آخرین ورود</th>
              <th className="text-xs font-normal px-2 py-1">آخرین خروج</th>
            </tr>
          </thead>
          <tbody>
            {listWhiteList.map((user) => (
              <tr className="border border-gray-300 rounded-sm" key={user.id}>
                <td className="text-xs font-normal px-2 py-1 text-center">
                  {user.email}
                </td>
                <td className="text-xs font-normal px-2 py-1 text-center">
                  {user.last_login
                    ? moment(user.last_login).format('jYYYY/jMM/jDD')
                    : '---'}
                </td>
                <td className="text-xs font-normal px-2 py-1 text-center">
                  {user.last_login
                    ? moment(user.last_login).format('jYYYY/jMM/jDD')
                    : '---'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    )
  );
}
