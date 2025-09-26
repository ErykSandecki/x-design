// mocks
import {
  elementDynamicDataMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// utils
import { isMixed } from '../isMixed';

describe('isMixed', () => {
  it(`should not be mixed`, () => {
    // before
    const result = isMixed(
      { [elementDynamicDataMock.id]: elementDynamicDataMock },
      selectedElementMock,
      'coordinates.x',
      [selectedElementMock],
    );

    // result
    expect(result).toBe(false);
  });

  it(`should be mixed`, () => {
    // before
    const result = isMixed(
      {
        [elementDynamicDataMock.id]: elementDynamicDataMock,
        ['test-2']: {
          ...elementDynamicDataMock,
          coordinates: { x: 100, y: 100 },
          id: 'test-2',
        },
      },
      selectedElementMock,
      'coordinates.y',
      [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
    );

    // result
    expect(result).toBe(true);
  });
});
