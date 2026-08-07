// mocks
import {
  backgroundMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// utils
import { handleRemoveVariant } from '../handleRemoveVariant';

describe('handleRemoveVariant', () => {
  it(`should return data with removed variant`, () => {
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
              background: [
                { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, color: 'color' } },
                backgroundMock[0],
              ],
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    };

    // action
    handleRemoveVariant(
      {
        index: 0,
        key: 'background',
      },
      state,
    );

    // result
    expect(state).toStrictEqual({
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
  });
});
