// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// utils
import { calculateBoxSize } from '../calculateBoxSize';

describe('calculateBoxSize', () => {
  it(`should return calculated data`, () => {
    // before
    const result = calculateBoxSize(BASE_RECT);

    // result
    expect(result).toStrictEqual({ height: 0, width: 0, x: 0, y: 0 });
  });
});
