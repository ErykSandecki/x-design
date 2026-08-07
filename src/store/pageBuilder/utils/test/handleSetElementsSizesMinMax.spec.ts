// mocks
import {
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// utils
import { handleSetElementsSizesMinMax } from '../handleSetElementsSizesMinMax';

describe('handleSetElementsSizesMinMax', () => {
  it(`should change height min`, () => {
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
              height: {
                ...elementMock.height,
                min: {
                  ...valueExtendMock,
                  value: 0,
                },
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    };

    // action
    handleSetElementsSizesMinMax('min', 'height', state, 100);

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
              height: {
                ...elementMock.height,
                min: {
                  ...valueExtendMock,
                  value: 100,
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
