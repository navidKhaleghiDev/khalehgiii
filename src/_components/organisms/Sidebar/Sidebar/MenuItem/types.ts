import { VariantProps } from 'class-variance-authority';
import { menuItemStyles } from './styles';
import { NavigationProps } from '../types';

export interface MenuItemProps extends VariantProps<typeof menuItemStyles> {
  item: NavigationProps;
  pathname: string;
  collapsed: boolean;
}
