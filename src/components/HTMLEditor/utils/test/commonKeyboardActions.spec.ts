// types

// utils
import { commonKeyboardActions } from '../commonKeyboardActions';

describe('commonKeyboardActions', () => {
  it('should return set of keyboard keys', () => {
    // before
    const result = commonKeyboardActions();

    // result
    expect(result).toStrictEqual([]);
  });
});
