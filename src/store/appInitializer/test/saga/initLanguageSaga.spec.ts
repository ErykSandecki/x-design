import SagaTester from 'redux-saga-tester';

// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { AVAILABLE_LANGUAGES, LANGUAGE } from 'translations/constants';
import {
  INIT_LANGUAGE_SUCCESS,
  REDUCER_KEY as APP_INITIALIZER,
} from '../../actionsType';

// store
import appInitializer from '../../reducer';
import { initLanguageSaga } from '../../saga';

describe('initLanguageSaga', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should set language from api', async () => {
    // mock
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            json: () => Promise.resolve({ languages: 'pl' }),
          } as Response),
        ),
    );

    // before
    const sagaTester = new SagaTester({
      initialState: {
        [APP_INITIALIZER]: {
          ...appInitializerStateMock[APP_INITIALIZER],
        },
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(INIT_LANGUAGE_SUCCESS);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
        language: AVAILABLE_LANGUAGES[1],
      },
    });
  });

  it('should not set language from api when is not on list', async () => {
    // mock
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            json: () => Promise.resolve({ languages: 'unknown' }),
          } as Response),
        ),
    );

    // before
    const sagaTester = new SagaTester({
      initialState: {
        [APP_INITIALIZER]: {
          ...appInitializerStateMock[APP_INITIALIZER],
        },
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(INIT_LANGUAGE_SUCCESS);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
        language: AVAILABLE_LANGUAGES[0],
      },
    });
  });

  it('should set default language', async () => {
    // mock
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => new Promise((_, reject) => reject('error')));

    // before
    const sagaTester = new SagaTester({
      initialState: {
        [APP_INITIALIZER]: {
          ...appInitializerStateMock[APP_INITIALIZER],
        },
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(INIT_LANGUAGE_SUCCESS);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
      },
    });
  });

  it('should set language from local storage', async () => {
    // mock
    localStorage.setItem(LANGUAGE, AVAILABLE_LANGUAGES[0]);

    // before
    const sagaTester = new SagaTester({
      initialState: {
        [APP_INITIALIZER]: {
          ...appInitializerStateMock[APP_INITIALIZER],
        },
      },
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(INIT_LANGUAGE_SUCCESS);

    // result
    expect(sagaTester.getState()).toStrictEqual({
      [APP_INITIALIZER]: {
        ...appInitializerStateMock[APP_INITIALIZER],
      },
    });
  });
});
