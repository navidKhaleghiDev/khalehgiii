import { Typography } from '@ui/atoms';
import {
  convertToDateFormat,
  convertToDay,
  convertToHourFormat,
  dateAndNumber,
} from '@src/helper/utils/dateUtils';
import { BaseTableDataCellProps, IdItem } from '../../types';

/**
 * Renders a table cell displaying a formatted date based on the user's language settings.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableDataCellProps<T>} props - The props object for the `BaseTableDateCell` component.
 * @param {T} props.row - The data object for the current row containing the date to display.
 * @param {string} props.id - The key in the row data that corresponds to the date value.
 *
 * @returns {JSX.Element} A `Typography` element displaying the formatted date.
 */

export function BaseTableDateCell<T extends IdItem>(
  props: BaseTableDataCellProps<T>
) {
  const { row, id, header } = props;

  const formatDate = (value: Date | string) => {
    if (header?.type === 'date') {
      if (header?.render === 'day') return convertToDay(value as string);
      if (header?.render === 'hour')
        return convertToHourFormat(value as string);
      if (header?.render === 'date')
        return convertToDateFormat(value as string);
    }
    return dateAndNumber(value as Date);
  };

  return (
    <Typography
      variant="body6"
      type="p"
      className="text-gray-900 dark:text-white"
    >
      {formatDate(row[id as string])}
    </Typography>
  );
}
