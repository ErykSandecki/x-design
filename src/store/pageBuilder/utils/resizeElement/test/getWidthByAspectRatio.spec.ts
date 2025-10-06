// utils
import { getWidthByAspectRatio } from '../getWidthByAspectRatio';

describe('getWidthByAspectRatio', () => {
  it(`should return cords when aspect ratio`, () => {
    // before
    const result = getWidthByAspectRatio(true, 50, 100, 100);

    // result
    expect(result).toBe(200);
  });

  it(`should return cords without aspect ratio`, () => {
    // before
    const result = getWidthByAspectRatio(false, 50, 100, 100);

    // result
    expect(result).toBe(100);
  });
});
