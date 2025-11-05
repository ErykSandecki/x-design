import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

// utils
import { transformValueWithUnit } from 'utils';

export type TUseChangeEvent = {
  onChangeBorderRadius: TFunc<[string, boolean?]>;
  onChangeOpacity: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (
  currentBorderRadius: TElement['borderRadius'],
  currentOpacity: TElement['opacity'],
  setBorderRadius: TFunc<[string]>,
  setOpacity: TFunc<[string]>,
): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (data: Partial<TElement>, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(changeProperties(data));
    }
  };

  const handleChangeBorderRadius = (value: string, isScrubbableInput: boolean): void => {
    const targetValue = parseFloat(value);

    setBorderRadius(transformValueWithUnit(isScrubbableInput, currentBorderRadius.b.unit, value));
    updateStore(
      {
        borderRadius: {
          b: { ...currentBorderRadius.b, value: targetValue },
          l: { ...currentBorderRadius.l, value: targetValue },
          r: { ...currentBorderRadius.r, value: targetValue },
          t: { ...currentBorderRadius.t, value: targetValue },
        },
      },
      isScrubbableInput,
    );
  };

  const handleChangeOpacity = (value: string, isScrubbableInput: boolean): void => {
    setOpacity(value);
    updateStore({ opacity: { ...currentOpacity, value: parseInt(value) } }, isScrubbableInput);
  };

  return {
    onChangeBorderRadius: handleChangeBorderRadius,
    onChangeOpacity: handleChangeOpacity,
  };
};
