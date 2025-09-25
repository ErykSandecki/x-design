// utils
import { sanitizeNumberInput } from '../sanitizeNumberInput';

describe('sanitizeNumberInput', () => {
  it('should remove characters and left only numbers', () => {
    // before
    const result = sanitizeNumberInput('100%');

    // result
    expect(result).toBe('100');
  });
});
