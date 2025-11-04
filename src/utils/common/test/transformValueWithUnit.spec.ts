// types
import { Unit } from 'types';

// utils
import { transformValueWithUnit } from '../transformValueWithUnit';

describe('transformValueWithUnit', () => {
  it('should return value', () => {
    // before
    const result = transformValueWithUnit(false, Unit.percentage, 'value');

    // result
    expect(result).toBe('value');
  });

  it('should return value with unit', () => {
    // before
    const result = transformValueWithUnit(true, Unit.percentage, 'value');

    // result
    expect(result).toBe('value%');
  });
});
