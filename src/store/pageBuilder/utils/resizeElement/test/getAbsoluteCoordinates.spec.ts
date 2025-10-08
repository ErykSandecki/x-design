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
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.east,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 300 },
    });
  });

  it(`should return cords east reverse`, () => {
    // before
    const result = getAbsoluteCoordinates(AnchorResize.east, false, baseCoordinates, 100, 100, AnchorResize.east, {
      ...mouseCoordinates,
      x: -300,
    });

    // result
    expect(result).toStrictEqual({
      coordinates: { x: -200, y: 0 },
      height: { value: 100 },
      width: { value: 200 },
    });
  });

  it(`should return cords north`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.north,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.north,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 100 },
      height: { value: 0 },
      width: { value: 100 },
    });
  });

  it(`should return cords north reverse`, () => {
    // before
    const result = getAbsoluteCoordinates(AnchorResize.north, false, baseCoordinates, 100, 100, AnchorResize.north, {
      ...mouseCoordinates,
      y: -300,
    });

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: -300 },
      height: { value: 400 },
      width: { value: 100 },
    });
  });

  it(`should return cords north east`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.northEast,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.northEast,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 100 },
      height: { value: 0 },
      width: { value: 300 },
    });
  });

  it(`should return cords north west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.northWest,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.northWest,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 100 },
      height: { value: 0 },
      width: { value: 100 },
    });
  });

  it(`should return cords south`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.south,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.south,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 100 },
    });
  });

  it(`should return cords south east`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.southEast,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.southEast,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 300 },
    });
  });

  it(`should return cords south west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.southWest,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.southWest,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 0 },
      height: { value: 200 },
      width: { value: 100 },
    });
  });

  it(`should return cords west`, () => {
    // before
    const result = getAbsoluteCoordinates(
      AnchorResize.west,
      false,
      baseCoordinates,
      100,
      100,
      AnchorResize.west,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 100, y: 0 },
      height: { value: 100 },
      width: { value: 100 },
    });
  });
});
