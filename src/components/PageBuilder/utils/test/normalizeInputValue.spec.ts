// types
import { Unit } from 'types';

// utils
import { normalizeInputValue } from '../normalizeInputValue';

describe('isMixed', () => {
  it(`should not be mixed`, () => {
    // before
    const result = normalizeInputValue(true, 0);

    // result
    expect(result).toBe('Mixed');
  });

  it(`should return value`, () => {
    // before
    const result = normalizeInputValue(false, 0);

    // result
    expect(result).toBe('0');
  });

  it(`should return value with unit`, () => {
    // before
    const result = normalizeInputValue(false, 0, Unit.percentage);

    // result
    expect(result).toBe('0%');
  });
});
