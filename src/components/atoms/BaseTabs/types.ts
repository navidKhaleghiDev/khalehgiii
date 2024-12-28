import { PropsWithChildren } from 'react';

export interface BaseTabProps extends PropsWithChildren {
  label: string;
  content?: React.ReactNode;
  className?: string;
}

export interface BaseTabsProps extends PropsWithChildren {
  label?: string;
  className?: string;
}
