import { useRef, useReducer, useState, useEffect } from 'react';
import {
  MultiDatePicker,
  convertI2ToAD,
} from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment-jalaali';
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
import { BaseButton } from '@ui/atoms';
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
export function Reports() {
  const [convertToPersian, setConvertToPersian] = useState('');
  const [reports, setReports] = useState([]);
  const initialState = {
    weekly: false,
    montly: false,
    year: false,
  };

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
      // update
      await API_GET_REPORTS(updatedData)
        .then((res) => {
          console.log(res);
          setReports(res.data);
          // toast.success(t('global.sucessfulyUpdated'));
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err);
        });
    }
  };

  // const mockDataDay = {
  // day
  //   '2024-01-31 00:00:00': 4,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-30 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-01-29 00:00:00': 7,
  //   '2024-02-29 00:00:00': 7,
  //   '2024-03-29 00:00:00': 7,
  //   '2024-04-29 00:00:00': 7,
  // };
  const data = {
    // month
    '2024-01-31 00:00:00': 4,
    '2024-02-29 00:00:00': 1,
    '2024-03-29 00:00:00': 20,
    '2024-04-29 00:00:00': 10,
    '2024-05-29 00:00:00': 2,
    '2024-06-29 00:00:00': 44,
    '2024-07-30 00:00:00': 5,
    '2024-08-29 00:00:00': 50,
    '2024-09-29 00:00:00': 5,
    '2024-10-29 00:00:00': 2,
    '2024-11-29 00:00:00': 9,
    '2024-12-29 00:00:00': 7,
  };
  // const data = {
  //   // year
  //   '2015-10-31 00:00:00': 20,
  //   '2016-11-29 00:00:00': 7,
  //   '2017-12-29 00:00:00': 16,
  //   '2028-01-29 00:00:00': 1,
  //   '2019-02-29 00:00:00': 8,
  //   '2020-03-29 00:00:00': 50,
  //   '2022-04-30 00:00:00': 120,
  //   '2023-05-29 00:00:00': 75,
  //   '2024-06-29 00:00:00': 88,
  // };

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

  const dateConvertor = (isoDate, format = 'YYYY-M-D HH:mm:ss') => {
    const newConvertedData = {};
    Object.entries(isoDate).forEach(([d, value]) => {
      const date = moment(d).format(format);
      newConvertedData[date] = value;
    });
    return newConvertedData;
  };
  console.log(dateConvertor(data));

  // console.log(data);
  const ref = useRef();

  // function triggerTooltip(chart: ChartJS | null) {
  //   const tooltip = chart?.tooltip;

  //   if (!tooltip) {
  //     return;
  //   }

  //   if (tooltip.getActiveElements().length > 0) {
  //     tooltip.setActiveElements([], { x: 0, y: 0 });
  //   } else {
  //     const { chartArea } = chart;

  //     tooltip.setActiveElements(
  //       [
  //         {
  //           datasetIndex: 0,
  //           index: 2,
  //         },
  //         {
  //           datasetIndex: 1,
  //           index: 2,
  //         },
  //       ],
  //       {
  //         x: (chartArea.left + chartArea.right) / 2,
  //         y: (chartArea.top + chartArea.bottom) / 2,
  //       }
  //     );
  //   }

  //   chart.update();
  // }

  const firstFourLetters = Object.keys(data).map((date) => date.slice(0, 4));
  const dataList = {
    labels: convertToPersian,
    datasets: [
      {
        label: '2020',
        data: convertToPersian || Object.values(data),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        data: convertToPersian || Object.values(data),
        fill: true,
        borderColor: '#742774',
      },
    ],
  };
  // const moclDataLabel = ddd.slice(0, 4);

  return (
    <div className="grid grid-cols-12 gap-4  w-full h-screen  ">
      <div className="flex gap-4">
        <RadioButton
          onChange={() => dispatch({ type: 'normal' })}
          value="normal"
          checked={!state.montly && !state.weekly && !state.year}
          label="normal"
        />
        <RadioButton
          onChange={() => dispatch({ type: 'week' })}
          value="week"
          checked={state.weekly}
          label="week"
        />
        <RadioButton
          onChange={() => dispatch({ type: 'month' })}
          value="month"
          checked={state.montly}
          label="month"
        />
        <RadioButton
          onChange={() => dispatch({ type: 'year' })}
          value="year"
          checked={state.year}
          label="year"
        />
      </div>
      <form className="" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="col-span-3  mt-20">
          <MultiDatePicker
            timeDuration={state}
            control={control}
            placeholder="start_date"
            id="start_date"
            name="start_date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
            fullWidth
          />
        </div>
        {/* <BaseButton label="shadow" type="secondary" /> */}
        <button type="submit" className="bg-red-500 w-f h-15">
          submit
        </button>
      </form>

      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="bar" data={dataList} options={options} />
      </div>
      {/* <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="line" data={dataList} options={options} />
      </div> */}
      {/* <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="pie" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="doughnut" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="polarArea" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="radar" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="scatter" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="bubble" data={data} options={options} />
      </div> */}
    </div>
  );
}
// const monthsArray = {
//   persian: [
//     'فروردين',
//     'ارديبهشت',
//     'خرداد',
//     'تير',
//     'مرداد',
//     'شهريور',
//     'مهر',
//     'آبان',
//     'آذر',
//     'دي',
//     'بهمن',
//     'اسفند',
//   ],
//   gregorian: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ],
// };

// const dayArray = {
//   persian: [
//     'شنبه',
//     'يكشنبه',
//     'دوشنبه',
//     'سه شنبه',
//     'چهارشنبه',
//     'پنج شنبه',
//     'جمعه',
//   ],
//   gregorian: [
//     'Saturday',
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//   ],
// };

const hourArray = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
