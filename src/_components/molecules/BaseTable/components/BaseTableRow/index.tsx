import { useState } from 'react';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';

import { useLanguage } from '@context/settings/languageContext';
import { IconButton } from '@ui/atoms/BaseButton';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';
import { BaseTableCollapse } from '../BaseTableCollapse';
import { BaseTableRowProps, IdItem } from '../../types';
import { baseTableRowStyles } from '../../styles';

/**
 * Renders a row in the `BaseTable` component, displaying data from a single item
 * and allowing for collapsible details. Each row can be expanded or collapsed
 * to show more information based on user interaction.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableRowProps<T>} props - The props object for the table row component.
 * @param {T} props.row - The data for the current row.
 * @param {BodyType[]} props.body - The array of all body data for the table.
 * @param {HeaderTable[]} props.header - An array of objects representing the table headers.
 * @param {OnClickActionsType<T>} [props.onClick] - Optional callback function for handling row click actions.
 * @param {number} props.index - The index of the current row in the body array.
 * @param {CategorizedData} props.collapseHeader - Data defining which headers are collapsible.
 * @param {boolean} [props.isMobile] - Optional flag to determine if the table is rendered in mobile view.
 *
 * @returns {JSX.Element} The rendered table row component, which may include a collapsible section.
 */

export function BaseTableRow<T extends IdItem>(props: BaseTableRowProps<T>) {
  const { row, body, header, onClick, index, collapseHeader, isMobile } = props;

  const { lang } = useLanguage();
  const [openRowId, setOpenRowId] = useState<number | null>(null);

  const isFarsi = lang === 'fa';

  const collapse = collapseHeader.length >= 1;

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
            !isFarsi && headerList?.class?.includes('mr-auto')
              ? headerList.class.replace('mr-auto', 'ml-auto')
              : headerList?.class;
          const menuStyle = headerList.type === 'menu' ? 'justify-end' : '';

          return (
            <td
              aria-label="BaseTableRow"
              key={`${headerList.label} BaseTableRow`}
              className={`${className}  flex justify-start relative  ${menuStyle} `}
            >
              <BaseTableRenderComponent
                row={row}
                header={headerList}
                onClick={onClick}
              />
            </td>
          );
        })}
        {collapse && (
          <td aria-label="BaseTableRow" className="w-1/12 flex justify-center">
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
// ${
//   isFarsi ? 'mr-auto' : 'ml-auto'
// }
