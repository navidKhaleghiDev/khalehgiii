import { TGroup } from '@src/services/users/types';

export interface Detail {
  id: string | number;
  title: string;
  number: number;
}

export type DetailWithoutID = Omit<Detail, 'id'>;

export interface GroupCardProps {
  onClick: (item: TGroup) => void;
  disabled?: boolean;
  className?: string;
  avatarClassName?: string;
  iconClassName?: string;
  groupData: TGroup[];
  handleRemoveGroup: (id: string) => void;
}
