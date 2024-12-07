import { DaAsParams } from '@src/services/users/types';

export type ActionOnClickActionsType = 'delete' | 'edit' | 'details' | 'mutate';
export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  daas?: Partial<DaAsParams> | string
) => void;
