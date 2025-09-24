// utils
import { getInitialValue } from '../getInitialValue';

describe('getInitialValue', () => {
  it(`should return default value`, () => {
    // before
    const result = getInitialValue(false, 'value');

    // result
    expect(result).toBe('value');
  });

  it(`should return value`, () => {
    // before
    const result = getInitialValue(false, null);

    // result
    expect(result).toBe('');
  });

  it(`should return value as array`, () => {
    // before
    const result = getInitialValue(true, null);

    // result
    expect(result).toStrictEqual([]);
  });
});
