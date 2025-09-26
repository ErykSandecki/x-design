// mocks
import { elementStaticDataMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { findMainParent } from '../findMainParent';

describe('findMainParent', () => {
  it(`should find main parent`, () => {
    // before
    const result = findMainParent('test-2', {
      [elementStaticDataMock.id]: elementStaticDataMock,
      ['test-2']: {
        ...elementStaticDataMock,
        id: 'test-2',
        parentId: elementStaticDataMock.id,
      },
      ['test-3']: {
        ...elementStaticDataMock,
        id: 'test-3',
        parentId: 'test-2',
      },
    });

    // result
    expect(result).toBe('test-1');
  });
});
