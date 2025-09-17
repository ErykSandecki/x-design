// utils
import { getDeltaAngle } from '../getDeltaAngle';

describe('getDeltaAngle', () => {
  it(`should return angle`, () => {
    // before
    const result = getDeltaAngle(100, 360);

    // result
    expect(result).toBe(-100);
  });

  it(`should return angle`, () => {
    // before
    const result = getDeltaAngle(360, 100);

    // result
    expect(result).toBe(100);
  });
});
