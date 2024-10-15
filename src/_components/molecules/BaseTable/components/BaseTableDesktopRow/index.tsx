import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { IconButton } from '@ui/atoms/BaseButton';
import { useState } from 'react';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';

export function BaseTableDesktopRow({ row, body, header, onClick, index }) {
  const [openRowId, setOpenRowId] = useState(null);

  const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
  const borderRadiusB = index === body.length - 1 ? 'rounded-b-2xl' : '';
  const isOpen = openRowId === row.id;

  const collapseItem = header.filter((item) => item.type === 'collapse')[0];

  const toggleRowOpen = (rowId) => {
    setOpenRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  const renderComponent = (headerList) => {
    const id = headerList?.id;

    console.log(headerList);

    const Components = {
      none: <BaseTableNoneCell row={row} id={id} header={headerList} />,
      component: (
        <BaseTableComponentCell
          type="component"
          row={row}
          header={headerList}
          id={id}
          onClick={onClick}
        />
      ),
      collapse: (
        <BaseTableComponentCell
          type="collapse"
          row={row}
          header={headerList}
          id={id}
          onClick={onClick}
        />
      ),
    };

    return Components[headerList.type ?? 'none'];
  };

  console.log(openRowId);

  return (
    <div>
      <div
        className={`flex h-16 w-full border border-gray-200  ${
          isOpen ? 'bg-gray-100 border-gray-400' : 'bg-white'
        } ${borderRadiusT} ${borderRadiusB}  `}
      >
        {header.map((headerList) => (
          <tr key={header.id} className={`${header.class}`}>
            <td>{renderComponent(headerList)}</td>
          </tr>
        ))}
        <IconButton
          icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
          onClick={() => toggleRowOpen(row.id)}
        />
      </div>
      {isOpen && (
        <tr className="flex w-full h-16 bg-gray-100 border border-gray-400 border-t-0  transition duration-150 ease-in-out">
          <td colSpan={header.length}>{renderComponent(collapseItem)}</td>
        </tr>
      )}
    </div>
  );
}
