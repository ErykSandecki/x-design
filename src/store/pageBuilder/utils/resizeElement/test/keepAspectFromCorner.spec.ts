// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { keepAspectFromCorner } from '../keepAspectFromCorner';

describe('keepAspectFromCorner', () => {
  it(`should return coords when resize north west`, () => {
    // before
    const result = keepAspectFromCorner(true, 100, 100, AnchorResize.northWest, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: 200, width: 200 });
  });

  it(`should return coords when resize north east`, () => {
    // before
    const result = keepAspectFromCorner(true, 100, 100, AnchorResize.northEast, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: 200, width: 200 });
  });

  it(`should return coords when resize south west`, () => {
    // before
    const result = keepAspectFromCorner(true, 100, 100, AnchorResize.southWest, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: 200, width: 200 });
  });

  it(`should return coords when resize south east`, () => {
    // before
    const result = keepAspectFromCorner(true, 100, 100, AnchorResize.southEast, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: 200, width: 200 });
  });

  it(`should return coords when resize when width is leading`, () => {
    // before
    const result = keepAspectFromCorner(true, 100, 100, AnchorResize.northWest, 200, 300, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 50 }, height: 300, width: 300 });
  });

  it(`should return default coordinates when is not aspect ratio`, () => {
    // before
    const result = keepAspectFromCorner(false, 100, 100, AnchorResize.northWest, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: 200, width: 200 });
  });
});
