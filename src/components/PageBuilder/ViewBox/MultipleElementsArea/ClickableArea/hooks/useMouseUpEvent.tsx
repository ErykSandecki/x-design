import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// types
import { TElement } from 'types';

// utils
import { finishSetElementsCoordinates } from '../../../utils/finishSetElementsCoordinates';
import { handleTrySingleElement } from '../utils/handleTrySingleElement';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  isMoving: boolean,
  possibleElementToSelect: string,
  setIsMoving: TFunc<[boolean]>,
  setIsPressing: TFunc<[boolean]>,
  setPossibleElementToSelect: TFunc<[TElement['id']]>,
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
