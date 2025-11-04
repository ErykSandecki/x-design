// utils
import { shouldAttached } from '../shouldAttached';

describe('shouldAttached', () => {
  it('should attached', () => {
    // before
    const result = shouldAttached('auto');

    // result
    expect(result).toBe(true);
  });

  it('should not attached', () => {
    // before
    const result = shouldAttached('fixed');

    // result
    expect(result).toBe(false);
  });
});
