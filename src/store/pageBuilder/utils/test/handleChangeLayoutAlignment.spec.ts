// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { AlignmentLayout, LayoutType } from 'types';

// utils
import { handleChangeLayoutAlignment } from '../handleChangeLayoutAlignment';

describe('handleChangeLayoutAlignment', () => {
  it(`should return data with changed aligmment type`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeLayoutAlignment(AlignmentLayout.center, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.topLeft,
                type: LayoutType.vertical,
              },
            },
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
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.center,
                type: LayoutType.vertical,
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
