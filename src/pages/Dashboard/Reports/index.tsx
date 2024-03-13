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
let condition = '';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reports, setReports] = useState({ records: '', type: '' });
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
      await API_GET_REPORTS(updatedData as any)
        .then((res) => {
          console.log(res);
          setReports(res.data as any);
          // toast.success(t('global.sucessfulyUpdated'));
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err);
        });
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
  const hourly = reports.type === 'hourly';
  const daily = reports.type === 'daily';
  const montly = reports.type === 'montly';
  const dateConvertor = (
    isoDate: any,
    format = 'YYYY-M-D HH:mm:ss',
    local: 'fa'
  ) => {
    const newConvertedData = {} as any;
    moment.locale(local);
    Object.entries(isoDate).forEach(([d, value]) => {
      const date = moment(d).format(
        // format.replace('jMMMM', monthNames[moment(d).jMonth()])
        format
      );
      newConvertedData[date] = value;
    });
    return newConvertedData;
  };
  switch (reports.type) {
    case 'hourly':
      condition = 'HH:mm';
      break;
    case 'daily':
      condition = 'dddd';
      break;
    case 'monthly':
      condition = 'MMMM';
      break;
    default:
      condition = 'HH:mm';
      break;
  }
  const ref = useRef();
  // console.log(Object.keys(dateConvertor(reports?.records, condition, 'fa')));
  // console.log(Object.keys(dateConvertor(reports?.records, 'jMMMM', 'fa')));

  const splitDataByWeek = (originalData) => {
    const dataByWeek = {};

    Object.entries(originalData).forEach(([date, value]) => {
      const weekStart = moment(date).startOf('isoWeek');
      const weekKey = weekStart.format('YYYY-MM-DD');

      if (!dataByWeek[weekKey]) {
        dataByWeek[weekKey] = {};
      }

      dataByWeek[weekKey][date] = value;
    });

    return Object.values(dataByWeek);
  };
  // const data = [
  //   {
  //     '2024-03-01 00:00:00': 3,
  //     '2024-03-02 00:00:00': 0,
  //     ' 2024-03-03 00:00:00': 0,
  //   },
  //   {
  //     '2024-03-04 00:00:00': 0,
  //     '2024-03-05 00:00:00': 1,
  //     '2024-03-06 00:00:00': 6,
  //     '2024-03-07 00:00:00': 0,
  //     '2024-03-08 00:00:00': 8,
  //     '2024-03-09 00:00:00': 0,
  //     '2024-03-10 00:00:00': 0,
  //   },
  //   {
  //     '2024-03-03 00:00:00': 10,
  //   },
  // ];

  //  const resultData =  splitDataByWeek(reports?.records)[0]

  console.log(splitDataByWeek(reports?.records));
  const dataList = {
    labels: Object.keys(dateConvertor(reports?.records, condition, 'fa')),
    datasets: [
      {
        label: 'first week ',
        data: splitDataByWeek(reports?.records)[0],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'first week ',
        data: splitDataByWeek(reports?.records)[1],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'first week ',
        data: splitDataByWeek(reports?.records)[2],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      // {
      //   label: 'second week ',
      //   data: splitDataByWeek(reports?.records)[1],
      //   fill: true,
      //   borderColor: '#742774',
      // },
      // {
      //   label: 'tirth week',
      //   data: splitDataByWeek(reports?.records)[2],
      //   fill: true,
      //   borderColor: '#742774',
      // },
    ],
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

// const hourArray = [
//   '00',
//   '01',
//   '02',
//   '03',
//   '04',
//   '05',
//   '06',
//   '07',
//   '08',
//   '09',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
//   '17',
//   '18',
//   '19',
//   '20',
//   '21',
//   '22',
//   '23',
// ];
// const monthNames = [
//   'فروردین',
//   'اردیبهشت',
//   'خرداد',
//   'تیر',
//   'مرداد',
//   'شهریور',
//   'مهر',
//   'آبان',
//   'آذر',
//   'دی',
//   'بهمن',
//   'اسفند',
// ];
// console.log(
//   dateConvertor(data, 'jMMMM', 'fa'),
//   dateConvertor(data, 'jYYYY-jM-jD', 'fa')
// );
// console.log(data);
// const splitDataByYear = (originalData) => {
//   const dataByYear = {};

//   Object.entries(originalData).forEach(([date, value]) => {
//     const year = moment(date).jYear();
//     if (!dataByYear[year]) {
//       dataByYear[year] = {};
//     }

//     dataByYear[year][date] = value;
//   });

//   return dataByYear;
// };

// const result = splitDataByYear(data);
// console.log(Object.keys(result)[0]);

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

// const firstFourLetters = Object.keys(data).map((date) => date.slice(0, 4));
// const data = {
//   // month
//   '2023-10-30 00:00:00': 4,
//   '2023-11-30 00:00:00': 4,
//   '2023-12-30 00:00:00': 4,
//   '2024-01-31 00:00:00': 4,
//   '2024-02-29 00:00:00': 1,
//   '2024-03-29 00:00:00': 20,
//   '2024-04-29 00:00:00': 10,
//   '2024-05-29 00:00:00': 2,
//   '2024-06-29 00:00:00': 44,
//   '2024-07-30 00:00:00': 5,
//   '2024-08-29 00:00:00': 50,
//   '2024-09-29 00:00:00': 5,
//   '2024-10-29 00:00:00': 2,
//   '2024-11-29 00:00:00': 9,
//   '2024-12-29 00:00:00': 7,
// };
