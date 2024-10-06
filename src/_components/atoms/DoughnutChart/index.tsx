import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

import { DoughnutChartProps } from './types';
import { doughnutChartStyles } from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartColors: { [key: string]: string } = {
  blueLight: '#60A5FA dark:#EF4444',
  blue: '#1E40AF',
  red: '#EF4444',
  tealLight: '#2DD4BF',
  teal: '#0D9488',
  yellow: '#EAB308',
  purpleLight: '#D8B4FE',
  purple: '#A855F7',
};
const getBackgroundColor = (colorKey: string): string => {
  return ChartColors[colorKey] || '#E5E7EB';
};

export function DoughnutChart(props: DoughnutChartProps): JSX.Element {
  const { totalValue, subValue, color } = props;

  const defaultColor = color || 'blue';
  const colorHex = getBackgroundColor(defaultColor);
  const ChartColor = [colorHex, '#E5E7EB'];

  const data: ChartData<'pie', number[]> = {
    datasets: [
      {
        data: [subValue, totalValue - subValue],
        backgroundColor: ChartColor,
        hoverBackgroundColor: ChartColor,
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    cutout: '85%',
    hover: {
      mode: undefined,
    },
  };

  return (
    <div className="relative w-[72px]">
      <Pie data={data} options={options} />

      <div
        style={{ fontSize: '0.75rem' }}
        className={`${doughnutChartStyles({
          color,
        })} 
  `}
      >
        {`${subValue}/${totalValue}`}
      </div>
    </div>
  );
}
