import { IconType, StringifyProperties } from '@src/types/global';

import { IBaseIcon } from '../BaseIcon/types';
import { IIconButton } from '../BaseButton';
import { TSearchBar } from './components/BaseTableSearchBar/types';

export type RowType<T> = T & {
  id: string | number;
};

export type TIdItem = { id: string | number };

type TTableType =
  | 'action'
  | 'none'
  | 'component'
  | 'function'
  | 'user'
  | 'tooltip';

export type TTableSize =
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body4'
  | 'body1'
  | 'body2'
  | 'body3'
  | null;

export type ActionOnClickActionsType =
  | 'delete'
  | 'edit'
  | 'details'
  | 'mutate'
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
export interface IHeaderTable {
  action?: any;
  component?: any;
  function?: any;
  id: string | string[];
  label: string;
  style?: string;
  dir?: string;
  type: TTableType;
  size?: TTableSize;
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
  typeFile?: StringifyProperties<DataType> | DataType
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

export interface IComponentsHeader {
  none: JSX.Element;
  component: JSX.Element;
  function: JSX.Element;
  action: JSX.Element;
  user: JSX.Element;
  tooltip: JSX.Element;
}
