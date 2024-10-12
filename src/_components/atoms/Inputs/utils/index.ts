/* eslint-disable no-restricted-globals */

import gregorian from 'react-date-object/calendars/gregorian';
import { DateObject } from 'react-multi-date-picker';

/* eslint-disable prefer-regex-literals */
export const convertToCardNumber = (e: any) => {
  if (/^[۰-۹٠-٩0-9--]+$/.test(e)) {
    const value = e;
    const noDashNumber = value.split('-').join('');
    if (noDashNumber.length > 0) {
      return noDashNumber
        .match(new RegExp(new RegExp('.{1,4}', 'g')))
        .join('-');
    }
  }
  return '';
};
export const convertToPrice = (string: string) => {
  if (string !== '') {
    const stringNum = String(string).replaceAll(',', '');
    const num = Number(stringNum);
    // this func is error
    if (num !== null && !isNaN(num)) {
      const numberArray = stringNum.match(/[۰-۹0-9]{1,3}(?=([۰-۹0-9]{3})*$)/g);
      if (numberArray) {
        return numberArray?.join(',');
      }
      return '';
    }
    return '';
  }
  return '';
};

export function convertI2ToAD(
  i2Date?: DateObject | DateObject[] | undefined
): string | string[] | undefined {
  if (!i2Date) return undefined;

  const convertDate = (date: DateObject) =>
    new DateObject({
      date: date.toDate(),
      calendar: gregorian,
    }).format('YYYY-MM-DD');

  return Array.isArray(i2Date) ? i2Date.map(convertDate) : convertDate(i2Date);
}
