// others
import { APP_INIT, INIT_LANGUAGE, INIT_LANGUAGE_SUCCESS, SET_IS_APP_LOADED, SET_THEME } from './actionsType';

// types
import {
  TAppInitAction,
  TInitLanguageAction,
  TInitLanguageSuccessAction,
  TSetIsAppLoadedAction,
  TSetThemeAction,
} from './types';

export const appInit = (): TAppInitAction => ({
  type: APP_INIT,
});

export const initLanguage = (): TInitLanguageAction => ({
  type: INIT_LANGUAGE,
});

export const initLanguageSuccess = (payload: TInitLanguageSuccessAction['payload']): TInitLanguageSuccessAction => ({
  payload,
  type: INIT_LANGUAGE_SUCCESS,
});

export const setIsAppLoaded = (payload: TSetIsAppLoadedAction['payload']): TSetIsAppLoadedAction => ({
  payload,
  type: SET_IS_APP_LOADED,
});

export const setTheme = (payload: TSetThemeAction['payload']): TSetThemeAction => ({
  payload,
  type: SET_THEME,
});
