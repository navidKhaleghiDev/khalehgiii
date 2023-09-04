import {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
} from 'react';
import { VariantProps } from 'class-variance-authority';
import { BaseButtonStyleProps } from '@ui/atoms/BaseButton';

import { headerStyles } from './styles';

type ModalButtonType = {
  label: string;
  onClick: () => void;
  color?: BaseButtonStyleProps['type'];
  loading?: boolean;
};
export interface IModal
  extends VariantProps<typeof headerStyles>,
    PropsWithChildren {
  title?: string;
  classContainer?: string;
  description?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  buttonOne?: ModalButtonType;
  buttonTow?: ModalButtonType;
  content?: ReactElement;
}
