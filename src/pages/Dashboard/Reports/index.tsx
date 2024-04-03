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
import { IFormDate, IFormDateData } from './types';

let activeState = 'normal';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = ' dddd';
const MONTLY_FORMAT = 'jMMMM';
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
      activeState = 'week';
      return {
        weekly: true,
        montly: false,
        year: false,
      };
    }
    case 'month': {
      activeState = 'month';
      return {
        weekly: false,
        montly: true,
        year: false,
      };
    }
    case 'year': {
      activeState = 'year';
      return {
        weekly: false,
        montly: false,
        year: true,
      };
    }
    case 'normal': {
      activeState = 'normal';
      return {
        weekly: false,
        montly: false,
        year: false,
      };
    }
    default: {
      activeState = 'normal';
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
      // backgroundColor: '#fff',
      callbacks: {
        label: function (res) {
          console.log(res);

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

type TDataSet = {
  label: string;
  data: string[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
};

type TDataType = 'hourly' | 'daily' | 'monthly';
type TData = Record<string, number>;

const formatData = {
  hourly: HOURLY_FORMAT,
  monthly: MONTLY_FORMAT,
  daily: DAILY_FORMAT,
};

type TDataGeneratorReturn = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }>;
};

function dataGenerator(type: TDataType, data: TData): TDataGeneratorReturn {
  const isDaily = formatData[type] === DAILY_FORMAT;
  const dataList: number[] = [];
  const labelList: string[] = [];
  const weeksKey: string[] = [];
  const timeStamp: string[] = [];

  if (Object.keys(data).length > 0) {
    Object.entries(data).forEach(([key, value]) => {
      if (isDaily) {
        const weekStart = moment(key, 'jYYYY-jMM-jDD').startOf('jWeek');
        while (weekStart.isoWeekday() !== 5) {
          weekStart.subtract(1, 'day');
        }
        const weekKey = weekStart.format('jYYYY-jMM-jDD');
        if (!dataList[weekKey]) {
          dataList[weekKey] = {};
          weeksKey.push(weekKey);
        }
        dataList[weekKey][moment(key).format(formatData[type])] = value;
        // labelList.push(moment(key).format(formatData[type]));
        timeStamp.push(moment(key).format('jYYYY-jMM-jDD'));
      } else {
        dataList.push(value);
        labelList.push(moment(key).format(formatData[type]));
      }
    });
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

const dataA = {
  // labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [
        { x: '1', y: 0, s: '2016-12-25' },
        { x: '2', y: 0, s: '2016-12-25' },
        { x: '3', y: 10, s: '2016-12-25' },
        { x: '4', y: 10, s: '2016-12-25' },
        { x: '5', y: 10, s: '2016-12-25' },
        { x: '6', y: 10, s: '2016-12-25' },
        { x: '7', y: 10, s: '2016-12-25' },
      ],
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: [
        { x: '1', y: 20, s: '2016-12-26' },
        { x: '2', y: 10, s: '2016-12-27' },
        { x: '3', y: 10, s: '2016-12-28' },
        { x: '4', y: 10, s: '2016-12-29' },
        { x: '5', y: 10, s: '2016-12-30' },
        { x: '6', y: 10, s: '2016-12-31' },
        { x: '7', y: 10, s: '2017-01-01' },
      ],
      yAxisID: 'y',
    },
    {
      label: 'Dataset 3',
      data: [
        { x: '1', y: 20, s: '2016-12-25' },
        { x: '2', y: 10, s: '2016-12-25' },
        { x: '3', y: 10, s: '2016-12-25' },
        { x: '4', y: 10, s: '2016-12-25' },
        { x: '5', y: 10, s: '2016-12-25' },
        { x: '6', y: 10, s: '2016-12-25' },
        { x: '7', y: 10, s: '2016-12-25' },
      ],
      yAxisID: 'y',
    },
  ],
};

export function Reports() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [recordsData, setRecordsData] = useState(inputData);
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
          setRecordsData(res.data.records as any);
          setFlag(res.data.type);
          // toast.success(t('global.sucessfulyUpdated'));
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err);
        });
    }
  };

  // console.log(dataGenerator(flag, recordsData).datasets, '=======<');
  // console.log(dataGenerator(flag, inputData).labels, '----->');
  // console.log(dataGenerator(flag, inputData).la, '----->');
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
      {/* <div className="w-7/12 p-10 border-solid border-2 rounded-md  mt-8">
        <Bar data={dataList} options={options} />
      </div> */}
      <div className="w-7/12 p-10 border-solid border-2 rounded-md  mt-8">
        <Bar data={dataA} options={options} />
      </div>
    </div>
  );
}

const inputData = {
  '2024-02-27 00:00:00': 4,
  '2024-02-28 00:00:00': 4,
  '2024-02-29 00:00:00': 4,
  '2024-03-01 00:00:00': 4,
  '2024-03-02 00:00:00': 6,
  '2024-03-03 00:00:00': 7,
  '2024-03-04 00:00:00': 9,
  '2024-03-05 00:00:00': 10,
  '2024-03-06 00:00:00': 5,
  '2024-03-07 00:00:00': 8,
  '2024-03-08 00:00:00': 9,
  '2024-03-09 00:00:00': 4,
  '2024-03-10 00:00:00': 7,
  '2024-03-11 00:00:00': 5,
  '2024-03-12 00:00:00': 8,
  '2024-03-13 00:00:00': 9,
  '2024-03-14 00:00:00': 3,
  '2024-03-15 00:00:00': 1,
};
// const inputData = {
//   '2024-02-27 00:00:00': 4,
//   '2024-02-27 01:00:00': 4,
//   '2024-02-27 02:00:00': 4,
//   '2024-02-27 03:00:00': 4,
//   '2024-02-27 04:00:00': 4,
//   '2024-02-27 05:00:00': 4,
//   '2024-02-27 06:00:00': 4,
//   '2024-02-27 07:00:00': 4,
//   '2024-02-27 08:00:00': 4,
//   '2024-02-27 09:00:00': 4,
//   '2024-02-27 10:00:00': 4,
//   '2024-02-27 11:00:00': 4,
//   '2024-02-27 12:00:00': 4,
// };
// const inputData = {
//   '2024-02-1 00:00:00': 16,
//   '2024-03-1 00:00:00': 30,
//   '2024-04-1 00:00:00': 60,
// };
