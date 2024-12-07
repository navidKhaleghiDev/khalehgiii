import { UserParams } from '@src/services/users/types';
import { Control } from 'react-hook-form';

export interface UserProps extends Omit<UserParams, 'is_meta_admin'> {
  is_meta_admin?: string | boolean;
}
export type UpdateAdminModalProps = {
  handleClose: (isUpdated?: boolean) => void;
  admin?: Partial<UserParams>;
};

export interface UserInfoTabProps {
  control: Control<UserProps>;
  dir: 'ltr' | 'rtl';
  admin?: Partial<UserParams>;
  setSecret: React.Dispatch<React.SetStateAction<string | undefined>>;
  secret?: string;
  isMetaAdmin?: string | boolean | undefined;
}
