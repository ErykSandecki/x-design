// utils
import { canChangeValue } from '../canChangeValue';

describe('canChangeValue', () => {
  it(`should return true`, () => {
    // before
    const result = canChangeValue(false, false, false);

    // result
    expect(result).toBe(true);
  });

  it(`should return true`, () => {
    // before
    const result = canChangeValue(true, false, false);

    // result
    expect(result).toBe(true);
  });

  it(`should return true`, () => {
    // before
    const result = canChangeValue(false, true, false);

    // result
    expect(result).toBe(true);
  });
});
