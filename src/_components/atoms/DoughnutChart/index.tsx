import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

import { useTheme } from '@context/settings/themeContext';

import { DoughnutChartProps } from './types';
import { doughnutChartStyles } from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartColors: { [key: string]: { light: string; dark: string } } = {
  blueLight: { light: '#60A5FA', dark: '#BFDBFE' },
  blue: { light: '#1E40AF', dark: '#60A5FA' },
  red: { light: '#EF4444', dark: '#FCA5A5' },
  tealLight: { light: '#2DD4BF', dark: '#CCFBF1' },
  teal: { light: '#14B8A6', dark: '#2DD4BF' },
  tealDark: { light: '#0D9488', dark: '#2DD4BF' },
  yellow: { light: '#EAB308', dark: '#FACC15' },
  purpleLight: { light: '#D8B4FE', dark: '#E9D5FF' },
  purple: { light: '#A855F7', dark: '#C084FC' },
  gray: { light: '#F3F4F6', dark: '#6B7280' },
};

const getBackgroundColor = (colorKey: string, theme: string): string => {
  const color = ChartColors[colorKey];
  return theme === 'dark' ? color.dark : color.light;
};

export function DoughnutChart(props: DoughnutChartProps): JSX.Element {
  const { totalValue = 10, subValue = 0, color, children, type } = props;
  const { theme } = useTheme();

  const defaultColor = color || 'blue';
  const colorHex = getBackgroundColor(defaultColor, theme);

  const backgroundColor = getBackgroundColor('gray', theme);
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
  const cutoutPercentage = type === 'license' ? '85%' : '80%';
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    cutout: cutoutPercentage,
    hover: {
      mode: undefined,
    },
  };

  return (
    <div
      className={`relative font-kalameh ${
        type === 'license' ? 'sm:w-20 sm:h-20 w-14 h-14' : 'w-20 h-20'
      }`}
    >
      <Pie data={data} options={options} />

      <div
        className={`${doughnutChartStyles({ type, color })} 
  `}
      >
        {children}
      </div>
    </div>
  );
}
