// types
import { Sort } from 'types';

// utils
import { sortNumbers } from '../sort';

describe('sortNumbers', () => {
  it('should sort ascent', () => {
    // before
    const result = sortNumbers([3, 2, 1], Sort.ascent);

    // result
    expect(result).toStrictEqual([1, 2, 3]);
  });

  it('should sort descent', () => {
    // before
    const result = sortNumbers([1, 2, 3], Sort.descent);

    // result
    expect(result).toStrictEqual([3, 2, 1]);
  });
});
