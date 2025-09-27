// types
import { TToggleButtonGroupValue } from '../types';

export type TUseChangeEvents = TFunc<[string]>;

export const useChangeEvents = <V extends TToggleButtonGroupValue>(
  alwaysSelected: boolean,
  multiple: boolean,
  onChange: TFunc<[V]> | null,
  setValue: TFunc<[V]>,
  value: V,
): TUseChangeEvents => {
  const onChangeMultipleValue = (value: Array<string>, valueToggleButton: string): Array<string> => {
    const includeValue = value.includes(valueToggleButton);

    if (!alwaysSelected || !includeValue || (includeValue && value.length > 1)) {
      return includeValue
        ? (value as Array<string>).filter((value) => value !== valueToggleButton)
        : [...(value as Array<string>), valueToggleButton];
    }

    return value;
  };

  const onChangeSingleValue = (value: string, valueFromToggleButton: string): string => {
    if (!alwaysSelected && value === valueFromToggleButton) {
      return '';
    }

    return valueFromToggleButton;
  };

  const onChangeHandler = (valueFromToggleButton: string): void => {
    const targetValue = multiple
      ? onChangeMultipleValue(value as Array<string>, valueFromToggleButton)
      : onChangeSingleValue(value as string, valueFromToggleButton);

    if (onChange) {
      onChange(targetValue as V);
    }

    setValue(targetValue as V);
  };

  return onChangeHandler;
};
