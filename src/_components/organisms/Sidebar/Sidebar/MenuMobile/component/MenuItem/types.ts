import { VariantProps } from 'class-variance-authority';
import { menuItemStyles } from './styles';
import { INavigation } from '../../types';

export interface IMenuItem extends VariantProps<typeof menuItemStyles> {
  item: INavigation;
  pathname: string;
  collapsed: boolean;
}
