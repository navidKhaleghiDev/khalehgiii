import React, { useState } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { IconButton } from '@ui/atoms/BaseButton';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';
import { BaseTableCollapse } from '../BaseTableCollapse';

export function BaseTableRow({
  row,
  body,
  header,
  onClick,
  index,
  collapseHeader,
  isMobile,
}) {
  const [openRowId, setOpenRowId] = useState(null);

  const isCollapse = collapseHeader.length >= 1;

  const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
  const borderRadiusB = index === body.length - 1 ? 'rounded-b-2xl' : '';
  const isOpen = openRowId === row.id;

  const toggleRowOpen = (rowId) => {
    setOpenRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  return (
    <>
      <div
        className={` h-16 w-full flex items-center justify-between border border-gray-200 px-3 ${
          isOpen ? 'bg-gray-100 border-gray-400' : 'bg-white'
        } ${borderRadiusT} ${borderRadiusB}`}
      >
        {header.map((headerList) => (
          <tr
            key={headerList.id}
            className={`${headerList.class} flex justify-center`}
          >
            <td aria-label={headerList.id}>
              <BaseTableRenderComponent
                row={row}
                header={headerList}
                onClick={onClick}
              />
            </td>
          </tr>
        ))}
        {isCollapse && (
          <div className="w-1/12 flex justify-center">
            <IconButton
              color="neutralNoBg"
              icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
              onClick={() => toggleRowOpen(row.id)}
            />
          </div>
        )}
      </div>
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
