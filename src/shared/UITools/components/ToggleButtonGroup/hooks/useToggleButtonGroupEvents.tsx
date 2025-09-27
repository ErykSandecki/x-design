import { useState } from 'react';

// hooks
import { useHandleInitialValue } from './useHandleInitialValue';

// types
import { TToggleButtonGroupValue } from '../types';
import { TUseChangeEvents, useChangeEvents } from './useChangeEvents';

// utils
import { getInitialValue } from '../utils/getInitialValue';

export type TUseToggleButtonGroupEvents<V> = {
  onChange: TUseChangeEvents;
  value: V;
};

export const useToggleButtonGroupEvents = <V extends TToggleButtonGroupValue>(
  alwaysSelected: boolean,
  defaultValue: V,
  multiple: boolean,
  onChange: TFunc<[V]> | null,
): TUseToggleButtonGroupEvents<V> => {
  const [value, setValue] = useState(getInitialValue(multiple, defaultValue));

  useHandleInitialValue(defaultValue, multiple, setValue as TFunc<[V]>);

  return {
    onChange: useChangeEvents<V>(alwaysSelected, multiple, onChange, setValue, value),
    value,
  };
};
