import { useDispatch } from 'react-redux';

// store
import { rotateElement } from 'store/pageBuilder/actions';

// utils
import { canChangeValue } from '../../../utils/canChangeValue';

export type TUseChangeEvent = (
  value: string,
  isScrubbableInput?: boolean,
) => void;

export const useChangeEvent = (
  isMixed: boolean,
  isMultiple: boolean,
  setAngle: (angle: string) => void,
): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (angle: number, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(rotateElement('1', angle));
    }
  };

  const handleChange = (value: string, isScrubbableInput: boolean): void => {
    if (canChangeValue(isMixed, isMultiple, isScrubbableInput)) {
      setAngle(value);
    }

    updateStore(parseFloat(value), isScrubbableInput);
  };

  return handleChange;
};
