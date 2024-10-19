import { useState } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { IconButton } from '@ui/atoms/BaseButton';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';
import { BaseTableCollapse } from '../BaseTableCollapse';
import { BaseTableRowProps, IdItem } from '../../types';

export function BaseTableRow<T extends IdItem>(props: BaseTableRowProps<T>) {
  const { row, body, header, onClick, index, collapseHeader, isMobile } = props;

  const [openRowId, setOpenRowId] = useState<number | null>(null);

  const isCollapse = collapseHeader.length >= 1;

  const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
  const borderRadiusB = index === body.length - 1 ? 'rounded-b-2xl' : '';
  const isOpen = openRowId === row.id;

  const toggleRowOpen = (rowId: T['id']) => {
    setOpenRowId((prevId) =>
      prevId === rowId ? null : (rowId as number | null)
    );
  };

  return (
    <>
      <tr
        className={` h-16 w-full flex items-center justify-between border border-gray-200 px-3 ${
          isOpen ? 'bg-gray-100 border-gray-400' : 'bg-white'
        } ${borderRadiusT} ${borderRadiusB}`}
      >
        {header.map((headerList) => (
          <td
            aria-label="BaseTableRow"
            key={+headerList.id}
            className={`${headerList.class} flex justify-center`}
          >
            <BaseTableRenderComponent
              row={row}
              header={headerList}
              onClick={onClick}
            />
          </td>
        ))}
        {isCollapse && (
          <td aria-label="BaseTableRow" className="w-1/12 flex justify-center">
            <IconButton
              color="neutralNoBg"
              icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
              onClick={() => toggleRowOpen(row.id)}
            />
          </td>
        )}
      </tr>
      {isOpen && (
        <BaseTableCollapse
          isMobile={isMobile}
          collapseHeader={collapseHeader}
          header={header}
          row={row}
          onClick={onClick}
        />
      )}
    </>
  );
}
