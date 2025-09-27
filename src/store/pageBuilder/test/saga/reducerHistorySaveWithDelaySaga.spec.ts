import SagaTester from 'redux-saga-tester';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  reducerHistoryMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { CHANGE_BACKGROUND, REDUCER_KEY as PAGE_BUILDER, REDUCER_HISTORY_SAVE } from '../../actionsType';
import { REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS } from 'store/pageBuilder/constants';

// store
import pageBuilder from '../../reducer';
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
      type: CHANGE_BACKGROUND,
    });

    // wait
    await sagaTester.waitFor(REDUCER_HISTORY_SAVE);

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
                allData: {
                  ...currentPage.elements.allData,
                  [elementAllDataMock.id]: elementAllDataMock,
                },
                dynamicData: {
                  ...currentPage.elements.dynamicData,
                  [elementDynamicDataMock.id]: elementDynamicDataMock,
                },
                staticData: {
                  ...currentPage.elements.staticData,
                  [elementStaticDataMock.id]: elementStaticDataMock,
                },
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
      type: CHANGE_BACKGROUND,
    });

    sagaTester.dispatch({
      payload: {
        background: {
          properties: { alpha: '100', color: '#ffffff', format: 'hex' },
          visible: true,
        },
        id: elementAllDataMock.id,
      },
      type: REDUCER_HISTORY_SAVE_WITH_DELAY_ACTIONS[0],
    });

    // result
    expect(sagaTester.numCalled(REDUCER_HISTORY_SAVE)).toBe(0);
  });
});
