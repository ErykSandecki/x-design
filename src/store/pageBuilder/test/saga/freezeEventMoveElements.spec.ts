import SagaTester from 'redux-saga-tester';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import pageBuilder, { updateEventsStatus, REDUCER_KEY as PAGE_BUILDER } from '../../slice';
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
    await sagaTester.waitFor(updateEventsStatus.type);

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
