// types
import { Unit } from 'types';

// utils
import { normalizeMultipleValue } from '../normalizeMultipleValue';

describe('normalizeMultipleValue', () => {
  it(`should be mixed`, () => {
    // before
    const result = normalizeMultipleValue(true, 0);

    // result
    expect(result).toBe('Mixed');
  });

  it(`should return value`, () => {
    // before
    const result = normalizeMultipleValue(false, 0);

    // result
    expect(result).toBe('0');
  });

  it(`should return value with unit`, () => {
    // before
    const result = normalizeMultipleValue(false, 0, Unit.percentage);

    // result
    expect(result).toBe('0%');
  });
});
