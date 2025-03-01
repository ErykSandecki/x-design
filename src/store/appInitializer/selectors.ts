import { createSelector, Selector } from 'reselect';
import { get as getFp, getOr as getOrFp } from 'lodash/fp';

// others
import { DEFAULT_LANGUAGE } from 'translations';
import { REDUCER_KEY } from './actionsType';

// types
import { TAppInitializerState } from './types';
import { TMainState } from 'types/reducers';
import { Theme } from 'types';

export const appInitializerStateSelector: Selector<
  TMainState,
  TAppInitializerState
> = getFp(REDUCER_KEY);

export const isAppLoadedSelector: Selector<TMainState, boolean> =
  createSelector(appInitializerStateSelector, getOrFp(false, 'isAppLoaded'));

export const isPendingSelector: Selector<TMainState, boolean> = createSelector(
  appInitializerStateSelector,
  getOrFp(false, 'isPending'),
);

export const languageSelector: Selector<TMainState, string> = createSelector(
  appInitializerStateSelector,
  getOrFp(DEFAULT_LANGUAGE, 'language'),
);

export const themeSelector: Selector<TMainState, Theme> = createSelector(
  appInitializerStateSelector,
  getFp('theme'),
);
