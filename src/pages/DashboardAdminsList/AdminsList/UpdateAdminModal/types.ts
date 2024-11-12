import { IUser } from '@src/services/users/types';
import { Control } from 'react-hook-form';

export interface UserProps extends Omit<IUser, 'is_meta_admin'> {
  is_meta_admin?: string | boolean;
}
export type UpdateAdminModalProps = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<IUser>;
};

export interface UserInfoTabProps {
  control: Control<UserProps>;
  dir: 'ltr' | 'rtl';
  admin?: Partial<IUser>;
  setSecret: React.Dispatch<React.SetStateAction<string | undefined>>;
  secret?: string;
  isMetaAdmin?: string | boolean | undefined;
}
