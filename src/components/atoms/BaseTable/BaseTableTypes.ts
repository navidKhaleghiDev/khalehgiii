export interface HeaderItem {
  id: string;
  style?: string;
  dir?: string;
  label: string;
  icon?: string;
  type?: string;
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
  function?: () => [];
  component?: React.Component;
}

export interface BodyItem {
  item: { [key: string]: string };
  index: number;
}

export interface BaseTableProps {
  id: string;
  header: HeaderItem[];
  body: BodyItem[];
  loading: boolean;
  onClick: () => void;
}
export interface ComponentsProps {
  none: JSX.Element;
  component: JSX.Element;
  function: JSX.Element;
  action: JSX.Element;
  icon: JSX.Element;
}
export interface RowCardProps {
  row: object;
  header: HeaderItem;
  onClick: () => void;
}
export interface TableCell {
  id?: string;
  row?: object;
  head?: HeaderItem;
  onClick?: (action: string, row: object) => unknown;
}
export interface TableRowProps {
  id?: string;
}
