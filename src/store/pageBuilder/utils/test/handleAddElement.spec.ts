// mocks
import { childrenMock, createFrameMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleAddElement } from '../handleAddElement';

describe('handleAddElement', () => {
  it(`should return data with added element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleAddElement(createFrameMock, pageBuilderStateMock[PAGE_BUILDER]);

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [createFrameMock.id]: createFrameMock,
          },
        },
      },
    });
  });
});
