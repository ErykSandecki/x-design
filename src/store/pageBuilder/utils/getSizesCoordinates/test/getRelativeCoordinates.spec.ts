// types
import { Anchor } from 'store/pageBuilder/enums';

// utils
import { getRelativeCoordinates } from '../getRelativeCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getRelativeCoordinates', () => {
  it(`should return cords north`, () => {
    // before
    const result = getRelativeCoordinates(
      Anchor.north,
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
      Anchor.south,
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
      Anchor.east,
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
      Anchor.west,
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
      Anchor.northEast,
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
});
