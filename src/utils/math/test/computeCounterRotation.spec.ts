// utils
import { computeCounterRotation } from '../computeCounterRotation';

describe('computeCounterRotation', () => {
  it(`should calculate counter rotation`, () => {
    // before
    const result = computeCounterRotation([0, 45, 45]);

    // result
    expect(result.counterAngle).toBe(-90);
  });

  it(`should calculate counter rotation`, () => {
    // before
    const result = computeCounterRotation(90);

    // result
    expect(result.counterAngle).toBe(-90);
  });

  it(`should calculate counter rotation`, () => {
    // before
    const result = computeCounterRotation([0, 180, 180, 180, 45]);

    // result
    expect(result.counterAngle).toBe(135);
  });
});
