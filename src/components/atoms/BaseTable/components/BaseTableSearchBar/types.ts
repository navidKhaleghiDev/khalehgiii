import { PermissionsCodeName } from '@src/types/permissions';

export type TComponentType = 'actionAdd' | 'actionRefresh' | 'typography';

export interface ITableSearchComponent {
  type?: TComponentType;
  label?: string;
  onClick?: () => void;
  className?: string;
  permission?: PermissionsCodeName;
}

export type TSearchBar = {
  name: string;
  value: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  componentProps?: ITableSearchComponent;
};

export type TComponent = {
  actionAdd: JSX.Element;
  actionRefresh: JSX.Element;
  typography: JSX.Element;
};
