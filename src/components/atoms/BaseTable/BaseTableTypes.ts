export interface HeaderItem {
  style: string;
  dir: string;
  label: string;
  type: string;
}

export interface BodyItem {
  item: { [key: string]: any };
  index: number;
}

export interface BaseTableProps {
  header: HeaderItem[];
  body: BodyItem[];
  loading: boolean;
  onClick: () => void;
}
export interface ComponentsProps {
  none: JSX.Element;
  component: JSX.Element;
  status: JSX.Element;
  function: any;
  icon: any;
}
