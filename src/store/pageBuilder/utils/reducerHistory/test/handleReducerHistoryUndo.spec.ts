// mocks
import {
  pageBuilderStateMock,
  reducerHistoryMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { handleReducerHistoryUndo } from '../handleReducerHistoryUndo';

describe('handleReducerHistoryUndo', () => {
  it('should handle undo history', () => {
    // mock
    const currentPage =
      pageBuilderStateMock[PAGE_BUILDER].pages[
        pageBuilderStateMock[PAGE_BUILDER].currentPage
      ];
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],

      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 0,
        },
      },
    } as TPageBuilderState;

    // before
    const result = handleReducerHistoryUndo(state);

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...reducerHistoryMock[1],
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 1,
        },
      },
    });
  });
});
