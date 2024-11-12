import { useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { IResponsePagination } from '@src/types/services';
import { E_UBA_LIST_PAGINATION } from '@src/services/analyze/endpoint';
import { Uba } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { FilterTableList } from '@redesignUi/Templates/FilterTableLIst';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import { ubaHeaderItem } from './constants/ubaHeaderItem';

const PAGE_SIZE = 9;
const PAGE = 1;

export function UbaAsList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const handleFilterQuery = (value: string) => {
    setCurrentPage(PAGE);
    setFilterQuery(value);
  };

  const { data, isLoading } = useSWR<IResponsePagination<Uba>>(
    E_UBA_LIST_PAGINATION({
      page: currentPage,
      pageSize: PAGE_SIZE,
      filter: `search=${encodeURIComponent(filterQuery)}`,
    }),
    HTTP_ANALYSES.fetcherSWR,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  const listUba = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    paginationLabel: t('global.admin'),
    allItems: countPage,
    itemsPer: listUba.length,
    onPageChange: handlePageChange,
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <FilterTableList
          searchQuery={filterQuery}
          handelSearchQuery={handleFilterQuery}
          searchPlaceholder={t('table.search')}
        />
      </div>
      <div>
        <BaseTable
          loading={isLoading}
          body={listUba}
          header={ubaHeaderItem}
          pagination={paginationProps}
          isMobile={width < 1024}
        />
      </div>
    </div>
  );
}
