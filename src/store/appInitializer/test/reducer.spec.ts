// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { DEFAULT_LANGUAGE } from 'translations';
import { REDUCER_KEY as APP_INITIALIZER } from '../actionsType';

// store
import appInitializer from '../reducer';
import {
  appInit,
  initLanguageSuccess,
  setIsAppLoaded,
  setTheme,
} from '../actions';

// types
import { TAction, Theme } from 'types';
import { TAppInitializerState } from '../types';

describe('AppInitializerReducer', () => {
  const reducer = (action: TAction, initialState = {}): TAppInitializerState =>
    appInitializer(initialState as TAppInitializerState, action);

  it('should return default state', () => {
    // before
    const state = appInitializer(
      { ...appInitializerStateMock[APP_INITIALIZER] },
      { type: '' },
    );

    // result
    expect(state).toEqual(appInitializerStateMock[APP_INITIALIZER]);
  });

  it('should handle APP_INIT', () => {
    // before
    const state = reducer(appInit(), appInitializerStateMock[APP_INITIALIZER]);

    // result
    expect(state).toEqual({
      ...appInitializerStateMock[APP_INITIALIZER],
    });
  });

  it('should handle INIT_LANGUAGE_SUCCESS', () => {
    // before
    const state = reducer(
      initLanguageSuccess(DEFAULT_LANGUAGE),
      appInitializerStateMock[APP_INITIALIZER],
    );

    // result
    expect(state).toEqual({
      ...appInitializerStateMock[APP_INITIALIZER],
      language: DEFAULT_LANGUAGE,
    });
  });

  it('should handle SET_IS_APP_LOADED', () => {
    // before
    const state = reducer(
      setIsAppLoaded(true),
      appInitializerStateMock[APP_INITIALIZER],
    );

    // result
    expect(state).toEqual({
      ...appInitializerStateMock[APP_INITIALIZER],
      isAppLoaded: true,
      isPending: false,
    });
  });

  it('should handle SET_THEME', () => {
    // before
    const state = reducer(
      setTheme(Theme.dark),
      appInitializerStateMock[APP_INITIALIZER],
    );

    // result
    expect(state).toEqual({
      ...appInitializerStateMock[APP_INITIALIZER],
      theme: Theme.dark,
    });
  });
});
