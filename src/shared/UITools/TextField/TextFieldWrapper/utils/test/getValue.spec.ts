// utils
import { getValue } from '../getValue';

describe('getValue', () => {
  it('should return auto', () => {
    // before
    const result = getValue('auto', '');

    // result
    expect(result).toBe('auto');
  });

  it('should return value', () => {
    // before
    const result = getValue('fixed', 'value');

    // result
    expect(result).toBe('value');
  });
});
