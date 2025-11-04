import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseChangeEvent = {
  onChangeBorderRadius: TFunc<[string, boolean?]>;
  onChangeOpacity: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (
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

    setBorderRadius(value);
    updateStore(
      {
        borderRadius: {
          b: { mode: 'fixed', value: targetValue },
          l: { mode: 'fixed', value: targetValue },
          r: { mode: 'fixed', value: targetValue },
          t: { mode: 'fixed', value: targetValue },
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
