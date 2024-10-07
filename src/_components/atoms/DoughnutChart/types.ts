import { VariantProps } from 'class-variance-authority';
import { doughnutChartStyles } from './styles';

export interface DoughnutChartProps
  extends VariantProps<typeof doughnutChartStyles> {
  totalValue: number;
  subValue: number;
  dark?: boolean;
}
