import { VariantProps } from 'class-variance-authority';
import { ReactElement } from 'react';

import { titleStyles } from './styles';

export interface IAccordionButton {
  id: string;
  title: string;
  content: ReactElement;
}

export interface AccordionButtonProps extends VariantProps<typeof titleStyles> {
  open: string | null;
  setOpen: (open: string | null) => void;
  item: IAccordionButton;
}
