import { PropsWithChildren } from 'react';

import { DaAsParams } from '@src/services/users/types';
import { ActionOnClickActionsType } from '@ui/molecules/BaseTable/types';

export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  daas?: Partial<DaAsParams> | string
) => void;

export interface UserAccessModalCardProps extends PropsWithChildren {
  className?: string;
}
