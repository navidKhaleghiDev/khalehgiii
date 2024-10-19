import { IconType, StringifyProperties } from '@src/types/global';
import { PermissionsCodeName } from '@src/types/permissions';

import { VariantProps } from 'class-variance-authority';
import { IBaseIcon } from '../BaseIcon/types';
import { IBaseButton, IIconButton } from '../BaseButton';
import { TSearchBar } from './components/BaseTableSearchBar/types';
import { typographyStyles } from '../Typography/styles';

export type RowType<T> = T & {
  id: string | number;
};

export type TIdItem = { id: string | number };

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

export type TTableIcon = {
  icon: IconType | IconType[];
  color?: IBaseIcon['color'] | IBaseIcon['color'][];
};

export type TPagination = {
  currentPage: number;
  totalPages: number;
  countPage: number;
  onPageChange: (page: number) => void;
};

type TTableLabel = `table.${string}` | string;
export interface IHeaderTable {
  action?: any;
  component?: any;
  function?: any;
  id: string | string[];
  label?: TTableLabel;
  class?: string;
  dir?: string;
  type: TableType;
  variant?: VariantProps<typeof typographyStyles>['variant'];
  fixed?: boolean;
  permission?: PermissionsCodeName | PermissionsCodeName[];
  buttonProps?: IBaseButton;
}

export interface IBaseTableProps<BodyType> {
  headers: IHeaderTable[];
  bodyList: BodyType[];
  loading: boolean;
  onClick?: OnClickActionsType<BodyType>;
  pagination?: TPagination;
  searchBar?: TSearchBar;
}

export type OnClickActionsType<DataType> = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<DataType> | DataType,
  id?: IHeaderTable['id']
) => void;

export interface IRowCellsComponent {
  row?: any;
  header?: IHeaderTable;
  onClick?: OnClickActionsType<any>;
}

export interface IComponentTable extends IRowCellsComponent {
  id: any;
  action?: IActionItem[];
}

export interface IActionItem {
  action: ActionOnClickActionsType;
  icon: IIconButton['icon'];
  color: IIconButton['color'];
  size: IIconButton['size'];
  tooltip: string;
  permission?: PermissionsCodeName;
}

export interface IRowTableProps<BodyType> {
  row: BodyType;
  headers: IHeaderTable[];
  onClick?: OnClickActionsType<BodyType>;
}

export interface ITableCell<BodyType> {
  id?: string;
  row?: any;
  head?: IHeaderTable[];
  onClick?: OnClickActionsType<BodyType>;
}

export type IComponentsHeader = {
  [key in TableType]: JSX.Element;
};
