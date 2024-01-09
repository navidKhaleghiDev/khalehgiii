import { IUser } from '@src/services/users/types';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
