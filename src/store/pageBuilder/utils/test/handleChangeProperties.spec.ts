// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// utils
import { handleChangeProperties } from '../handleChangeProperties';

describe('handleChangeVisibility', () => {
  it(`should return data with changed visibility`, () => {
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
    handleChangeProperties({ visible: false }, state);

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
              visible: false,
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
