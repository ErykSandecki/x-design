import SagaTester from 'redux-saga-tester';

// mocks
import {
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import {
  REDUCER_KEY as PAGE_BUILDER,
  UPDATE_EVENTS_STATUS,
} from '../../actionsType';

// store
import pageBuilder from '../../reducer';
import { freezeEventMoveElements } from '../../saga';

// utils
import { sleep } from 'test';

describe('freezeEventMoveElements', () => {
  it('should set language from api', async () => {
    // mock
    // before
    const sagaTester = new SagaTester({
      initialState: {
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
        },
      },
      reducers: {
        [PAGE_BUILDER]: pageBuilder,
      },
    });

    // action
    sagaTester.start(freezeEventMoveElements);

    // wait
    await sagaTester.waitFor(UPDATE_EVENTS_STATUS);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          canMoveElements: false,
        },
      },
    });

    // wait
    await sleep(100);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          canMoveElements: true,
        },
      },
    });
  });
});
