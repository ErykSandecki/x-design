// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

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
        children: ['2'],
      },
      ['2']: {
        ...elementAllDataMock,
        children: ['3'],
        id: '2',
        parentId: '1',
      },
      ['3']: {
        ...elementAllDataMock,
        children: [],
        id: '3',
        parentId: '2',
      },
    };

    // before
    const result = findAllChildren(allData, allData['1'].children);

    // result
    expect(result).toStrictEqual(['2', '3']);
  });
});
