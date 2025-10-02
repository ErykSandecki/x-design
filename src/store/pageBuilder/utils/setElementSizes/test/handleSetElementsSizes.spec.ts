// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { handleSetElementsSizes } from '../handleSetElementsSizes';

describe('handleSetElementsSizes', () => {
  it(`should change height`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementsSizes(
      'height',
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              [elementMock.id]: elementMock,
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
      'auto',
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              height: { value: 'auto' },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
