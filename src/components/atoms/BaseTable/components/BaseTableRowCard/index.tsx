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
import { baseTableRowCard } from '../../styles';

function rowCellsComponent({ row, header, onClick }: IRowCellsComponent) {
  const id = header?.id;

  const components: IComponentsHeader = {
    none: <NoneCell row={row} header={header} id={id} />,
    component: (
      <ComponentCell row={row} header={header} id={id} onClick={onClick} />
    ),
    function: <FunctionCell row={row} header={header} id={id} />,
    action: <ActionCell row={row} header={header} id={id} onClick={onClick} />,
    user: <UserCell row={row} header={header} id={id} onClick={onClick} />,
    tooltip: <TooltipCell row={row} header={header} id={id} />,
  };

  return components[header?.type ?? 'none'] || null;
}

export function RowTable({
  row,
  headers,
  onClick,
  hasVerticalScroll,
}: IRowTableProps<any>) {
  return (
    <tbody className="relative">
      <tr className="bg-neutral-100 dark:bg-slate-800 rounded-md flex h-14 items-center px-2 my-1 w-full text-neutral-600 dark:text-gray-300">
        {headers.map((header, colIndex) => (
          <td
            key={colIndex}
            className={baseTableRowCard({
              fixed: !hasVerticalScroll && header.fixed,
              className: `${header.class} ${
                header.fixed && !hasVerticalScroll
                  ? 'fixed z-50 rounded-md -mx-2'
                  : ''
              }`,
            })}
            dir={header.dir || 'ltr'}
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
