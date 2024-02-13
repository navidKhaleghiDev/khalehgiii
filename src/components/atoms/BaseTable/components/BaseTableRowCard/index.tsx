/* eslint-disable react/no-array-index-key */
import {
  IComponentsHeader,
  IRowTableProps,
  IRowCellsComponent,
} from '../../types';
import { NoneCell } from '../CustomCell/NoneCell';
import { ComponentCell } from '../CustomCell/ComponentCell';
import { FunctionCell } from '../CustomCell/FunctionCell';
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
    action: <ActionCell row={row} header={header} id={id} onClick={onClick} />,
    user: <UserCell row={row} header={header} id={id} onClick={onClick} />,
    tooltip: <TooltipCell row={row} header={header} id={id} />,
  };

  return components[header?.type ?? 'none'] || null;
}

export function RowTable({ row, headers, onClick }: IRowTableProps<any>) {
  return (
    <tbody>
      <tr className="bg-neutral-100 dark:bg-neutral-300 rounded-md undefined flex h-14 items-center px-2 my-2 w-full text-neutral-600">
        {headers.map((header, colIndex) => (
          <td
            key={colIndex}
            className={`${header.style} flex justify-center items-center group text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6`}
            dir={!header.dir ? 'ltr' : header.dir}
          >
            {rowCellsComponent({
              row,
              header,
              onClick,
            })}
          </td>
        ))}
      </tr>
    </tbody>
  );
}
