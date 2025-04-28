import { useDispatch } from 'react-redux';

// store
import {
  setElementCoordinates,
  setElementsCoordinates,
} from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { canChangeValue } from '../utils/canChangeValue';

export type TUseChangeEvent = {
  onChangeX: (value: string, isScrubbableInput?: boolean) => void;
  onChangeY: (value: string, isScrubbableInput?: boolean) => void;
};

export const useChangeEvent = (
  element: TElement,
  isMultiple: boolean,
  isMixedX: boolean,
  isMixedY: boolean,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseChangeEvent => {
  const dispatch = useDispatch();
  const { id } = element;

  const updateStore = (
    x: number,
    y: number,
    isScrubbableInput: boolean,
  ): void => {
    if (isScrubbableInput) {
      if (isMultiple) {
        dispatch(setElementsCoordinates({ x, y }, 'dynamic'));
      } else {
        dispatch(setElementCoordinates({ x, y }, id));
      }
    }
  };

  const handleChangeX = (value: string, isScrubbableInput: boolean): void => {
    if (canChangeValue(isMixedX, isMultiple, isScrubbableInput)) {
      setX(value);
    }

    updateStore(parseFloat(value), NaN, isScrubbableInput);
  };
  const handleChangeY = (value: string, isScrubbableInput: boolean): void => {
    if (canChangeValue(isMixedY, isMultiple, isScrubbableInput)) {
      setY(value);
    }

    updateStore(NaN, parseFloat(value), isScrubbableInput);
  };

  return {
    onChangeX: handleChangeX,
    onChangeY: handleChangeY,
  };
};
