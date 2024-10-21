import { useCallback, useState } from 'react';
import { IDaAs } from '@src/services/users/types';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { monitoringHeaderItem } from '@src/pages/ReportFileScan/UsersDaAsList/constants/monitoringHeaderItem';

import { BaseTable } from '@redesignUi/molecules/BaseTable';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const userPermissions = useUserPermission();

  const userHandler = (url: any, list: any) => {
    return navigate(`${url}/${list.email}`);
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  const listDaas = data?.data?.results ?? [];
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

  const searchBarProps: TSearchBar = {
    name: 'search-users-daas-list',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
  };
  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <BaseTable
        loading={isLoading}
        body={listDaas}
        header={checkPermissionHeaderItem(
          userPermissions,
          monitoringHeaderItem
        )}
        onClick={userHandler}
        pagination={paginationProps}
        searchBar={searchBarProps}
      />
    </div>
  );
}
