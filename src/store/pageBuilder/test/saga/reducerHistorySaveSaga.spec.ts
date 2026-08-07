import SagaTester from 'redux-saga-tester';

// mocks
import { pageBuilderStateMock, reducerHistoryMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import pageBuilder, { addElement, reducerHistorySave, REDUCER_KEY as PAGE_BUILDER } from '../../reducer';
import { reducerHistorySaveSaga } from '../../saga';

describe('reducerHistorySaveSaga', () => {
  it('should save new history', async () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

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
    sagaTester.start(reducerHistorySaveSaga, { type: addElement.type });

    // wait
    await sagaTester.waitFor(reducerHistorySave.type);

    // result
    expect(sagaTester.getState()[PAGE_BUILDER].pages['0'].reducerHistory.length).toEqual(3);
  });
});
