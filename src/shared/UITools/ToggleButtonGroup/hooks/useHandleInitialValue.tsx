import { useEffect } from 'react';

// types
import { TToggleButtonGroupValue } from '../types';

// utils
import { getInitialValue } from '../utils/getInitialValue';

export type TUseHandleInitial = void;

export const useHandleInitialValue = <V extends TToggleButtonGroupValue>(
  defaultValue: V,
  multiple: boolean,
  setValue: TFunc<[V]>,
): TUseHandleInitial => {
  useEffect(() => {
    setValue(getInitialValue(multiple, defaultValue));
  }, [defaultValue]);
};
