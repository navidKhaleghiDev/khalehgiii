import { PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';

import { cardStyles } from './styles';

export interface CardProps
  extends VariantProps<typeof cardStyles>,
    PropsWithChildren {
  className?: string;
}

export interface CardButtonProps extends CardProps {
  onClick?: () => void;
  disabled?: boolean;
}
