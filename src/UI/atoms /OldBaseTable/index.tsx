import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { Pagination } from '@ui/molecules/Pagination';

import { BaseTabelHeader } from './components/BaseTabelHeader';
import { RowTable } from './components/BaseTableRowCard';
import { BaseTableProps, IdItem, PaginationParams } from './types';
import { BaseTableSearchBar } from './components/BaseTableSearchBar';

export function BaseTable<T extends IdItem>(props: BaseTableProps<T>) {
  const {
    headers,
    bodyList,
    loading,
    onClick,
    searchBar = null,
    pagination = {} as PaginationParams,
  } = props;
  const { countPage, currentPage, totalPages, onPageChange } = pagination;

  let tableBody;

  switch (true) {
    case loading:
      tableBody = <LoadingSpinner />;
      break;
    case bodyList.length > 0:
      tableBody = bodyList.map((item: T) => (
        <RowTable
          key={item?.id}
          row={item}
          headers={headers}
          onClick={onClick}
        />
      ));
      break;
    case bodyList.length === 0:
      tableBody = <NoResult />;
      break;
    default:
      tableBody = <NoResult />;
  }

  return (
    <>
      {searchBar && (
        <BaseTableSearchBar
          name={searchBar.name}
          value={searchBar.value}
          handleSearchInput={searchBar.handleSearchInput}
          componentProps={searchBar.componentProps}
        />
      )}
      <div className="overflow-x-auto custom-scrollbar">
        <table className=" relative w-full bg-white dark:bg-slate-900  border-gray-300 border-none ">
          <BaseTabelHeader header={headers} />
          {tableBody}
        </table>
      </div>
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
