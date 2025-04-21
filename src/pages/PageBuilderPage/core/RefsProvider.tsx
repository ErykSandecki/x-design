import { createContext, useRef, useContext, FC, ReactNode } from 'react';

// types
import { TContext } from './types';

const RefsContext: React.Context<TContext> = createContext(null);

export const useRefs = () => useContext(RefsContext);

export type TRefsProvider = {
  children: ReactNode;
};

export const RefsProvider: FC<TRefsProvider> = ({ children }) => {
  const overlayContainerRef = useRef(null);
  const itemRefs = useRef({});

  return (
    <RefsContext.Provider
      value={{
        itemsRefs: itemRefs.current,
        overlayContainerRef: overlayContainerRef,
      }}
    >
      {children}
    </RefsContext.Provider>
  );
};
