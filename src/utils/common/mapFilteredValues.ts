import { mapValues, pick } from 'lodash';
import { TValueObj } from 'types';

export const mapFilteredValues = <T extends {}>(
  obj: T,
  keys: Array<keyof T>,
  mapCallback: (value: TValueObj<T>, key: keyof T) => TValueObj<T>,
): T => mapValues(pick(obj, keys), mapCallback) as T;
