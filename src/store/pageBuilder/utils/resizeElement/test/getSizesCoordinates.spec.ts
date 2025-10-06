// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getSizesCoordinates } from '../getSizesCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getSizesCoordinates', () => {
  it(`should return cords for absolute position`, () => {
    // before
    const result = getSizesCoordinates(
      AnchorResize.east,
      false,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
      'absolute',
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 300 },
    });
  });

  it(`should return cords for absolute relative`, () => {
    // before
    const result = getSizesCoordinates(
      AnchorResize.east,
      false,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
      'relative',
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 300 },
    });
  });
});
