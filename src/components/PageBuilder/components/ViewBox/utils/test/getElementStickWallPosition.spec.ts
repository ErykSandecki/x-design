// types
import { ElementStickWallPosition } from '../../types/enums';

// utils
import { getElementStickWallPosition } from '../getElementStickWallPosition';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('getElementStickWallPosition', () => {
  it(`should return top wall`, () => {
    // before
    const result = getElementStickWallPosition(0);

    // result
    expect(result).toBe(ElementStickWallPosition.top);
  });

  it(`should return right wall`, () => {
    // before
    const result = getElementStickWallPosition(90);

    // result
    expect(result).toBe(ElementStickWallPosition.right);
  });

  it(`should return bottom wall`, () => {
    // before
    const result = getElementStickWallPosition(180);

    // result
    expect(result).toBe(ElementStickWallPosition.bottom);
  });

  it(`should return left wall`, () => {
    // before
    const result = getElementStickWallPosition(-90);

    // result
    expect(result).toBe(ElementStickWallPosition.left);
  });
});
