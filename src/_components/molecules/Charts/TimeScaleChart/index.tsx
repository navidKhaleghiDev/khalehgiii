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

  const { isDark } = useTheme();

  const options: ChartOptions<'line'> = {
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

  return <Line data={data} options={options} />;
}
