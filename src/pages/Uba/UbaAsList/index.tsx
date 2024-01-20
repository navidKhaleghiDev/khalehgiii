import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import Pagination from '@ui/molecules/Pagination';
import { Typography } from '@ui/atoms';
import { E_UBA_LIST_PAGINATION } from '@src/services/analyze/endpoint';
import { IUba } from '@src/services/analyze/types';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { useLanguage } from '@context/settings/languageContext';
import { BaseTable } from '@ui/atoms/BaseTable';

import { ubaHeaderItem } from '@src/constants/tableHeaders/ubaHeaderItem';

const PAGE_SIZE = 8;
const PAGE = 1;

export function UbaAsList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { lang } = useLanguage();

  const direction = lang === 'en' ? 'right' : 'left';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    [currentPage, setFilterQuery]
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

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

  return (
    <div className="w-full p-4">
      <div className="flex items-center">
        <SearchInput
          name="search-uba-list"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <Typography
          size="h4"
          color="teal"
          className={`text-${direction} w-full`}
        >
          :UBA List
        </Typography>
      </div>
      <BaseTable
        loading={isLoading}
        bodyList={listUba}
        headers={ubaHeaderItem}
      />
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
