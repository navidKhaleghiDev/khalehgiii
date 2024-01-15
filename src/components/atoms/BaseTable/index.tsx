import { Card } from '@ui/atoms';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { BaseTabelHeader } from './BaseTabelHeader';
import { NoneCell } from './BaseTableComponents/NoneCell';
import { FunctionCell } from './BaseTableComponents/FunctionCell';
import { IconCell } from './BaseTableComponents/IconCell';
import { ActionCell } from './BaseTableComponents/ActionCell';
import { ComponentCell } from './BaseTableComponents/ComponentCell';
import { UserCell } from './BaseTableComponents/UserCell';
import {
  BaseTableProps,
  ComponentsProps,
  HeaderItem,
  RowCardProps,
} from './BaseTableTypes';

function cellsComponent(row: object, head: HeaderItem, onClick: () => void) {
  const id = head?.id;

  const components: ComponentsProps = {
    none: <NoneCell row={row} head={head} id={id} />,
    component: (
      <ComponentCell row={row} head={head} id={id} onClick={onClick} />
    ),
    function: <FunctionCell row={row} head={head} id={id} />,
    icon: <IconCell row={row} head={head} id={id} />,
    action: <ActionCell row={row} head={head} id={id} onClick={onClick} />,
    user: <UserCell row={row} head={head} id={id} onClick={onClick} />,
  };

  return components[head?.type] || null;
}

function RowCard({ row, header, onClick }: RowCardProps) {
  return (
    <Card
      color="neutral"
      className="flex items-center px-2 my-2 w-full text-neutral-600 h-14"
    >
      {header.map((head: HeaderItem) => (
        <div
          key={head.id}
          className={`${head.style} flex justify-center items-center group w-3/12 text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6 `}
          dir={!head.dir ? 'ltr' : head.dir}
        >
          {cellsComponent(row, head, onClick)}
        </div>
      ))}
    </Card>
  );
}

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
    <>
      <BaseTabelHeader header={header} />
      {content}
    </>
  );
}
