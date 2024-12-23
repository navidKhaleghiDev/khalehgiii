import { VariantProps } from 'class-variance-authority';

import { menuItemStyles } from './styles';
import { NavigationParams } from '../types';

export interface MenuItemProps extends VariantProps<typeof menuItemStyles> {
  item: NavigationParams;
  pathname: string;
  collapsed: boolean;
}
