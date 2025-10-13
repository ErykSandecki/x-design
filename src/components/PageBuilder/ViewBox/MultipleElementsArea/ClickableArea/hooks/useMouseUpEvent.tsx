import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// store
import { changeParent } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
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
    dispatch(changeParent());
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
