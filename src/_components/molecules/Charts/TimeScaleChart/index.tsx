import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeScaleChartProps {
  datasets: {
    label: string;
    data: { x: string; y: number }[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export function TimeScaleChart({ datasets }: TimeScaleChartProps) {
  const data = {
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: false,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Value',
        },
      },
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="max-w-[500px] w-full flex [&>*:first-child]:self-end [&>*:first-child]:justify-self-end justify-end">
      <Line data={data} options={options} />
    </div>
  );
}
