// mocks
import { childrenMock, elementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { TElements } from 'store/pageBuilder/types';

// utils
import { findAllChildren } from '../findAllChildren';

describe('findAllChildren', () => {
  it(`should find all children`, () => {
    // mock
    const elements: TElements = {
      [elementMock.id]: {
        ...elementMock,
        children: [{ ...childrenMock, id: 'test-2' }],
      },
      ['test-2']: {
        ...elementMock,
        children: [{ ...childrenMock, id: 'test-3' }],
        id: 'test-2',
        parentId: 'test-1',
      },
      ['test-3']: {
        ...elementMock,
        children: [],
        id: 'test-3',
        parentId: 'test-2',
      },
    };

    // before
    const result = findAllChildren(elements, elements['test-1'].children);

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it(`should find all children without nested`, () => {
    // mock
    const elements: TElements = {
      [elementMock.id]: {
        ...elementMock,
        children: [{ ...childrenMock, id: 'test-2' }],
      },
      ['test-2']: {
        ...elementMock,
        children: [{ ...childrenMock, id: 'test-3' }],
        id: 'test-2',
        parentId: 'test-1',
      },
      ['test-3']: {
        ...elementMock,
        children: [],
        id: 'test-3',
        parentId: 'test-2',
      },
    };

    // before
    const result = findAllChildren(elements, elements['test-1'].children, false);

    // result
    expect(result).toStrictEqual([{ ...childrenMock, id: 'test-2' }]);
  });
});
