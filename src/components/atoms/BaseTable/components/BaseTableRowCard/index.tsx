/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { BaseButton } from '@ui/atoms/BaseButton';
import { dateAndNumber } from '@src/helper/utils/dateUtils';

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
  const id = header?.id as string;

  const components: IComponentsHeader = {
    none: <NoneCell row={row} header={header} id={id} />,
    component: (
      <ComponentCell row={row} header={header} id={id} onClick={onClick} />
    ),
    date: <span>{dateAndNumber(row[id])}</span>,
    function: <FunctionCell row={row} header={header} id={id} />,
    action: <ActionCell row={row} header={header} id={id} onClick={onClick} />,
    user: <UserCell row={row} header={header} id={id} onClick={onClick} />,
    tooltip: <TooltipCell row={row} header={header} id={id} />,
    button: header?.buttonProps ? (
      <BaseButton
        label={header?.buttonProps.label}
        fullWidth={header?.buttonProps.fullWidth}
        className={header?.buttonProps.className}
        startIcon={header?.buttonProps.startIcon}
        endIcon={header?.buttonProps.endIcon}
        disabled={header?.buttonProps.disabled}
        size={header?.buttonProps.size}
        type={header?.buttonProps.type}
        loading={header?.buttonProps.loading}
        onClick={onClick ? () => onClick('button', row, id) : undefined}
      />
    ) : (
      <>---</>
    ),
  };

  return components[header?.type ?? 'none'] || null;
}

export function RowTable({ row, headers, onClick }: IRowTableProps<any>) {
  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);

  const checkVerticalScroll = () => {
    setHasVerticalScroll(
      document.documentElement.scrollHeight > window.innerHeight
    );
  };

  useEffect(() => {
    checkVerticalScroll();
    window.addEventListener('resize', checkVerticalScroll);
    return () => {
      window.removeEventListener('resize', checkVerticalScroll);
    };
  }, []);

  return (
    <tbody className="relative">
      <tr className="bg-neutral-100 dark:bg-slate-800 rounded-md flex h-14 items-center px-2 my-1 w-full text-neutral-600 dark:text-gray-300">
        {headers.map((header, colIndex) => (
          <td
            key={colIndex}
            className={baseTableRowCard({
              fixed: !hasVerticalScroll ? header.fixed : false,
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
