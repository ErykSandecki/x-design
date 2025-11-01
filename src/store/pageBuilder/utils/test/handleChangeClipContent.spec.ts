// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleChangeClipContent } from '../handleChangeClipContent';

describe('handleChangeClipContent', () => {
  it(`should return data with changed box sizing type`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeClipContent(false, {
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
    });

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
              clipContent: false,
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
