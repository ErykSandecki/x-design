// utils
import { isBaseParent } from '../isBaseParent';

describe('isBaseParent', () => {
  it('should be base', () => {
    // before
    const result = isBaseParent('-1');

    // result
    expect(result).toBe(true);
  });

  it('should not be base', () => {
    // before
    const result = isBaseParent('0');

    // result
    expect(result).toBe(false);
  });
});
