import { DateObject } from 'react-multi-date-picker';

export interface IFormDate {
  start_date: string;
  end_date: string;
}
export interface IFormDateData {
  start_date: [DateObject, DateObject];
  // data: RecordsData;
}

export type TDataSet = {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

export type TDataType = 'hourly' | 'daily' | 'monthly';
export type TData = Record<string, any>;
export type TDataGeneratorReturn = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | any;
    fill: boolean;
  }>;
};
