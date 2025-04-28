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
      'x',
      { [elementDynamicDataMock.id]: elementDynamicDataMock },
      selectedElementMock,
      [selectedElementMock],
    );

    // result
    expect(result).toBe(false);
  });

  it(`should be mixed`, () => {
    // before
    const result = isMixed(
      'x',
      {
        [elementDynamicDataMock.id]: elementDynamicDataMock,
        ['2']: {
          ...elementDynamicDataMock,
          coordinates: { x: 100, y: 100 },
          id: '2',
        },
      },
      selectedElementMock,
      [selectedElementMock, { ...selectedElementMock, id: '2' }],
    );

    // result
    expect(result).toBe(true);
  });
});
