// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { getPosition } from '../getPosition';

describe('getPosition', () => {
  it(`should return default position`, () => {
    // before
    const result = getPosition({}, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      left: '0px',
      top: '0px',
      transform: 'rotate(0deg) translate(0, 0)',
      transformOrigin: 'center center',
    });
  });

  it(`should return horizontal left position`, () => {
    // before
    const result = getPosition({ horizontal: AlignmentHorizontal.left }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      left: '0',
      top: '0px',
      transform: 'rotate(0deg) translate(0, 0)',
      transformOrigin: 'center center',
    });
  });

  it(`should return horizontal center position`, () => {
    // before
    const result = getPosition({ horizontal: AlignmentHorizontal.center }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      left: '50%',
      top: '0px',
      transform: 'rotate(0deg) translate(-50%, 0)',
      transformOrigin: '25% center',
    });
  });

  it(`should return horizontal right position`, () => {
    // before
    const result = getPosition({ horizontal: AlignmentHorizontal.right }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      right: '0',
      top: '0px',
      transform: 'rotate(0deg) translate(0, 0)',
      transformOrigin: 'center center',
    });
  });

  it(`should return vertical top position`, () => {
    // before
    const result = getPosition({ vertical: AlignmentVertical.top }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      left: '0px',
      top: '0',
      transform: 'rotate(0deg) translate(0, 0)',
      transformOrigin: 'center center',
    });
  });

  it(`should return vertical center position`, () => {
    // before
    const result = getPosition({ vertical: AlignmentVertical.center }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      left: '0px',
      top: '50%',
      transform: 'rotate(0deg) translate(0, -50%)',
      transformOrigin: 'center 25%',
    });
  });

  it(`should return vertical bottom position`, () => {
    // before
    const result = getPosition({ vertical: AlignmentVertical.bottom }, 0, 0, 0);

    // result
    expect(result).toStrictEqual({
      bottom: '0',
      left: '0px',
      transform: 'rotate(0deg) translate(0, 0)',
      transformOrigin: 'center center',
    });
  });
});
