import { IconType, StringifyProperties } from '@src/types/global';
import { PermissionsCodeName } from '@src/types/permissions';

import { VariantProps } from 'class-variance-authority';
import { BaseIconProps } from '../BaseIcon/types';
import { BaseButtonProps, IconButtonProps } from '../BaseButton';
import { SearchBarParams } from './components/BaseTableSearchBar/types';
import { typographyStyles } from '../Typography/styles';

export type RowType<T> = T & {
  id: string | number;
};

export type IdItem = { id: string | number };

export type TableType =
  | 'action'
  | 'none'
  | 'component'
  | 'function'
  | 'user'
  | 'button'
  | 'date'
  | 'tooltip';

export type ActionOnClickActionsType =
  | 'delete'
  | 'edit'
  | 'details'
  | 'mutate'
  | 'download'
  | 'more'
  | 'button'
  | 'editLock';

export type TableIcon = {
  icon: IconType | IconType[];
  color?: BaseIconProps['color'] | BaseIconProps['color'][];
};

export type PaginationParams = {
  currentPage: number;
  totalPages: number;
  countPage: number;
  onPageChange: (page: number) => void;
};

type TableLabel = `table.${string}` | string;
export interface HeaderTableProps {
  action?: any;
  component?: any;
  function?: any;
  id: string | string[];
  label?: TableLabel;
  class?: string;
  dir?: string;
  type: TableType;
  variant?: VariantProps<typeof typographyStyles>['variant'];
  fixed?: boolean;
  permission?: PermissionsCodeName | PermissionsCodeName[];
  buttonProps?: BaseButtonProps;
}

export interface BaseTableProps<BodyType> {
  headers: HeaderTableProps[];
  bodyList: BodyType[];
  loading: boolean;
  onClick?: OnClickActionsType<BodyType>;
  pagination?: PaginationParams;
  searchBar?: SearchBarParams;
}

export type OnClickActionsType<DataType> = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<DataType> | DataType,
  id?: HeaderTableProps['id']
) => void;

export interface RowCellsComponent {
  row?: any;
  header?: HeaderTableProps;
  onClick?: OnClickActionsType<any>;
}

export interface ComponentTableProps extends RowCellsComponent {
  id: any;
  action?: ActionItemProps[];
}

export interface ActionItemProps {
  action: ActionOnClickActionsType;
  icon: IconButtonProps['icon'];
  color: IconButtonProps['color'];
  size: IconButtonProps['size'];
  tooltip: string;
  permission?: PermissionsCodeName;
}

export interface RowTableProps<BodyType> {
  row: BodyType;
  headers: HeaderTableProps[];
  onClick?: OnClickActionsType<BodyType>;
}

export interface TableCell<BodyType> {
  id?: string;
  row?: any;
  head?: HeaderTableProps[];
  onClick?: OnClickActionsType<BodyType>;
}

export type ComponentsHeader = {
  [key in TableType]: JSX.Element;
};
