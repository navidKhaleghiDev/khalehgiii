import { ActionOnClickActionsType } from '@src/pages/Dashboard/DlpConfig/FileTypeCard/types';
import { IDaAs } from '@src/services/users/types';
import React from 'react';

export type HeaderItem =
  | (HeaderItemBase & HeaderItemWithTooltip)
  | (HeaderItemBase & HeaderItemWithFunction)
  | (HeaderItemBase & HeaderItemWithComponent)
  | (HeaderItemBase & HeaderItemWithIcon)
  | (HeaderItemBase & HeaderItemWithAction)
  | (HeaderItemBase & HeaderItemWithNone);

type HeaderItemBase = {
  label: string;
  style?: string;
  dir?: string;
  icon?: any;
  type?:
    | 'action'
    | 'none'
    | 'component'
    | 'function'
    | 'icon'
    | 'user'
    | 'tooltip';
  size?:
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
    | null
    | undefined;
};

export interface BaseTableProps {
  id: string;
  header: HeaderItem;
  body: IDaAs[];
  loading: boolean;
  onClick: (action: ActionOnClickActionsType, dass: Partial<IDaAs>) => void;
}
export interface ComponentsProps {
  none: JSX.Element;
  component: JSX.Element;
  function: JSX.Element;
  action: JSX.Element;
  icon: JSX.Element;
  user: JSX.Element;
  tooltip: JSX.Element;
}
export interface RowCardProps {
  row?: object;
  header?: HeaderItem;
  onClick?: (action: ActionOnClickActionsType, dass: Partial<IDaAs>) => void;
}
export interface TableCell {
  id?: string | number | null | undefined;
  row?: object;
  head?: HeaderItem;
  onClick?: (action: ActionOnClickActionsType, dass: Partial<IDaAs>) => void;
}
export interface TableRowProps {
  id?: string;
}
export type HeaderItemWithTooltip = {
  id: string;
  type: 'tooltip';
  // tooltip: string;
};

export type HeaderItemWithFunction = {
  id: string;
  type: 'function';
  function: () => React.ReactNode[] | React.ReactNode;
};

export type HeaderItemWithComponent = {
  id: string;
  type: 'component';
  component: () => React.ComponentType<any> | undefined;
};
export type HeaderItemWithAction = {
  id: string;
  type: 'action';
  action: ActionItem[];
};
export type HeaderItemWithIcon = {
  id: string;
  type: 'icon';
  color?: string | string[];
  icon: JSX.Element | any[];
};
export type HeaderItemWithNone = {
  type: 'none';
  id: string;
};
export type HeaderItemWithUser = {
  type: 'user';
  id: string[];
};
export interface ActionItem {
  action: string;
  icon: any;
  color: string;
  style: string;
}
