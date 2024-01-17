import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './components/BaseTabelHeader';
import { RowTable } from './components/BaseTableRowCard';
import { IBaseTableProps } from './types';

type RowType<T> = T & {
  id: string;
};

export function BaseTable<T>(props: IBaseTableProps<RowType<T>>) {
  const { headers, listBody, loading, onClick } = props;
  let tableBody;

  switch (true) {
    case loading:
      tableBody = <LoadingSpinner />;
      break;

    case listBody.length > 0:
      tableBody = listBody.map((item: RowType<T>) => (
        <RowTable
          key={item.id}
          row={item}
          headers={headers}
          onClick={onClick}
        />
      ));
      break;

    case listBody.length === 0:
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
