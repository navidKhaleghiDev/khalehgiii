import { Card } from '@ui/atoms/Card';
import { ComponentsProps, HeaderItem, RowCardProps } from '../BaseTableTypes';
import { NoneCell } from './NoneCell';
import { ComponentCell } from './ComponentCell';
import { FunctionCell } from './FunctionCell';
import { IconCell } from './IconCell';
import { ActionCell } from './ActionCell';
import { UserCell } from './UserCell';
import { TooltipCell } from './TooltipCell';

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
    tooltip: <TooltipCell row={row} head={head} id={id} />,
  };

  return components[head?.type ?? 'none'] || null;
}

export function RowCard({ row, header, onClick }: RowCardProps) {
  return (
    <Card
      color="neutral"
      className="flex items-center px-2 my-2 text-neutral-600 h-14 w-full "
    >
      {header &&
        header?.map((head: HeaderItem) => (
          <div
            key={head.id}
            className={`${head.style} flex justify-center items-center group text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6`}
            dir={!head.dir ? 'ltr' : head.dir}
          >
            {cellsComponent(row, head, onClick)}
          </div>
        ))}
    </Card>
  );
}
