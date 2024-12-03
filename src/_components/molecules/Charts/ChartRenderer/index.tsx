import { Bar, Line } from 'react-chartjs-2';
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

import { useTheme } from '@context/settings/themeContext';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartRendererProps = {
  datasets: {
    label: string;
    data: { x: string; y: number }[];
    borderColor: string;
    backgroundColor: string;
  }[];
  chartType: 'line' | 'bar';
};

const chartComponents = {
  line: Line,
  bar: Bar,
};

export function ChartRenderer(props: ChartRendererProps) {
  const { datasets, chartType } = props;
  const { isDark } = useTheme();

  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: false,
          text: 'Value',
        },
        ticks: {
          color: isDark ? 'rgb(156, 163, 175)' : 'rgb(104, 104, 104)',
          align: 'center',
        },
        grid: {
          color: isDark
            ? 'rgba(156, 163, 175, 0.5)'
            : 'rgba(104, 104, 104, 0.5)',
          lineWidth: 1,
        },
      },
      y: {
        title: {
          display: false,
          text: 'Value',
        },
        ticks: {
          color: isDark ? 'rgb(156, 163, 175)' : 'rgb(104, 104, 104)',
          stepSize: 1,
        },
        grid: {
          color: isDark
            ? 'rgba(156, 163, 175, 0.5)'
            : 'rgba(104, 104, 104, 0.5)',
          lineWidth: 1,
        },
        beginAtZero: true,
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

  const ChartComponent = chartComponents[chartType];

  return <ChartComponent data={{ datasets }} options={options} />;
}
