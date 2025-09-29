// utils
import { extracObjectValues } from '../extracObjectValues';

describe('extracObjectValues', () => {
  it('should extract single values', () => {
    // before
    const result = extracObjectValues([{ a: 'a' }], ['a']);

    // result
    expect(result).toStrictEqual(['a']);
  });

  it('should extract couple valyes', () => {
    // before
    const result = extracObjectValues([{ a: 'a', b: 'b' }], ['a', 'b']);

    // result
    expect(result).toStrictEqual([{ a: 'a', b: 'b' }]);
  });
});
