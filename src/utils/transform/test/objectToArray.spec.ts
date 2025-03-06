// utils
import { objectToArray } from '../objectToArray';

describe('objectToArray', () => {
  it('should transform object to array', () => {
    // mock
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    // before
    const result = objectToArray(obj);

    // result
    expect(result).toStrictEqual([1, 2, 3]);
  });
});
