import { GroupParams } from '@src/services/users/types';

export interface Detail {
  id: string | number;
  title: string;
  number: number;
}

export type DetailWithoutID = Omit<Detail, 'id'>;

export interface GroupCardProps {
  onClick: (item: GroupParams) => void;
  disabled?: boolean;
  className?: string;
  avatarClassName?: string;
  iconClassName?: string;
  groupData: GroupParams[];
  handleRemoveGroup: (id: string) => void;
}
