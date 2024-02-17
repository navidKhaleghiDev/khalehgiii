import { PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';

import { cardStyles } from './styles';

export interface ICard
  extends VariantProps<typeof cardStyles>,
    PropsWithChildren {
  className?: string;
}
