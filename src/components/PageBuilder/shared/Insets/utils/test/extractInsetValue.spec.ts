// utils
import { extractInsetValue } from '../extractInsetValue';

describe('extractInsetValue', () => {
  it(`should extract value with fixed string`, () => {
    // before
    const result = extractInsetValue(['l', 'r'], '1, 2');

    // result
    expect(result).toStrictEqual({ insets: { l: 1, r: 2 }, value: '1, 2' });
  });

  it(`should extract when string contains incorrect characters`, () => {
    // before
    const result = extractInsetValue(['l', 'r'], 'a1,  2a');

    // result
    expect(result).toStrictEqual({ insets: { l: 1, r: 2 }, value: '1, 2' });
  });

  it(`should extract value when only one`, () => {
    // before
    const result = extractInsetValue(['l', 'r'], '1');

    // result
    expect(result).toStrictEqual({ insets: { l: 1, r: 1 }, value: '1' });
  });
});
