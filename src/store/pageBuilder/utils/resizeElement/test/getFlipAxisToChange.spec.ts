// mocks
import { flipMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getFlipAxisToChange } from '../getFlipAxisToChange';

describe('getFlipAxisToChange', () => {
  it(`should not return any changes when position relative`, () => {
    // before
    const result = getFlipAxisToChange(flipMock, AnchorResize.north, flipMock, AnchorResize.north, 'relative');

    // result
    expect(result).toStrictEqual(undefined);
  });

  it(`should not flip x & y`, () => {
    // before
    const result = getFlipAxisToChange(flipMock, AnchorResize.northEast, flipMock, AnchorResize.northEast, 'absolute');

    // result
    expect(result).toStrictEqual({ x: undefined, y: undefined });
  });

  it(`should flip x`, () => {
    // before
    const result = getFlipAxisToChange(flipMock, AnchorResize.west, flipMock, AnchorResize.east, 'absolute');

    // result
    expect(result).toStrictEqual({ x: true });
  });

  it(`should flip reverse x`, () => {
    // before
    const result = getFlipAxisToChange(
      flipMock,
      AnchorResize.east,
      { ...flipMock, x: true },
      AnchorResize.east,
      'absolute',
    );

    // result
    expect(result).toStrictEqual({ x: false });
  });

  it(`should flip y`, () => {
    // before
    const result = getFlipAxisToChange(flipMock, AnchorResize.south, flipMock, AnchorResize.north, 'absolute');

    // result
    expect(result).toStrictEqual({ y: true });
  });

  it(`should flip reverse y`, () => {
    // before
    const result = getFlipAxisToChange(
      flipMock,
      AnchorResize.north,
      { ...flipMock, y: true },
      AnchorResize.north,
      'absolute',
    );

    // result
    expect(result).toStrictEqual({ y: false });
  });

  it(`should flip x & y`, () => {
    // before
    const result = getFlipAxisToChange(flipMock, AnchorResize.northEast, flipMock, AnchorResize.southWest, 'absolute');

    // result
    expect(result).toStrictEqual({ x: true, y: true });
  });
});
