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
};

export type TReducerStateType = {
  weekly: boolean;
  montly: boolean;
  loading: boolean;
};
export type TypeReducerActionType = {
  type: 'WEEK' | 'MONTH' | 'NORMAL' | 'LOADING_OFF' | 'LOADING_ON';
};

export type TypeReportOptions = {
  state: TReducerStateType;
  dispatch: any;
};
