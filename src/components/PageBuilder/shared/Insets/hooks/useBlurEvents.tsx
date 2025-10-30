import { useDispatch } from 'react-redux';

// store
import { changeInsets } from 'store/pageBuilder/actions';

// types
import { TElement, TInsets, TInsetsName } from 'types';

// utils
import { extractInsetValue } from '../utils/extractInsetValue';
import { getInsetValue } from '../utils/getInsetValue';

export type TUseBlurEvents = {
  onBlurInset: TFunc<[keyof TInsets]>;
  onBlurInsetLR: TFunc;
  onBlurInsetTB: TFunc;
};

export const useBlurEvents = (
  element: TElement,
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
      setInsetAll({ ...insetAll, [inset]: element[insetsName][inset].toString() });
    } else {
      dispatch(changeInsets({ [inset]: parseInt(insetAll[inset]) }, insetsName));
    }
  };

  const handleBlurInsetLR = (): void => {
    if (insetLR === '') {
      setInsetLR(getInsetValue(element[insetsName], ['l', 'r']));
    } else {
      const { insets, value } = extractInsetValue(['l', 'r'], insetLR);

      setInsetLR(value);
      dispatch(changeInsets(insets, insetsName));
    }
  };

  const handleBlurInsetTB = (): void => {
    if (insetTB === '') {
      setInsetTB(getInsetValue(element[insetsName], ['t', 'b']));
    } else {
      const { insets, value } = extractInsetValue(['t', 'b'], insetTB);

      setInsetTB(value);
      dispatch(changeInsets(insets, insetsName));
    }
  };

  return {
    onBlurInset: handleBlurInset,
    onBlurInsetLR: handleBlurInsetLR,
    onBlurInsetTB: handleBlurInsetTB,
  };
};
