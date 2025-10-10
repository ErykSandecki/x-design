// types
import { KeyboardKeys } from 'types';

// utils
import { mapSecondaryKey } from '../mapSecondaryKey';

describe('mapSecondaryKey', () => {
  it('should return alt', () => {
    // before
    const result = mapSecondaryKey(KeyboardKeys.a);

    // result
    expect(result).toBe('A');
  });
});
