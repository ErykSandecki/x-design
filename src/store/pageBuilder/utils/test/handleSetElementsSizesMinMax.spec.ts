// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock, sizeMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementsSizesMinMax } from '../handleSetElementsSizesMinMax';

describe('handleSetElementsSizesMinMax', () => {
  it(`should change height min`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementsSizesMinMax(
      'min',
      'height',
      {
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
                    ...sizeMock,
                    value: 0,
                  },
                },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
      100,
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
              height: {
                ...elementMock.height,
                min: {
                  ...sizeMock,
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
