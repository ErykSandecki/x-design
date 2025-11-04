import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

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

  const updateStore = (insetsPartial: Partial<TInsets>, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(
        changeProperties({
          [insetsName]: {
            ...insets,
            ...insetsPartial,
          },
        }),
      );
    }
  };

  const handleChangeInset = (value: string, inset: keyof TInsets, isScrubbableInput: boolean): void => {
    setInsetAll({ ...insetAll, [inset]: value });
    updateStore({ [inset]: { ...insets[inset], value: parseInt(value) } }, isScrubbableInput);
  };

  const handleChangeInsetLR = (value: string, isScrubbableInput: boolean): void => {
    const targetValue = getScrubbableInputValue(insetLR, insets.l.value, insets, isScrubbableInput, ['l', 'r'], value);

    setInsetLR(targetValue.valueInput);
    updateStore(targetValue.valueStore, isScrubbableInput);
  };

  const handleChangeInsetTB = (value: string, isScrubbableInput: boolean): void => {
    const targetValue = getScrubbableInputValue(insetTB, insets.t.value, insets, isScrubbableInput, ['t', 'b'], value);

    setInsetTB(targetValue.valueInput);
    updateStore(targetValue.valueStore, isScrubbableInput);
  };

  return {
    onChangeInset: handleChangeInset,
    onChangeInsetLR: handleChangeInsetLR,
    onChangeInsetTB: handleChangeInsetTB,
  };
};
