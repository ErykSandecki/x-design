// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { getCoordinates } from '../getCoordinates';

jest.mock('store/pageBuilder/utils/getAbsolutePosition', () => ({
  getAbsolutePosition: () => ({ x: 100, y: 100 }),
}));

describe('getCoordinates', () => {
  it(`should return coordinates`, () => {
    // before
    const result = getCoordinates(elementAllDataMock, '-1');

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });

  it(`should return coordinates`, () => {
    // before
    const result = getCoordinates(
      {
        ...elementAllDataMock,
        alignment: {
          horizontal: AlignmentHorizontal.center,
          vertical: AlignmentVertical.center,
        },
      },
      '-1',
    );

    // result
    expect(result).toStrictEqual({ x: 100, y: 100 });
  });
});
