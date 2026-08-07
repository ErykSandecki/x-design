// mocks
import {
  elementMock,
  gapMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// types
import { AlignmentLayout, LayoutType } from 'types';

// utils
import { handleSetElementsGap } from '../handleSetElementsGap';

describe('handleSetElementsGap', () => {
  it(`should return data with changed gap value`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const state = {
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
    };

    // action
    handleSetElementsGap({ gap: 'column', value: 100 }, state);

    // result
    expect(state).toStrictEqual({
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
                gap: { ...layoutMock.gap, column: { ...gapMock, value: 100 } },
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
