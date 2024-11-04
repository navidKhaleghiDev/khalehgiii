import { RoutePathType } from '@src/routes/routesConstants';
import { IconType } from '@src/types/global';

export interface NavigationProps {
  id: string;
  label: string;
  path: RoutePathType | string;
  isNewTab?: boolean;
  icon?: IconType;
  items?: NavigationProps[];
  mouseHover?: () => void;
}
