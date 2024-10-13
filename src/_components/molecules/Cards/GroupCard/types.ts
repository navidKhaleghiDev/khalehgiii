export interface Detail {
  id: string | number;
  title: string;
  number: number;
}

export type DetailWithoutID = Omit<Detail, 'id'>;

export interface GroupCardProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  avatarClassName?: string;
  iconClassName?: string;
  details: Detail[];
}
