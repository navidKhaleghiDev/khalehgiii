import { VariantProps } from 'class-variance-authority';
import { DoughnutChartProps } from '@redesignUi/atoms/DoughnutChart/types';

import { dateTitleStyle } from './compnents/styles';
import { DateTitleProps } from './compnents/DateTitle';

export interface LicenseCardProps extends VariantProps<typeof dateTitleStyle> {
  subValue: DoughnutChartProps['subValue'];
  totalValue: DoughnutChartProps['totalValue'];
  onClick?: () => void;
  title: string;
  date: DateTitleProps['date'];
  dark?: DoughnutChartProps['dark'];
}
