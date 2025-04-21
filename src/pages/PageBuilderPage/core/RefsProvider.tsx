import { createContext, useRef, useContext, FC, ReactNode } from 'react';

// types
import { TContext } from './types';

const RefsContext: React.Context<TContext> = createContext(null);

export const useRefs = () => useContext(RefsContext);

export type TRefsProvider = {
  children: ReactNode;
  itemsRefs?: TContext['itemsRefs'];
  overlayContainerRefHtml?: HTMLDivElement;
};

export const RefsProvider: FC<TRefsProvider> = ({
  children,
  itemsRefs: itemRefsDefault = {},
  overlayContainerRefHtml = null,
}) => {
  const itemRefs = useRef(itemRefsDefault);
  const overlayContainerRef = useRef(overlayContainerRefHtml);

  return (
    <RefsContext.Provider
      value={{
        itemsRefs: itemRefs.current,
        overlayContainerRef,
      }}
    >
      {children}
    </RefsContext.Provider>
  );
};
