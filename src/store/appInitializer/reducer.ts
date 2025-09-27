// others
import { DEFAULT_LANGUAGE } from 'translations';
import { INIT_LANGUAGE_SUCCESS, SET_IS_APP_LOADED, SET_THEME } from './actionsType';

// types
import { TAction } from 'types';
import { TAppInitializerState, TInitLanguageSuccessAction, TSetIsAppLoadedAction, TSetThemeAction } from './types';

// utils
import { getThemePreferences } from 'utils';

const initialState: TAppInitializerState = {
  isAppLoaded: false,
  isPending: true,
  language: DEFAULT_LANGUAGE,
  theme: getThemePreferences(),
};

const initLanguageSuccess = (
  state: TAppInitializerState,
  { payload: language }: TAction<TInitLanguageSuccessAction['payload']>,
): TAppInitializerState => ({
  ...state,
  language,
});

const setIsAppLoaded = (
  state: TAppInitializerState,
  { payload: isAppLoaded }: TAction<TSetIsAppLoadedAction['payload']>,
): TAppInitializerState => ({
  ...state,
  isAppLoaded,
  isPending: false,
});

const setTheme = (
  state: TAppInitializerState,
  { payload: theme }: TAction<TSetThemeAction['payload']>,
): TAppInitializerState => ({
  ...state,
  theme,
});

const appInitializer = (state: TAppInitializerState = initialState, action: TAction): TAppInitializerState => {
  switch (action.type) {
    case INIT_LANGUAGE_SUCCESS:
      return initLanguageSuccess(state, action);
    case SET_IS_APP_LOADED:
      return setIsAppLoaded(state, action);
    case SET_THEME:
      return setTheme(state, action);
    default:
      return state;
  }
};

export default appInitializer;
