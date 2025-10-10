import { createContext, useRef, useContext, FC, ReactNode, useMemo, useState } from 'react';

// types
import { TContext } from './types';

const TooltipContext: React.Context<TContext> = createContext(null);

export const useTooltip = (): TContext => useContext(TooltipContext);

export type TTooltipProvider = {
  children: ReactNode;
  timeoutEnter?: number;
  timeoutLeave?: number;
};

export const TooltipProvider: FC<TTooltipProvider> = ({ children, timeoutEnter = 1000, timeoutLeave = 500 }) => {
  const refTimeoutEnter = useRef(null);
  const refTimeoutLeave = useRef(null);
  const [active, setActive] = useState(false);

  const onMouseEnterHandler = (): void => {
    clearTimeout(refTimeoutLeave.current);

    refTimeoutEnter.current = setTimeout(() => {
      setActive(true);
    }, timeoutEnter);
  };

  const onMouseLeaveHandler = (): void => {
    clearTimeout(refTimeoutEnter.current);

    refTimeoutLeave.current = setTimeout(() => {
      setActive(false);
    }, timeoutLeave);
  };

  const value = useMemo(
    () =>
      ({
        active,
        onMouseEnter: onMouseEnterHandler,
        onMouseLeave: onMouseLeaveHandler,
      }) as TContext,
    [active],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
};
