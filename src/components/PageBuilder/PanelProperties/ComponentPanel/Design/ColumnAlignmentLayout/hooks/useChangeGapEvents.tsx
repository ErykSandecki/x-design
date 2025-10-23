import { useDispatch } from 'react-redux';

// store
import { setElementsGap } from 'store/pageBuilder/actions';

// types
import { TGap } from 'types';

export type TUseChangeGapEvents = {
  onChangeColumnGap: TFunc<[string, boolean?]>;
  onChangeRowGap: TFunc<[string, boolean?]>;
};

export const useChangeGapEvents = (setColumnGap: TFunc<[string]>, setRowGap: TFunc<[string]>): TUseChangeGapEvents => {
  const dispatch = useDispatch();

  const updateStore = (gap: keyof TGap, isScrubbableInput: boolean, value: string): void => {
    if (isScrubbableInput) {
      dispatch(setElementsGap(gap, parseFloat(value)));
    }
  };

  const handleChangeColumnGap = (value: string, isScrubbableInput: boolean): void => {
    setColumnGap(value);
    updateStore('column', isScrubbableInput, value);
  };

  const handleChangeRowGap = (value: string, isScrubbableInput: boolean): void => {
    setRowGap(value);
    updateStore('row', isScrubbableInput, value);
  };

  return {
    onChangeColumnGap: handleChangeColumnGap,
    onChangeRowGap: handleChangeRowGap,
  };
};
