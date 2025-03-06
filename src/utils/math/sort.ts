import { get } from 'lodash';

// types
import { Sort, TObject } from 'types';

export const sortNumbers = (data: Array<number>, order: Sort): Array<number> =>
  data.sort((a, b) => (order === Sort.ascent ? a - b : b - a));

export const sortNumbersByObject = <T extends TObject<any, string>>(
  data: Array<T>,
  key: keyof T,
  order: Sort,
): Array<T> =>
  data.sort((obj1, obj2) => {
    const a = parseInt(get(obj1, key));
    const b = parseInt(get(obj2, key));

    return order === Sort.ascent ? a - b : b - a;
  });
