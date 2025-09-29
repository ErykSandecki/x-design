import { useDispatch } from 'react-redux';

// store
import { rotateElements } from 'store/pageBuilder/actions';

export type TUseChangeEvent = TFunc<[string, boolean?]>;

export const useChangeEvent = (setAngle: (angle: string) => void): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (angle: number, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(rotateElements(angle));
    }
  };

  const handleChange = (value: string, isScrubbableInput: boolean): void => {
    setAngle(value);
    updateStore(parseFloat(value), isScrubbableInput);
  };

  return handleChange;
};
