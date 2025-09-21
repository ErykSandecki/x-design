// utils
import { getRevertValue } from '../getRevertValue';

describe('getRevertValue', () => {
  it('should return min value when max', () => {
    // before
    const result = getRevertValue(0, 100, -100, 100);

    // result
    expect(result).toBe(-100);
  });

  it('should return max value when min', () => {
    // before
    const result = getRevertValue(0, 100, -100, -100);

    // result
    expect(result).toBe(100);
  });

  it('should return default value', () => {
    // before
    const result = getRevertValue(51, 100, -100, 50);

    // result
    expect(result).toBe(51);
  });
});
