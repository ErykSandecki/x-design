import { useLayoutEffect } from 'react';

export type TUseApplyCssStyles = void;

export const useApplyCssStyles = (): TUseApplyCssStyles => {
  useLayoutEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';

    return (): void => {
      document.documentElement.style.overscrollBehavior = 'initial';
    };
  }, []);
};
