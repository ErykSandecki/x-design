// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// utils
import { hasBasePosition } from '../hasBasePosition';

describe('hasBasePosition', () => {
  it('should return true', () => {
    // before
    const result = hasBasePosition(BASE_RECT);

    // result
    expect(result).toBe(true);
  });
});
