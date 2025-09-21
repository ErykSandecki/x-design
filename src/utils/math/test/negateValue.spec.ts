// utils
import { negateValue } from '../negateValue';

describe('negateValue', () => {
  it(`should return -100`, () => {
    // before
    const result = negateValue(100);

    // result
    expect(result).toBe(-100);
  });

  it(`should return -100`, () => {
    // before
    const result = negateValue(-100);

    // result
    expect(result).toBe(100);
  });
});
