import { IMimeType } from '@src/services/analyze/types';
import { StringifyProperties } from '@src/types/global';

export type ActionOnClickActionsType = 'delete' | 'edit' | 'details' | 'mutate';
export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<IMimeType> | IMimeType
) => void;
