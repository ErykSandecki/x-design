import SagaTester from 'redux-saga-tester';

// mocks
import {
  pageBuilderStateMock,
  reducerHistoryMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import {
  ADD_ELEMENT,
  REDUCER_KEY as PAGE_BUILDER,
  REDUCER_HISTORY_SAVE,
} from '../../actionsType';

// store
import pageBuilder from '../../reducer';
import { reducerHistorySaveSaga } from '../../saga';

describe('reducerHistorySaveSaga', () => {
  it('should save new history', async () => {
    // mock
    const currentPage =
      pageBuilderStateMock[PAGE_BUILDER].pages[
        pageBuilderStateMock[PAGE_BUILDER].currentPage
      ];

    // before
    const sagaTester = new SagaTester({
      initialState: {
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...currentPage,
              reducerHistory: reducerHistoryMock,
              reducerHistoryIndex: 0,
            },
          },
        },
      },
      reducers: { [PAGE_BUILDER]: pageBuilder },
    });

    // action
    sagaTester.start(reducerHistorySaveSaga, { type: ADD_ELEMENT });

    // wait
    await sagaTester.waitFor(REDUCER_HISTORY_SAVE);

    // result
    expect(
      sagaTester.getState()[PAGE_BUILDER].pages['0'].reducerHistory.length,
    ).toEqual(3);
  });
});
