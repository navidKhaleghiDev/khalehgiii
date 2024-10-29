import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface DrawerContextProp {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface DrawerProviderProp {
  children: ReactNode;
}

const DrawerContext = createContext<DrawerContextProp | undefined>(undefined);

export function DrawerProvider({ children }: DrawerProviderProp) {
  const [isOpen, setIsOpen] = useState(false);
  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};
