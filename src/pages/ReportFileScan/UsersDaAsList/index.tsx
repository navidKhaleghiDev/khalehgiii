import { useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

import { IDaAs } from '@src/services/users/types';
import { http } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { createAPIEndpoint } from '@src/helper/utils';
import { BaseTable } from '@ui/atoms/BaseTable';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { monitoringHeaderItem } from '@src/pages/ReportFileScan/constants/constants';

import FilterReports from '../FilterReports';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UsersDaAsList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterList, setFilterList] = useState<string | number>();
  const userPermissions = useUserPermission();

  const userHandler = (url: any, list: any) => {
    return navigate(`${url}/${list.email}`);
  };

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery: searchQuery,
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );

  const handelSearchValue = (searchValue: string) => {
    setCurrentPage(PAGE);
    setSearchQuery(searchValue);
  };

  // Remember to thing about this part
  const handelFilterQuery = (filter: any) => {
    setFilterList(filter?.value);
  };

  const listDaas = data?.data?.results ?? [];
  const filterListDass = filterList
    ? listDaas.filter((item) =>
        item.member_of?.some((itemMember) =>
          Object.keys(itemMember).includes(filterList as string)
        )
      )
    : listDaas;

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
    <>
      <FilterReports
        searchQuery={searchQuery}
        handelSearchQuery={handelSearchValue}
        handelfilterList={handelFilterQuery}
      />
      <div className={`w-full p-4 ${isLoading ? 'loading' : ''}`}>
        <BaseTable
          loading={isLoading}
          bodyList={filterListDass}
          headers={checkPermissionHeaderItem(
            userPermissions,
            monitoringHeaderItem
          )}
          onClick={userHandler}
          pagination={paginationProps}
        />
      </div>
    </>
  );
}
