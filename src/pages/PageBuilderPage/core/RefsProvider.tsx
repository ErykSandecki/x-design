import { createContext, useRef, useContext, FC, ReactNode, useMemo } from 'react';

// types
import { TContext } from './types';

const RefsContext: React.Context<TContext> = createContext(null);

export const useRefs = (): TContext => useContext(RefsContext);

export type TRefsProvider = {
  children: ReactNode;
  itemsRefs?: TContext['itemsRefs'];
  overlayContainerRefHtml?: HTMLDivElement;
  zoomBoxRefHtml?: HTMLDivElement;
  zoomContentRefHtml?: HTMLDivElement;
};

export const RefsProvider: FC<TRefsProvider> = ({
  children,
  itemsRefs: itemRefsDefault = {},
  overlayContainerRefHtml = null,
  zoomBoxRefHtml = null,
  zoomContentRefHtml = null,
}) => {
  const itemRefs = useRef(itemRefsDefault);
  const overlayContainerRef = useRef(overlayContainerRefHtml);
  const zoomBoxRef = useRef(zoomBoxRefHtml);
  const zoomContentRef = useRef(zoomContentRefHtml);
  const value = useMemo(
    () =>
      ({
        itemsRefs: itemRefs.current,
        overlayContainerRef: overlayContainerRef,
        zoomBoxRef: zoomBoxRef,
        zoomContentRef: zoomContentRef,
      }) as TContext,
    [],
  );

  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};
