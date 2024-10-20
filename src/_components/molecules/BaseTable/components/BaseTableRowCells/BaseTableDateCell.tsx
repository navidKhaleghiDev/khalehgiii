import moment from 'moment-jalaali';

import { Typography } from '@redesignUi/atoms';
import { useLanguage } from '@context/settings/languageContext';

export function BaseTableDateCell(props) {
  const { row, id } = props;

  const { lang } = useLanguage();
  const isFarsi = lang === 'fa';

  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  function dateAndNumber(date?: string) {
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
    <Typography variant="body6" type="p">
      {dateAndNumber(row[id])}
    </Typography>
  );
}
