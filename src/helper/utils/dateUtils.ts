const lang = localStorage.getItem('lang');
const weekLabels =
  lang === 'fa'
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
  const condition = lang === 'fa' ? 'fa-IR' : 'en-US';
  if (date) {
    return new Date(date).toLocaleDateString(condition, options);
  }
  return today.toLocaleDateString(condition, options);
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
