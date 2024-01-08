import { IUser } from '@src/services/users/types';
import { StringifyProperties } from '@src/types/global';

export type ActionOnClickActionsType = 'delete' | 'edit' | 'details' | 'mutate';
export type OnClickActionsType = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<IUser> | IUser
) => void;
