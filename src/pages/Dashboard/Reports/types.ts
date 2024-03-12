import { DateObject } from 'react-multi-date-picker';

export interface IFormDate {
  start_date: string;
  end_date: string;
  data?: any;
}
export interface IFormDateData {
  start_date: [DateObject, DateObject];
  data?: any;
}
