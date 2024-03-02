import { useRef, useReducer } from 'react';
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
import { BaseButton } from '@ui/atoms';
// import useSWR from 'swr';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
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
export function Reports() {
  const initialState = {
    weekly: false,
    montly: false,
    year: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { control, watch } = useForm({
    mode: 'onChange',
  });
  console.log(convertI2ToAD(watch('startedDate')));
  // const { data, isLoading, mutate } = useSWR<
  //   PaginationResponseSwr<IMyLearner[]>
  // >(
  //   E_AI_MY_LEARNER_PAGINATION({
  //     page: currentPage,
  //     pageSize: LIMIT_MU_LISTENER_LIST,
  //     time_from: convertI2ToAD(watch('startDate'), 'YYYY-MM-DD'),
  //     time_to: convertI2ToAD(watch('endDate'), 'YYYY-MM-DD'),
  //     listener_id: watch('listener_id'),
  //   }),
  //   http.fetcherSWR,
  //   {
  //     revalidateOnFocus: false,
  //     errorRetryCount: 0,
  //   }
  // );

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

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  return (
    <div className="grid grid-cols-12 gap-4  w-full h-screen  ">
      <div className="flex gap-4">
        <BaseButton
          label="normal"
          type={
            !state.montly && !state.weekly && !state.year ? 'default' : 'shadow'
          }
          onClick={() => dispatch({ type: 'normal' })}
        />
        <BaseButton
          label="weekly"
          type={state.weekly ? 'default' : 'shadow'}
          onClick={() => dispatch({ type: 'week' })}
        />
        <BaseButton
          label="montly"
          type={state.montly ? 'default' : 'shadow'}
          onClick={() => dispatch({ type: 'month' })}
        />
        <BaseButton
          label="year"
          type={state.year ? 'default' : 'shadow'}
          onClick={() => dispatch({ type: 'year' })}
        />
      </div>
      <div className="col-span-3  mt-20">
        <MultiDatePicker
          timeDuration={state}
          control={control}
          placeholder="startedDate"
          id="startedDate"
          name="startedDate"
          format="YYYY-MM-DD"
          maxDate={new Date()}
          fullWidth
        />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="bar" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
        <Chart ref={ref} type="line" data={data} options={options} />
      </div>
      <div className="col-span-4  p-10 ">
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
      </div>
    </div>
  );
}
