import { createContext, useContext, FC, ReactNode, useMemo } from 'react';

// types
import { TContext } from './types';

const PopoverRootContent: React.Context<TContext> = createContext(null);

export const usePopoverRoot = (): TContext => useContext(PopoverRootContent);

export type TPopoverRootProvider = {
  children: ReactNode;
  setSelected: TContext['setSelected'];
};

export const PopoverRootProvider: FC<TPopoverRootProvider> = ({
  children,
  setSelected,
}) => {
  const value = useMemo(
    () =>
      ({
        setSelected,
      }) as TContext,
    [],
  );

  return (
    <PopoverRootContent.Provider value={value}>
      {children}
    </PopoverRootContent.Provider>
  );
};
