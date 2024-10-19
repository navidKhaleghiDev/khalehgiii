import { Dispatch, ReactElement, SetStateAction } from 'react';
import { IconifyIcon } from '@iconify/react';
import { VariantProps } from 'class-variance-authority';
import { BaseButtonStyleProps } from '@redesignUi/atoms/BaseButton';

import { headerStyles } from './styles';

type ModalButtonType = {
  label: string;
  onClick: () => void;
  color?: BaseButtonStyleProps['type'];
  loading?: boolean;
  size?: BaseButtonStyleProps['size'];
};

interface BaseModalProps extends VariantProps<typeof headerStyles> {
  title?: string;
  classContainer?: string;
  description?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  size?: 'sm' | 'md' | 'responsive';
  className?: string;
  buttonOne?: ModalButtonType;
  buttonTow?: ModalButtonType;
}

interface ModalWithContent extends BaseModalProps {
  type: 'content';
  content: ReactElement;
}

interface ModalWithoutContent extends BaseModalProps {
  type: 'error' | 'success' | 'info' | 'noneIcon';
  content?: never;
}

export type ModalProps = ModalWithContent | ModalWithoutContent;

export interface IconHeader {
  icon: IconifyIcon;
  color: string;
}
