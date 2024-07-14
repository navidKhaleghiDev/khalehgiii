import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { tooltipStyles } from './styles';

export enum TooltipPosition {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export interface IToolTip extends VariantProps<typeof tooltipStyles> {
  children: ReactNode;
  tooltip?: string;
  skip?: boolean;
}
