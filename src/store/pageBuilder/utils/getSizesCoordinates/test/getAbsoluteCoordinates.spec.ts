// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getAbsoluteCoordinates } from '../getAbsoluteCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getAbsoluteCoordinates', () => {
  it(`should return cords east`, () => {
    // before
    const result = getAbsoluteCoordinates(
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

  it(`should return cords east reverse`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.east,
      baseCoordinates,
      100,
      100,
      {
        ...mouseCoordinates,
        x: -300,
      },
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: -200, y: 0 },
      height: 100,
      width: 200,
    });
  });

  it(`should return cords north`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.north,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 100 },
      height: 0,
      width: 100,
    });
  });

  it(`should return cords north reverse`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.north,
      baseCoordinates,
      100,
      100,
      { ...mouseCoordinates, y: -300 },
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: -300 },
      height: 400,
      width: 100,
    });
  });

  it(`should return cords north east`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.northEast,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 100 },
      height: 0,
      width: 300,
    });
  });

  it(`should return cords north west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.northWest,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 100 },
      height: 0,
      width: 100,
    });
  });

  it(`should return cords south`, () => {
    // before
    const result = getAbsoluteCoordinates(
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

  it(`should return cords south east`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.southEast,
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

  it(`should return cords south west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.southWest,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 0 },
      height: 200,
      width: 100,
    });
  });

  it(`should return cords west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.west,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 0 },
      height: 100,
      width: 100,
    });
  });
});
