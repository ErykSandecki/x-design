// others
import {
  APP_INIT,
  INIT_LANGUAGE,
  INIT_LANGUAGE_SUCCESS,
  SET_IS_APP_LOADED,
  SET_THEME,
} from './actionsType';

// types
import { Theme } from 'types/enums/theme';

export type TAppInitializerState = {
  isAppLoaded: boolean;
  isPending: boolean;
  language: string;
  theme: Theme;
};

export type TAppInitAction = {
  type: typeof APP_INIT;
};

export type TInitLanguageAction = {
  type: typeof INIT_LANGUAGE;
};

export type TInitLanguageSuccessAction = {
  payload: string;
  type: typeof INIT_LANGUAGE_SUCCESS;
};

export type TSetIsAppLoadedAction = {
  payload: boolean;
  type: typeof SET_IS_APP_LOADED;
};

export type TSetThemeAction = {
  payload: Theme;
  type: typeof SET_THEME;
};
