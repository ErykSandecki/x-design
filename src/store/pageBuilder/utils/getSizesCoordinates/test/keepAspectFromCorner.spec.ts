// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { keepAspectFromCorner } from '../keepAspectFromCorner';

describe('keepAspectFromCorner', () => {
  it(`should return coords when resize north west`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.northWest, true, 100, 100, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: { value: 200 }, width: { value: 200 } });
  });

  it(`should return coords when resize north east`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.northEast, true, 100, 100, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: { value: 200 }, width: { value: 200 } });
  });

  it(`should return coords when resize south west`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.southWest, true, 100, 100, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: { value: 200 }, width: { value: 200 } });
  });

  it(`should return coords when resize south east`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.southEast, true, 100, 100, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: { value: 200 }, width: { value: 200 } });
  });

  it(`should return coords when resize when width is leading`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.northWest, true, 100, 100, 200, 300, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 50 }, height: { value: 300 }, width: { value: 300 } });
  });

  it(`should return default coordinates when is not aspect ratio`, () => {
    // before
    const result = keepAspectFromCorner(AnchorResize.northWest, false, 100, 100, 200, 200, 150, 150);

    // result
    expect(result).toStrictEqual({ coordinates: { x: 150, y: 150 }, height: { value: 200 }, width: { value: 200 } });
  });
});
