import { useReducer, useState } from 'react';
import { convertI2ToAD } from '@ui/atoms/Inputs/MultiDatePicker';

import 'chart.js/auto';

// eslint-disable-next-line import/no-extraneous-dependencies

import { API_GET_REPORTS } from '@src/services/config';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
import {
  IFormDateData,
  TDataType,
  TReducerStateType,
  TypeReducerActionType,
} from './types';
import { ReportsChart } from './ReportChart';
import { ReportForm } from './ReportForm';
import { ReportOptions } from './ReportOptions';

const lang = localStorage.getItem('lang');
const isFarsi = lang === 'fa';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = ' dddd';
const MONTLY_FORMAT = 'MMMM';
const NORMAL_FORMAT = !isFarsi ? 'YYYY-MM-DD' : 'jYYYY-jMM-jDD';

const initialState = {
  weekly: false,
  montly: false,
  year: false,
  loading: false,
};
const reducer = (state: TReducerStateType, action: TypeReducerActionType) => {
  switch (action.type) {
    case 'WEEK': {
      return {
        ...state,
        weekly: true,
        montly: false,
        year: false,
      };
    }
    case 'MONTH': {
      return {
        ...state,
        weekly: false,
        montly: true,
        year: false,
      };
    }
    case 'NORMAL': {
      return initialState;
    }
    case 'LOADING_ON': {
      return { ...state, loading: true };
    }
    case 'LOADING_OFF': {
      return { ...state, loading: false };
    }
    default: {
      return initialState;
    }
  }
};

export function Reports() {
  const [recordsData, setRecordsData] = useState([]);

  const [flag, setFlag] = useState<TDataType>('daily');

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnSubmit = async (data: IFormDateData) => {
    const updatedData = {
      start_date: convertI2ToAD(data.start_date[0]),
      end_date: convertI2ToAD(data.start_date[1]),
    };
    if (updatedData.end_date) {
      dispatch({ type: 'LOADING_ON' });
      await API_GET_REPORTS(updatedData as any)
        .then((res) => {
          const result = res.data as any;
          setRecordsData(result.records);
          setFlag(result.type);
          dispatch({ type: 'LOADING_OFF' });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: 'LOADING_OFF' });
          // toast.error(err);
        });
    }
  };

  const chartData = {
    flag,
    recordsData,
    HOURLY_FORMAT,
    DAILY_FORMAT,
    MONTLY_FORMAT,
    NORMAL_FORMAT,
    isFarsi,
  };

  return (
    <div className=" flex-wrap flex items-center justify-center px-2  rounded-md  w-full mb-1 gap-3">
      <div className="w-3/12 mt-20  h-12">
        <ReportForm handleOnSubmit={handleOnSubmit} state={state} />
      </div>
      <div className="gap-4 w-3/12 h-12 flex items-center justify-between self-end  px-6">
        <ReportOptions state={state} dispatch={dispatch} />
      </div>
      <div className="w-7/12 p-10 border-solid border-2 rounded-md  mt-8">
        <LoadingWrapper isLoading={state.loading}>
          <ReportsChart props={chartData} />
        </LoadingWrapper>
      </div>
    </div>
  );
}
