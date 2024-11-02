import { VariantProps } from 'class-variance-authority';

import { IconType } from '@src/types/global';

import { NavigationProps } from '../types';
import { menuItemStyles } from '../MenuItem/styles';

export interface MenuItemAccordionProps
  extends VariantProps<typeof menuItemStyles> {
  open: number | null;
  setOpen: (open: number | null) => void;
  index: number;
  item: NavigationProps;
  pathname: string;
  icon?: IconType;
  collapsed: boolean;
}
