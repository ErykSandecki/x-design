// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_RECT } from 'shared';

// utils
import { getCoordinates } from '../getCoordinates';

describe('calculateBoxSize', () => {
  it(`should return coordinates`, () => {
    // before
    const result = getCoordinates(false, {
      [selectedElementMock.id]: selectedElementMock,
    });

    // result
    expect(result).toStrictEqual({ x1: -1.25, x2: 1.25, y1: -1.25, y2: 1.25 });
  });

  it(`should return default coordinates`, () => {
    // before
    const result = getCoordinates(true, {
      [selectedElementMock.id]: selectedElementMock,
    });

    // result
    expect(result).toStrictEqual(BASE_RECT);
  });
});
