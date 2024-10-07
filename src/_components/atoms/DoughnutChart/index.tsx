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

const ChartColors: { [key: string]: { light: string; dark: string } } = {
  blueLight: { light: '#60A5FA', dark: '#BFDBFE' },
  blue: { light: '#1E40AF', dark: '#60A5FA' },
  red: { light: '#EF4444', dark: '#FCA5A5' },
  tealLight: { light: '#2DD4BF', dark: '#CCFBF1' },
  teal: { light: '#0D9488', dark: '#2DD4BF' },
  yellow: { light: '#EAB308', dark: '#FACC15' },
  purpleLight: { light: '#D8B4FE', dark: '#E9D5FF' },
  purple: { light: '#A855F7', dark: '#C084FC' },
  gray: { light: '#E5E7EB', dark: '#4B5563' },
};

const getBackgroundColor = (
  colorKey: string,
  dark: boolean | undefined
): string => {
  const color = ChartColors[colorKey];
  return dark ? color.dark : color.light;
};

export function DoughnutChart(props: DoughnutChartProps): JSX.Element {
  const { totalValue, subValue, color, dark } = props;

  const defaultColor = color || 'blue';
  const colorHex = getBackgroundColor(defaultColor, dark);

  const backgroundColor = getBackgroundColor('gray', dark);

  const ChartColor = [colorHex, backgroundColor];

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
    <div className="relative w-20">
      <Pie data={data} options={options} />

      <div
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
