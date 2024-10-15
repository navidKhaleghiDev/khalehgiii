import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@ui/atoms/BaseButton';
import { useState } from 'react';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';

export function BaseTableMobileRow({ row, body, header, onClick, index }) {
  const [openRowId, setOpenRowId] = useState(null);
  const { t } = useTranslation();

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

  return (
    <div>
      <div
        className={`flex h-16 w-full border border-gray-200  ${
          isOpen ? 'bg-gray-100 border-gray-300' : 'bg-white'
        } ${borderRadiusT} ${borderRadiusB}`}
      >
        <tr className={`${header.class}`}>
          <td colSpan={header.length}>{renderComponent(collapseItem)}</td>
        </tr>
        <IconButton
          icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
          onClick={() => toggleRowOpen(row.id)}
        />
      </div>
      <div className={isOpen ? 'px-2 bg-gray-100 border border-gray-300' : ''}>
        {isOpen &&
          header.map((headerList) => (
            <tr
              key={header.id}
              className="flex justify-between w-full h-10 bg-gray-100 last:border-b-0 first:border-t-0 border border-gray-300 border-x-0 "
            >
              <td>{t(headerList.label)}</td>
              <td>{renderComponent(headerList)}</td>
            </tr>
          ))}
      </div>
    </div>
  );
}
