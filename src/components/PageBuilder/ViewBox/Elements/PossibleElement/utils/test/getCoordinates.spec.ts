// mocks
import { possibleElementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { LayoutType } from 'types';

// utils
import { getCoordinates } from '../getCoordinates';

describe('getCoordinates', () => {
  it(`should return when free form`, () => {
    // before
    const result = getCoordinates(LayoutType.freeForm, { ...possibleElementMock, x1: 100, x2: 200, y1: 100, y2: 200 });

    // result
    expect(result).toStrictEqual({ x1: 100, x2: 100, y1: 100, y2: 100 });
  });

  it(`should return when different than free form`, () => {
    // before
    const result = getCoordinates(LayoutType.vertical, { ...possibleElementMock, x1: 100, x2: 200, y1: 100, y2: 200 });

    // result
    expect(result).toStrictEqual({ x1: 0, x2: 100, y1: 0, y2: 100 });
  });
});
