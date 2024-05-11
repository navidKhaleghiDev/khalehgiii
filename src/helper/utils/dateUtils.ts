import moment from 'moment-jalaali';

const lang = localStorage.getItem('lang');
const isFarsi = lang === 'fa';

const weekLabels = isFarsi
  ? ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه']
  : [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

function getLabelOfWeek(day: number) {
  return weekLabels[day];
}

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const now = new Date();
const today = new Date(now);
const tomorrow = new Date(today.setDate(today.getDate() + 1));
const lastDayOfWeek = new Date(
  today.setDate(today.getDate() + (6 - today.getDay()))
);
const firstDayOfNextWeek = new Date(
  today.setDate(today.getDate() + 7 - today.getDay() + 1)
);
const daysUntilNextSaturday = 6 - now.getDay() + 7; // Calculate the number of days until the next Saturday
const nextSaturday = new Date(
  today.setDate(today.getDate() + daysUntilNextSaturday)
);

export { tomorrow, firstDayOfNextWeek, lastDayOfWeek, nextSaturday };

export const firstDayOfNextMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  1
);

export function getLocaleDateString(
  date: Date,
  locales?: Intl.LocalesArgument,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  options?: Intl.DateTimeFormatOptions | undefined
) {
  return date.toLocaleDateString(locales, options);
}

export function persianDateNumber(date?: string) {
  // ۱۴۰۲/۳/۲۴

  if (date) {
    return new Date(date).toLocaleDateString('fa-IR');
  }
  return today.toLocaleDateString('fa-IR');
}

export function dateAndNumber(date?: string) {
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
export function convertToDay(date: string) {
  if (date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    const formatedDate = moment(`${year}/${month}/${day}`, 'YYYY/MM/DD').format(
      'dddd'
    );

    return formatedDate;
  }
  return null;
}
export function convertToDateFormat(date: string) {
  if (date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    const formatedDate = moment(`${year}/${month}/${day}`, 'YYYY/MM/DD').format(
      isFarsi ? 'jYYYY/jDD/jMM' : 'YYYY/MMMM/DD'
    );

    return formatedDate;
  }
  return null;
}

export function convertToHourFormat(date: string) {
  if (date) {
    const currentDate = moment();

    const [hours, minutes, seconds] = date.split(':').map(Number);

    currentDate.hour(hours);
    currentDate.minute(minutes);
    currentDate.second(seconds);

    const formattedDateTime = currentDate.format(
      isFarsi ? 'HH:mm:ss' : 'HH:mm:ss a'
    );
    return formattedDateTime;
  }
  return null;
  // or use other formatting methods
}

export function dayLabel(date?: string) {
  // شنبه
  if (date) {
    return getLabelOfWeek(new Date(date).getDay());
  }
  return getLabelOfWeek(today.getDay());
}

export const getNextSaturday = (): Date => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const daysUntilNextSaturday =
    currentDayOfWeek <= 6 ? 6 - currentDayOfWeek + 1 : 7; // Calculate the number of days until the next Saturday
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const nextSaturday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilNextSaturday
  );
  return nextSaturday;
};
