// utils
import { valueAttached } from '../valueAttached';

describe('shouldAttached', () => {
  it('should attached', () => {
    // before
    const result = valueAttached(false, 'auto');

    // result
    expect(result).toBe(true);
  });

  it('should not attached', () => {
    // before
    const result = valueAttached(false, 'fixed');

    // result
    expect(result).toBe(false);
  });
});
