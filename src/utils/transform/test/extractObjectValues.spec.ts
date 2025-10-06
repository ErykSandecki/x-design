// utils
import { extractObjectValues } from '../extractObjectValues';

describe('extractObjectValues', () => {
  it('should extract single values', () => {
    // before
    const result = extractObjectValues([{ a: 'a' }], ['a']);

    // result
    expect(result).toStrictEqual(['a']);
  });

  it('should extract couple valyes', () => {
    // before
    const result = extractObjectValues([{ a: 'a', b: 'b' }], ['a', 'b']);

    // result
    expect(result).toStrictEqual([{ a: 'a', b: 'b' }]);
  });
});
