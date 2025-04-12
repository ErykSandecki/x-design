// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_RECT } from 'shared';

// utils
import { getCoordinates } from '../getCoordinates';

describe('calculateBoxSize', () => {
  it(`should return coordinates`, () => {
    // before
    const result = getCoordinates(false, [selectedElementMock]);

    // result
    expect(result).toStrictEqual({ x1: -0.75, x2: 0.75, y1: -0.75, y2: 0.75 });
  });

  it(`should return default coordinates`, () => {
    // before
    const result = getCoordinates(true, [selectedElementMock]);

    // result
    expect(result).toStrictEqual(BASE_RECT);
  });
});
