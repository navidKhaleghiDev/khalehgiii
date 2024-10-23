import { useState } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { useLanguage } from '@context/settings/languageContext';
import { IconButton } from '@ui/atoms/BaseButton';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';
import { BaseTableCollapse } from '../BaseTableCollapse';
import { BaseTableRowProps, IdItem } from '../../types';
import { baseTableRowStyles } from '../../styles';

export function BaseTableRow<T extends IdItem>(props: BaseTableRowProps<T>) {
  const { lang } = useLanguage();
  const { row, body, header, onClick, index, collapseHeader, isMobile } = props;

  const [openRowId, setOpenRowId] = useState<number | null>(null);

  const isCollapse = collapseHeader.length >= 1;

  const isOpen = openRowId === row.id;

  const toggleRowOpen = (rowId: T['id']) => {
    setOpenRowId((prevId) =>
      prevId === rowId ? null : (rowId as number | null)
    );
  };

  return (
    <>
      <tr
        className={baseTableRowStyles({
          isOpen,
          radiusTop: index === 0,
          radiusButton: index === body.length - 1,
        })}
      >
        {header.map((headerList) => {
          const className =
            lang === 'en' && headerList?.class?.includes('mr-auto')
              ? headerList.class.replace('mr-auto', 'ml-auto')
              : headerList?.class;

          return (
            <td
              aria-label="BaseTableRow"
              key={`${headerList.label} BaseTableRow`}
              className={`${className}  flex justify-start`}
            >
              <BaseTableRenderComponent
                row={row}
                header={headerList}
                onClick={onClick}
              />
            </td>
          );
        })}
        {isCollapse && (
          <td
            aria-label="BaseTableRow"
            className="w-1/12 flex justify-center mr-auto"
          >
            <IconButton
              color="neutralNoBg"
              className="dark:text-gray-400"
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
