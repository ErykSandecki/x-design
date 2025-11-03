import { useDispatch } from 'react-redux';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseChangeEvent = {
  onChangeOpacity: TFunc<[string, boolean?]>;
};

export const useChangeEvent = (currentOpacity: TElement['opacity'], setOpacity: TFunc<[string]>): TUseChangeEvent => {
  const dispatch = useDispatch();

  const updateStore = (data: Partial<TElement>, isScrubbableInput: boolean): void => {
    if (isScrubbableInput) {
      dispatch(changeProperties(data));
    }
  };

  const handleChangeOpacity = (value: string, isScrubbableInput: boolean): void => {
    setOpacity(value);
    updateStore({ opacity: { ...currentOpacity, value: parseInt(value) } }, isScrubbableInput);
  };

  return {
    onChangeOpacity: handleChangeOpacity,
  };
};
