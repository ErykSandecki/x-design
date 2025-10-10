// utils
import { getCornersPosition } from '../getCornersPosition';

describe('getCornersPosition', () => {
  it(`should return rect positions`, () => {
    // before
    const result = getCornersPosition(100, 100);

    // result
    expect(result).toStrictEqual({ x1: -1, x2: 101, y1: -1, y2: 101 });
  });
});
