import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// utils
import { finishSetElementsCoordinates } from '../../../utils/finishSetElementsCoordinates';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    setIsPressing(false);
    finishSetElementsCoordinates(dispatch);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setIsPressing]);
};
