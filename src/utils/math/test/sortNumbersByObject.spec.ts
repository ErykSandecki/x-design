// types
import { Sort } from 'types';

// utils
import { sortNumbersByObject } from '../sort';

describe('sortNumbersByObject', () => {
  it('should sort ascent', () => {
    // mock
    const data = [{ value: 3 }, { value: 2 }, { value: 1 }];

    // before
    const result = sortNumbersByObject(data, 'value', Sort.ascent);

    // result
    expect(result).toStrictEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  it('should sort descent', () => {
    // mock
    const data = [{ value: 1 }, { value: 2 }, { value: 3 }];

    // before
    const result = sortNumbersByObject(data, 'value', Sort.descent);

    // result
    expect(result).toStrictEqual([{ value: 3 }, { value: 2 }, { value: 1 }]);
  });
});
