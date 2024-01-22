import { IconType } from '@src/types/global';
import { IIconButton } from '@ui/atoms/BaseButton/types';

export type TComponentType = 'component' | 'typography';
export interface ITableSearchButton {
  componentProps: {
    handleClickButton?: () => void;
    icon: IconType;
    label: string;
    size: IIconButton['size'];
    color: IIconButton['color'];
  };
}
export interface ITableSearchBar {
  componentProps: any;
}
export type TComponent = {
  component: JSX.Element;
  typography: JSX.Element;
};
// type: TComponentType;

export interface IComponentPropsType {
  type: TComponentType;
  component?: JSX.Element;
}
