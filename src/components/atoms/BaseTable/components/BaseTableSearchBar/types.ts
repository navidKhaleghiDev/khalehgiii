export type TComponentType = 'actionAdd' | 'actionRefresh' | 'typography';

export interface ITableSearchButton {
  type?: TComponentType;
  label?: string;
  onClick?: () => void;
}

export type TSearchBar = {
  name: string;
  value: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  componentProps: {
    type?: TComponentType;
    label?: string;
    onClick?: () => void;
  };
};

export type TComponent = {
  actionAdd: JSX.Element;
  actionRefresh: JSX.Element;
  typography: JSX.Element;
};
