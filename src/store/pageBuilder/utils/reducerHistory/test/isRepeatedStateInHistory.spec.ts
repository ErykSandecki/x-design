// mocks
import { pageBuilderStateMock, reducerHistoryMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D } from 'shared';
import {
  CHANGE_PARENT,
  REDUCER_KEY as PAGE_BUILDER,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
} from '../../../actionsType';

// types
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { isRepeatedStateInHistory } from '../isRepeatedStateInHistory';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

describe('isRepeatedStateInHistory', () => {
  it('should be repeated CHANGE_PARENT', () => {
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
    const result = isRepeatedStateInHistory(state, CHANGE_PARENT);

    // result
    expect(result).toBe(true);
  });

  it('should be repeated SELECT_ELEMENT', () => {
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
    const result = isRepeatedStateInHistory(state, SELECT_ELEMENT);

    // result
    expect(result).toBe(true);
  });

  it('should be repeated SELECTED_ELEMENTS', () => {
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
    const result = isRepeatedStateInHistory(state, SELECT_ELEMENTS);

    // result
    expect(result).toBe(true);
  });

  it('should be repeated SET_AREA_COORDINATES', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          areaCoordinates: BASE_3D,
          reducerHistory: [
            {
              ...reducerHistoryMock[0],
              areaCoordinates: BASE_3D,
            },
          ],
          reducerHistoryIndex: 0,
          selectedElements: [selectedElementMock],
        },
      },
    } as TPageBuilderState;

    // before
    const result = isRepeatedStateInHistory(state, SET_AREA_COORDINATES);

    // result
    expect(result).toBe(true);
  });

  it('should not be repeated', () => {
    // mock
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [],
          reducerHistoryIndex: 0,
          selectedElements: [],
        },
      },
    } as TPageBuilderState;

    // before
    const result = isRepeatedStateInHistory(state, '');

    // result
    expect(result).toBe(false);
  });
});
