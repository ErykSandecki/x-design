import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TInsets, TInsetsName } from 'types';

// utils
import { extractInsetValue } from '../utils/extractInsetValue';
import { getInsetValue } from '../utils/getInsetValue';

export type TUseBlurEvents = {
  onBlurInset: TFunc<[keyof TInsets]>;
  onBlurInsetLR: TFunc;
  onBlurInsetTB: TFunc;
};

export const useBlurEvents = (
  insets: TInsets,
  insetAll: TMapValuesTo<TInsets, string>,
  insetLR: string,
  insetTB: string,
  insetsName: TInsetsName,
  setInsetAll: TFunc<[TMapValuesTo<TInsets, string>]>,
  setInsetLR: TFunc<[string]>,
  setInsetTB: TFunc<[string]>,
): TUseBlurEvents => {
  const dispatch = useDispatch();

  const handleBlurInset = (inset: keyof TInsets): void => {
    if (insetAll[inset] === '') {
      setInsetAll({ ...insetAll, [inset]: insets[inset].value.toString() });
    } else {
      dispatch(
        changeProperties({
          [insetsName]: {
            ...insets,
            [inset]: { ...insets[inset], value: parseInt(insetAll[inset]) },
          },
        }),
      );
    }
  };

  const handleBlurInsetLR = (): void => {
    if (insetLR === '') {
      setInsetLR(getInsetValue(insets, ['l', 'r']));
    } else {
      const data = extractInsetValue(insets, ['l', 'r'], insetLR);

      setInsetLR(data.value);
      dispatch(
        changeProperties({
          [insetsName]: {
            ...insets,
            ...data.insets,
          },
        }),
      );
    }
  };

  const handleBlurInsetTB = (): void => {
    if (insetTB === '') {
      setInsetTB(getInsetValue(insets, ['t', 'b']));
    } else {
      const data = extractInsetValue(insets, ['t', 'b'], insetTB);

      setInsetTB(data.value);
      dispatch(
        changeProperties({
          [insetsName]: {
            ...insets,
            ...data.insets,
          },
        }),
      );
    }
  };

  return {
    onBlurInset: handleBlurInset,
    onBlurInsetLR: handleBlurInsetLR,
    onBlurInsetTB: handleBlurInsetTB,
  };
};
