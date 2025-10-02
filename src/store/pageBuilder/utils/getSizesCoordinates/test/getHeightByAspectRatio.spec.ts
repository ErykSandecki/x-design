// utils
import { getHeightByAspectRatio } from '../getHeightByAspectRatio';

describe('getHeightByAspectRatio', () => {
  it(`should return cords when aspect ratio`, () => {
    // before
    const result = getHeightByAspectRatio(true, 100, 50, 100);

    // result
    expect(result).toBe(200);
  });

  it(`should return cords without aspect ratio`, () => {
    // before
    const result = getHeightByAspectRatio(false, 100, 50, 100);

    // result
    expect(result).toBe(100);
  });
});
