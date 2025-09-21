// utils
import { normalizeAngle } from '../normalizeAngle';

describe('normalizeAngle', () => {
  it(`should return 180`, () => {
    // before
    const result = normalizeAngle(180 + 45);

    // result
    expect(result).toBe(-135);
  });
});
