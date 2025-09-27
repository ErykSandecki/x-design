// mocks
import { elementDynamicDataMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { hasSomeAlignment } from '../hasSomeAlignment';

describe('getCoordinates', () => {
  it(`should return false`, () => {
    // before
    const result = hasSomeAlignment('horizontal', { [elementDynamicDataMock.id]: elementDynamicDataMock }, [
      selectedElementMock,
    ]);

    // result
    expect(result).toBe(false);
  });

  it(`should return true`, () => {
    // before
    const result = hasSomeAlignment(
      'horizontal',
      {
        [elementDynamicDataMock.id]: {
          ...elementDynamicDataMock,
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
