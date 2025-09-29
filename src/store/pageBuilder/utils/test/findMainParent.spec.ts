// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { findMainParent } from '../findMainParent';

describe('findMainParent', () => {
  it(`should find main parent`, () => {
    // before
    const result = findMainParent('test-2', {
      [elementMock.id]: elementMock,
      ['test-2']: {
        ...elementMock,
        id: 'test-2',
        parentId: elementMock.id,
      },
      ['test-3']: {
        ...elementMock,
        id: 'test-3',
        parentId: 'test-2',
      },
    });

    // result
    expect(result).toBe('test-1');
  });
});
