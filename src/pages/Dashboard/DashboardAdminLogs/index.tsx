import { Card, Typography } from '@redesignUi/atoms';
import { LoadingPage } from '@redesignUi/molecules/Loading';
// import { useUserPermission } from '@src/helper/hooks/usePermission';
import { createAPIEndpoint } from '@src/helper/utils';
// import { adminListHeaderItem } from '@src/pages/DashboardAdminsList/AdminsList/constants/ adminListHeaderItem';
import { http } from '@src/services/http';
import { E_USERS } from '@src/services/users/endpoint';
import { IUser } from '@src/services/users/types';
import { IResponsePagination } from '@src/types/services';
// import { BaseTable } from '@ui/atoms/BaseTable';
// import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import moment from 'moment-jalaali';
import { useState } from 'react';
import useSWR from 'swr';

const PAGE_SIZE = 10;
const PAGE = 1;

export function DashboardAdminLogs() {
  const [currentPage] = useState<number>(PAGE);
  const [filterQuery] = useState<string>('');
  // const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const { data, isLoading } = useSWR<IResponsePagination<IUser>>(
    endpoint,
    http.fetcherSWR
  );
  // const countPage = data?.data?.count || 0;

  // const paginationProps = {
  //   countPage,
  //   currentPage,
  //   totalPages: Math.ceil(countPage / PAGE_SIZE),
  //   onPageChange: handlePageChange,
  // };
  const listWhiteList = data?.data?.results ?? [];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Card
      color="white"
      rounded="xxl"
      shadow="base"
      className="xl:p-5 py-6 px-5 xl:h-[17.5rem] h-[13rem] overflow-x-hidden overflow-y-auto"
    >
      <Typography color="black" variant="body4B" className="mb-2.5">
        ورود و خروج ادمین ها
      </Typography>
      {/* <BaseTable
        loading={isLoading}
        bodyList={listWhiteList}
        headers={checkPermissionHeaderItem(
          userPermissions,
          adminListHeaderItem
        )}
        pagination={paginationProps}
      /> */}
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
                {moment(user.last_login).format('jYYYY/jMM/jDD')}
              </td>
              <td className="text-xs font-normal px-2 py-1 text-center">
                {moment(user.last_login).format('jYYYY/jMM/jDD')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
