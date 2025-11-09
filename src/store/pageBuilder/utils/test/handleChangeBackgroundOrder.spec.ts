// mocks
import {
  backgroundMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleChangeBackgroundOrder } from '../handleChangeBackgroundOrder';

describe('handleChangeBackgroundOrder', () => {
  it(`should return data with changed background`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeBackgroundOrder(
      { draggableItem: 2, position: 0 },
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
                background: [
                  backgroundMock[0],
                  backgroundMock[0],
                  {
                    ...backgroundMock[0],
                    properties: {
                      ...backgroundMock[0].properties,
                      alpha: '0',
                    },
                  },
                ],
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
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
              background: [
                {
                  ...backgroundMock[0],
                  properties: {
                    ...backgroundMock[0].properties,
                    alpha: '0',
                  },
                },
                backgroundMock[0],
                backgroundMock[0],
              ],
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
