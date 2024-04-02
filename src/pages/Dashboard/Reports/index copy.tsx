import { useRef, useReducer, useState } from 'react';
import {
  MultiDatePicker,
  convertI2ToAD,
} from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment-jalaali';
import { API_GET_REPORTS } from '@src/services/config';
import RadioButton from '@ui/atoms/RadioButton';
import { IFormDate, IFormDateData } from './types';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
let activeState = 'normal';

const HOURLY_FORMAT = 'HH:mm';
const DAILY_FORMAT = 'dddd';
const MONTLY_FORMAT = 'MMMM';
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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const daysOfWeek = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

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
  if (Object.keys(data).length > 0) {
    Object.entries(data).forEach(([key, value]) => {
      if (isDaily) {
        const weekStart = moment(key).startOf('isoWeek');
        const weekKey = weekStart.format('jYYYY-jMM-jDD');
        if (!dataList[weekKey]) {
          dataList[weekKey] = {};
          weeksKey.push(weekKey);
        }
        dataList[weekKey][moment(key).format(formatData[type])] = value;
      } else {
        dataList.push(value);
        labelList.push(moment(key).format(formatData[type]));
      }
    });
  }
  const dailyDataset = () =>
    Object.values(dataList).map((listData, i) => {
      return {
        label: `week ${i + 1}`,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ref = useRef();
  const [recordsData, setRecordsData] = useState({});
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

  console.log(dataGenerator(flag, recordsData).datasets, '=======<');
  console.log(dataGenerator(flag, recordsData).labels, '----->');
  const dataList = {
    labels: dataGenerator(flag, recordsData).labels,
    datasets: dataGenerator(flag, recordsData).datasets,
  };

  return (
    <div className=" flex-wrap flex items-center justify-center px-2  rounded-md  w-full mb-1 gap-3   ">
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
        <Chart ref={ref} type="bar" data={dataList} options={options} />
      </div>
    </div>
  );
}
// const inputData = {
//   ' 2024-03-01 00:00:00': 4,
//   '2024-03-02 00:00:00': 6,
//   '2024-03-03 00:00:00': 7,
//   '2024-03-04 00:00:00': 9,
//   '2024-03-05 00:00:00': 10,
//   '2024-03-06 00:00:00': 5,
//   '2024-03-07 00:00:00': 8,
//   '2024-03-08 00:00:00': 9,
//   '2024-03-09 00:00:00': 4,
//   '2024-03-10 00:00:00': 7,
//   '2024-03-11 00:00:00': 5,
//   '2024-03-12 00:00:00': 8,
//   '2024-03-13 00:00:00': 9,
//   '2024-03-14 00:00:00': 3,
//   '2024-03-15 00:00:00': 1,
// };
