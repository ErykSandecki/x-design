import SagaTester from 'redux-saga-tester';

// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { DEFAULT_LANGUAGE } from 'translations/constants';
import {
  REDUCER_KEY as APP_INITIALIZER,
  SET_IS_APP_LOADED,
} from '../../actionsType';

// store
import appInitializer from '../../reducer';
import { appInitSaga, initLanguageSaga } from '../../saga';

describe('appInitSaga', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should be success', async () => {
    // mock
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            json: () => Promise.resolve({ languages: 'en' }),
          } as Response),
        ),
    );

    // before
    const sagaTester = new SagaTester({
      initialState: {
        ...appInitializerStateMock,
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(appInitSaga);
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(SET_IS_APP_LOADED);

    // result
    expect(sagaTester.getState()).toEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
        isAppLoaded: true,
        isPending: false,
        language: DEFAULT_LANGUAGE,
      },
    });
  });

  it('should catch server error', async () => {
    // mock
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => new Promise((_, reject) => reject('error')));

    // before
    const sagaTester = new SagaTester({
      initialState: {
        ...appInitializerStateMock,
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(appInitSaga);
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(SET_IS_APP_LOADED);

    // result
    expect(sagaTester.getState()).toEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
        isPending: false,
        language: DEFAULT_LANGUAGE,
      },
    });
  });
});
