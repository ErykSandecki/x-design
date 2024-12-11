import { useContext, useEffect } from 'react';

// core
import { Context } from 'core/ContextProvider/ContextProvider';

// types
import { TContext } from 'core/ContextProvider/types';

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
