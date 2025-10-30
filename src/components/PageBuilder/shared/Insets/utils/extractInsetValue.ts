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
  const firstInset = parseInt(first);
  const secondInset = parseInt(second ? second : first);
  const isDifference = firstInset !== secondInset;

  return {
    insets: { [keys[0]]: firstInset, [keys[1]]: secondInset },
    value: isDifference ? `${first}, ${second}` : `${first}`,
  };
};
