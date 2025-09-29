import { map, pick } from 'lodash';

export const extractObjectValues: {
  <T, K extends keyof T>(obj: T[], keys: [K]): T[K][];
  <T, K extends keyof T>(obj: T[], keys: K[]): Pick<T, K>[];
} = <T extends {}>(obj: Array<T>, keys: Array<keyof T>) => {
  if (keys.length === 1) {
    return map(obj, keys[0]);
  }
  return map(obj, (item) => pick(item, keys));
};
