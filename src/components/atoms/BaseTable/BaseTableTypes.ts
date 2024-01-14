export interface HeaderItem {
  id: string;
  style?: string;
  dir?: string;
  label: string;
  type?: string;
  function?: () => void;
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
