import { createContext, useContext, FC, ReactNode, useMemo } from 'react';

// types
import { TContext } from './types';

const PopoverRootContent: React.Context<TContext> = createContext(null);

export const usePopoverRoot = (): TContext => useContext(PopoverRootContent);

export type TPopoverRootProvider = {
  children: ReactNode;
  selected: boolean;
  setSelected: TContext['setSelected'];
};

export const PopoverRootProvider: FC<TPopoverRootProvider> = ({ children, selected, setSelected }) => {
  const value = useMemo(
    () =>
      ({
        selected,
        setSelected,
      }) as TContext,
    [selected],
  );

  return <PopoverRootContent.Provider value={value}>{children}</PopoverRootContent.Provider>;
};
