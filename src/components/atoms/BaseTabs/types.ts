import { PropsWithChildren } from 'react';

export interface IBaseTabProps extends PropsWithChildren {
  label: string;
  content?: React.ReactNode;
  className?: string;
}

export interface IBaseTabsProps extends PropsWithChildren {
  label?: string;
  className?: string;
}
