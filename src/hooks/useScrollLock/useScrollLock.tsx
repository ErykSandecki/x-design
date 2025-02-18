import { useContext, useEffect } from 'react';

// core
import { Context, TContext } from 'core';

export type TUseScrollLock = Pick<TContext, 'scrollLock' | 'setScrollLock'>;

export const useScrollLock = (): TUseScrollLock => {
  const { scrollLock, setScrollLock } = useContext(Context);

  useEffect(() => {
    if (scrollLock) {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    return () => {
      document.getElementsByTagName('html')[0].style.overflow = 'initial';
    };
  }, [scrollLock]);

  return {
    scrollLock,
    setScrollLock,
  };
};
