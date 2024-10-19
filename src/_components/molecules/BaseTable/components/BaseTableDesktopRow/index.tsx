import React, { useState } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { IconButton } from '@ui/atoms/BaseButton';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';

export function BaseTableDesktopRow({ row, body, header, onClick, index }) {
  const [openRowId, setOpenRowId] = useState(null);

  const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
  const borderRadiusB = index === body.length - 1 ? 'rounded-b-2xl' : '';
  const isOpen = openRowId === row.id;

  const collapseItem = header.filter((item) => item.type === 'collapse')[0];

  const toggleRowOpen = (rowId) => {
    setOpenRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  return (
    <div
      className={`flex items-center h-16 border border-gray-200  ${
        isOpen ? 'bg-gray-100 border-gray-400' : 'bg-white'
      } ${borderRadiusT} ${borderRadiusB}`}
    >
      {header.map((headerList) => (
        <React.Fragment key={header.id}>
          <tr className={`${headerList.class} bg-red-500 `}>
            <td aria-label={headerList.id} className="flex justify-center">
              <BaseTableRenderComponent
                row={row}
                header={headerList}
                onClick={onClick}
              />
            </td>
          </tr>
          {/* {headerList.isCollapsed && (
              <div className="w-1/12">
                <IconButton
                  color="neutralNoBg"
                  icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
                  onClick={() => toggleRowOpen(row.id)}
                />
              </div>
            )} */}
        </React.Fragment>
      ))}
      {isOpen && (
        <tr className="flex w-full h-16 bg-gray-100 border border-gray-400 border-t-0  transition duration-150 ease-in-out">
          <td aria-label={row} colSpan={header.length}>
            <BaseTableRenderComponent
              collapse
              row={row}
              header={collapseItem}
              onClick={onClick}
            />
          </td>
        </tr>
      )}
    </div>
  );
}
