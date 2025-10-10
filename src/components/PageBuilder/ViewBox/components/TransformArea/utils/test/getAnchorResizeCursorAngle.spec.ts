// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getAnchorResizeCursorAngle } from '../getAnchorResizeCursorAngle';

describe('getAnchorResizeCursorAngle', () => {
  it(`should return angle`, () => {
    // before
    const result = getAnchorResizeCursorAngle(AnchorResize.east, 0);

    // result
    expect(result).toBe(0);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorResizeCursorAngle(AnchorResize.north, 0);

    // result
    expect(result).toBe(90);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorResizeCursorAngle(AnchorResize.northEast, 0);

    // result
    expect(result).toBe(-45);
  });

  it(`should return angle`, () => {
    // before
    const result = getAnchorResizeCursorAngle(AnchorResize.southEast, 0);

    // result
    expect(result).toBe(45);
  });
});
