// utils
import { distanceHasChanged } from '../distanceHasChanged';

describe('distanceHasChanged', () => {
  it(`should distance have been changed`, () => {
    // before
    const result = distanceHasChanged({ x: 0, y: 0 }, 5, {
      clientX: 10,
      clientY: 10,
    } as MouseEvent);

    // result
    expect(result).toBe(true);
  });

  it(`should distance haven't been changed`, () => {
    // before
    const result = distanceHasChanged({ x: 0, y: 0 }, 5, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(result).toBe(false);
  });
});
