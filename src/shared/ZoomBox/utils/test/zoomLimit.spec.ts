// others
import { DATE_NOW_MOCKED } from 'test';

// utils
import { getZoomSpeed } from '../handleZoom';

describe('getZoomSpeed', () => {
  it('should return speed for mouse wheel', () => {
    // before
    const result = getZoomSpeed(0);

    // result
    expect(result).toBe(0.1);
  });

  it('should return speed for touchpad', () => {
    // before
    const result = getZoomSpeed(DATE_NOW_MOCKED + 50);

    // result
    expect(result).toBe(0.02);
  });
});
