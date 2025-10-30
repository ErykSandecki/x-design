import { useDispatch } from 'react-redux';

// store
import { changeInsets } from 'store/pageBuilder/actions';

// types
import { TInsets, TInsetsName } from 'types';

// utils
import { getScrubbableInputValue } from '../utils/getScrubbableInputValue';

export type TUseChangeEvents = {
  onChangeInset: TFunc<[string, keyof TInsets, boolean?]>;
  onChangeInsetLR: TFunc<[string, boolean?]>;
  onChangeInsetTB: TFunc<[string, boolean?]>;
};

export const useChangeEvents = (
  insetAll: TMapValuesTo<TInsets, string>,
  insetLR: string,
  insets: TInsets,
  insetTB: string,
  insetsName: TInsetsName,
  setInsetAll: TFunc<[TMapValuesTo<TInsets, string>]>,
  setInsetLR: TFunc<[string]>,
  setInsetTB: TFunc<[string]>,
): TUseChangeEvents => {
  const dispatch = useDispatch();

  const updateStore = (isScrubbableInput: boolean, value: Partial<TInsets>): void => {
    if (isScrubbableInput) {
      dispatch(changeInsets(value, insetsName));
    }
  };

  const handleChangeInset = (value: string, inset: keyof TInsets, isScrubbableInput: boolean): void => {
    setInsetAll({ ...insetAll, [inset]: value });
    updateStore(isScrubbableInput, { [inset]: parseInt(value) });
  };

  const handleChangeInsetLR = (value: string, isScrubbableInput: boolean): void => {
    const targetValue = getScrubbableInputValue(insetLR, insets.l, isScrubbableInput, ['l', 'r'], value);

    setInsetLR(targetValue.valueInput);
    updateStore(isScrubbableInput, targetValue.valueStore);
  };

  const handleChangeInsetTB = (value: string, isScrubbableInput: boolean): void => {
    const targetValue = getScrubbableInputValue(insetTB, insets.t, isScrubbableInput, ['t', 'b'], value);

    setInsetTB(targetValue.valueInput);
    updateStore(isScrubbableInput, targetValue.valueStore);
  };

  return {
    onChangeInset: handleChangeInset,
    onChangeInsetLR: handleChangeInsetLR,
    onChangeInsetTB: handleChangeInsetTB,
  };
};
