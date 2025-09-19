// types
import { AnchorRotate } from 'store/pageBuilder/enums';

// utils
import { getAnchorRotateCursorAngle } from '../getAnchorRotateCursorAngle';

describe('getAnchorRotateCursorAngle', () => {
  it(`should return angle`, () => {
    // before
    const result = getAnchorRotateCursorAngle(AnchorRotate.northEast, 0);

    // result
    expect(result).toBe(0);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorRotateCursorAngle(AnchorRotate.northWest, 0);

    // result
    expect(result).toBe(-90);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorRotateCursorAngle(AnchorRotate.southEast, 0);

    // result
    expect(result).toBe(90);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorRotateCursorAngle(AnchorRotate.southWest, 0);

    // result
    expect(result).toBe(180);
  });
});
