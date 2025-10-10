// others
import { ALT, CONTROL, SHIFT } from 'constant/mainKeys';

// utils
import { mapPrimaryKey } from '../mapPrimaryKey';

describe('mapSecondaryKey', () => {
  it('should map to alt macOs', () => {
    // before
    const result = mapPrimaryKey('alt');

    // result
    expect(result).toBe(ALT);
  });

  it('should map to meta macOs', () => {
    // before
    const result = mapPrimaryKey('control');

    // result
    expect(result).toBe(CONTROL);
  });

  it('should map to meta macOs', () => {
    // before
    const result = mapPrimaryKey('meta');

    // result
    expect(result).toBe(CONTROL);
  });

  it('should map to shift macOs', () => {
    // before
    const result = mapPrimaryKey('shift');

    // result
    expect(result).toBe(SHIFT);
  });
});
