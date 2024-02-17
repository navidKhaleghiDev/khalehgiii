import { VariantProps } from 'class-variance-authority';
import { ReactElement } from 'react';

import { titleStyles } from './styles';

export interface IAccordion {
  id: string;
  title: ReactElement;
  content: ReactElement;
}

export interface AccordionProps extends VariantProps<typeof titleStyles> {
  id: string;
  title: ReactElement;
  content: ReactElement;
  classNameTittle?: string;
  classNameContent?: string;
}
