// types
import { TInsets } from 'types';
import { TInsetKeysGroup } from '../types';

export const getInsetValue = (insets: Partial<TInsets>, keys: TInsetKeysGroup): string => {
  if (insets[keys[0]] === insets[keys[1]]) {
    return insets[keys[0]].toString();
  }

  return `${insets[keys[0]]}, ${insets[keys[1]]}`;
};
