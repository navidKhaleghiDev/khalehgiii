import { PropsWithChildren } from 'react';

import { IDaAs } from '@src/services/users/types';
import { ActionOnClickActionsType } from '@ui/atoms/BaseTable/types';

export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  daas?: Partial<IDaAs> | string
) => void;

export interface UserAccessModalCardProps extends PropsWithChildren {
  className?: string;
}
