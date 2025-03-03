import { noop } from 'lodash';
import { useEffect } from 'react';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  isPressing: boolean,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    setIsPressing(false);

    if (isPressing) {
      noop();
    }
  };

  useEffect(() => {
    if (isPressing) {
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPressing]);
};
