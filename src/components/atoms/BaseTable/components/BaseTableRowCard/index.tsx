import { Card } from '@ui/atoms/Card';
import {
  IComponentsHeader,
  IHeaderTable,
  IRowTableProps,
  IRowCellsComponent,
} from '../../types';
import { NoneCell } from '../CustomCell/NoneCell';
import { ComponentCell } from '../CustomCell/ComponentCell';
import { FunctionCell } from '../CustomCell/FunctionCell';
import { IconCell } from '../CustomCell/IconCell';
import { ActionCell } from '../CustomCell/ActionCell';
import { UserCell } from '../CustomCell/UserCell';
import { TooltipCell } from '../CustomCell/TooltipCell';

function rowCellsComponent({ row, header, onClick }: IRowCellsComponent) {
  const id = header?.id;

  const components: IComponentsHeader = {
    none: <NoneCell row={row} header={header} id={id} />,
    component: (
      <ComponentCell row={row} header={header} id={id} onClick={onClick} />
    ),
    function: <FunctionCell row={row} head={header} id={id} />,
    icon: <IconCell row={row} header={header} id={id} />,
    action: <ActionCell row={row} header={header} id={id} onClick={onClick} />,
    user: <UserCell row={row} head={header} id={id} onClick={onClick} />,
    tooltip: <TooltipCell row={row} head={header} id={id} />,
  };

  return components[header?.type ?? 'none'] || null;
}

export function RowTable({ row, headers, onClick }: IRowTableProps<any>) {
  return (
    <Card
      color="neutral"
      className="flex items-center px-2 my-2 text-neutral-600 h-14 w-full "
    >
      {headers.map((header: IHeaderTable) => (
        <div
          key={header.id}
          className={`${header.style} flex justify-center items-center group text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6`}
          dir={!header.dir ? 'ltr' : header.dir}
        >
          {rowCellsComponent({
            row,
            header,
            onClick,
          })}
        </div>
      ))}
    </Card>
  );
}
