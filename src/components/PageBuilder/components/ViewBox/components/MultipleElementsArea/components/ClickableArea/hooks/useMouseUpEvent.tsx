import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// types
import { TElement } from 'types';

// utils
import { finishSetElementsCoordinates } from '../../../../../utils/finishSetElementsCoordinates';
import { handleTrySingleElement } from '../utils/handleTrySingleElement';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  isMoving: boolean,
  possibleElementToSelect: string,
  setIsMoving: (isMoving: boolean) => void,
  setIsPressing: (isPressing: boolean) => void,
  setPossibleElementToSelect: (possibleElementToSelect: TElement['id']) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    setIsPressing(false);
    finishSetElementsCoordinates(dispatch);
    setIsMoving(false);
    setPossibleElementToSelect('-1');
    handleTrySingleElement(dispatch, isMoving, possibleElementToSelect);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMoving, possibleElementToSelect, setIsPressing]);
};
