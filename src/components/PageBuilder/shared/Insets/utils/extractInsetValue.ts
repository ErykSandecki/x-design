// types
import { TInsets } from 'types';

export const cleanValue = (value: string): Array<string> => value.replace(/[^\d,]/g, '').split(',');

export const extractInsetValue = (
  keys: [keyof Pick<TInsets, 'l' | 't'>, keyof Pick<TInsets, 'b' | 'r'>],
  value: string,
): {
  insets: Partial<TInsets>;
  value: string;
} => {
  const [first, second] = cleanValue(value);
  const firstInsetValue = parseInt(first);
  const secondInsetValue = parseInt(second ? second : first);
  const isDifference = firstInsetValue !== secondInsetValue;

  return {
    insets: { [keys[0]]: { value: firstInsetValue }, [keys[1]]: { value: secondInsetValue } },
    value: isDifference ? `${first}, ${second}` : `${first}`,
  };
};
