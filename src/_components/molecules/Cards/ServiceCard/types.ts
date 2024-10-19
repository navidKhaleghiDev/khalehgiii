import { DoughnutChartProps } from '@redesignUi/atoms/DoughnutChart/types';

export interface ServiceCardProps {
  subValue: DoughnutChartProps['subValue'];
  totalValue: DoughnutChartProps['totalValue'];
  onClick?: () => void;
  title: string;
  date: string;
  className?: string;
}
