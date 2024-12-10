import { Control } from 'react-hook-form';

import { UserParams } from '@src/services/users/types';

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
  setOtp: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  otp?: boolean;
  secret?: string;
  isMetaAdmin?: string | boolean | undefined;
}
