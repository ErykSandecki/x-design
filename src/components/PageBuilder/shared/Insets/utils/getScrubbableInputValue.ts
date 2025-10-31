// others
import { MIXED } from 'constant/constants';

// types
import { TInsetKeysGroup } from '../types';
import { TInsets } from 'types';

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
  if (isScrubbableInput && value !== MIXED) {
    const [, second] = baseValue.split(',');

    if (second) {
      const firstValue = parseInt(value);
      const difference = firstValue - inset;
      const secondValue = parseInt(second) + difference;

      return {
        valueInput: `${firstValue}, ${secondValue}`,
        valueStore: { [keys[0]]: { value: firstValue }, [keys[1]]: { value: secondValue } },
      };
    }
  }

  return {
    valueInput: value,
    valueStore: { [keys[0]]: { value: parseInt(value) }, [keys[1]]: { value: parseInt(value) } },
  };
};
