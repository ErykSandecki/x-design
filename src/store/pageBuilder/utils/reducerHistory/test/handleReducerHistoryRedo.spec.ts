// mocks
import { pageBuilderStateMock, reducerHistoryMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../slice';

// types
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { handleReducerHistoryRedo } from '../handleReducerHistoryRedo';

describe('handleReducerHistoryRedo', () => {
  it('should handle redo history', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 1,
        },
      },
    } as TPageBuilderState;

    // action
    handleReducerHistoryRedo(state);

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...reducerHistoryMock[0],
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 0,
        },
      },
    });
  });
});
