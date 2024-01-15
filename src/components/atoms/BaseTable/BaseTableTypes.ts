import { ActionOnClickActionsType } from '@src/pages/Dashboard/DlpConfig/FileTypeCard/types';
import { IDaAs } from '@src/services/users/types';
import React, { ReactNode, ComponentType } from 'react';

export interface ActionItem {
  action: string;
  icon: any;
  color: string;
  style: string;
}
export interface HeaderItem {
  id: string | number | null | undefined;
  label: string;
  style?: string;
  dir?: string;
  icon?: any;
  type?: 'action' | 'none' | 'component' | 'function' | 'icon' | 'user';
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
  function?: () => ReactNode[] | ReactNode;
  component?: ComponentType<any> | undefined;
  action?: ActionItem[];
  color?: string | string[];
}

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
}
export interface RowCardProps {
  row?: object;
  header?: HeaderItem;
  onClick?: (action: ActionOnClickActionsType, dass: Partial<IDaAs>) => void;
}
export interface TableCell {
  id?: string;
  row?: object;
  head?: HeaderItem;
  onClick: (action: ActionOnClickActionsType, dass: Partial<IDaAs>) => void;
}
export interface TableRowProps {
  id?: string;
}
