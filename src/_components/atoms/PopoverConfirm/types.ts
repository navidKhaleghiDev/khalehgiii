import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { tooltipStyles } from './styles';

export interface PopoverProps extends VariantProps<typeof tooltipStyles> {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
