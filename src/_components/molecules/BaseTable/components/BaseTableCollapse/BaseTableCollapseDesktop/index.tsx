import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseDesktopProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { baseTableCollapseDesktop } from '@redesignUi/molecules/BaseTable/styles';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

/**
 * Renders a desktop-friendly collapsible table row component.
 * Each cell displays the translated label along with a render component
 * for the corresponding row data.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableCollapseDesktopProps<T>} props - The props object for the desktop collapsible table component.
 * @param {Array} props.header - An array of header definitions used to create the table header cells.
 * @param {T} props.row - The data for the current row, containing the information to be displayed.
 * @param {function} [props.onClick] - Optional callback function for handling click actions on the table cells.
 *
 * @returns {JSX.Element} The rendered desktop collapsible table row.
 */

export function BaseTableCollapseDesktop<T extends IdItem>(
  props: BaseTableCollapseDesktopProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className={baseTableCollapseDesktop()}>
      {header.map((headerList) => (
        <td
          key={headerList.label}
          className="h-12 flex-col px-3 gap-2  flex justify-start"
        >
          <Typography
            className="text-gray-500 dark:text-gray-400"
            variant="body6"
          >
            {t(headerList.label as string)}
          </Typography>
          <BaseTableRenderComponent
            row={row}
            header={headerList}
            onClick={onClick}
          />
        </td>
      ))}
    </tr>
  );
}
