import { useReducer, useState } from 'react';
import { convertI2ToAD } from '@ui/atoms/Inputs/MultiDatePicker';

import 'chart.js/auto';

import { BaseIcon, Typography } from '@ui/atoms';
import { API_GET_REPORTS } from '@src/services/config';
import { BackButton } from '@ui/atoms/BackButton';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
// import { useTranslation } from 'react-i18next';
import calendarBlankBuotone from '@iconify-icons/ph/calendar-blank-duotone';
import calendarXDuotone from '@iconify-icons/ph/calendar-x-duotone';
import {
  IFormDateData,
  TDataType,
  TFormDate,
  TRecords,
  TReducerStateType,
  TypeReducerActionType,
} from './types';
import { ReportsChart } from './ReportChart';
import { ReportForm } from './ReportForm';
import { ReportOptions } from './ReportOptions';

const lang = localStorage.getItem('lang');
const isFarsi = lang === 'fa';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = 'dddd';
const MONTLY_FORMAT = 'MMMM';
const NORMAL_FORMAT = !isFarsi ? 'YYYY-MM-DD' : 'jYYYY-jMM-jDD';

const DIS_KEY_ISLOADING = 'LOADING_ON';
const DIS_KEY_ISNOTLOADING = 'LOADING_OFF';
const DIS_KEY_WEEK = 'WEEK';
const DIS_KEY_MONTH = 'MONTH';
const DIS_KEY_NORMAL = 'NORMAL';
const DIS_KEY_HASERROR = 'ERROR';

const initialState = {
  weekly: false,
  montly: false,
  year: false,
  loading: false,
  error: false,
};
const reducer = (state: TReducerStateType, action: TypeReducerActionType) => {
  switch (action.type) {
    case DIS_KEY_WEEK: {
      return {
        ...state,
        weekly: true,
        montly: false,
        year: false,
      };
    }
    case DIS_KEY_MONTH: {
      return {
        ...state,
        weekly: false,
        montly: true,
        year: false,
      };
    }
    case DIS_KEY_NORMAL: {
      return initialState;
    }
    case DIS_KEY_ISLOADING: {
      return { ...state, loading: true };
    }
    case DIS_KEY_ISNOTLOADING: {
      return { ...state, loading: false };
    }
    case DIS_KEY_HASERROR: {
      return { ...state, error: true };
    }

    default: {
      return initialState;
    }
  }
};

export function Reports() {
  // const { t } = useTranslation();
  const [recordsData, setRecordsData] = useState<TRecords | []>();

  const [flag, setFlag] = useState<TDataType>('daily');

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnSubmit = async (data: IFormDateData) => {
    const updatedData = {
      start_date: convertI2ToAD(data.start_date[0]),
      end_date: convertI2ToAD(data.start_date[1]),
    };
    if (updatedData.end_date) {
      dispatch({ type: DIS_KEY_ISLOADING });
      await API_GET_REPORTS(updatedData as TFormDate)
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
    ? 'بازه زمانی مورد نظر را وارد کنید'
    : 'درحال حاظر گزارشی وجود ندارد';

  const chartData = {
    flag,
    recordsData,
    HOURLY_FORMAT,
    DAILY_FORMAT,
    MONTLY_FORMAT,
    NORMAL_FORMAT,
    isFarsi,
  };

  const dispatchKeys = {
    DIS_KEY_WEEK,
    DIS_KEY_MONTH,
    DIS_KEY_NORMAL,
  };

  const style =
    'w-9/12  flex items-center justify-center bg-white dark:bg-slate-800  rounded-2xl shadow-xl';

  return (
    <div className=" flex-wrap flex items-center justify-center px-2 mb-1 gap-5 mt-20">
      <div className={`${style} justify-between px-6 h-24 `}>
        <div className=" w-6/12 flex items-center justify-between px-6 gap-3">
          <ReportOptions
            state={state}
            dispatch={dispatch}
            keys={dispatchKeys}
          />
        </div>
        <div className="w-4/12  h-12">
          <ReportForm handleOnSubmit={handleOnSubmit} state={state} />
        </div>
      </div>
      <div
        className={`${style} custom-height flex justify-center items-center py-10 relative`}
      >
        <LoadingWrapper isLoading={state.loading}>
          {recordsData ? (
            <div className=" w-11/12 h-full flex justify-center items-center m-auto ">
              <ReportsChart props={chartData} />
            </div>
          ) : (
            <Typography
              className="text-center flex flex-col justify-center items-center gap-3 "
              variant="body1"
              type="div"
              color="neutral"
            >
              <span className="bg-gray-100 rounded-full p-5">
                <BaseIcon
                  icon={!state.error ? calendarBlankBuotone : calendarXDuotone}
                  size="xxxl"
                  color={!state.error ? 'teal' : 'yellow'}
                />
              </span>
              {message}
            </Typography>
          )}
        </LoadingWrapper>
        {/* <Typography
          color="neutral"
          className="absolute bottom-3 right-4 "
        >{`${t('global.reportsChart')}  ${t('global.monthlySelect')}  | ${t(
          'global.reportsChart'
        )}  `}</Typography> */}
      </div>
      <BackButton withLabel className="absolute bottom-20 left-24" />
    </div>
  );
}
