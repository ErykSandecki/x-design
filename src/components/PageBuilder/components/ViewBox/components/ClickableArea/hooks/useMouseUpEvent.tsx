import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// store
import { selectElements } from 'store/pageBuilder/actions';

// types
import { ElementType, TElement } from 'types';

// utils
import { finishSetElementsCoordinates } from '../../../utils/finishSetElementsCoordinates';

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

    if (!isMoving && possibleElementToSelect !== '-1') {
      dispatch(
        selectElements([
          {
            id: possibleElementToSelect,
            parentId: '-1',
            type: ElementType.frame,
          },
        ]),
      );
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMoving, possibleElementToSelect, setIsPressing]);
};
