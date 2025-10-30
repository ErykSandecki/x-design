// types
import { TInsets } from 'types';
import { TInsetKeysGroup } from '../types';

export const getInsetValue = (insets: Partial<TInsets>, keys: TInsetKeysGroup): string => {
  if (insets[keys[0]].value === insets[keys[1]].value) {
    return insets[keys[0]].value.toString();
  }

  return `${insets[keys[0]].value}, ${insets[keys[1]].value}`;
};
