// mocks
import { childrenMock, elementMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { getMappedNestedChildren } from '../getMappedNestedChildren';

describe('getMappedNestedChildren', () => {
  it('should return return nested children with updated deep level', () => {
    // before
    const result = getMappedNestedChildren(
      {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          [elementMock.id]: {
            ...elementMock,
            children: [{ ...childrenMock, id: 'test-2' }],
            deepLevel: 1,
          },
          ['test-2']: {
            ...elementMock,
            id: 'test-2',
            parentId: 'test-1',
          },
        },
      },
      {
        [elementMock.id]: {
          ...elementMock,
          children: [{ ...childrenMock, id: 'test-2' }],
          deepLevel: 1,
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ['test-2']: {
        ...elementMock,
        deepLevel: 2,
        id: 'test-2',
        parentId: 'test-1',
      },
    });
  });
});
