// mocks
import { elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { isMixed } from '../isMixed';

describe('isMixed', () => {
  it(`should not be mixed`, () => {
    // before
    const result = isMixed({ [elementMock.id]: elementMock }, selectedElementMock, 'coordinates.x', [
      selectedElementMock,
    ]);

    // result
    expect(result).toBe(false);
  });

  it(`should be mixed`, () => {
    // before
    const result = isMixed(
      {
        [elementMock.id]: elementMock,
        ['test-2']: {
          ...elementMock,
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
