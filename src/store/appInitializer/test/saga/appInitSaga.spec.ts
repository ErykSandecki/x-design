import SagaTester from 'redux-saga-tester';

// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { DEFAULT_LANGUAGE } from 'translations';

// store
import appInitializer, { REDUCER_KEY as APP_INITIALIZER, setIsAppLoaded } from '../../slice';
import { appInitSaga, initLanguageSaga } from '../../saga';

vi.mock('utils', async (importOriginal) => ({
  ...(await importOriginal()),
  getFormattedDate: (key: string): any => key,
}));

describe('appInitSaga', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should be success', async () => {
    // mock
    vi.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            json: () => Promise.resolve({ languages: 'en' }),
          } as Response),
        ),
    );

    // before
    const sagaTester = new SagaTester({
      initialState: {},
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(appInitSaga);
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(setIsAppLoaded.type);

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
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise((_, reject) => reject('error')));

    // before
    const sagaTester = new SagaTester({
      initialState: {},
      reducers: {
        [APP_INITIALIZER]: appInitializer,
      },
    });

    // action
    sagaTester.start(appInitSaga);
    sagaTester.start(initLanguageSaga);

    // wait
    await sagaTester.waitFor(setIsAppLoaded.type);

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
});
