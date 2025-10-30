import { TInsets } from 'types';
import { TInsetKeysGroup } from '../types';

export const getScrubbableInputValue = (
  baseValue: string,
  inset: number,
  isScrubbableInput: boolean,
  keys: TInsetKeysGroup,
  value: string,
): {
  valueInput: string;
  valueStore: Partial<TInsets>;
} => {
  if (isScrubbableInput && value !== 'Mixed') {
    const [, second] = baseValue.split(',');

    if (second) {
      const firstValue = parseInt(value);
      const difference = firstValue - inset;
      const secondValue = parseInt(second) + difference;

      return {
        valueInput: `${firstValue}, ${secondValue}`,
        valueStore: { [keys[0]]: firstValue, [keys[1]]: secondValue },
      };
    }
  }

  return {
    valueInput: value,
    valueStore: { [keys[0]]: parseInt(value), [keys[1]]: parseInt(value) },
  };
};
