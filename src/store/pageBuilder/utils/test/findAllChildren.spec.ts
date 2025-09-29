// mocks
import { childrenMock, elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { TElementsData } from 'store/pageBuilder/types';

// utils
import { findAllChildren } from '../findAllChildren';

describe('findAllChildren', () => {
  it(`should find main parent`, () => {
    // mock
    const allData: TElementsData['allData'] = {
      [elementAllDataMock.id]: {
        ...elementAllDataMock,
        children: [{ ...childrenMock, id: 'test-2' }],
      },
      ['test-2']: {
        ...elementAllDataMock,
        children: [{ ...childrenMock, id: 'test-3' }],
        id: 'test-2',
        parentId: 'test-1',
      },
      ['test-3']: {
        ...elementAllDataMock,
        children: [],
        id: 'test-3',
        parentId: 'test-2',
      },
    };

    // before
    const result = findAllChildren(allData, allData['test-1'].children);

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });
});
