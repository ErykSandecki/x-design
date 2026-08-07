import SagaTester from 'redux-saga-tester';

// mocks
import { elementMock, pageBuilderStateMock, reducerHistoryMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import pageBuilder, { changeBackground, reducerHistorySave, REDUCER_KEY as PAGE_BUILDER } from '../../reducer';
import { reducerHistorySaveWithDelaySaga } from '../../saga';

describe('reducerHistorySaveWithDelaySaga', () => {
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
    sagaTester.start(reducerHistorySaveWithDelaySaga, {
      type: changeBackground.type,
    });

    // wait
    await sagaTester.waitFor(reducerHistorySave.type);

    // result
    expect(sagaTester.getState()[PAGE_BUILDER].pages['0'].reducerHistory.length).toEqual(3);
  });

  it('should cancel previous task', async () => {
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
              elements: {
                ...currentPage.elements,
                [elementMock.id]: elementMock,
              },
              reducerHistory: reducerHistoryMock,
              reducerHistoryIndex: 0,
            },
          },
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 0,
        },
      },
      reducers: { [PAGE_BUILDER]: pageBuilder },
    });

    // action
    sagaTester.start(reducerHistorySaveWithDelaySaga, {
      type: changeBackground.type,
    });

    sagaTester.dispatch({
      payload: {
        background: {
          properties: { alpha: '100', color: '#ffffff', format: 'hex' },
          visible: true,
        },
        id: elementMock.id,
      },
      type: changeBackground.type,
    });

    // result
    expect(sagaTester.numCalled(reducerHistorySave.type)).toBe(0);
  });
});
