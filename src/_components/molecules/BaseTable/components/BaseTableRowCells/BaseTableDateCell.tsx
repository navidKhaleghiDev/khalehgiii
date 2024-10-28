import moment from 'moment-jalaali';

import { Typography } from '@redesignUi/atoms';
import { useLanguage } from '@context/settings/languageContext';
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
  const { row, id } = props;

  const { lang } = useLanguage();
  const isFarsi = lang === 'fa';

  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  function dateAndNumber(date?: Date) {
    // ۲۴ خرداد ۱۴۰۲
    const condition = isFarsi ? 'fa-IR' : 'en-US';
    if (date) {
      return new Date(date).toLocaleDateString(condition, options);
    }
    return now.toLocaleDateString(condition, options);
  }
  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  return (
    <Typography
      variant="body6"
      type="p"
      className="text-gray-900 dark:text-white"
    >
      {dateAndNumber(row[id as string])}
    </Typography>
  );
}
