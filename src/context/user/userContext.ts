import { IUser } from "@src/services/users/types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

// export interface IUserWithAuth extends IUser {
//   access_token: string;
//   refresh_token: string;
//   is_authenticated: boolean;
//   force_change: boolean;
// }
export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
