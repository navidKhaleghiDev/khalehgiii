import { TOnClickDate } from '@ui/atoms/Inputs';
import { DateObject } from 'react-multi-date-picker';

export interface FormDate {
  records: Records;
  type: string;
  start_date: string;
  end_date: string;
}
export interface FormDateData {
  start_date: [DateObject, DateObject];
  // data: RecordsData;
}
export type FormDateTimeFrame = Pick<FormDate, 'start_date' | 'end_date'>;
export type DataSet = {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

export type DataType = string;
export type FormatData = {
  [key: string]: string;
};

export type Data = Record<string, any>;
export type DataGeneratorReturn = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | any;
    fill: boolean;
    borderColor?: string;
    backgroundColor?: string;
  }>;
};
export interface ReportChartType {
  props: PropsChartType;
}
export type PropsChartType = {
  HOURLY_FORMAT: string;
  MONTHLY_FORMAT: string;
  DAILY_FORMAT: string;
  NORMAL_FORMAT: string;
  flag: string;
  recordsData: any;
  isFarsi: boolean;
};
export type ReportFormType = {
  handleOnSubmit: any;
  state: ReducerStateType;
  onChange?: TOnClickDate;
};

export type ReducerStateType = {
  weekly: boolean;
  monthly: boolean;
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
  state: ReducerStateType;
  dispatch: any;
  keys: { DIS_KEY_WEEK: string; DIS_KEY_MONTH: string; DIS_KEY_NORMAL: string };
};

export type ResultOfRecords = {
  type: string;
  records: Records | [];
};

export type Records = {
  [date: string]: number | [];
};
