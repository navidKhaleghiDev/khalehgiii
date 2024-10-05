import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { tooltipStyles } from './styles';

export interface ToolTipProps extends VariantProps<typeof tooltipStyles> {
  children: ReactNode;
  tooltip: string;
}
