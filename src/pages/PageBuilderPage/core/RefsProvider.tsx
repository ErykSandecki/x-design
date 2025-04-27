import {
  createContext,
  useRef,
  useContext,
  FC,
  ReactNode,
  useMemo,
} from 'react';

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
  const value = useMemo(
    () => ({
      itemsRefs: itemRefs.current,
      overlayContainerRef: overlayContainerRef,
    }),
    [],
  );

  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};
