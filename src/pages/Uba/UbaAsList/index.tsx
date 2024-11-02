import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import { IResponsePagination } from '@src/types/services';
import { E_UBA_LIST_PAGINATION } from '@src/services/analyze/endpoint';
import { IUba } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import FilterTableList from '@redesignUi/Templates/FilterTableLIst';
import useWindowDimensions from '@src/helper/hooks/useWindowDimensions';

import { ubaHeaderItem } from './constants/ubaHeaderItem';

const PAGE_SIZE = 9;
const PAGE = 1;

export function UbaAsList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 100),
    [setFilterQuery]
  );

  const { data, isLoading } = useSWR<IResponsePagination<IUba>>(
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
    <div className={`w-full ${isLoading ? 'loading' : ''}`}>
      <div className="mb-8">
        <FilterTableList
          searchQuery={filterQuery}
          handelSearchQuery={debouncedSetFilterQuery}
          domainFilter
          handelGroupeFilter={() => {
            console.log('first');
          }}
          searchPlaceholder={t('table.search')}
        />
      </div>
      <div className="md:[&_tbody>*]:justify-start [&_tbody>*]:justify-between">
        <BaseTable
          loading={isLoading}
          body={listUba}
          header={ubaHeaderItem}
          pagination={paginationProps}
          isMobile={width < 768}
        />
      </div>
    </div>
  );
}
