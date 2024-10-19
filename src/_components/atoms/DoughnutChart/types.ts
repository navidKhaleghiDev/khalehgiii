import { PropsWithChildren } from 'react';

import { VariantProps } from 'class-variance-authority';
import { doughnutChartStyles } from './styles';

export interface DoughnutChartProps
  extends VariantProps<typeof doughnutChartStyles>,
    PropsWithChildren {
  totalValue: number;
  subValue: number;
}
