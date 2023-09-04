const weekLabels = [
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنج شنبه',
  'جمعه',
  'شنبه',
];

function getLabelOfWeek(day: number) {
  return weekLabels[day];
}

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const nowDate = new Date();

export function persianDateNumber(date?: string) {
  // ۱۴۰۲/۳/۲۴

  if (date) {
    return new Date(date).toLocaleDateString('fa-IR');
  }
  return nowDate.toLocaleDateString('fa-IR');
}

export function persianDateAndNumber(date?: string) {
  // ۲۴ خرداد ۱۴۰۲
  if (date) {
    return new Date(date).toLocaleDateString('fa-IR', options);
  }
  return nowDate.toLocaleDateString('fa-IR', options);
}

export function persianDayLabel(date?: string) {
  // شنبه
  if (date) {
    return getLabelOfWeek(new Date(date).getDay());
  }
  return getLabelOfWeek(nowDate.getDay());
}
