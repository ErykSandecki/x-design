import { useEffect } from 'react';

export type TUseHandleInitial = void;

export const useHandleInitial = (): TUseHandleInitial => {
  useEffect(() => {
    document.body.style.pointerEvents = 'none';

    return (): void => {
      document.body.style.pointerEvents = 'all';
    };
  }, []);
};
