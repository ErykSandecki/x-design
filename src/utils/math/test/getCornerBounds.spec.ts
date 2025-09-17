// utils
import { getCornerBounds } from '../getCornerBounds';

describe('getCornerBounds', () => {
  it(`should calculated bounds`, () => {
    // before
    const result = getCornerBounds(45, 100, 100, 0, 0);

    // result
    expect(result).toStrictEqual({
      x1: -20.710678118654748,
      x2: 120.71067811865476,
      y1: -20.710678118654748,
      y2: 120.71067811865476,
    });
  });
});
