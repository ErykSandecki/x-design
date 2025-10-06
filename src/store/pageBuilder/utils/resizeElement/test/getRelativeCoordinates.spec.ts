// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getRelativeCoordinates } from '../getRelativeCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getRelativeCoordinates', () => {
  it(`should return cords north`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.north, false, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 100 },
    });
  });

  it(`should return cords south`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.south, false, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 100 },
    });
  });

  it(`should return cords east`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.east, false, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 300 },
    });
  });

  it(`should return cords west`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.west, false, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 300 },
    });
  });

  it(`should return cords for rest cases`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.northEast, false, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 300 },
    });
  });

  it(`should return cords with default value 0`, () => {
    // before
    const result = getRelativeCoordinates(
      AnchorResize.northEast,
      false,
      baseCoordinates,
      -1000,
      -1000,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 0 },
      width: { value: 0 },
    });
  });

  it(`should return cords north when y less than 0`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.north, false, baseCoordinates, -100, 100, {
      x: -100,
      y: -100,
    });

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 0 },
      width: { value: 100 },
    });
  });

  it(`should return cords east when y less than 0`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.east, false, baseCoordinates, 100, -100, {
      x: -100,
      y: -100,
    });

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 100 },
      width: { value: 0 },
    });
  });

  it(`should return cords north when aspect ratio`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.north, true, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 200 },
      width: { value: 200 },
    });
  });

  it(`should return cords east when aspect ratio`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.east, true, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 300 },
      width: { value: 300 },
    });
  });

  it(`should return cords for rest cases when aspect ratio`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.northEast, true, baseCoordinates, 100, 100, mouseCoordinates);

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 300 },
      width: { value: 300 },
    });
  });

  it(`should return cords for rest cases when aspect ratio and y bigger than x`, () => {
    // before
    const result = getRelativeCoordinates(AnchorResize.northEast, true, baseCoordinates, 100, 100, { x: 100, y: 200 });

    // result
    expect(result).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      height: { value: 300 },
      width: { value: 300 },
    });
  });
});
