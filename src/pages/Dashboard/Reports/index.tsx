import { useReducer, useState } from 'react';

import 'chart.js/auto';

import { convertI2ToAD } from '@ui/atoms/Inputs/MultiDatePicker';
import { BaseIcon, Card, Typography } from '@ui/atoms';
import { API_GET_REPORTS } from '@src/services/config';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
import { useTranslation } from 'react-i18next';
import calendarBlankDuotone from '@iconify-icons/ph/calendar-blank-duotone';
import calendarXDuotone from '@iconify-icons/ph/calendar-x-duotone';
import CaretLeft from '@iconify-icons/ph/caret-left';
import { ToggleButton } from '@redesignUi/atoms/ToggleButton/ToggleButton';
import { BaseButton } from '@redesignUi/atoms';

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

const lang = localStorage.getItem('lang');
const isFarsi = lang === 'fa';

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
        monthly: false,
        year: false,
      };
    }
    case DIS_KEY_MONTH: {
      return {
        ...state,
        weekly: false,
        monthly: true,
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
    case DIS_KEY_REMOVEERROR: {
      return { ...state, error: false };
    }

    default: {
      return initialState;
    }
  }
};

export function Reports() {
  const { t } = useTranslation();
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
      dispatch({ type: DIS_KEY_REMOVEERROR });
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
      <Card className="w-full flex sm:items-center items-start justify-between sm:flex-row flex-col">
        <div className="flex items-center justify-between gap-3 order-2 sm:order-1">
          <ReportForm handleOnSubmit={handleOnSubmit} state={state} />
        </div>
        <div className="flex gap-2.5 items-end justify-end order-1 sm:order-2">
          <div className="flex gap-2.5">
            <BaseButton
              label={t('global.domain')}
              endIcon={CaretLeft}
              size="sm"
              type="neutral"
            />
            <ToggleButton
              buttonOptions={[
                {
                  id: 1,
                  label: t('table.monthly'),
                  value: 'monthly',
                },
                {
                  id: 2,
                  label: t('table.weekly'),
                  value: 'weekly',
                },
                {
                  id: 3,
                  label: t('table.daily'),
                  value: 'daily',
                  active: true,
                },
              ]}
              onChange={handleToggleButton}
            />
          </div>
        </div>
      </Card>
      <Card
        shadow="xl"
        color="white"
        rounded="xl"
        className="w-full flex justify-center items-center py-10 relative custom-height"
      >
        <LoadingWrapper isLoading={state.loading}>
          {recordsData && !state.error ? (
            <div className="w-full h-full flex justify-center items-center m-auto">
              <ReportsChart props={chartData} />
            </div>
          ) : (
            <Typography
              className="text-center flex flex-col justify-center items-center gap-3"
              variant="body1"
              type="div"
              color="neutral"
            >
              <span className="bg-gray-100 rounded-full p-5">
                <BaseIcon
                  icon={!state.error ? calendarBlankDuotone : calendarXDuotone}
                  size="xxxl"
                  color={!state.error ? 'teal' : 'yellow'}
                />
              </span>
              {message}
            </Typography>
          )}
        </LoadingWrapper>
      </Card>
    </div>
  );
}
