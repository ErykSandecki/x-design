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
import { handleChangeBackground } from '../handleChangeBackground';

describe('handleChangeBackground', () => {
  it(`should return data with changed background`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeBackground(
      {
        background: { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, alpha: '0' } },
        id: 'test-1',
        index: 0,
      },
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
                  ...elementMock.background[0],
                  properties: {
                    ...elementMock.background[0].properties,
                    alpha: '0',
                  },
                },
              ],
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
