import { IDaasConfig } from '@src/services/config/types';
import { StringifyProperties } from '@src/types/global';

export type ActionOnClickActionsType =
  | 'delete'
  | 'edit'
  | 'details'
  | 'mutate'
  | 'editLock';
export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  daasConfig?: StringifyProperties<IDaasConfig> | IDaasConfig
) => void;
