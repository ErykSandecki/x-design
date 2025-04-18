// utils
import { getZoomSpeed } from '../handleZoom';

describe('getZoomSpeed', () => {
  it('should return default spped', () => {
    // before
    const result = getZoomSpeed(0, 0, 100);

    // result
    expect(result).toBe(0);
  });

  it('should return speed for touchpad', () => {
    // before
    const result = getZoomSpeed(0, 0, 0);

    // result
    expect(result).toBe(0.035);
  });

  it('should return speed for mouse', () => {
    // before
    const result = getZoomSpeed(20, 0, 0);

    // result
    expect(result).toBe(0.1);
  });
});
