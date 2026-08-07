// mocks
import {
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../slice';

// utils
import { handleApplyElementsType } from '../handleApplyElementsType';

describe('handleApplyElementsType', () => {
  it(`should apply variable`, () => {
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
            [elementMock.id]: elementMock,
          },
          selectedElements: [selectedElementMock],
        },
      },
    };

    // action
    handleApplyElementsType({ mode: 'variable', properties: ['opacity'] }, state);

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
              opacity: { ...valueExtendMock, mode: 'variable', value: 100 },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should apply variable when nested`, () => {
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
            [elementMock.id]: elementMock,
          },
          selectedElements: [selectedElementMock],
        },
      },
    };

    // action
    handleApplyElementsType({ mode: 'variable', properties: ['padding.b', 'padding.l'] }, state);

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
              padding: {
                ...elementMock.padding,
                b: {
                  ...valueExtendMock,
                  mode: 'variable',
                },
                l: {
                  ...valueExtendMock,
                  mode: 'variable',
                },
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
