// types
import { KeyboardKeys } from 'types';

// utils
import { mapSecondaryKey } from '../mapSecondaryKey';

describe('mapSecondaryKey', () => {
  it('should return key mapped', () => {
    // before
    const result = mapSecondaryKey(KeyboardKeys.a);

    // result
    expect(result).toBe('A');
  });

  it('should return key', () => {
    // before
    const result = mapSecondaryKey(KeyboardKeys['+']);

    // result
    expect(result).toBe(KeyboardKeys['+']);
  });
});
