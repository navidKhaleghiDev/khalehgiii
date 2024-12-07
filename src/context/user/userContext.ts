import { UserParams } from '@src/services/users/types';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface UserContextParams {
  user: UserParams | null;
  setUser: Dispatch<SetStateAction<UserParams | null>>;
}

export const UserContext = createContext<UserContextParams>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
