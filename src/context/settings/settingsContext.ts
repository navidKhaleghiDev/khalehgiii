import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface ISetting {
  mode: 'light' | 'dark';
  direction: 'rtl' | 'ltr';
}

export interface ISettingContext {
  setting: ISetting;
  setSetting: Dispatch<SetStateAction<ISetting>>;
}

export const defaultSettingState: ISetting = {
  mode: localStorage.getItem('darkMode') ? 'dark' : 'light',
  direction: localStorage.getItem('rtl') ? 'rtl' : 'ltr',
};

export const SettingContext = createContext<ISettingContext>({
  setting: defaultSettingState,
  setSetting: () => {},
});

export const useSettingContext = () => useContext(SettingContext);
