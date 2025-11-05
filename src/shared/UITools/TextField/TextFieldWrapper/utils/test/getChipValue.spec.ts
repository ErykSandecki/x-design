// others
import { MIXED } from 'constant/constants';

// utils
import { getChipValue } from '../getChipValue';

describe('getChipValue', () => {
  it('should return auto', () => {
    // before
    const result = getChipValue(false, 'auto', '');

    // result
    expect(result).toBe('auto');
  });

  it('should return value', () => {
    // before
    const result = getChipValue(false, 'fixed', 'value');

    // result
    expect(result).toBe('value');
  });

  it('should return mixed', () => {
    // before
    const result = getChipValue(true, 'fixed', 'value');

    // result
    expect(result).toBe(MIXED);
  });
});
