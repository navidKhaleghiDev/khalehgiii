import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { Pagination } from '@ui/molecules/Pagination';
import { BaseTabelHeader } from './components/BaseTabelHeader';
import { RowTable } from './components/BaseTableRowCard';
import { IBaseTableProps, TIdItem, TPagination } from './types';
import { BaseTableSearchBar } from './components/BaseTableSearchBar';

export function BaseTable<T extends TIdItem>(props: IBaseTableProps<T>) {
  const {
    headers,
    bodyList,
    loading,
    onClick,
    searchBar = {} as any,
    pagination = {} as TPagination,
  } = props;
  const { countPage, currentPage, totalPages, onPageChange } = pagination;
  const { name, value, handleSearchInput, componentProps } = searchBar;

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
          name={name}
          value={value}
          handleSearchInput={handleSearchInput}
          componentProps={componentProps}
        />
      )}
      <div className="overflow-y-auto">
        <BaseTabelHeader header={headers} />
        {tableBody}
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
