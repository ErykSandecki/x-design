// mocks
import { elementStaticDataMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { findMainParent } from '../findMainParent';

describe('findMainParent', () => {
  it(`should find main parent`, () => {
    // before
    const result = findMainParent('2', {
      [elementStaticDataMock.id]: elementStaticDataMock,
      ['2']: {
        ...elementStaticDataMock,
        id: '2',
        parentId: elementStaticDataMock.id,
      },
      ['3']: {
        ...elementStaticDataMock,
        id: '3',
        parentId: '2',
      },
    });

    // result
    expect(result).toBe('1');
  });
});
