import { IconType, StringifyProperties } from '@src/types/global';

import { IBaseIcon } from '../BaseIcon/types';
import { IIconButton } from '../BaseButton';

// export type HeaderItem =
//   | (HeaderItemBase & HeaderItemWithTooltip)
//   | (HeaderItemBase & HeaderItemWithFunction)
//   | (HeaderItemBase & HeaderItemWithComponent)
//   | (HeaderItemBase & HeaderItemWithIcon)
//   | (HeaderItemBase & HeaderItemWithAction)
//   | (HeaderItemBase & HeaderItemWithNone);

type TTableType =
  | 'action'
  | 'none'
  | 'component'
  | 'function'
  | 'icon'
  | 'user'
  | 'tooltip';

type TTableSize =
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

export interface IHeaderTable {
  action: any;
  component: any;
  id: string;
  label: string;
  style?: string;
  dir?: string;
  icon?: IconType | IconType[];
  color?: IBaseIcon['color'];
  type: TTableType;
  size?: TTableSize;
}

export interface IBaseTableProps<BodyType> {
  id: string;
  headers: IHeaderTable[];
  listBody: BodyType[];
  loading: boolean;
  onClick?: (action: ActionOnClickActionsType, dass: Partial<BodyType>) => void;
}

export type ActionOnClickActionsType =
  | 'delete'
  | 'edit'
  | 'details'
  | 'mutate'
  | 'editLock';

export type OnClickActionsType<DataType> = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<DataType> | DataType
) => void;

export interface IRowCellsComponent {
  row?: any;
  header: IHeaderTable;
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
  icon: JSX.Element;
  user: JSX.Element;
  tooltip: JSX.Element;
}

// export interface TableRowProps {
//   id?: string;
// }
// export type HeaderItemWithTooltip = {
//   id: string;
//   type: 'tooltip';
//   // tooltip: string;
// };

// export type HeaderItemWithFunction = {
//   id: string;
//   type: 'function';
//   function: () => React.ReactNode[] | React.ReactNode;
// };

// export type HeaderItemWithComponent = {
//   id: string;
//   type: 'component';
//   component: () => React.ComponentType<any> | undefined;
// };
// export type HeaderItemWithAction = {
//   id: string;
//   type: 'action';
//   action: ActionItem[];
// };
// export type HeaderItemWithIcon = {
//   id: string;
//   type: 'icon';
//   color?: string | string[];
//   icon: JSX.Element | any[];
// };
// export type HeaderItemWithNone = {
//   type: 'none';
//   id: string;
// };
// export type HeaderItemWithUser = {
//   type: 'user';
//   id: string[];
// };
