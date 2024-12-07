import { useReducer, useState } from 'react';
import 'chart.js/auto';
import { useTranslation } from 'react-i18next';

import { convertI2ToAD } from '@redesignUi/atoms/Inputs/utils';
import { API_GET_REPORTS } from '@src/services/config';

import {
  FormDateData,
  FormDateTimeFrame,
  Records,
  ReducerStateType,
  TypeReducerActionType,
} from './types';
import { ReportHeader } from './components/ReportHeader';
import { ReportChartContent } from './components/ReportChartContent';
import { ReportFilter } from './components/ReportFilter';

const Lang = localStorage.getItem('lang');
const isFarsi = Lang === 'fa';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = 'dddd';
const MONTHLY_FORMAT = !isFarsi ? 'MMMM' : 'jMMMM';
const NORMAL_FORMAT = !isFarsi ? 'YYYY-MM-DD' : 'jYYYY-jMM-jDD';

const DIS_KEY_ISLOADING = 'LOADING_ON';
const DIS_KEY_ISNOTLOADING = 'LOADING_OFF';
const DIS_KEY_WEEK = 'WEEK';
const DIS_KEY_MONTH = 'MONTH';
const DIS_KEY_NORMAL = 'NORMAL';
const DIS_KEY_HASERROR = 'ERROR';
const DIS_KEY_REMOVEERROR = 'CLEARERROR';

const initialState = {
  weekly: false,
  monthly: false,
  daily: true,
  year: false,
  loading: false,
  error: false,
};

const reducer = (state: ReducerStateType, action: TypeReducerActionType) => {
  switch (action.type) {
    case DIS_KEY_WEEK:
      return { ...state, weekly: true, monthly: false, daily: false };
    case DIS_KEY_MONTH:
      return { ...state, weekly: false, monthly: true, daily: false };
    case DIS_KEY_NORMAL:
      return { ...initialState, daily: true };
    case DIS_KEY_ISLOADING:
      return { ...state, loading: true };
    case DIS_KEY_ISNOTLOADING:
      return { ...state, loading: false };
    case DIS_KEY_HASERROR:
      return { ...state, error: true };
    case DIS_KEY_REMOVEERROR:
      return { ...state, error: false };
    default:
      return state;
  }
};

export function Reports() {
  const { t } = useTranslation();
  const [recordsData, setRecordsData] = useState<Records | []>();

  const [flag, setFlag] = useState<string>('daily');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnSubmit = async (data: FormDateData) => {
    const updatedData = {
      start_date: convertI2ToAD(data.start_date[0]),
      end_date: convertI2ToAD(data.start_date[1]),
    };
    if (updatedData.end_date) {
      dispatch({ type: DIS_KEY_ISLOADING });
      dispatch({ type: DIS_KEY_REMOVEERROR });
      await API_GET_REPORTS(updatedData as FormDateTimeFrame)
        .then((res) => {
          const result = res.data;
          setRecordsData(result.records);
          setFlag(result.type);
          dispatch({ type: DIS_KEY_ISNOTLOADING });
        })
        .catch(() => {
          dispatch({ type: DIS_KEY_HASERROR });
          dispatch({ type: DIS_KEY_ISNOTLOADING });
        });
    }
  };
  const message = !state.error
    ? t('global.enterPriodOfTime')
    : t('global.noReportAvailable');

  const chartData = {
    flag,
    recordsData,
    HOURLY_FORMAT,
    DAILY_FORMAT,
    MONTHLY_FORMAT,
    NORMAL_FORMAT,
    isFarsi,
  };

  const handleToggleButton = (data: any) => {
    setFlag(data.value);
    switch (data.value) {
      case 'weekly':
        dispatch({ type: DIS_KEY_WEEK });
        break;
      case 'monthly':
        dispatch({ type: DIS_KEY_MONTH });
        break;
      default:
        dispatch({ type: DIS_KEY_NORMAL });
        break;
    }
  };

  return (
    <div className="flex-wrap flex mb-1 gap-5 pb-9">
      <ReportHeader />

      <ReportFilter
        flag={flag}
        handleOnSubmit={handleOnSubmit}
        handleToggleButton={handleToggleButton}
        state={state}
      />

      <ReportChartContent
        chartData={chartData}
        isLoading={state.loading}
        error={state.error}
        message={message}
      />
    </div>
  );
}
