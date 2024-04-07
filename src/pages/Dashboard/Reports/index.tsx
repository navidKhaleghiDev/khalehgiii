import { useReducer, useState } from 'react';
import {
  MultiDatePicker,
  convertI2ToAD,
} from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment-jalaali';
import { API_GET_REPORTS } from '@src/services/config';
import RadioButton from '@ui/atoms/RadioButton';
import {
  IFormDate,
  IFormDateData,
  TData,
  TDataGeneratorReturn,
  TDataType,
} from './types';

const lang = localStorage.getItem('lang');
const isFarsi = lang === 'fa';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = ' dddd';
const MONTLY_FORMAT = 'MMMM';
const NORMAL_FORMAT = !isFarsi ? 'YYYY-MM-DD' : 'jYYYY-jMM-jDD';

const reducer = (
  _state: {
    weekly: boolean;
    montly: boolean;
    year: boolean;
  },
  action: { type: 'week' | 'month' | 'year' | 'normal' }
) => {
  switch (action.type) {
    case 'week': {
      return {
        weekly: true,
        montly: false,
        year: false,
      };
    }
    case 'month': {
      return {
        weekly: false,
        montly: true,
        year: false,
      };
    }
    case 'year': {
      return {
        weekly: false,
        montly: false,
        year: true,
      };
    }
    case 'normal': {
      return {
        weekly: false,
        montly: false,
        year: false,
      };
    }
    default: {
      return {
        weekly: false,
        montly: false,
        year: false,
      };
    }
  }
};

const options = {
  responsive: true,
  tooltip: {
    enabled: false,
    position: 'nearest',
    titleColor: 'rgba(0, 0, 0, 0.8)',
  },
  plugins: {
    tooltip: {
      callbacks: {
        label(res: any) {
          return res.raw.s;
        },
      },
    },
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};
const formatData = {
  hourly: HOURLY_FORMAT,
  monthly: MONTLY_FORMAT,
  daily: DAILY_FORMAT,
};

function dataGenerator(type: TDataType, data: TData): TDataGeneratorReturn {
  const isDaily = formatData[type] === DAILY_FORMAT;
  const dataList: number[] | any = [];
  const labelList: string[] = [];
  const weeksKey: string[] = [];

  if (data && Object.keys(data).length > 0) {
    Object.entries(data).forEach(([key, value]) => {
      if (isDaily) {
        const weekStart = moment(key, 'YYYY-MM-DD').startOf('week');
        while (weekStart.isoWeekday() !== 6) {
          weekStart.subtract(1, 'day');
        }
        const weekKey = weekStart.format(NORMAL_FORMAT);
        if (!dataList[weekKey]) {
          dataList[weekKey] = [];
          weeksKey.push(weekKey);
        }
        dataList[weekKey].push({
          s: moment(key).format(NORMAL_FORMAT),
          y: value,
          x: moment(key).format(formatData[type]),
        });
      } else {
        dataList.push(value);
        labelList.push(moment(key).format(formatData[type]));
      }
    });
  }

  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  const dailyDataset = () =>
    Object.values(dataList).map((listData, i) => {
      return {
        label: `Week ${i + 1}`,
        data: listData,
        fill: false,
      };
    });

  const result = dailyDataset();

  return {
    datasets: isDaily
      ? result
      : [
          {
            label: '',
            data: dataList,
            fill: true,
          },
        ],
    labels: labelList,
  };
}

export function Reports() {
  const [recordsData, setRecordsData] = useState([]);
  const initialState = {
    weekly: false,
    montly: false,
    year: false,
  };
  const [flag, setFlag] = useState<TDataType>('daily');

  const [state, dispatch] = useReducer(reducer, initialState);

  const { control, handleSubmit } = useForm<IFormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

  const handleOnSubmit = async (data: IFormDateData) => {
    const updatedData = {
      start_date: convertI2ToAD(data.start_date[0]),
      end_date: convertI2ToAD(data.start_date[1]),
    };
    if (updatedData) {
      await API_GET_REPORTS(updatedData as any)
        .then((res) => {
          const result = res.data as any;
          setRecordsData(result.records);
          setFlag(result.type);
          // toast.success(t('global.sucessfulyUpdated'));
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err);
        });
    }
  };

  const dataList = {
    labels: dataGenerator(flag, recordsData).labels,
    datasets: dataGenerator(flag, recordsData).datasets,
  };

  return (
    <div className=" flex-wrap flex items-center justify-center px-2  rounded-md  w-full mb-1 gap-3">
      <div className="w-3/12 mt-20  h-12">
        <form className="" onSubmit={handleSubmit(handleOnSubmit as any)}>
          <MultiDatePicker
            timeDuration={state}
            control={control}
            placeholder="start_date"
            id="start_date"
            name="start_date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
            submitButton
            fullWidth
          />
        </form>
      </div>
      <div className="gap-4 w-3/12 h-12 flex items-center justify-between self-end  px-6">
        <RadioButton
          onChange={() => dispatch({ type: 'normal' })}
          value="normal"
          checked={!state.montly && !state.weekly && !state.year}
          label="normal"
        />
        <RadioButton
          onChange={() => dispatch({ type: 'month' })}
          value="month"
          checked={state.montly}
          label="month"
        />
        <RadioButton
          onChange={() => dispatch({ type: 'week' })}
          value="week"
          checked={state.weekly}
          label="week"
        />
      </div>
      <div className="w-7/12 p-10 border-solid border-2 rounded-md  mt-8">
        <Bar data={dataList} options={options} />
      </div>
    </div>
  );
}
