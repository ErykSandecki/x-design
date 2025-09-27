// mocks
import { pageBuilderStateMock, reducerHistoryMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER, SELECT_ELEMENTS } from '../../../actionsType';

// types
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { handleReducerHistorySave } from '../handleReducerHistorySave';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

jest.mock('../../../constants', () => ({
  ...jest.requireActual('../../../constants'),
  MAX_LENGTH_HISTORY: 2,
}));

describe('handleReducerHistorySave', () => {
  it('should handle save the first new state', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [],
          reducerHistoryIndex: 0,
        },
      },
    } as TPageBuilderState;

    // before
    const result = handleReducerHistorySave(state, '');

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
          ],
          reducerHistoryIndex: 0,
        },
      },
    });
  });

  it('should handle overwrite state', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
          ],
          reducerHistoryIndex: 1,
        },
      },
    } as TPageBuilderState;

    // before
    const result = handleReducerHistorySave(state, '');

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
          ],
          reducerHistoryIndex: 0,
        },
      },
    });
  });

  it('should handle overwrite state when is too many states', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
          ],
          reducerHistoryIndex: 0,
        },
      },
    } as TPageBuilderState;

    // before
    const result = handleReducerHistorySave(state, '');

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
            {
              areaCoordinates: currentPage.areaCoordinates,
              elements: currentPage.elements,
              selectedElements: currentPage.selectedElements,
            },
          ],
          reducerHistoryIndex: 0,
        },
      },
    });
  });

  it('should return default state when nothing was changed', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              ...reducerHistoryMock[0],
              selectedElements: [selectedElementMock],
            },
          ],
          reducerHistoryIndex: 0,
          selectedElements: [selectedElementMock],
        },
      },
    } as TPageBuilderState;

    // before
    const result = handleReducerHistorySave(state, SELECT_ELEMENTS);

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [
            {
              ...reducerHistoryMock[0],
              selectedElements: [selectedElementMock],
            },
          ],
          reducerHistoryIndex: 0,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
