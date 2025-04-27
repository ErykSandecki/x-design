import { useDispatch } from 'react-redux';

// store
import {
  setElementCoordinates,
  setElementsCoordinates,
} from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseOnChangeEvent = {
  onChangeX: (value: string, isScrubbableInput?: boolean) => void;
  onChangeY: (value: string, isScrubbableInput?: boolean) => void;
};

export const useOnChangeEvent = (
  element: TElement,
  isMultiple: boolean,
  isMixedX: boolean,
  isMixedY: boolean,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseOnChangeEvent => {
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

  const canChange = (isMixed: boolean, isScrubbableInput: boolean): boolean => {
    if (isMixed || isMultiple) {
      return !isScrubbableInput;
    }

    return true;
  };

  const handleChangeX = (value: string, isScrubbableInput: boolean): void => {
    if (canChange(isMixedX, isScrubbableInput)) {
      setX(value);
    }

    updateStore(
      parseFloat(value),
      isMultiple ? NaN : parseFloat(y),
      isScrubbableInput,
    );
  };
  const handleChangeY = (value: string, isScrubbableInput: boolean): void => {
    if (canChange(isMixedY, isScrubbableInput)) {
      setY(value);
    }

    updateStore(
      isMultiple ? NaN : parseFloat(x),
      parseFloat(value),
      isScrubbableInput,
    );
  };

  return {
    onChangeX: handleChangeX,
    onChangeY: handleChangeY,
  };
};
