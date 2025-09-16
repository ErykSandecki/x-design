// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// utils
import { mousePositionRelative } from '../mousePositionRelative';

describe('mousePositionRelative', () => {
  it('should return mouse position', () => {
    // before
    const result = mousePositionRelative(BASE_3D, {
      clientX: 100,
      clientY: 100,
    } as MouseEvent);

    // result
    expect(result).toStrictEqual({ x: 100, y: 100 });
  });
});
