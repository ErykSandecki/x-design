// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { getCoordinates } from '../getCoordinates';

describe('calculateBoxSize', () => {
  it(`should return coordinates`, () => {
    // before
    const result = getCoordinates({
      [selectedElementMock.id]: selectedElementMock,
    });

    // result
    expect(result).toStrictEqual({ x1: -1.25, x2: 1.25, y1: -1.25, y2: 1.25 });
  });
});
