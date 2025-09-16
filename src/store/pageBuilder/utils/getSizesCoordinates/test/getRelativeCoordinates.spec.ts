// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getRelativeCoordinates } from '../getRelativeCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getRelativeCoordinates', () => {
  it(`should return cords north`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.north,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 200,
      width: 100,
    });
  });

  it(`should return cords south`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.south,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 200,
      width: 100,
    });
  });

  it(`should return cords east`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.east,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 100,
      width: 300,
    });
  });

  it(`should return cords west`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.west,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 100,
      width: 300,
    });
  });

  it(`should return cords for rest cases`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.northEast,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 200,
      width: 300,
    });
  });

  it(`should return cords with default value 0`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.northEast,
      baseCoordinates,
      -1000,
      -1000,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: 0,
      width: 0,
    });
  });
});
