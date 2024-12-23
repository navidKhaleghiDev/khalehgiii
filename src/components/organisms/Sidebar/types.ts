import { RoutePathType } from '@src/routes/routesConstants';
import { IconType } from '@src/types/global';

export interface NavigationParams {
  id: string;
  label: string;
  path: RoutePathType | string;
  isNewTab?: boolean;
  icon?: IconType;
  items?: NavigationParams[];
  mouseHover?: () => void;
}
export interface SideBarFooterProps {
  toggle?: boolean;
  toggleSidebarHandler?: () => void;
}
