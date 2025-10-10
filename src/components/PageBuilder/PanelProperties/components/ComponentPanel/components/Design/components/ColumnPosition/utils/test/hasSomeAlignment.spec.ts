// mocks
import { elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { hasSomeAlignment } from '../hasSomeAlignment';

describe('getCoordinates', () => {
  it(`should return false`, () => {
    // before
    const result = hasSomeAlignment('horizontal', { [elementMock.id]: elementMock }, [selectedElementMock]);

    // result
    expect(result).toBe(false);
  });

  it(`should return true`, () => {
    // before
    const result = hasSomeAlignment(
      'horizontal',
      {
        [elementMock.id]: {
          ...elementMock,
          alignment: {
            horizontal: AlignmentHorizontal.center,
            vertical: AlignmentVertical.center,
          },
        },
      },
      [selectedElementMock],
    );

    // result
    expect(result).toBe(true);
  });
});
