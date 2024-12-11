// utils
import { enumToArray } from '../enumToArray';

describe('enumToArray', () => {
  it('should transform enum to array', () => {
    // mock
    enum Enum {
      a = 'a',
      b = 'b',
      c = 'c',
    }

    // before
    const result = enumToArray(Enum);

    // result
    expect(result).toStrictEqual(['a', 'b', 'c']);
  });
});
