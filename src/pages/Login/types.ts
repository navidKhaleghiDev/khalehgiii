import { FieldValues } from 'react-hook-form';

export interface ILoginFieldValues extends FieldValues {
  email: string;
  password: string;
  // is_admin: boolean;
}
