import { useDispatch } from 'react-redux';

// store
import { setElementsCoordinates } from 'store/pageBuilder/actions';

// utils
import { canChangeValue } from '../utils/canChangeValue';

export type TUseChangeEvent = {
  onChangeX: TFunc<[string, boolean?]>;
  onChangeY: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (
  isMultiple: boolean,
  isMixedX: boolean,
  isMixedY: boolean,
  setX: (value: string) => void,
  setY: (value: string) => void,
): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (x: number, y: number, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(setElementsCoordinates({ x, y }, 'static'));
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
