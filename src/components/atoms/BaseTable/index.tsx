import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './components/BaseTabelHeader';
import { RowTable } from './components/BaseTableRowCard';
import { IBaseTableProps, TIdItem } from './types';

export function BaseTable<T extends TIdItem>(props: IBaseTableProps<T>) {
  const { headers, bodyList, loading, onClick } = props;
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
    <div className="overflow-y-auto">
      <BaseTabelHeader header={headers} />
      {tableBody}
    </div>
  );
}
