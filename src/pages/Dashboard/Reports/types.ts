import { TOnClickDate } from '@ui/atoms/Inputs';
import { DateObject } from 'react-multi-date-picker';

export interface IFormDate {
  records: TRecords;
  type: string;
  start_date: string;
  end_date: string;
}
export interface IFormDateData {
  start_date: [DateObject, DateObject];
  // data: RecordsData;
}
export type TFormDate = Pick<IFormDate, 'start_date' | 'end_date'>;
export type TDataSet = {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

export type TDataType = string;
export type TFormatData = {
  [key: string]: string;
};

export type TData = Record<string, any>;
export type TDataGeneratorReturn = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | any;
    fill: boolean;
  }>;
};
export interface IReportChartType {
  props: TPropsChartType;
}
export type TPropsChartType = {
  HOURLY_FORMAT: string;
  MONTLY_FORMAT: string;
  DAILY_FORMAT: string;
  NORMAL_FORMAT: string;
  flag: string;
  recordsData: any;
  isFarsi: boolean;
};
export type IReportFormType = {
  handleOnSubmit: any;
  state: TReducerStateType;
  onChange: TOnClickDate;
};

export type TReducerStateType = {
  weekly: boolean;
  montly: boolean;
  loading: boolean;
  error: boolean;
};
export type TypeReducerActionType = {
  type:
    | 'WEEK'
    | 'MONTH'
    | 'NORMAL'
    | 'LOADING_OFF'
    | 'LOADING_ON'
    | 'ERROR'
    | 'CLEARERROR';
};

export type TypeReportOptions = {
  state: TReducerStateType;
  dispatch: any;
  keys: { DIS_KEY_WEEK: string; DIS_KEY_MONTH: string; DIS_KEY_NORMAL: string };
};

export type TResultOfRecords = {
  type: string;
  records: TRecords | [];
};

export type TRecords = {
  [date: string]: number | [];
};
