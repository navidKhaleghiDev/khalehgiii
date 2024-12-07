import { PermissionsCodeName } from '@src/types/permissions';

export type ComponentType = 'actionAdd' | 'actionRefresh' | 'typography';

export interface TableSearchComponentProps {
  type?: ComponentType;
  label?: string;
  onClick?: () => void;
  className?: string;
  permission?: PermissionsCodeName;
}

export type SearchBarParams = {
  name: string;
  value: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  componentProps?: TableSearchComponentProps;
};

export type ComponentParams = {
  actionAdd: JSX.Element;
  actionRefresh: JSX.Element;
  typography: JSX.Element;
};
