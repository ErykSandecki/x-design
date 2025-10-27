// utils
import { isOdd } from '../isOdd';

describe('isOdd', () => {
  it(`should be odd`, () => {
    // before
    const result = isOdd(1);

    // result
    expect(result).toBe(true);
  });

  it(`should not be odd`, () => {
    // before
    const result = isOdd(2);

    // result
    expect(result).toBe(false);
  });
});
