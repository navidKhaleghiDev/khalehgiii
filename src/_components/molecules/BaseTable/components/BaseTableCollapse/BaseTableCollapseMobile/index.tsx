import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseMobileProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { baseTableCollapseMobile } from '@redesignUi/molecules/BaseTable/styles';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

/**
 * Renders a mobile-friendly collapsible table row component.
 * Each header cell displays the translated label along with a
 * render component for the corresponding row data.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableCollapseMobileProps<T>} props - The props object for the mobile collapsible table component.
 * @param {Array} props.header - An array of header definitions used to create the table header cells.
 * @param {T} props.row - The data for the current row, containing the information to be displayed.
 * @param {function} [props.onClick] - Optional callback function for handling click actions on the table cells.
 *
 * @returns {JSX.Element} The rendered mobile collapsible table row.
 */

export function BaseTableCollapseMobile<T extends IdItem>(
  props: BaseTableCollapseMobileProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className={baseTableCollapseMobile()}>
      {header.map((headerList, index) => (
        <th
          key={headerList.label}
          className={`w-[90%] m-auto flex justify-between items-center border first:border-t-0 last:border-b-0  border-gray-300 border-x-0 h-10  `}
        >
          <Typography className="font-normal" color="neutral" variant="body6">
            {t(headerList.label as string)}
          </Typography>
          <div>
            <BaseTableRenderComponent
              row={row}
              header={headerList}
              onClick={onClick}
            />
          </div>
        </th>
      ))}
    </tr>
  );
}
