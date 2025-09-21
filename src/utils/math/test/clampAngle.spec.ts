// utils
import { clampAngle } from '../clampAngle';

describe('clampAngle', () => {
  it(`should return 180`, () => {
    // before
    const result = clampAngle(181);

    // result
    expect(result).toBe(180);
  });

  it(`should return -180`, () => {
    // before
    const result = clampAngle(-181);

    // result
    expect(result).toBe(-180);
  });

  it(`should return value default`, () => {
    // before
    const result = clampAngle(0);

    // result
    expect(result).toBe(0);
  });
});
