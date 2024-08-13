import { useState } from 'react';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { IDaAs } from '@src/services/users/types';
import { IResponsePagination } from '@src/types/services';
import { BaseTable } from '@ui/atoms/BaseTable';
import useSWR from 'swr';
import { http, HTTP_ANALYSES } from '@src/services/http';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { licenseHeaderItem } from './licenseTableHeaderItem';

const PAGE_SIZE = 8;
const PAGE = 1;

export function LicenseTables() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const userPermissions = useUserPermission();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_LICENSES,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data: listData, isLoading } = useSWR(
    '/analyze/scanners_config/',
    HTTP_ANALYSES.fetcherSWR
  );
  const listWhiteList = listData?.data ?? {};

  const { data, isLoading: loading } = useSWR(endpoint, http.fetcherSWR);

  const listDaas = data?.data ?? [];
  const countPage = data?.data?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  return (
    <div className="p-5">
      <BaseTable
        loading={loading}
        headers={checkPermissionHeaderItem(userPermissions, licenseHeaderItem)}
        bodyList={[{ ...listDaas, ...listWhiteList }] as []}
        pagination={paginationProps}
      />
    </div>
  );
}
