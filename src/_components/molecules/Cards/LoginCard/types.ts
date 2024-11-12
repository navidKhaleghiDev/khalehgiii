import { IconType } from '@src/types/global';

export interface LoginCardProps {
  icon: IconType;
  title: string;
  subject: string;
  onClick?: () => void;
  disabled?: boolean;
}
