import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './BaseTabelHeader';
import { RowCard } from './BaseTableComponents/BaseTableRowCard';
import { BaseTableProps } from './BaseTableTypes';

export function BaseTable(props: BaseTableProps) {
  const { header, body, loading, onClick } = props;
  let content;

  switch (true) {
    case loading:
      content = <LoadingSpinner />;
      break;
    case body.length > 0:
      content = body.map((item) => (
        <RowCard key={item.id} row={item} header={header} onClick={onClick} />
      ));
      break;
    default:
      content = <NoResult />;
  }
  return (
    <div className="overflow-y-auto">
      <BaseTabelHeader header={header} />
      {content}
    </div>
  );
}
