import { MouseEvent, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// selectors
import { areParentsTheSameSelector } from 'store/pageBuilder/selectors';

// types
import { MouseButton, TElement } from 'types';

// utils
import { initSetElementsCoordinates } from '../utils/initSetElementsCoordinates';
import { initStatesOnMouseDown } from '../utils/initStatesOnMouseDown';

export type TUseMouseDownEvent = TFunc<[MouseEvent, TElement['id']]>;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  setIsPressing: TFunc<[boolean]>,
  setPossibleElementToSelect: TFunc<[TElement['id']]>,
): TUseMouseDownEvent => {
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent, id: TElement['id']): void => {
    if (event.buttons === MouseButton.lmb && areParentsTheSame) {
      event.stopPropagation();
      initSetElementsCoordinates(cursorPosition, dispatch, event, true);
      initStatesOnMouseDown(dispatch, event, id, setIsPressing, setPossibleElementToSelect);
    }
  };

  return handleMouseDown;
};
